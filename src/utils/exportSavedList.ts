import type { SelectedProfile } from "@/store/useSelectedProfilesStore";
import { getPlatformLabel } from "@/utils/dataHelpers";
import {
  getEngagementPercent,
  getNicheForProfile,
  getScoreGrade,
} from "@/utils/profileMetrics";

function escapeCsvField(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function downloadSavedListCsv(profiles: SelectedProfile[]): void {
  if (profiles.length === 0) return;

  const headers = [
    "Name",
    "Username",
    "Platform",
    "Niche",
    "Followers",
    "Engagements",
    "Engagement Rate",
    "Score",
    "URL",
  ];

  const rows = profiles.map((profile) => {
    const engagementPct = getEngagementPercent(profile.engagement_rate).toFixed(1);
    return [
      profile.fullname,
      profile.username,
      getPlatformLabel(profile.platform),
      getNicheForProfile(profile),
      profile.followers,
      profile.engagements ?? 0,
      `${engagementPct}%`,
      getScoreGrade(profile.engagement_rate),
      profile.url,
    ]
      .map(escapeCsvField)
      .join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `saved-influencers-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
