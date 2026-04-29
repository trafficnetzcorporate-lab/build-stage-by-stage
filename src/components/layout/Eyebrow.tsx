import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "gold" | "cream" | "navy";
  children: React.ReactNode;
}

/** Decorative rule + uppercase tracked label. Never include a leading em-dash in the text. */
export function Eyebrow({ className, tone = "gold", children, ...props }: EyebrowProps) {
  const ruleColor =
    tone === "cream" ? "bg-cream/70" : tone === "navy" ? "bg-navy" : "bg-gold";
  const textColor =
    tone === "cream" ? "text-cream/80" : tone === "navy" ? "text-navy" : "text-gold";
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <span className={cn("h-px w-8", ruleColor)} aria-hidden="true" />
      <span className={cn("text-eyebrow", textColor)}>{children}</span>
    </div>
  );
}
