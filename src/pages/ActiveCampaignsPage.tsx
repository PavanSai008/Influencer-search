import { DashboardLayout } from "@/components/DashboardLayout";
import { Topbar } from "@/components/Topbar";
import { Megaphone } from "lucide-react";

export function ActiveCampaignsPage() {
  return (
    <DashboardLayout
      topbar={({ onMenuClick }) => (
        <Topbar title="Active Campaigns" showHome onMenuClick={onMenuClick} />
      )}
    >
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="max-w-md rounded-xl border border-dashed border-border bg-card px-8 py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <Megaphone className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-base font-bold text-foreground">Empty</p>
          <p className="mt-2 text-[13px] text-muted-foreground">
            You have no active campaigns yet.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
