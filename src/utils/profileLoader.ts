import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type {
  FullUserProfile,
  ProfileDetailResponse,
  SearchData,
} from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

const searchDatas: SearchData[] = [
  instagramData as SearchData,
  youtubeData as SearchData,
  tiktokData as SearchData,
];

function findFallbackProfile(username: string): FullUserProfile | null {
  for (const data of searchDatas) {
    const account = data.accounts.find(
      (item) => item.account.user_profile.username === username
    );
    if (account) {
      return account.account.user_profile as FullUserProfile;
    }
  }
  return null;
}

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (loader) {
    const result = await loader();
    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  }

  const fallbackProfile = findFallbackProfile(username);
  if (!fallbackProfile) {
    return null;
  }

  return {
    cached: false,
    data: {
      success: true,
      user_profile: fallbackProfile,
    },
  };
}
