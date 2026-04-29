import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({ className, size = "default", ...props }: ContainerProps) {
  const max = size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return <div className={cn("mx-auto w-full px-6 md:px-8", max, className)} {...props} />;
}
