import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl bg-white p-3 shadow-sm shadow-slate-200/70">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              selected === p
                ? "bg-slate-950 text-white shadow-sm shadow-slate-900/10"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-4 max-w-2xl">
        <label className="relative block">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search creators by username or full name"
            className="w-full rounded-3xl border border-slate-200 bg-white px-12 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </label>
      </div>
    </div>
  );
}
