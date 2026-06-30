import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function normalizeProfile(
  profile: UserProfileSummary,
): UserProfileSummary {
  return {
    ...profile,
    username:
      profile.username ??
      profile.handle ??
      profile.user_id,
  };
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) =>
    normalizeProfile(item.account.user_profile),
  );
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return profiles;

  return profiles.filter((p) => {
    const username = (p.username ?? p.handle ?? p.user_id).toLowerCase();
    const fullname = p.fullname.toLowerCase();

    const matchUsername = username.includes(normalizedQuery);
    const matchFullname = fullname.includes(normalizedQuery);
    return matchUsername || matchFullname;
  });
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}

export interface ProfileWithPlatform extends UserProfileSummary {
  platform: Platform;
}

export function getTopByEngagement(
  platform: Platform,
  limit = 3,
): UserProfileSummary[] {
  return [...extractProfiles(platform)]
    .sort(
      (a, b) =>
        (b.engagement_rate ?? 0) - (a.engagement_rate ?? 0) ||
        (b.engagements ?? 0) - (a.engagements ?? 0),
    )
    .slice(0, limit);
}

export function getTrendingProfiles(
  limitPerPlatform = 3,
): ProfileWithPlatform[] {
  return PLATFORMS.flatMap((platform) =>
    getTopByEngagement(platform, limitPerPlatform).map((profile) => ({
      ...profile,
      platform,
    })),
  ).sort(
    (a, b) =>
      (b.engagement_rate ?? 0) - (a.engagement_rate ?? 0) ||
      (b.engagements ?? 0) - (a.engagements ?? 0),
  );
}
