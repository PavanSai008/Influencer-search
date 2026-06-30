import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950/5 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                to="/"
                className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                InfluenceHub
              </Link>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Discover creator profiles across Instagram, YouTube, and TikTok
                — then save the best ones to your list.
              </p>
            </div>
            {title ? (
              <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                {title}
              </div>
            ) : null}
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
