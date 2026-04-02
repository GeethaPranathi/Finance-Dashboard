"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Bell, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { RoleSwitcher } from "./role-switcher";
import { Filters } from "./filters";
import { useGetUserRole } from "@/hooks/use-get-user-role";

const pageTitles: Record<string, { label: string; sub: string }> = {
  "/":             { label: "Dashboard",    sub: "Your financial overview" },
  "/transactions": { label: "Transactions", sub: "Track your spending & income" },
  "/accounts":     { label: "Accounts",     sub: "Manage your bank accounts" },
  "/categories":   { label: "Categories",   sub: "Organise your expenses" },
  "/settings":     { label: "Settings",     sub: "Preferences & configuration" },
};

export const Topbar = () => {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { label: "Finance", sub: "" };

  return (
    <div
      className="sticky top-0 z-30 border-b border-white/60 bg-white/75 shadow-[0_1px_0_0_hsl(220_13%_91%)] backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Page Title */}
        <div className="animate-fade-in">
          <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">
            {page.label}
          </h2>
          <p className="text-[11px] text-gray-400">{page.sub}</p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-x-2">
          {pathname === "/" && (
            <div className="hidden lg:block">
              <Filters />
            </div>
          )}

          {/* Notification bell */}
          <button 
            onClick={() => toast.info("No new notifications")}
            className="flex size-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <Bell className="size-4" />
          </button>

          <RoleSwitcher />

          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-5 animate-spin text-gray-400" />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
};
