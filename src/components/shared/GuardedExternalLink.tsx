import * as React from "react";
import { isPlaceholder } from "@/lib/safe-link";

/**
 * Renders an external <a> link, or a disabled placeholder span when the URL
 * is still a `*_TBD` or `[VERIFY:]` value. Single source of truth for guarded
 * outbound links across the site.
 */
export function GuardedExternalLink({
  url,
  children,
  className,
  primary = false,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
}) {
  const disabled = isPlaceholder(url);
  if (disabled) {
    return (
      <span
        title="Link not yet configured"
        aria-disabled="true"
        className={`${className ?? ""} cursor-not-allowed opacity-50`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-primary={primary || undefined}
    >
      {children}
    </a>
  );
}
