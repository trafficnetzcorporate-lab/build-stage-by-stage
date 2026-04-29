import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { NAV_LINKS, SITE } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-cream/95 shadow-sm backdrop-blur" : "bg-transparent",
      )}
    >
      <Container size="wide" className="flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-medium tracking-tight text-navy md:text-2xl">
            Nancy Clarke
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-widest text-gold sm:inline">
            Realtor
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-navy/80 transition-colors hover:text-navy"
              activeProps={{ className: "text-navy font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-navy-deep"
          >
            <Phone size={16} />
            {SITE.phone}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-navy/10 bg-cream lg:hidden">
          <Container size="wide" className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-navy hover:bg-cream-deep"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-4 py-3 text-base font-medium text-cream"
            >
              <Phone size={18} />
              {SITE.phone}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
