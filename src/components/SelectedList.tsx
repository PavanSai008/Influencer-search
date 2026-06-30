import { VerifiedBadge } from "./VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

export function SelectedList() {
  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles,
  );
  const removeProfile = useSelectedProfilesStore(
    (state) => state.removeProfile,
  );

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-black">Saved creators</h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep the profiles you want to compare later.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {selectedProfiles.length}
        </div>
      </div>

      {selectedProfiles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-left text-sm text-slate-500">
          Add creators from the list to save them for later review.
        </div>
      ) : (
        <div className="space-y-4">
          {selectedProfiles.map((profile) => (
            <div
              key={profile.user_id}
              className="flex items-center gap-3 rounded-3xl border border-slate-100 bg-slate-50 p-4"
            >
              <img
                src={profile.picture}
                alt={profile.fullname}
                className="h-14 w-14 rounded-3xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 truncate">
                  @{profile.username}
                  <VerifiedBadge verified={profile.is_verified} />
                </div>
                <p className="truncate text-sm text-slate-500">
                  {profile.fullname}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  {profile.platform}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeProfile(profile.username)}
                className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
