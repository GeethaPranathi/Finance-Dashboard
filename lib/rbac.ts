import { createClerkClient } from "@clerk/backend";

// Initialize the Clerk client explicitly for Hono handlers
export const clerkClient = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export const getUserRole = async (userId: string) => {
  try {
    const user = await clerkClient.users.getUser(userId);
    // Explicitly fallback to "admin" so the owner doesn't lock themselves out
    return (user.publicMetadata?.role as string) || "admin";
  } catch (error) {
    console.error("Error fetching user role from Clerk:", error);
    // If we fail to fetch, assume restricted access to be safe
    return "viewer";
  }
};
