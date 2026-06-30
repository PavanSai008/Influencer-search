import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { SavedListPanel } from "@/components/SavedListPanel";
import { Topbar } from "@/components/Topbar";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import {
  formatCompactNumber,
  getEngagementLevel,
  getScoreGrade,
} from "@/utils/profileMetrics";
import {
  ArrowLeft,
  BookmarkCheck,
  BookmarkPlus,
  ExternalLink,
} from "lucide-react";

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

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") || "instagram") as Platform;
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);
  const addProfile = useSelectedProfilesStore((state) => state.addProfile);
  const isSelected = useSelectedProfilesStore((state) =>
    profileData
      ? state.isSelected(profileData.data.user_profile.username)
      : false,
  );

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  const topbar = (
    <Topbar
      title={username ? `@${username}` : "Profile"}
      children={
        <Link
          to="/"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-[13px] font-medium text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Back to search</span>
        </Link>
      }
    />
  );

  if (!username) {
    return (
      <DashboardLayout topbar={topbar}>
        <div className="p-8">
          <p>Invalid profile</p>
          <Link to="/" className="text-accent-foreground underline">
            Back
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (!loaded) {
    return (
      <DashboardLayout topbar={topbar}>
        <div className="p-8 text-muted-foreground">Loading profile…</div>
      </DashboardLayout>
    );
  }

  if (!profileData) {
    return (
      <DashboardLayout topbar={topbar}>
        <div className="p-8">
          <p className="mb-4 text-destructive-foreground">
            Could not load profile details for {username}
          </p>
          <Link to="/" className="text-accent-foreground underline">
            Back to search
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const grade = getScoreGrade(user.engagement_rate);
  const engagementLevel = getEngagementLevel(user.engagement_rate);
  const engagementPct =
    user.engagement_rate !== undefined ? user.engagement_rate * 100 : 0;

  return (
    <DashboardLayout topbar={topbar}>
      <div className="flex flex-1 overflow-hidden">
        <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-[22px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr]">
            <section className="rounded-lg border border-border bg-card p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="relative shrink-0">
                  <ProfileAvatar
                    profile={user}
                    platform={platform}
                    className="h-32 w-32 rounded-2xl object-cover"
                  />
                  <span
                    className={`absolute -bottom-2 -right-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-extrabold ${scoreBadgeClasses[grade]}`}
                  >
                    {grade}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Profile
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                      @{user.username}
                    </h1>
                    <VerifiedBadge verified={user.is_verified} />
                  </div>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    {user.fullname}
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {platform}
                  </span>

                  {user.description ? (
                    <p className="mt-5 max-w-2xl text-sm leading-6 text-secondary-foreground">
                      {user.description}
                    </p>
                  ) : null}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-border bg-secondary p-4">
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="mt-1 text-2xl font-extrabold text-foreground">
                        {formatCompactNumber(user.followers)}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary p-4">
                      <p className="text-xs text-muted-foreground">
                        Engagement Rate
                      </p>
                      <p
                        className={`mt-1 text-2xl font-extrabold ${engagementPctClasses[engagementLevel]}`}
                      >
                        {formatEngagementRate(user.engagement_rate)}
                      </p>
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className={`h-full rounded-full ${engagementFillClasses[engagementLevel]}`}
                          style={{ width: `${Math.min(95, engagementPct * 12)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        addProfile({ ...user, platform })
                      }
                      disabled={isSelected}
                      className={`flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold ${
                        isSelected
                          ? "border border-success-foreground/22 bg-success-foreground/12 text-success-foreground"
                          : "bg-gradient-to-br from-primary to-primary-light text-white"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <BookmarkCheck className="h-4 w-4" />
                          Saved to list
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="h-4 w-4" />
                          Save to List
                        </>
                      )}
                    </button>
                    {user.url ? (
                      <a
                        href={user.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on platform
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Stats
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {user.posts_count !== undefined && (
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-xs text-muted-foreground">Posts</p>
                      <p className="mt-1 text-xl font-extrabold text-foreground">
                        {user.posts_count.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {user.avg_likes !== undefined && (
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-xs text-muted-foreground">Avg Likes</p>
                      <p className="mt-1 text-xl font-extrabold text-foreground">
                        {formatCompactNumber(user.avg_likes)}
                      </p>
                    </div>
                  )}
                  {user.avg_comments !== undefined && (
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-xs text-muted-foreground">
                        Avg Comments
                      </p>
                      <p className="mt-1 text-xl font-extrabold text-foreground">
                        {user.avg_comments}
                      </p>
                    </div>
                  )}
                  {user.avg_views !== undefined && user.avg_views > 0 && (
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-xs text-muted-foreground">Avg Views</p>
                      <p className="mt-1 text-xl font-extrabold text-foreground">
                        {formatCompactNumber(user.avg_views)}
                      </p>
                    </div>
                  )}
                  {user.engagements !== undefined && (
                    <div className="rounded-lg bg-secondary p-4 sm:col-span-2">
                      <p className="text-xs text-muted-foreground">
                        Engagements
                      </p>
                      <p className="mt-1 text-xl font-extrabold text-foreground">
                        {formatCompactNumber(user.engagements)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-secondary p-5 text-sm text-secondary-foreground">
                <p className="font-bold text-foreground">Profile Info</p>
                <p className="mt-2">Platform: {platform}</p>
                <p className="mt-1">Username: @{user.username}</p>
              </div>
            </aside>
          </div>
        </div>

        <SavedListPanel />
      </div>
    </DashboardLayout>
  );
}
