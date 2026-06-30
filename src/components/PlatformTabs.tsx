import type { Platform } from "@/types";
import {
  getPlatformLabel,
  getSearchData,
  PLATFORMS,
} from "@/utils/dataHelpers";
import { formatCompactNumber } from "@/utils/profileMetrics";
import { ArrowUpDown, ListFilter, Music2 } from "lucide-react";
import { PlatformIcon } from "./PlatformIcon";

interface PlatformTabsProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  metaLabel?: string;
  showActions?: boolean;
}

export function PlatformTabs({
  selected,
  onChange,
  metaLabel = "Top 10 · By Followers",
  showActions = true,
}: PlatformTabsProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex items-center gap-0.5 rounded-xl border border-border bg-secondary p-0.5"
        role="tablist"
        aria-label="Platform filter"
      >
        {PLATFORMS.map((platform) => {
          const count = getSearchData(platform).accounts.length;
          const isActive = selected === platform;

          return (
            <button
              key={platform}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(platform)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-1.5 text-[13px] font-semibold transition ${
                isActive
                  ? "bg-gradient-to-br from-primary to-primary-light text-white"
                  : "text-muted-foreground"
              }`}
            >
              {platform === "tiktok" ? (
                <Music2 className="h-3.5 w-3.5" />
              ) : (
                <PlatformIcon platform={platform} />
              )}
              {getPlatformLabel(platform)}
              <span
                className={`rounded-full px-1.5 py-px text-[10.5px] font-bold ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-white/[0.06] text-muted-foreground"
                }`}
              >
                {formatCompactNumber(count)}
              </span>
            </button>
          );
        })}
      </div>

      {showActions ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-foreground"
          >
            <ArrowUpDown className="h-3 w-3" />
            Sort
          </button>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ListFilter className="h-3 w-3" />
            {metaLabel}
          </span>
        </div>
      ) : (
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ListFilter className="h-3 w-3" />
          {metaLabel}
        </span>
      )}
    </div>
  );
}
