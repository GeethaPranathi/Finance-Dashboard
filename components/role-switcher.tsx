"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { switchRole } from "@/actions/role";
import { useGetUserRole } from "@/hooks/use-get-user-role";

export const RoleSwitcher = () => {
  const { user } = useUser();
  const currentRole = useGetUserRole();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = async (newRole: "admin" | "viewer") => {
    if (!user || currentRole === newRole) return;
    
    setIsLoading(true);
    try {
      await switchRole(newRole);
      // Force Clerk to reload session data so the UI reacts instantly
      await user.reload();
      toast.success(`Role switched to ${newRole}`);
      window.location.reload(); // Hard reload to guarantee cache bust for queries
    } catch (error) {
      toast.error("Failed to switch role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isLoading || !user}
          className="flex items-center gap-x-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : null}
          <span className="text-gray-400">Role:</span>
          <span className="capitalize font-semibold text-gray-900">{currentRole}</span>
          <ChevronDown className="size-3 text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleRoleChange("admin")}
          disabled={isLoading || currentRole === "admin"}
        >
          Admin
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleRoleChange("viewer")}
          disabled={isLoading || currentRole === "viewer"}
        >
          Viewer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
