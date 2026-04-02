"use server";

import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function switchRole(role: "admin" | "viewer") {
  // Await auth() as required by Next.js 15 & Clerk v6
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { role },
  });
  
  return { success: true, role };
}
