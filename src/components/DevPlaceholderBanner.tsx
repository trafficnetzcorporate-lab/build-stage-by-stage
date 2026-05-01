import * as React from "react";
import { isPlaceholder } from "@/lib/safe-link";
import { MORTGAGE_PARTNERS } from "@/content/site";

type Finding = { key: string; value: string };

function collect(): Finding[] {
  const findings: Finding[] = [];
  MORTGAGE_PARTNERS.forEach((p, i) => {
    (["address", "phone", "nmls"] as const).forEach((field) => {
      const v = p[field];
      if (isPlaceholder(v))
        findings.push({ key: `MORTGAGE_PARTNERS[${i}].${field} (${p.name})`, value: v });
    });
    if ((p as { logoPlaceholder?: boolean }).logoPlaceholder) {
      findings.push({
        key: `MORTGAGE_PARTNERS[${i}].logo (${p.name})`,
        value: "awaiting real logo upload",
      });
    }
  });
  return findings;
}

/** Dev-only fixed banner listing unresolved placeholders. Tree-shaken in prod. */
export function DevPlaceholderBanner() {
  const [dismissed, setDismissed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const findings = React.useMemo(collect, []);

  React.useEffect(() => {
    setMounted(true);
    if (typeof sessionStorage !== "undefined") {
      setDismissed(sessionStorage.getItem("dev_placeholder_dismissed") === "1");
    }
  }, []);

  if (!mounted || dismissed || findings.length === 0) return null;

  return (
    <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-[9999] border-t-2 border-amber-500 bg-amber-100/95 text-navy shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-2 text-xs">
        <span className="mt-0.5 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Dev
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-semibold">
            {findings.length} placeholder value{findings.length === 1 ? "" : "s"} still in config
          </div>
          <ul className="mt-1 max-h-32 overflow-y-auto font-mono text-[11px] leading-snug">
            {findings.map((f) => (
              <li key={f.key} className="truncate">
                <span className="text-amber-900">{f.key}</span>: {f.value}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem("dev_placeholder_dismissed", "1");
            setDismissed(true);
          }}
          className="shrink-0 rounded border border-navy/30 px-2 py-1 text-[11px] font-medium hover:bg-navy hover:text-cream"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
