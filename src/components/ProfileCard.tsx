import { useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addProfile = useSelectedProfilesStore((state) => state.addProfile);
  const isSelected = useSelectedProfilesStore((state) =>
    state.isSelected(profile.username),
  );

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isSelected) return;

    addProfile({
      ...profile,
      platform,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="h-16 w-16 flex-shrink-0 rounded-3xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-slate-900">
            <span className="truncate">@{profile.username}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <p className="mt-1 truncate text-sm text-slate-500">
            {profile.fullname}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              {formatFollowersLocal(profile.followers)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1 uppercase tracking-wide text-slate-600">
              {platform}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className={`h-11 rounded-full px-5 text-sm font-semibold transition ${
            isSelected
              ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-slate-950 text-white hover:bg-slate-800"
          }`}
        >
          {isSelected ? "Added" : "Add to List"}
        </button>
      </div>
    </div>
  );
}
