interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px] text-accent-foreground"
      aria-label="Verified"
    >
      ✓
    </span>
  );
}
