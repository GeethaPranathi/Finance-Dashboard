"use client";

import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Tag,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: ArrowLeftRight,
  },
  {
    href: "/accounts",
    label: "Accounts",
    icon: PiggyBank,
  },
  {
    href: "/categories",
    label: "Categories",
    icon: Tag,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger - shown only on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-[hsl(222_47%_10%)] p-2 text-white shadow-lg lg:hidden"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full w-64 flex-col shadow-sidebar transition-transform duration-300 ease-in-out",
          "bg-[hsl(222_47%_10%)]",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-x-3 border-b border-white/[0.06] px-5 py-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-900/30">
            <span className="text-base font-bold text-white">F</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white">Finance</h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="scrollbar-thin flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            const Icon = route.icon;

            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-900/30"
                    : "text-[hsl(215_20%_60%)] hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {/* Left accent bar for hover state */}
                {!isActive && (
                  <span className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-indigo-500 transition-all duration-200 group-hover:h-5" />
                )}
                <Icon
                  className={cn(
                    "size-4 shrink-0 transition-colors",
                    isActive ? "text-white" : "text-[hsl(215_20%_55%)] group-hover:text-white"
                  )}
                />
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/[0.06] px-5 py-4">
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/20">
            Finance v1.0
          </p>
        </div>
      </aside>
    </>
  );
};
