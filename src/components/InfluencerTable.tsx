import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import type { MouseEvent } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import type { ProfileWithPlatform } from "@/utils/dataHelpers";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import {
  formatCompactNumber,
  formatRowNumber,
  getEngagementBarWidth,
  getEngagementLabel,
  getEngagementLevel,
  getEngagementPercent,
  getNicheForProfile,
  getScoreGrade,
  getScoreRing,
  nicheStyles,
} from "@/utils/profileMetrics";
import {
  BookmarkCheck,
  BookmarkPlus,
  ExternalLink,
} from "lucide-react";
import { PlatformIcon } from "./PlatformIcon";
import { ProfileAvatar } from "./ProfileAvatar";

interface InfluencerTableProps {
  profiles?: UserProfileSummary[];
  platform?: Platform;
  mixedProfiles?: ProfileWithPlatform[];
  onProfileClick?: (username: string) => void;
  sortBy?: "followers" | "engagement";
  limit?: number;
}

const platformBadgeClasses: Record<Platform, string> = {
  instagram: "bg-[#e1306c]",
  youtube: "bg-[#ff0000]",
  tiktok: "bg-[#111]",
};

const ringClasses = {
  a: "border-success-foreground/50",
  b: "border-accent-foreground/50",
  c: "border-warning-foreground/40",
};

const engagementPctClasses = {
  high: "text-success-foreground",
  mid: "text-accent-foreground",
  low: "text-warning-foreground",
};

const engagementFillClasses = {
  high: "bg-gradient-to-r from-[#22c55e] to-[#4ade80]",
  mid: "bg-gradient-to-r from-primary to-accent-foreground",
  low: "bg-gradient-to-r from-[#d97706] to-warning-foreground",
};

const scoreBadgeClasses = {
  "A+": "bg-success-foreground/15 text-success-foreground",
  A: "bg-success-foreground/15 text-success-foreground",
  "B+": "bg-primary/20 text-accent-foreground",
  B: "bg-primary/20 text-accent-foreground",
  "C+": "bg-warning-foreground/15 text-warning-foreground",
};

