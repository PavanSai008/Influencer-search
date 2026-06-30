import { useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InfluencerTable } from "@/components/InfluencerTable";
import { Topbar } from "@/components/Topbar";
import { getTrendingProfiles } from "@/utils/dataHelpers";

export function TrendingPage() {
  const profiles = useMemo(() => getTrendingProfiles(3), []);

  return (
    <DashboardLayout topbar={<Topbar title="Trending Creators" />}>
      <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-[22px]">
        <p className="mb-5 text-[13px] text-muted-foreground">
          Top 3 influencers by engagement from Instagram, YouTube, and TikTok —
          combined in one list.
        </p>

        <InfluencerTable mixedProfiles={profiles} />
      </div>
    </DashboardLayout>
  );
}
