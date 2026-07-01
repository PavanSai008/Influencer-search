import { useMemo, useState } from "react";
import type { Platform } from "@/types";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InfluencerTable } from "@/components/InfluencerTable";
import { PlatformTabs } from "@/components/PlatformTabs";
import { SavedListPanel } from "@/components/SavedListPanel";
import { StatCard } from "@/components/StatCard";
import { Topbar } from "@/components/Topbar";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import {
  computeAvgEngagement,
  computeTotalReach,
  formatCompactNumber,
} from "@/utils/profileMetrics";
import { Activity, Bookmark, Radio, Search, Users } from "lucide-react";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const savedCount = useSelectedProfilesStore((s) => s.selectedProfiles.length);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery],
  );

  const avgEngagement = useMemo(
    () => computeAvgEngagement(allProfiles),
    [allProfiles],
  );
  const totalReach = useMemo(
    () => computeTotalReach(allProfiles),
    [allProfiles],
  );

  const handleProfileClick = (username: string) => {
    setClickCount((count) => count + 1);
    console.log("Clicked profile:", username, "total clicks:", clickCount + 1);
  };

  return (
    <DashboardLayout
      topbar={({ onMenuClick }) => (
        <Topbar
          title="Influencer Discovery"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showHome
          onMenuClick={onMenuClick}
        />
      )}
    >
      <div className="flex flex-1 overflow-hidden">
        <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-[22px]">
          {/* Mobile search */}
          <label className="relative mb-4 flex w-full items-center gap-2 rounded-lg border border-border bg-secondary px-3.5 py-2 md:hidden">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, niche, platform…"
              className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="Search influencers"
            />
          </label>

          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              variant="purple"
              icon={<Users className="h-3.5 w-3.5" />}
              label="Total Influencers"
              value={allProfiles.length.toLocaleString()}
              change="+8.2% this month"
            />
            <StatCard
              variant="green"
              icon={<Activity className="h-3.5 w-3.5" />}
              label="Avg. Engagement"
              value={`${avgEngagement.toFixed(1)}%`}
              change="+1.3% vs last month"
            />
            <StatCard
              variant="orange"
              icon={<Radio className="h-3.5 w-3.5" />}
              label="Total Reach"
              value={formatCompactNumber(totalReach)}
              change="+14% since last week"
            />
            <StatCard
              variant="blue"
              icon={<Bookmark className="h-3.5 w-3.5" />}
              label="Saved to Lists"
              value={String(savedCount)}
              change={`+${savedCount} added today`}
            />
          </div>

          <PlatformTabs
            selected={platform}
            onChange={(p) => {
              setPlatform(p);
              setSearchQuery("");
            }}
          />

          <InfluencerTable
            profiles={filtered}
            platform={platform}
            onProfileClick={handleProfileClick}
          />

          {/* Mobile saved list */}
          <div className="mt-6 xl:hidden">
            <SavedListPanel variant="inline" />
          </div>
        </div>

        <SavedListPanel />
      </div>
    </DashboardLayout>
  );
}