export function InfluencerTable({
  profiles = [],
  platform = "instagram",
  mixedProfiles,
  onProfileClick,
  sortBy = "followers",
  limit = 10,
}: InfluencerTableProps) {
  const navigate = useNavigate();
  const addProfile = useSelectedProfilesStore((s) => s.addProfile);
  const selectedProfiles = useSelectedProfilesStore((s) => s.selectedProfiles);
  const selectedUsernames = useMemo(
    () => new Set(selectedProfiles.map((p) => p.username)),
    [selectedProfiles],
  );

  const topProfiles: ProfileWithPlatform[] = mixedProfiles
    ? mixedProfiles
    : [...profiles]
        .sort((a, b) => {
          if (sortBy === "engagement") {
            return (
              (b.engagement_rate ?? 0) - (a.engagement_rate ?? 0) ||
              (b.engagements ?? 0) - (a.engagements ?? 0)
            );
          }
          return b.followers - a.followers;
        })
        .slice(0, limit)
        .map((profile) => ({ ...profile, platform }));

  const handleRowClick = (username: string, rowPlatform: Platform) => {
    onProfileClick?.(username);
    navigate(`/profile/${username}?platform=${rowPlatform}`);
  };

  const handleSave = (
    event: MouseEvent<HTMLButtonElement>,
    profile: ProfileWithPlatform,
  ) => {
    event.stopPropagation();
    if (selectedUsernames.has(profile.username)) return;
    addProfile({ ...profile, platform: profile.platform });
  };

  const handleExternal = (
    event: MouseEvent<HTMLButtonElement>,
    url: string,
  ) => {
    event.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (topProfiles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No profiles found. Try another search or switch platform.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed border-collapse">
          <thead className="border-b border-border bg-white/[0.025]">
            <tr>
              {["#", "Influencer", "Niche", "Followers", "Avg. Views", "Engagement", "Score", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    scope="col"
                    className={`px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground first:pl-4 last:pr-4 ${
                      col === "#"
                        ? "w-10"
                        : col === "Influencer"
                          ? "w-[26%]"
                          : col === "Actions"
                            ? "w-[120px]"
                            : ""
                    }`}
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {topProfiles.map((profile, index) => {
              const rowPlatform = profile.platform;
              const niche = getNicheForProfile(profile);
              const nicheStyle = nicheStyles[niche];
              const engagementLevel = getEngagementLevel(profile.engagement_rate);
              const engagementPct = getEngagementPercent(profile.engagement_rate);
              const grade = getScoreGrade(profile.engagement_rate);
              const ring = getScoreRing(grade);
              const saved = selectedUsernames.has(profile.username);
              const avgViews = profile.avg_views ?? profile.engagements;

              return (
                <tr
                  key={`${rowPlatform}-${profile.user_id}`}
                  onClick={() => handleRowClick(profile.username, rowPlatform)}
                  className="cursor-pointer border-b border-border/70 last:border-b-0 hover:bg-white/[0.02]"
                >
                  <td className="px-3.5 py-2.5 first:pl-4">
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        index < 3 ? "text-primary-light" : "text-muted-foreground"
                      }`}
                    >
                      {formatRowNumber(index)}
                    </span>
                  </td>
                  <td className="max-w-0 px-3.5 py-2.5">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="relative shrink-0">
                        <ProfileAvatar
                          profile={profile}
                          platform={rowPlatform}
                          className="h-[38px] w-[38px] rounded-full object-cover"
                        />
                        <div
                          className={`absolute -inset-0.5 rounded-full border-[1.5px] ${ringClasses[ring]}`}
                        />
                        <div
                          className={`absolute -bottom-px -right-px flex h-[15px] w-[15px] items-center justify-center rounded-full border-[1.5px] border-card ${platformBadgeClasses[rowPlatform]}`}
                        >
                          <PlatformIcon
                            platform={rowPlatform}
                            className="h-[7px] w-[7px] text-white"
                          />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <p
                          className="overflow-hidden text-ellipsis whitespace-nowrap text-[13.5px] font-bold tracking-tight text-foreground"
                          title={profile.fullname}
                        >
                          {profile.fullname}
                        </p>
                        <p
                          className="overflow-hidden text-ellipsis whitespace-nowrap text-[11.5px] text-muted-foreground"
                          title={`@${profile.username}`}
                        >
                          @{profile.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <span
                      className="inline-flex rounded-xl px-2.5 py-0.5 text-[11px] font-bold"
                      style={{
                        backgroundColor: nicheStyle.bg,
                        color: nicheStyle.text,
                      }}
                    >
                      {niche}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <p className="text-[13px] font-bold tracking-tight text-foreground">
                      {formatCompactNumber(profile.followers)}
                    </p>
                    <p className="text-[10.5px] text-muted-foreground">Followers</p>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <p className="text-[13px] font-bold tracking-tight text-foreground">
                      {avgViews ? formatCompactNumber(avgViews) : "—"}
                    </p>
                    <p className="text-[10.5px] text-muted-foreground">per post</p>
                  </td>
                  <td className="min-w-[120px] px-3.5 py-2.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${engagementPctClasses[engagementLevel]}`}
                        >
                          {engagementPct.toFixed(1)}%
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {getEngagementLabel(engagementLevel)}
                        </span>
                      </div>
                      <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className={`h-full rounded-full ${engagementFillClasses[engagementLevel]}`}
                          style={{
                            width: `${getEngagementBarWidth(profile.engagement_rate)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[11.5px] font-extrabold tracking-tight ${scoreBadgeClasses[grade]}`}
                    >
                      {grade}
                    </span>
                  </td>
                  <td className="px-3.5 py-2.5 last:pr-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleSave(e, profile)}
                        disabled={saved}
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11.5px] font-bold whitespace-nowrap ${
                          saved
                            ? "border border-success-foreground/22 bg-success-foreground/12 text-success-foreground"
                            : "border border-primary/22 bg-primary/14 text-accent-foreground"
                        }`}
                      >
                        {saved ? (
                          <>
                            <BookmarkCheck className="h-2.5 w-2.5" />
                            Saved
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="h-2.5 w-2.5" />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleExternal(e, profile.url)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white/[0.04] text-muted-foreground"
                        aria-label={`Open ${profile.username} profile`}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
