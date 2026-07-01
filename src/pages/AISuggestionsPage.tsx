import { DashboardLayout } from "@/components/DashboardLayout";
import { Topbar } from "@/components/Topbar";
import { Sparkles } from "lucide-react";

export function AISuggestionsPage() {
  return (
    <DashboardLayout
      topbar={({ onMenuClick }) => (
        <Topbar title="AI Suggestions" showHome onMenuClick={onMenuClick} />
      )}
    >
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="max-w-md rounded-xl border border-dashed border-border bg-card px-8 py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <p className="text-base font-bold text-foreground">
            Stay tuned — coming soon
          </p>
          <p className="mt-2 text-[13px] text-muted-foreground">
            AI-powered creator recommendations are on the way.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
