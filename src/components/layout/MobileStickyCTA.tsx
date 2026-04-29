import { Phone, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SITE } from "@/content/site";

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-cream/95 p-3 shadow-[0_-4px_16px_rgba(20,33,61,0.08)] backdrop-blur lg:hidden">
      <div className="flex gap-2">
        <a
          href={SITE.phoneHref}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-4 py-3 text-sm font-semibold text-navy"
        >
          <Phone size={18} />
          Call Nancy
        </a>
        <Link
          to="/realtors"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-semibold text-white"
        >
          Partner With Me
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
