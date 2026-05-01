import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lock } from "lucide-react";

type Tone = "neutral" | "gold" | "success" | "muted";

interface StatusPillProps {
  tone: Tone;
  icon?: "check" | "lock" | "none";
  children: React.ReactNode;
  className?: string;
}

export function StatusPill({ tone, icon = "none", children, className }: StatusPillProps) {
  const styles =
    tone === "success"
      ? "bg-success/10 text-success border-success/30"
      : tone === "gold"
        ? "bg-gold/10 text-navy border-gold/40"
        : tone === "muted"
          ? "bg-muted text-muted-foreground border-border"
          : "bg-cream-deep text-navy border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        styles,
        className,
      )}
    >
      {icon === "check" ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : null}
      {icon === "lock" ? <Lock className="h-3.5 w-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}
