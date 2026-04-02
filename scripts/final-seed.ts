import { neon } from "@neondatabase/serverless";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { createClerkClient } from "@clerk/backend";

config({ path: ".env.local" });

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const sql = neon(process.env.DATABASE_URL!);

async function getLatestUserId() {
  const users = await clerkClient.users.getUserList({ limit: 1 });
  if (users.data.length === 0) {
    throw new Error("No users found in Clerk. Please sign up first!");
  }
  return users.data[0].id;
}

async function run() {
  try {
    const userId = await getLatestUserId();
    console.log(`Found user: ${userId}.`);

    console.log("Setting up tables if missing...");
    await sql`CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, name TEXT NOT NULL, user_id TEXT NOT NULL)`;
    await sql`CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL, user_id TEXT NOT NULL)`;
    await sql`CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY, amount INTEGER NOT NULL, payee TEXT NOT NULL, notes TEXT, date TIMESTAMP NOT NULL, account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE, category_id TEXT REFERENCES categories(id) ON DELETE SET NULL)`;

    console.log("Cleaning current data for this user...");
    // Just delete to be clean
    await sql`DELETE FROM transactions WHERE account_id IN (SELECT id FROM accounts WHERE user_id = ${userId})`;
    await sql`DELETE FROM accounts WHERE user_id = ${userId}`;
    await sql`DELETE FROM categories WHERE user_id = ${userId}`;

    const SEED_CATEGORIES = [
      { id: "cat_food_" + userId, name: "Food", userId },
      { id: "cat_rent_" + userId, name: "Rent", userId },
      { id: "cat_util_" + userId, name: "Utilities", userId },
      { id: "cat_cloth_" + userId, name: "Clothing", userId },
    ];

    const SEED_ACCOUNTS = [
      { id: "acc_checking_" + userId, name: "Checking", userId },
      { id: "acc_savings_" + userId, name: "Savings", userId },
    ];

    console.log("Seeding categories and accounts...");
    for (const cat of SEED_CATEGORIES) {
      await sql`INSERT INTO categories (id, name, user_id) VALUES (${cat.id}, ${cat.name}, ${cat.userId}) ON CONFLICT DO NOTHING`;
    }
    for (const acc of SEED_ACCOUNTS) {
      await sql`INSERT INTO accounts (id, name, user_id) VALUES (${acc.id}, ${acc.name}, ${acc.userId}) ON CONFLICT DO NOTHING`;
    }

    console.log("Generating transactions...");
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);
    const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });

    for (const day of days) {
      const numTransactions = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numTransactions; i++) {
        const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
        const amount = Math.floor(Math.random() * 5000) + 1000; // in milliunits
        const isExpense = Math.random() > 0.3;
        const id = `tr_${userId}_${format(day, "yyyyMMdd")}_${i}`;

        await sql`INSERT INTO transactions (id, amount, payee, date, account_id, category_id) 
                  VALUES (${id}, ${isExpense ? -amount : amount}, 'Sample Merchant', ${day}, ${SEED_ACCOUNTS[0].id}, ${category.id}) 
                  ON CONFLICT DO NOTHING`;
      }
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error setting up sample data:", err);
  }
}

run();
