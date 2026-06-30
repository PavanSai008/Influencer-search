import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import {
  formatCompactNumber,
  getEngagementPercent,
  getNicheForProfile,
  getRatingFromEngagement,
} from "@/utils/profileMetrics";
import { Star } from "lucide-react";
import { PlatformIcon } from "./PlatformIcon";
import { ProfileAvatar } from "./ProfileAvatar";

interface CreatorCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

const platformBadgeClasses: Record<Platform, string> = {
  instagram: "bg-[#e1306c]",
  youtube: "bg-[#ff0000]",
  tiktok: "bg-[#111]",
};

export function CreatorCard({ profile, platform }: CreatorCardProps) {
  const navigate = useNavigate();
  const niche = getNicheForProfile(profile);
  const engagementPct = getEngagementPercent(profile.engagement_rate);
  const rating = getRatingFromEngagement(profile.engagement_rate);
  const engagements = profile.engagements ?? 0;

  const handleViewProfile = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ProfileAvatar
          profile={profile}
          platform={platform}
          className="h-full w-full object-cover"
          alt={profile.fullname}
        />
        <div
          className={`absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-md ${platformBadgeClasses[platform]}`}
        >
          <PlatformIcon platform={platform} className="h-3 w-3 text-white" />
        </div>
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-0.5 rounded-full bg-primary/90 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
          <Star className="h-2.5 w-2.5 fill-white" />
          {rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="truncate text-[13.5px] font-bold tracking-tight text-foreground">
          {profile.fullname}
        </h3>
        <p className="truncate text-[11.5px] text-muted-foreground">
          @{profile.username}
        </p>
        <p className="mt-0.5 text-[10.5px] text-muted-foreground">{niche}</p>

        <dl className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3">
          <div className="flex items-center justify-between text-[11.5px]">
            <dt className="text-muted-foreground">Reach</dt>
            <dd className="font-bold text-foreground">
              {formatCompactNumber(profile.followers)}
            </dd>
          </div>
          <div className="flex items-center justify-between text-[11.5px]">
            <dt className="text-muted-foreground">Engagement Rate</dt>
            <dd className="font-bold text-success-foreground">
              {engagementPct.toFixed(1)}%
            </dd>
          </div>
          <div className="flex items-center justify-between text-[11.5px]">
            <dt className="text-muted-foreground">Engagements</dt>
            <dd className="font-bold text-foreground">
              {formatCompactNumber(engagements)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={handleViewProfile}
          className="mt-3 w-full rounded-lg bg-primary/15 py-2 text-[12.5px] font-bold text-accent-foreground transition hover:bg-primary/25"
        >
          View Profile
        </button>
      </div>
    </article>
  );
}
