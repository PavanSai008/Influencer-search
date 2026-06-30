import type { UserProfileSummary } from "@/types";

export type Niche =
  | "Lifestyle"
  | "Fitness"
  | "Tech"
  | "Beauty"
  | "Food"
  | "Travel"
  | "Gaming"
  | "Finance";

export type EngagementLevel = "high" | "mid" | "low";
export type ScoreGrade = "A+" | "A" | "B+" | "B" | "C+";
export type ScoreRing = "a" | "b" | "c";

const NICHES: Niche[] = [
  "Lifestyle",
  "Fitness",
  "Tech",
  "Beauty",
  "Food",
  "Travel",
  "Gaming",
  "Finance",
];

export function getNicheForProfile(profile: UserProfileSummary): Niche {
  const key = profile.username ?? profile.handle ?? profile.user_id ?? "";
  const hash =
    key.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % NICHES.length;
  return NICHES[hash];
}

export function getEngagementPercent(rate: number | undefined): number {
  if (rate === undefined) return 0;
  return rate * 100;
}

export function getEngagementLevel(rate: number | undefined): EngagementLevel {
  const pct = getEngagementPercent(rate);
  if (pct >= 5) return "high";
  if (pct >= 3) return "mid";
  return "low";
}

export function getEngagementLabel(level: EngagementLevel): string {
  if (level === "high") return "High";
  if (level === "mid") return "Good";
  return "Low";
}

export function getEngagementBarWidth(rate: number | undefined): number {
  const pct = getEngagementPercent(rate);
  return Math.min(95, Math.max(20, pct * 12));
}

export function getScoreGrade(rate: number | undefined): ScoreGrade {
  const pct = getEngagementPercent(rate);
  if (pct >= 6) return "A+";
  if (pct >= 4.5) return "A";
  if (pct >= 3.5) return "B+";
  if (pct >= 2.5) return "B";
  return "C+";
}

export function getScoreRing(grade: ScoreGrade): ScoreRing {
  if (grade === "A+" || grade === "A") return "a";
  if (grade === "B+" || grade === "B") return "b";
  return "c";
}

export function getScoreColor(grade: ScoreGrade): string {
  if (grade === "A+" || grade === "A") return "#34d474";
  if (grade === "B+" || grade === "B") return "#a89eff";
  return "#f5b942";
}

export function formatCompactNumber(count: number): string {
  if (count >= 1_000_000_000) {
    return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(0) + "K";
  }
  return String(count);
}

export function formatRowNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function computeAvgEngagement(profiles: UserProfileSummary[]): number {
  if (profiles.length === 0) return 0;
  const sum = profiles.reduce(
    (acc, p) => acc + getEngagementPercent(p.engagement_rate),
    0,
  );
  return sum / profiles.length;
}

export function computeTotalReach(profiles: UserProfileSummary[]): number {
  return profiles.reduce((acc, p) => acc + p.followers, 0);
}

export function computeTotalEngagements(profiles: UserProfileSummary[]): number {
  return profiles.reduce((acc, p) => acc + (p.engagements ?? 0), 0);
}

export function getRatingFromEngagement(rate: number | undefined): string {
  const pct = getEngagementPercent(rate);
  const rating = Math.min(5, Math.max(3.5, 3.2 + pct / 2.5));
  return rating.toFixed(1);
}

export const nicheStyles: Record<
  Niche,
  { bg: string; text: string }
> = {
  Lifestyle: { bg: "rgba(108, 92, 231, 0.18)", text: "#a89eff" },
  Fitness: { bg: "rgba(52, 212, 116, 0.14)", text: "#34d474" },
  Tech: { bg: "rgba(56, 189, 248, 0.14)", text: "#38bdf8" },
  Beauty: { bg: "rgba(244, 114, 182, 0.14)", text: "#f472b6" },
  Food: { bg: "rgba(251, 146, 60, 0.14)", text: "#fb923c" },
  Travel: { bg: "rgba(45, 212, 191, 0.14)", text: "#2dd4bf" },
  Gaming: { bg: "rgba(192, 132, 252, 0.14)", text: "#c084fc" },
  Finance: { bg: "rgba(134, 239, 172, 0.14)", text: "#86efac" },
};
