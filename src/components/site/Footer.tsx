import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";

// 🟢 LOGO IMPORT (Bilkul sahi hai, kyunki hello.png folder mein hai)
import logo from "@/assets/brands/hello.png";

// 🟢 SERVICES IMPORT (Agar error aata hai, toh yeh line sahi hai)
import { SERVICES } from "@/data/site";

/* ─── branch data ─── */

const MUMBAI_STUDIO = {
  city: "Mumbai",
  address: "Happy Lamb Production OPC PVT.LTD, 505, 5th Floor, Bhoomi Building, Sanjay Nagar Co.Op. Society, Cama Estate, Behind Future Studio, Goregoan (E.), Mumbai - 400063",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Happy+Lamb+Production+Goregoan+East+Mumbai",
  phone: "+91 9820778491",
  phoneRaw: "919819778430",
  email: "info@happylamb.in",
};

const PATNA_STUDIO = {
  city: "Patna",
  address: "WorkSpace - Co-Working Space in Patna, 2nd Floor, Kanti Factory Rd, above Drug Point, near Bank of Baroda, New Colony, Mahatma Gandhi Nagar, Kankarbagh, Patna, Bihar 800020",
  mapsUrl: "https://maps.app.goo.gl/p3Aux8ziTfCXWDMV8",
  phone: "+91 6207462473",
  phoneRaw: "916207462473",
  email: "ankit@happylamb.co.in",
};

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com/ankith_studios", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@ankith_studios", label: "YouTube" },
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
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground dark:bg-zinc-500" />
        
        {/* 🟢 Both City names BOLD, Studio NORMAL */}
        <h3 className="text-xs tracking-[0.2em] text-foreground dark:text-white uppercase">
          <span className="font-bold">{studio.city}</span> <span className="font-normal">Studio</span>
        </h3>
      </div>

      <ul className="space-y-4 text-sm text-muted-foreground dark:text-zinc-400 min-h-[120px] flex flex-col">
        {/* Clickable address → Google Maps */}
        <li>
          <a
            href={studio.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 transition-colors hover:text-foreground dark:hover:text-white"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70 dark:text-zinc-500 transition-colors group-hover:text-foreground dark:group-hover:text-white" />
            <span className="leading-relaxed font-normal text-muted-foreground/80 dark:text-zinc-400">
              {studio.address}
              <ExternalLink className="ml-1.5 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
            </span>
          </a>
        </li>

        <li className="flex items-center gap-3">
          <Phone className="h-4 w-4 shrink-0 text-muted-foreground/70 dark:text-zinc-500" />
          <a
            href={`tel:${studio.phoneRaw}`}
            className="transition-colors hover:text-foreground dark:hover:text-white"
          >
            {studio.phone}
          </a>
        </li>

        <li className="flex items-center gap-3">
          <Mail className="h-4 w-4 shrink-0 text-muted-foreground/70 dark:text-zinc-500" />
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
              Advertising, production and branding studio. Cinema-grade craft with AI-accelerated workflows.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border dark:border-zinc-700 text-muted-foreground dark:text-zinc-400 transition-all duration-200 hover:border-foreground/60 dark:hover:border-zinc-500 hover:bg-muted/20 dark:hover:bg-zinc-800 hover:text-foreground dark:hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
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