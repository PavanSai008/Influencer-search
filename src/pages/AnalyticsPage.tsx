import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Platform } from "@/types";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PlatformIcon } from "@/components/PlatformIcon";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { StatCard } from "@/components/StatCard";
import { Topbar } from "@/components/Topbar";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import { getPlatformLabel, PLATFORMS } from "@/utils/dataHelpers";
import {
  computeAvgEngagement,
  computeTotalEngagements,
  computeTotalReach,
  formatCompactNumber,
  getEngagementPercent,
  getNicheForProfile,
  getScoreGrade,
  getScoreColor,
} from "@/utils/profileMetrics";
import {
  Activity,
  BarChart2,
  Bookmark,
  Radio,
  Users,
} from "lucide-react";

function PlatformBreakdown({
  platform,
  count,
  reach,
  engagement,
}: {
  platform: Platform;
  count: number;
  reach: number;
  engagement: number;
}) {
  const share = count > 0 ? `${count} creator${count === 1 ? "" : "s"}` : "—";

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card">
        <PlatformIcon platform={platform} className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold text-foreground">
          {getPlatformLabel(platform)}
        </p>
        <p className="text-[11px] text-muted-foreground">{share}</p>
      </div>
      <div className="text-right">
        <p className="text-[13px] font-bold text-foreground">
          {formatCompactNumber(reach)}
        </p>
        <p className="text-[10.5px] text-success-foreground">
          {engagement.toFixed(1)}% avg eng.
        </p>
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  const selectedProfiles = useSelectedProfilesStore((s) => s.selectedProfiles);

  const totalReach = useMemo(
    () => computeTotalReach(selectedProfiles),
    [selectedProfiles],
  );
  const avgEngagement = useMemo(
    () => computeAvgEngagement(selectedProfiles),
    [selectedProfiles],
  );
  const totalEngagements = useMemo(
    () => computeTotalEngagements(selectedProfiles),
    [selectedProfiles],
  );

  const platformStats = useMemo(() => {
    return PLATFORMS.map((platform) => {
      const profiles = selectedProfiles.filter((p) => p.platform === platform);
      return {
        platform,
        count: profiles.length,
        reach: computeTotalReach(profiles),
        engagement: computeAvgEngagement(profiles),
        engagements: computeTotalEngagements(profiles),
      };
    });
  }, [selectedProfiles]);

  const topByEngagement = useMemo(
    () =>
      [...selectedProfiles].sort(
        (a, b) =>
          (b.engagement_rate ?? 0) - (a.engagement_rate ?? 0) ||
          (b.engagements ?? 0) - (a.engagements ?? 0),
      ),
    [selectedProfiles],
  );

  const estCost = selectedProfiles.length * 8400;

  if (selectedProfiles.length === 0) {
    return (
      <DashboardLayout topbar={<Topbar title="Analytics" />}>
        <div className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="max-w-md rounded-xl border border-dashed border-border bg-card px-8 py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <BarChart2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <p className="text-base font-bold text-foreground">
              No analytics yet
            </p>
            <p className="mt-2 text-[13px] text-muted-foreground">
              Save creators to your list to see combined performance analytics.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-light px-4 py-2 text-[13px] font-bold text-white"
            >
              <Users className="h-3.5 w-3.5" />
              Discover Influencers
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout topbar={<Topbar title="Analytics" />}>
      <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-[22px]">
        <p className="mb-5 text-[13px] text-muted-foreground">
          Combined performance across your saved list — {selectedProfiles.length}{" "}
          creator{selectedProfiles.length === 1 ? "" : "s"} in shortlist.
        </p>

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            variant="orange"
            icon={<Radio className="h-3.5 w-3.5" />}
            label="Total Reach"
            value={formatCompactNumber(totalReach)}
            change="Combined followers"
          />
          <StatCard
            variant="green"
            icon={<Activity className="h-3.5 w-3.5" />}
            label="Avg. Engagement"
            value={`${avgEngagement.toFixed(1)}%`}
            change="Across saved list"
          />
          <StatCard
            variant="purple"
            icon={<BarChart2 className="h-3.5 w-3.5" />}
            label="Total Engagements"
            value={formatCompactNumber(totalEngagements)}
            change="Per-post interactions"
          />
          <StatCard
            variant="blue"
            icon={<Bookmark className="h-3.5 w-3.5" />}
            label="Saved Creators"
            value={String(selectedProfiles.length)}
            change={`Est. cost $${formatCompactNumber(estCost)}`}
          />
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 text-[13.5px] font-extrabold tracking-tight text-foreground">
              Platform Breakdown
            </h2>
            <div className="flex flex-col gap-2">
              {platformStats.map((stat) => (
                <PlatformBreakdown
                  key={stat.platform}
                  platform={stat.platform}
                  count={stat.count}
                  reach={stat.reach}
                  engagement={stat.engagement}
                />
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 text-[13.5px] font-extrabold tracking-tight text-foreground">
              List Summary
            </h2>
            <dl className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <dt className="text-[12.5px] text-muted-foreground">
                  Avg. reach per creator
                </dt>
                <dd className="text-[13.5px] font-bold text-foreground">
                  {formatCompactNumber(
                    Math.round(totalReach / selectedProfiles.length),
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <dt className="text-[12.5px] text-muted-foreground">
                  Avg. engagements per creator
                </dt>
                <dd className="text-[13.5px] font-bold text-foreground">
                  {formatCompactNumber(
                    Math.round(totalEngagements / selectedProfiles.length),
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <dt className="text-[12.5px] text-muted-foreground">
                  Highest engagement
                </dt>
                <dd className="text-[13.5px] font-bold text-success-foreground">
                  {getEngagementPercent(
                    topByEngagement[0]?.engagement_rate,
                  ).toFixed(1)}
                  %
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[12.5px] text-muted-foreground">
                  Est. campaign cost
                </dt>
                <dd className="text-[13.5px] font-bold text-accent-foreground">
                  ${formatCompactNumber(estCost)}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <section className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-[13.5px] font-extrabold tracking-tight text-foreground">
              Creator Performance
            </h2>
            <p className="text-[11.5px] text-muted-foreground">
              Detailed metrics for each saved influencer
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead className="border-b border-border bg-white/[0.025]">
                <tr>
                  {[
                    "Creator",
                    "Platform",
                    "Niche",
                    "Reach",
                    "Engagements",
                    "Eng. Rate",
                    "Score",
                  ].map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground first:pl-4 last:pr-4"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topByEngagement.map((profile) => {
                  const grade = getScoreGrade(profile.engagement_rate);
                  const niche = getNicheForProfile(profile);

                  return (
                    <tr
                      key={profile.user_id}
                      className="border-b border-border/70 last:border-b-0"
                    >
                      <td className="px-3.5 py-2.5 first:pl-4">
                        <div className="flex items-center gap-2.5">
                          <ProfileAvatar
                            profile={profile}
                            platform={profile.platform}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-bold text-foreground">
                              {profile.fullname}
                            </p>
                            <p className="truncate text-[11px] text-muted-foreground">
                              @{profile.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3.5 py-2.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold capitalize text-foreground">
                          <PlatformIcon
                            platform={profile.platform}
                            className="h-3 w-3"
                          />
                          {profile.platform}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 text-[12.5px] text-muted-foreground">
                        {niche}
                      </td>
                      <td className="px-3.5 py-2.5 text-[13px] font-bold text-foreground">
                        {formatCompactNumber(profile.followers)}
                      </td>
                      <td className="px-3.5 py-2.5 text-[13px] font-bold text-foreground">
                        {formatCompactNumber(profile.engagements ?? 0)}
                      </td>
                      <td className="px-3.5 py-2.5 text-[13px] font-bold text-success-foreground">
                        {getEngagementPercent(profile.engagement_rate).toFixed(
                          1,
                        )}
                        %
                      </td>
                      <td className="px-3.5 py-2.5 last:pr-4">
                        <span
                          className="text-[12px] font-extrabold"
                          style={{ color: getScoreColor(grade) }}
                        >
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
