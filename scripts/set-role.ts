import { createClerkClient } from "@clerk/backend";
import { config } from "dotenv";

config({ path: ".env.local" });

const clerkClient = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY as string 
});

async function main() {
  const roleArg = process.argv[2];

  if (!roleArg || !["admin", "viewer"].includes(roleArg.toLowerCase())) {
    console.error("Usage: npm run tsx scripts/set-role.ts [admin|viewer]");
    process.exit(1);
  }

  const role = roleArg.toLowerCase();

  try {
    const users = await clerkClient.users.getUserList({ limit: 1 });
    
    if (users.data.length === 0) {
      console.error("No users found in Clerk. Sign up first.");
      process.exit(1);
    }

    const userId = users.data[0].id;
    
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role }
    });

    console.log(`✅ Successfully updated role to '${role}' for user: ${userId}`);
    console.log(`Please refresh your dashboard to see the changes.`);
  } catch (error) {
    console.error("Failed to update role:", error);
  }
}

main();
