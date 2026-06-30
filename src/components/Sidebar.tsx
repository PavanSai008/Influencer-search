import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart2,
  Bookmark,
  Megaphone,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}

function NavItem({ to, icon, label, active, badge }: NavItemProps) {
  const className = `flex items-center gap-2.5 px-[18px] py-2 text-[13.5px] font-medium cursor-pointer relative ${
    active
      ? "bg-gradient-to-r from-primary/18 to-transparent text-accent-foreground border-l-2 border-primary pl-4"
      : "text-sidebar-foreground"
  }`;

  return (
    <Link
      to={to}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center">
        {icon}
      </span>
      {label}
      {badge ? (
        <span className="ml-auto rounded-full bg-primary/25 px-1.5 py-px text-[10px] font-bold text-accent-foreground">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

function NavSection({ label }: { label: string }) {
  return (
    <p className="mt-2.5 px-[18px] pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      {label}
    </p>
  );
}

export function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside
      className="hidden w-[228px] shrink-0 flex-col border-r border-border bg-sidebar py-5 lg:flex"
      aria-label="Main navigation"
    >
      <NavSection label="Discover" />
      <NavItem
        to="/"
        active={path === "/"}
        icon={
          <Search
            className={`h-3.5 w-3.5 ${path === "/" ? "text-accent-foreground" : ""}`}
          />
        }
        label="Influencer Search"
      />
      <NavItem
        to="/trending"
        active={path === "/trending"}
        icon={<TrendingUp className="h-3.5 w-3.5" />}
        label="Trending"
        badge="Hot"
      />
      <NavItem
        to="/ai-suggestions"
        active={path === "/ai-suggestions"}
        icon={<Sparkles className="h-3.5 w-3.5" />}
        label="AI Suggestions"
      />

      <NavSection label="Campaigns" />
      <NavItem
        to="/active-campaigns"
        active={path === "/active-campaigns"}
        icon={<Megaphone className="h-3.5 w-3.5" />}
        label="Active Campaigns"
      />
      <NavItem
        to="/analytics"
        active={path === "/analytics"}
        icon={<BarChart2 className="h-3.5 w-3.5" />}
        label="Analytics"
      />
      <NavItem
        to="/saved-list"
        active={path === "/saved-list"}
        icon={<Bookmark className="h-3.5 w-3.5" />}
        label="Saved Lists"
      />
    </aside>
  );
}
