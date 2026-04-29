import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "cream" | "white" | "navy" | "cream-deep";
  size?: "default" | "lg" | "sm";
}

export function Section({
  className,
  tone = "cream",
  size = "default",
  ...props
}: SectionProps) {
  const bg =
    tone === "navy"
      ? "bg-navy text-cream"
      : tone === "white"
        ? "bg-white text-navy"
        : tone === "cream-deep"
          ? "bg-cream-deep text-navy"
          : "bg-cream text-navy";
  const padding =
    size === "lg" ? "py-24 md:py-32" : size === "sm" ? "py-12 md:py-16" : "py-16 md:py-24";
  return <section className={cn(bg, padding, className)} {...props} />;
}
