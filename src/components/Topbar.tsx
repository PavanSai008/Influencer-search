import type { ReactNode } from "react";
import { Bell, Plus, Search, SlidersHorizontal } from "lucide-react";

interface TopbarProps {
  title: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  children?: ReactNode;
}

export function Topbar({
  title,
  searchQuery = "",
  onSearchChange,
  children,
}: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-[rgba(6,8,16,0.95)] px-4 sm:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <h1 className="truncate text-lg font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        <div className="hidden items-center gap-1.5 rounded-full bg-success-foreground/12 px-2.5 py-1 text-[11px] font-bold text-success-foreground sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success-foreground" />
          Live Data
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {onSearchChange ? (
          <label className="relative hidden w-[230px] items-center gap-2 rounded-lg border border-border bg-secondary px-3.5 py-2 md:flex">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, niche, platform…"
              className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="Search influencers"
            />
          </label>
        ) : null}

        {children}

        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-lg border border-border bg-secondary px-3.5 py-1.5 text-[13px] font-medium text-foreground sm:flex"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>

        <button
          type="button"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full border-[1.5px] border-sidebar bg-warning-foreground" />
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-primary to-primary-light px-4 py-2 text-[13px] font-bold text-white"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Campaign</span>
        </button>
      </div>
    </header>
  );
}
