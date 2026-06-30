import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="space-y-4">
      {profiles.length === 0 ? (
        <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-500">
          No profiles found. Try another search or switch platform.
        </div>
      ) : (
        profiles.map((profile) => (
          <ProfileCard
            key={profile.user_id}
            profile={profile}
            platform={platform}
            searchQuery={searchQuery}
            onProfileClick={onProfileClick}
          />
        ))
      )}
    </div>
  );
}
