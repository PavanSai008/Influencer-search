import type { Platform, UserProfileSummary } from "@/types";

function getProfileIdentifier(profile: UserProfileSummary): string {
  return profile.handle ?? profile.username ?? profile.user_id;
}

export function getDicebearFallback(profile: UserProfileSummary): string {
  const seed = profile.fullname || getProfileIdentifier(profile);
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1e1852,111622&textColor=a89eff`;
}

export function getYouTubeAvatarUrl(profile: UserProfileSummary): string {
  return `https://unavatar.io/youtube/${encodeURIComponent(getProfileIdentifier(profile))}`;
}

export function resolveProfilePicture(
  profile: UserProfileSummary,
  platform?: Platform,
): string {
  if (platform === "youtube") {
    return getYouTubeAvatarUrl(profile);
  }

  if (profile.picture) {
    return profile.picture;
  }

  return getDicebearFallback(profile);
}

export function getProfilePictureFallback(
  profile: UserProfileSummary,
  platform?: Platform,
): string {
  if (platform === "youtube") {
    return getDicebearFallback(profile);
  }

  if (profile.picture) {
    return getYouTubeAvatarUrl(profile);
  }

  return getDicebearFallback(profile);
}
