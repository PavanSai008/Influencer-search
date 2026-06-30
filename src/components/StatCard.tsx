import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

type StatVariant = "purple" | "green" | "orange" | "blue";

interface StatCardProps {
  variant: StatVariant;
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  trend?: "up" | "down";
}

const glowClasses: Record<StatVariant, string> = {
  purple: "bg-gradient-to-r from-primary to-accent-foreground",
  green: "bg-gradient-to-r from-success-foreground to-[#a7f3c0]",
  orange: "bg-gradient-to-r from-[#fb923c] to-[#fde68a]",
  blue: "bg-gradient-to-r from-[#38bdf8] to-[#a5f3fc]",
};

const iconBgClasses: Record<StatVariant, string> = {
  purple: "bg-primary/15 text-accent-foreground",
  green: "bg-success-foreground/12 text-success-foreground",
  orange: "bg-[#fb923c]/12 text-[#fb923c]",
  blue: "bg-[#38bdf8]/12 text-[#38bdf8]",
};

export function StatCard({
  variant,
  icon,
  label,
  value,
  change,
  trend = "up",
}: StatCardProps) {
  return (
    <div className="relative flex flex-1 flex-col gap-0.5 overflow-hidden rounded-lg border border-border bg-card p-3.5 pb-3">
      <div
        className={`absolute inset-x-0 top-0 h-0.5 rounded-t-lg ${glowClasses[variant]}`}
      />
      <div
        className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-md ${iconBgClasses[variant]}`}
      >
        {icon}
      </div>
      <p className="text-[11.5px] font-medium text-muted-foreground">{label}</p>
      <p className="text-2xl font-extrabold leading-tight tracking-tight text-foreground">
        {value}
      </p>
      <p
        className={`mt-1 flex items-center gap-0.5 text-[11px] font-semibold ${
          trend === "up" ? "text-success-foreground" : "text-destructive-foreground"
        }`}
      >
        <TrendingUp className="h-2.5 w-2.5" />
        {change}
      </p>
    </div>
  );
}
