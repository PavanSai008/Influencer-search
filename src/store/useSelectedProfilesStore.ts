import { create } from "zustand";
import type { Platform, UserProfileSummary } from "@/types";

export interface SelectedProfile extends UserProfileSummary {
  platform: Platform;
}

interface SelectedProfilesState {
  selectedProfiles: SelectedProfile[];
  addProfile: (profile: SelectedProfile) => void;
  removeProfile: (username: string) => void;
  isSelected: (username: string) => boolean;
}

const STORAGE_KEY = "wobb-selected-profiles";

function loadSelectedProfiles(): SelectedProfile[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SelectedProfile[];
  } catch {
    return [];
  }
}

function saveSelectedProfiles(profiles: SelectedProfile[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export const useSelectedProfilesStore = create<SelectedProfilesState>(
  (set, get) => ({
    selectedProfiles: loadSelectedProfiles(),
    addProfile: (profile: SelectedProfile) => {
      const current = get();
      const exists = current.selectedProfiles.some(
        (item) => item.username === profile.username,
      );
      if (exists) return;

      const nextProfiles = [...current.selectedProfiles, profile];
      saveSelectedProfiles(nextProfiles);
      set({ selectedProfiles: nextProfiles });
    },
    removeProfile: (username: string) => {
      const current = get();
      const nextProfiles = current.selectedProfiles.filter(
        (profile) => profile.username !== username,
      );
      saveSelectedProfiles(nextProfiles);
      set({ selectedProfiles: nextProfiles });
    },
    isSelected: (username: string) =>
      get().selectedProfiles.some((profile) => profile.username === username),
  }),
);
