import type { PropsWithChildren } from "react";
import React from "react";

import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Loader2 } from "lucide-react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      {/* Main content area - offset by sidebar width on desktop */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <React.Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="size-8 animate-spin text-slate-300" /></div>}>
            {children}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
