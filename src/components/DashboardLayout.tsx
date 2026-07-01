import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  topbar: ReactNode | ((args: { onMenuClick: () => void }) => ReactNode);
}

export function DashboardLayout({ children, topbar }: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const topbarContent =
    typeof topbar === "function"
      ? topbar({ onMenuClick: () => setMobileSidebarOpen(true) })
      : topbar;

  return (
    <div className="relative flex min-h-screen bg-background text-sm font-medium text-foreground">
      <Sidebar />

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileSidebarOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-65 transform flex-col border-r border-border bg-sidebar py-5 transition duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar mobile className="w-65" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {topbarContent}
        {children}
      </div>
    </div>
  );
}
