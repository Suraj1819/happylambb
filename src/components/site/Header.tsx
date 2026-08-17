import { Link } from "@tanstack/react-router";
import { Menu, X, FileText } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// ✅ FIX: Sahi file name
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

const GSTIN = "27AAGCH9980B1ZC";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showGST, setShowGST] = useState(false);
  const [isGSTClicked, setIsGSTClicked] = useState(false);
  const gstRef = useRef<HTMLDivElement>(null);

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

  // ✅ Click outside handler - GST close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gstRef.current && !gstRef.current.contains(event.target as Node)) {
        setIsGSTClicked(false);
        setShowGST(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ GSTIN Handlers - Instant
  const handleGSTMouseEnter = () => {
    if (!isGSTClicked) {
      setShowGST(true);
    }
  };

  const handleGSTMouseLeave = () => {
    if (!isGSTClicked) {
      setShowGST(false);
    }
  };

  const handleGSTClick = () => {
    setIsGSTClicked(!isGSTClicked);
    if (!isGSTClicked) {
      setShowGST(true);
    } else {
      setShowGST(false);
    }
  };

  const handleGSTClose = () => {
    setIsGSTClicked(false);
    setShowGST(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-border/50 bg-background/85 backdrop-blur-xl shadow-sm dark:border-zinc-800 dark:bg-zinc-950/85"
            : "bg-background/60 backdrop-blur-md dark:bg-zinc-950/60"
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 lg:gap-4 group"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
              <img
                src={logo}
                alt="HappyLamb Production"
                width={48}
                height={48}
                className="h-full w-full bg-transparent object-contain mix-blend-multiply dark:mix-blend-screen transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="leading-none">
              <span className="block font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl tracking-tight text-foreground dark:text-white">
                HappyLamb
              </span>
              <span className="block text-[0.5rem] sm:text-[0.55rem] lg:text-[0.65rem] tracking-[0.35em] text-muted-foreground dark:text-zinc-400 uppercase mt-0.5">
                Production
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{
                  className:
                    "text-foreground dark:text-white after:w-4/5 after:bg-foreground dark:after:bg-white",
                }}
                className="relative px-3 xl:px-5 py-2 xl:py-2.5 text-[0.65rem] xl:text-[0.8rem] tracking-[0.15em] uppercase text-muted-foreground dark:text-zinc-400 transition-all duration-300 hover:text-foreground dark:hover:text-white
                  after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-foreground dark:after:bg-white after:transition-all after:duration-300 after:ease-out hover:after:w-4/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + GSTIN + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* ✅ GSTIN Button */}
            <div
              ref={gstRef}
              className="relative"
              onMouseEnter={handleGSTMouseEnter}
              onMouseLeave={handleGSTMouseLeave}
            >
              <button
                onClick={handleGSTClick}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all duration-200 text-xs font-medium cursor-pointer
                  ${
                    isGSTClicked || showGST
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-gray-300 text-gray-600 hover:border-black hover:text-black dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white"
                  }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>GST</span>
              </button>

              {/* ✅ GSTIN Tooltip - Instant */}
              {(showGST || isGSTClicked) && (
                <div
                  className={`absolute right-0 top-full mt-2 min-w-[220px] rounded-lg border bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900
                    ${isGSTClicked ? "border-black dark:border-white" : "border-gray-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-black dark:text-white" />
                      <span className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                        GSTIN
                      </span>
                    </div>
                    {/* ✅ Close Button */}
                    <button
                      onClick={handleGSTClose}
                      className="text-gray-400 hover:text-black dark:text-zinc-500 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-2 font-mono text-sm font-bold tracking-wider text-black dark:text-white">
                    {GSTIN}
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400 dark:text-zinc-500">
                    HappyLamb Production
                  </p>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="hidden sm:inline-flex rounded-full bg-ink px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-[0.6rem] sm:text-[0.7rem] lg:text-[0.8rem] tracking-[0.18em] text-ink-foreground dark:bg-white dark:text-zinc-950 uppercase transition-all duration-300 hover:bg-ink/80 hover:text-ink-foreground dark:hover:bg-zinc-200 cursor-pointer"
            >
              Hire Us
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 place-items-center rounded-full border border-border/60 dark:border-zinc-700 text-foreground/60 dark:text-zinc-400 transition-all duration-200 hover:border-foreground/30 dark:hover:border-zinc-500 hover:text-foreground dark:hover:text-white lg:hidden cursor-pointer"
            >
              {open ? (
                <X className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-xl dark:bg-zinc-950/98 lg:hidden">
          <div className="h-16 sm:h-20 shrink-0" />

          <nav className="flex flex-1 flex-col items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{
                  className:
                    "border-foreground/70 text-foreground dark:border-white dark:text-white",
                }}
                className="w-full max-w-xs rounded-xl border border-border/30 dark:border-zinc-700 py-3.5 sm:py-4 lg:py-5 text-center text-[0.75rem] sm:text-[0.8rem] lg:text-[0.9rem] tracking-[0.2em] uppercase text-foreground/70 dark:text-zinc-400 transition-all duration-200 hover:border-border/60 dark:hover:border-zinc-500 hover:bg-foreground/5 dark:hover:bg-zinc-800 hover:text-foreground dark:hover:text-white cursor-pointer"
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
              className="mt-4 sm:mt-5 lg:mt-6 w-full max-w-xs rounded-full bg-ink px-7 py-3.5 sm:py-4 lg:py-5 text-center text-[0.65rem] sm:text-[0.7rem] lg:text-[0.8rem] tracking-[0.18em] text-ink-foreground dark:bg-white dark:text-zinc-950 uppercase transition-all duration-300 hover:bg-ink/80 hover:text-ink-foreground dark:hover:bg-zinc-200 cursor-pointer"
              style={{
                animation: "fadeSlideUp 0.35s ease both",
                animationDelay: `${NAV.length * 40}ms`,
              }}
            >
              Hire Us
            </Link>

            {/* ✅ Mobile GSTIN */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 dark:border-zinc-700">
              <FileText className="h-4 w-4 text-black dark:text-white" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">GSTIN:</span>
              <span className="font-mono text-xs font-bold text-black dark:text-white">
                {GSTIN}
              </span>
            </div>
          </nav>

          <div className="flex shrink-0 justify-center pb-8 sm:pb-10">
            <p className="text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] text-muted-foreground dark:text-zinc-500 uppercase">
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
