import * as React from "react";
import { cn } from "@/lib/utils";

interface FadeInOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

/**
 * Renders content visible by default and runs a one-shot fade-in on mount via CSS.
 * Previously gated visibility on IntersectionObserver, which left content
 * permanently hidden in some iframe / hydration scenarios.
 */
export function FadeInOnScroll({
  className,
  delay = 0,
  style,
  children,
  ...props
}: FadeInOnScrollProps) {
  return (
    <div
      className={cn("animate-fade-in-up motion-reduce:animate-none", className)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
