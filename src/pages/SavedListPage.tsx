import { Link } from "react-router-dom";
import { CreatorCard } from "@/components/CreatorCard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Topbar } from "@/components/Topbar";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import { Bookmark, Search } from "lucide-react";

export function SavedListPage() {
  const selectedProfiles = useSelectedProfilesStore((s) => s.selectedProfiles);

  return (
    <DashboardLayout
      topbar={({ onMenuClick }) => (
        <Topbar title="Saved Lists" showHome onMenuClick={onMenuClick} />
      )}
    >
      <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-[22px]">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-foreground">
              Top Performing Creators
            </h2>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">
              Your saved influencer shortlist
            </p>
          </div>
          <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-bold text-accent-foreground">
            {selectedProfiles.length} saved
          </span>
        </div>

        {selectedProfiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {selectedProfiles.map((profile) => (
              <CreatorCard
                key={profile.user_id}
                profile={profile}
                platform={profile.platform}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card px-8 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <Bookmark className="h-5 w-5 text-accent-foreground" />
            </div>
            <p className="text-base font-bold text-foreground">
              No saved creators yet
            </p>
            <p className="mt-2 text-[13px] text-muted-foreground">
              Save influencers from search or trending to see them here.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-light px-4 py-2 text-[13px] font-bold text-white"
            >
              <Search className="h-3.5 w-3.5" />
              Browse Influencers
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
