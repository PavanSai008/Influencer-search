import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  topbar: ReactNode;
}

export function DashboardLayout({ children, topbar }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-sm font-medium text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {topbar}
        {children}
      </div>
    </div>
  );
}
