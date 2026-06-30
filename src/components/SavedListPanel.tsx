import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import { downloadSavedListCsv } from "@/utils/exportSavedList";
import {
  computeAvgEngagement,
  computeTotalReach,
  formatCompactNumber,
  getScoreColor,
  getScoreGrade,
} from "@/utils/profileMetrics";
import {
  Bookmark,
  FileDown,
  Folder,
  Rocket,
  Send,
  Share2,
  Users,
  X,
} from "lucide-react";
import { PlatformIcon } from "./PlatformIcon";
import { ProfileAvatar } from "./ProfileAvatar";

interface SavedListPanelProps {
  variant?: "sidebar" | "inline";
}

export function SavedListPanel({ variant = "sidebar" }: SavedListPanelProps) {
  const selectedProfiles = useSelectedProfilesStore((s) => s.selectedProfiles);
  const removeProfile = useSelectedProfilesStore((s) => s.removeProfile);

  const totalReach = computeTotalReach(selectedProfiles);
  const avgEngagement = computeAvgEngagement(selectedProfiles);
  const estCost = selectedProfiles.length * 8400;

  const handleExportCsv = () => {
    downloadSavedListCsv(selectedProfiles);
  };

  return (
    <aside
      className={`${
        variant === "sidebar"
          ? "hidden w-[308px] shrink-0 flex-col border-l border-border xl:flex"
          : "flex w-full flex-col rounded-lg border border-border xl:hidden"
      } bg-sidebar px-[18px] py-[22px]`}
      aria-label="Saved influencers"
    >
      <div className="mb-0.5 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
          <Bookmark className="h-3.5 w-3.5 text-accent-foreground" />
        </div>
        <h2 className="text-sm font-extrabold tracking-tight text-foreground">
          Saved to List
        </h2>
        <span className="rounded-full bg-gradient-to-br from-primary to-primary-light px-2 py-px text-[11px] font-extrabold text-white">
          {selectedProfiles.length}
        </span>
      </div>
      <p className="mb-3.5 text-[11.5px] text-muted-foreground">
        Your current influencer shortlist
      </p>

      {selectedProfiles.length > 0 ? (
        <>
          <div className="relative mb-3.5 overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-accent to-[#100d38] p-3.5">
            <div className="absolute -right-7 -top-7 h-20 w-20 rounded-full bg-primary/20" />
            <div className="relative flex items-center gap-1 text-[10.5px] font-semibold text-[#9d8eee]">
              <Folder className="h-2.5 w-2.5" />
              Summer Launch 2025
            </div>
            <p className="relative mt-1 text-[11px] font-semibold text-[#c4b8ff]">
              Est. Combined Reach
            </p>
            <p className="relative text-[26px] font-extrabold leading-tight tracking-tight text-white">
              {formatCompactNumber(totalReach)}
            </p>
            <div className="relative mt-2.5 flex border-t border-primary/20 pt-2.5">
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-[#9d8eee]">
                  Avg. Eng.
                </span>
                <span className="text-sm font-extrabold text-[#e2daff]">
                  {avgEngagement.toFixed(1)}%
                </span>
              </div>
              <div className="ml-2.5 flex flex-1 flex-col gap-0.5 border-l border-primary/20 pl-2.5">
                <span className="text-[10px] font-semibold text-[#9d8eee]">
                  Est. Cost
                </span>
                <span className="text-sm font-extrabold text-[#e2daff]">
                  ${formatCompactNumber(estCost)}
                </span>
              </div>
              <div className="ml-2.5 flex flex-1 flex-col gap-0.5 border-l border-primary/20 pl-2.5">
                <span className="text-[10px] font-semibold text-[#9d8eee]">
                  Creators
                </span>
                <span className="text-sm font-extrabold text-[#e2daff]">
                  {selectedProfiles.length}
                </span>
              </div>
            </div>
          </div>

          <ul className="mb-3.5 flex flex-col gap-1.5" aria-label="Saved creators">
            {selectedProfiles.map((profile) => {
              const grade = getScoreGrade(profile.engagement_rate);

              return (
                <li
                  key={profile.user_id}
                  className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-2.5"
                >
                  <div className="relative shrink-0">
                    <ProfileAvatar
                      profile={profile}
                      platform={profile.platform}
                      className="h-[34px] w-[34px] rounded-full object-cover"
                    />
                    <div className="absolute -bottom-px -right-px flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.5px] border-card bg-[#e1306c]">
                      <PlatformIcon
                        platform={profile.platform}
                        className="h-[7px] w-[7px] text-white"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p
                      className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-bold text-foreground"
                      title={profile.fullname}
                    >
                      {profile.fullname}
                    </p>
                    <span className="mt-0.5 inline-flex items-center gap-0.5 rounded-full bg-white/5 px-1.5 py-px text-[10px] font-semibold text-muted-foreground">
                      <Users className="h-2 w-2" />
                      {formatCompactNumber(profile.followers)}
                    </span>
                  </div>
                  <span
                    className="shrink-0 pr-0.5 text-[11px] font-extrabold"
                    style={{ color: getScoreColor(grade) }}
                  >
                    {grade}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProfile(profile.username)}
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-white/5 text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${profile.fullname} from list`}
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="mb-3.5 rounded-lg border border-dashed border-border p-4 text-[11.5px] text-muted-foreground">
          Add creators from the table to build your shortlist.
        </div>
      )}

      <div className="mt-auto h-px bg-border" />

      <p className="mb-2 mt-3 flex items-center gap-1 text-[11.5px] text-muted-foreground">
        <Rocket className="h-3 w-3 text-accent-foreground" />
        Ready to launch your campaign?
      </p>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-light py-2.5 text-[13px] font-extrabold tracking-tight text-white"
      >
        <Send className="h-3.5 w-3.5" />
        Start Outreach Campaign
      </button>
      <div className="mt-1.5 flex gap-1.5">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-secondary py-2 text-xs font-semibold text-foreground"
        >
          <Share2 className="h-3 w-3 text-muted-foreground" />
          Share List
        </button>
        <button
          type="button"
          onClick={handleExportCsv}
          disabled={selectedProfiles.length === 0}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-secondary py-2 text-xs font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FileDown className="h-3 w-3 text-muted-foreground" />
          Export CSV
        </button>
      </div>
    </aside>
  );
}
