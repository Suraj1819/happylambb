import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ExternalLink, FileText } from "lucide-react";
import logo from "@/assets/brands/hello.png";
import { SERVICES } from "@/data/site";

/* ─── CUSTOM SVG ICONS ─── */

// ✅ Custom Instagram SVG
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// ✅ Custom LinkedIn SVG
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ✅ Custom YouTube SVG
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ✅ Custom X (Twitter) SVG
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── GSTIN ─── */
const GSTIN = "27AAGCH9980B1ZC";

/* ─── branch data ─── */

const MUMBAI_STUDIO = {
  city: "Mumbai",
  address:
    "Happy Lamb Production OPC PVT.LTD, 505, 5th Floor, Bhoomi Building, Sanjay Nagar Co.Op. Society, Cama Estate, Behind Future Studio, Goregoan (E.), Mumbai - 400063",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Happy+Lamb+Production+Goregoan+East+Mumbai",
  phone: "+91 9820778491",
  phoneRaw: "919819778430",
  email: "dilip@happylamb.co.in",
};

const PATNA_STUDIO = {
  city: "Patna",
  address:
    "WorkSpace - Co-Working Space in Patna, 2nd Floor, Kanti Factory Rd, above Drug Point, near Bank of Baroda, New Colony, Mahatma Gandhi Nagar, Kankarbagh, Patna, Bihar 800020",
  mapsUrl: "https://maps.app.goo.gl/p3Aux8ziTfCXWDMV8",
  phone: "+91 6207462473",
  phoneRaw: "916207462473",
  email: "ankit@happylamb.co.in",
};

// ✅ Socials with Custom SVGs
const SOCIALS = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/happylambproduction",
    label: "Instagram",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/ankit-kumar-1b9666313?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "LinkedIn",
  },
  { icon: YoutubeIcon, href: "https://www.youtube.com/@HappyLambProduction", label: "YouTube" },
  { icon: XIcon, href: "https://twitter.com", label: "Twitter" },
];

/* ─── studio card ─── */

function StudioCard({
  studio,
}: {
  studio: {
    city: string;
    address: string;
    mapsUrl: string;
    phone: string;
    phoneRaw: string;
    email: string;
  };
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 dark:bg-zinc-600" />
        <h3 className="text-xs tracking-[0.2em] text-foreground dark:text-white uppercase">
          <span className="font-bold">{studio.city}</span>{" "}
          <span className="font-normal">Studio</span>
        </h3>
      </div>

      <ul className="space-y-4 text-sm text-muted-foreground dark:text-zinc-400 min-h-[120px] flex flex-col">
        <li>
          <a
            href={studio.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 transition-colors hover:text-foreground dark:hover:text-white"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60 dark:text-zinc-500 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-white" />
            <span className="leading-relaxed font-normal text-muted-foreground/80 dark:text-zinc-400">
              {studio.address}
              <ExternalLink className="ml-1.5 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
            </span>
          </a>
        </li>

        <li className="flex items-center gap-3 group">
          <Phone className="h-4 w-4 shrink-0 text-muted-foreground/60 dark:text-zinc-500 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-white" />
          <a
            href={`tel:${studio.phoneRaw}`}
            className="transition-colors hover:text-foreground dark:hover:text-white"
          >
            {studio.phone}
          </a>
        </li>

        <li className="flex items-center gap-3 group">
          <Mail className="h-4 w-4 shrink-0 text-muted-foreground/60 dark:text-zinc-500 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-white" />
          <a
            href={`mailto:${studio.email}`}
            className="break-all transition-colors hover:text-foreground dark:hover:text-white"
          >
            {studio.email}
          </a>
        </li>
      </ul>
    </div>
  );
}

/* ─── footer ─── */

export function Footer() {
  return (
    <footer className="border-t border-border dark:border-zinc-800 bg-background dark:bg-zinc-950">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="HappyLamb Production"
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10 bg-transparent object-contain mix-blend-multiply dark:mix-blend-screen"
              />
              <span className="font-medium text-xl tracking-tight text-foreground dark:text-white">
                HappyLamb Production
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-muted-foreground/80 dark:text-zinc-400">
              Advertising, production and branding studio. Cinema-grade craft with AI-accelerated
              workflows.
            </p>

            {/* ✅ Social Icons */}
            <div className="mt-7 flex gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group grid h-9 w-9 place-items-center rounded-lg border border-border dark:border-zinc-700 text-muted-foreground/70 dark:text-zinc-500 transition-all duration-300 hover:border-foreground/40 dark:hover:border-zinc-500 hover:bg-muted/10 dark:hover:bg-zinc-800"
                  >
                    <Icon className="h-4 w-4 transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-white" />
                  </a>
                );
              })}
            </div>

            {/* ✅ GSTIN - Below Social Icons */}
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-zinc-700 px-3 py-2 w-fit">
              <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">GSTIN:</span>
              <span className="font-mono text-xs font-bold text-black dark:text-white tracking-wider">
                {GSTIN}
              </span>
            </div>
          </div>

          {/* Specialities */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground dark:text-white">
              Specialities
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm font-normal text-muted-foreground dark:text-zinc-400">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="transition-colors hover:text-foreground dark:hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/services"
                  className="font-medium text-foreground dark:text-white transition-colors hover:text-foreground/80 dark:hover:text-zinc-300"
                >
                  All specialities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Mumbai */}
          <div className="lg:col-span-3">
            <StudioCard studio={MUMBAI_STUDIO} />
          </div>

          {/* Patna */}
          <div className="lg:col-span-3">
            <StudioCard studio={PATNA_STUDIO} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border dark:border-zinc-800">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-3 px-5 py-6 text-xs text-muted-foreground dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} HappyLamb Production. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Mumbai</span>
            <span className="text-border dark:text-zinc-700">·</span>
            <span>Patna</span>
            <span className="hidden text-border dark:text-zinc-700 sm:inline">·</span>
            <span className="hidden sm:inline">Ad Films · Photography · Corporate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
