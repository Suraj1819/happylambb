import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/maybe_header')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/maybe_header"!</div>
}
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import logo from "@/assets/brands/hello-modified.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/clients", label: "Clients" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-border/50 bg-background/85 backdrop-blur-xl shadow-sm dark:border-zinc-800 dark:bg-zinc-950/85"
            : "bg-background/60 backdrop-blur-md dark:bg-zinc-950/60"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:h-[4.5rem] sm:px-10">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-9 w-9">
              <img
                src={logo}
                alt="HappyLamb Production"
                width={36}
                height={36}
                className="h-9 w-9 bg-transparent object-contain mix-blend-multiply dark:mix-blend-screen transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="leading-none">
              <span className="block font-medium text-lg tracking-tight text-foreground sm:text-xl dark:text-white">
                HappyLamb
              </span>
              <span className="block text-[0.55rem] tracking-[0.35em] text-muted-foreground dark:text-zinc-400 uppercase mt-0.5">
                Production
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ 
                  className: "text-foreground dark:text-white after:w-4/5 after:bg-foreground dark:after:bg-white" 
                }}
                className="relative px-4 py-2 text-[0.7rem] tracking-[0.15em] uppercase text-muted-foreground dark:text-zinc-400 transition-all duration-300 hover:text-foreground dark:hover:text-white
                  after:absolute after:bottom-1 after:left-1/2 after:h-[1px] after:w-0 after:-translate-x-1/2 after:bg-foreground dark:after:bg-white after:transition-all after:duration-300 after:ease-out hover:after:w-4/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden rounded-full bg-ink px-6 py-2.5 text-[0.7rem] tracking-[0.18em] text-ink-foreground dark:bg-white dark:text-zinc-950 uppercase transition-all duration-300 hover:bg-ink/80 hover:text-ink-foreground dark:hover:bg-zinc-200 sm:inline-flex"
            >
              Hire Us
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border/60 dark:border-zinc-700 text-foreground/60 dark:text-zinc-400 transition-all duration-200 hover:border-foreground/30 dark:hover:border-zinc-500 hover:text-foreground dark:hover:text-white lg:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-xl dark:bg-zinc-950/98 lg:hidden">
          <div className="h-16 shrink-0 sm:h-[4.5rem]" />

          <nav className="flex flex-1 flex-col items-center justify-center gap-1.5 px-6">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ 
                  className: "border-foreground/70 text-foreground dark:border-white dark:text-white" 
                }}
                className="w-full max-w-xs rounded-xl border border-border/30 dark:border-zinc-700 py-4 text-center text-[0.8rem] tracking-[0.2em] uppercase text-foreground/70 dark:text-zinc-400 transition-all duration-200 hover:border-border/60 dark:hover:border-zinc-500 hover:bg-foreground/5 dark:hover:bg-zinc-800 hover:text-foreground dark:hover:text-white"
                style={{
                  animation: "fadeSlideUp 0.35s ease both",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-5 w-full max-w-xs rounded-full bg-ink px-7 py-4 text-center text-[0.7rem] tracking-[0.18em] text-ink-foreground dark:bg-white dark:text-zinc-950 uppercase transition-all duration-300 hover:bg-ink/80 hover:text-ink-foreground dark:hover:bg-zinc-200"
              style={{
                animation: "fadeSlideUp 0.35s ease both",
                animationDelay: `${NAV.length * 40}ms`,
              }}
            >
              Hire Us
            </Link>
          </nav>

          <div className="flex shrink-0 justify-center pb-10">
            <p className="text-[0.55rem] tracking-[0.2em] text-muted-foreground dark:text-zinc-500 uppercase">
              Crafted with precision
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}