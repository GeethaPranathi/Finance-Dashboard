"use client";

import { useUser } from "@clerk/nextjs";
import { useGetUserRole } from "@/hooks/use-get-user-role";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();
  const role = useGetUserRole();

  return (
    <div className="mb-4 space-y-1">
      <p className="text-sm font-medium text-indigo-300">{getGreeting()}</p>
      <h2 className="flex flex-wrap items-center gap-2 text-2xl font-bold tracking-tight text-white lg:text-3xl">
        {isLoaded ? (
          <>
            <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              {user?.firstName ?? "there"}
            </span>
            <span className="text-white">👋</span>
          </>
        ) : (
          <span className="text-white/60">Loading…</span>
        )}

        {isLoaded && (
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold capitalize tracking-wide",
              role === "admin"
                ? "bg-indigo-500/30 text-indigo-200 ring-1 ring-indigo-400/30"
                : "bg-white/10 text-white/70 ring-1 ring-white/20",
            ].join(" ")}
          >
            {role}
          </span>
        )}
      </h2>
      <p className="text-sm text-indigo-300/80">
        Here&rsquo;s your financial overview for today.
      </p>
    </div>
  );
};
