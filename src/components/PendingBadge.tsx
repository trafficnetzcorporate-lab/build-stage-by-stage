import { cn } from "@/lib/utils";

export function PendingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "ml-2 inline-flex items-center rounded-full border border-gold/40 bg-gold-soft/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy",
        className,
      )}
      title="This value has not been verified and must be confirmed before launch."
    >
      Pending verification
    </span>
  );
}
