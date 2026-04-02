import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "./accounts";
import categories from "./categories";
import summary from "./summary";
import transactions from "./transactions";

export const runtime = "edge";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { getUserRole } from "@/lib/rbac";

const app = new Hono().basePath("/api");

app.use("*", clerkMiddleware({
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));

// Guard all mutating methods against viewer roles globally
app.use("*", async (c, next) => {
  if (c.req.method !== "GET") {
    const auth = getAuth(c);
    if (auth?.userId) {
      const role = await getUserRole(auth.userId);
      if (role === "viewer") {
        return c.json({ error: "Forbidden: Viewers cannot modify data." }, 403);
      }
    }
  }
  await next();
});

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/summary", summary)
  .route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
