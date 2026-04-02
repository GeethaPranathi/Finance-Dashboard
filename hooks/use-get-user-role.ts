import { useUser } from "@clerk/nextjs";

export const useGetUserRole = () => {
  const { user } = useUser();
  
  // Default to "admin" if no role is set so you are not locked out
  const role = (user?.publicMetadata?.role as string) || "admin";
  
  return role;
};
