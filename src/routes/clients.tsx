import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Clock,
  Film,
  Plane,
  Sparkles,
  Star,
  Users,
  Zap,
  Video,
  Drone,
  Brain,
  Layers,
  MonitorPlay,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { INDUSTRIES, PROJECTS, TESTIMONIALS } from "@/data/site";

/* ─── import brand logos ─── */
import aureaLogo from "@/assets/brands/hello.png";
import cofsilsLogo from "@/assets/brands/cofsils.png";
import skywayLogo from "@/assets/brands/skyway.jpg";
import promptLogo from "@/assets/brands/prompt.jpg";
import tataHitachi from "@/assets/brands/TataHitachii.jpeg";
import hailstone from "@/assets/brands/Hailstone.jpeg";
import godrejLogo from "@/assets/brands/godrej.png";
import jcbLogo from "@/assets/brands/Jcb.jpeg";
import icici from "@/assets/brands/icici.jpg";
import bajaj from "@/assets/brands/bajaj.png";
import tatamotors from "@/assets/brands/tatamotors.jpg";
import upstox from "@/assets/brands/upstox.jpg";

export const Route = createFileRoute("/clients")({
  component: Clients,
  head: () => ({
    meta: [
      { title: "Clients & Industries — HappyLamb Production" },
      {
        name: "description",
        content:
          "Trusted by leading brands across India. Commercials, corporate films, product shoots and digital campaigns.",
      },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
});

/* ✅ ALL BRANDS WITH LOGOS */
const ALL_BRANDS = [
  { name: "Cofsils", logo: cofsilsLogo },
  { name: "Godrej", logo: godrejLogo },
  { name: "Hailstone", logo: hailstone },
  { name: "Aurea", logo: aureaLogo },
  { name: "JCB", logo: jcbLogo },
  { name: "Prompt", logo: promptLogo },
  { name: "Skyway", logo: skywayLogo },
  { name: "Tata Hitachi", logo: tataHitachi },
  { name: "ICICI", logo: icici },
  { name: "Bajaj", logo: bajaj },
  { name: "Tata Motors", logo: tatamotors },
  { name: "Upstox", logo: upstox },
];

/* Row 1: First 4 brands (with logos) */
const ROW_1_BRANDS = ALL_BRANDS.slice(0, 4);

/* Row 2: Last 4 brands (with logos) */
const ROW_2_BRANDS = ALL_BRANDS.slice(4);

/* Logo Wall: All 8 brands */
const LOGO_WALL_BRANDS = ALL_BRANDS;

/* 🔥 FIXED ICONS */
const WHY_US = [
  { icon: Video, title: "Cinema-grade production", copy: "RED & ARRI systems, controlled lighting, director-led units." },
  { icon: Zap, title: "Fast turnaround", copy: "Locked timelines. Broadcast masters delivered on schedule." },
  { icon: Users, title: "Professional crew", copy: "Vetted talent across Mumbai, Patna and pan-India." },
  { icon: Film, title: "Creative storytelling", copy: "Strategy-first films built for recall and response." },
  { icon: Drone, title: "Drone cinematography", copy: "Licensed aerial units for real estate, plants and events." },
  { icon: Brain, title: "AI-assisted workflows", copy: "Faster edits, variants and multi-format delivery." },
  { icon: Layers, title: "End-to-end production", copy: "From brief to final master — one accountable team." },
  { icon: MonitorPlay, title: "Multi-platform content", copy: "TV, OTT, vertical and paid-ready assets from one shoot." },
];

const RETENTION = [
  { value: 95, suffix: "%", label: "Repeat Clients" },
  { value: 100, suffix: "+", label: "Campaigns Delivered" },
  { value: 50, suffix: "+", label: "Brands Served" },
  { value: 4.9, suffix: "/5", label: "Client Satisfaction" },
];

function Clients() {
  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center pt-28 pb-12 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-border/50"></div>
              <p className="text-xs tracking-[0.3em] text-muted-foreground/80 uppercase font-medium">Clients</p>
              <div className="h-px w-8 bg-border/50"></div>
            </div>
            
            <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground max-w-4xl mx-auto">
              Brands that <br />
              <span className="italic text-muted-foreground/60">trust us.</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We help brands tell powerful stories through commercials, corporate films,
              product shoots, digital campaigns, and cinematic content. Crafted with precision.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-4xl mx-auto border-t border-border/60 pt-8">
            <Counter to={100} suffix="+" label="Projects Delivered" />
            <Counter to={50} suffix="+" label="Happy Clients" />
            <Counter to={5} suffix="+" label="Years Experience" />
            <Counter to={10} suffix="M+" label="Views Generated" />
          </Reveal>
        </div>
      </section>

      {/* ─── 2. LOGO MARQUEE (Small Cards, Big Logos) ─── */}
      <section className="overflow-hidden border-y border-border/30 bg-surface/50 py-16">
        <p className="mb-12 text-center text-xs tracking-[0.2em] text-muted-foreground uppercase italic">
          Brands we've worked with
        </p>

        <div className="space-y-8">
          {/* Row 1 - First 4 brands */}
          <div className="relative">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 px-4">
              {[...ROW_1_BRANDS, ...ROW_1_BRANDS, ...ROW_1_BRANDS, ...ROW_1_BRANDS].map((brand, i) => (
                <div
                  key={`r1-${brand.name}-${i}`}
                  className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-card/50 px-3"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-12 max-w-[140px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Last 4 brands */}
          <div className="relative">
            <div className="flex w-max animate-[marquee-reverse_32s_linear_infinite] gap-8 px-4">
              {[...ROW_2_BRANDS, ...ROW_2_BRANDS, ...ROW_2_BRANDS, ...ROW_2_BRANDS].map((brand, i) => (
                <div
                  key={`r2-${brand.name}-${i}`}
                  className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-card/50 px-3"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-12 max-w-[140px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* ─── 3. LOGO WALL (Flat 2D - No Lift) ─── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Client Roster</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Brands that <br />
              <span className="italic text-muted-foreground/60">keep coming back.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {LOGO_WALL_BRANDS.map((brand, i) => (
              <Reveal key={`${brand.name}-${i}`} delay={(i % 8) * 0.05}>
                <div className="group flex h-24 items-center justify-center rounded-xl border border-border/40 bg-surface/30 px-4 transition-all duration-300 hover:border-border/60">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-14 max-w-[160px] object-contain"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SUCCESS STORIES (MATCHING WORK PAGE STYLE - FLAT 2D) ─── */}
      <section className="border-y border-border/30 bg-surface/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-6 bg-border"></div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Success Stories</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                Results that <br />
                <span className="italic text-muted-foreground/60">speak.</span>
              </h2>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all duration-300">
              View all work <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <Reveal key={`project-${p.slug}`} delay={i * 0.04}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                >
                  {/* 🟢 CARD - MATCHES WORK PAGE STYLE */}
                  <div className="overflow-hidden rounded-2xl border border-border/40 bg-background transition-colors hover:border-border/60">
                    
                    {/* Image + Video Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted/20">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Text content inside card - CLEAN NON-ITALIC GRAY */}
                    <div className="px-5 pt-5 pb-5">
                      <h3 className="font-medium text-base tracking-tight text-foreground">
                        {p.title}
                      </h3>
                      {/* 🟢 CLEAN: Matches Work page (Normal font, no italic) */}
                      <p className="mt-1.5 text-[13px] font-normal text-muted-foreground leading-relaxed line-clamp-2">
                        {p.client} · {p.category}
                      </p>
                      {p.results[0] && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{p.results[0].value}</span>{" "}
                          {p.results[0].label.toLowerCase()}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                        <span className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                          View Details
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. INDUSTRIES ─── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">INDUSTRIES</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Twelve categories, <br />
              <span className="italic text-muted-foreground/60">one standard.</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={`ind-${ind}-${i}`} delay={(i % 4) * 0.05}>
                <div className="group rounded-xl border border-border/40 bg-surface/30 px-5 py-5 text-center transition-all duration-300 hover:border-border/60">
                  <p className="text-sm font-medium tracking-wide text-muted-foreground/80 group-hover:text-foreground">
                    {ind}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. WHY CLIENTS CHOOSE US (FIXED ICONS) ─── */}
      <section className="border-y border-border/30 bg-surface/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">WHY US</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Why brands <br />
              <span className="italic text-muted-foreground/60">choose us.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((item, i) => (
              <Reveal key={`why-${item.title}-${i}`} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-border/60">
                  <item.icon className="h-5 w-5 text-muted-foreground/60" />
                  <h3 className="mt-4 font-medium text-base">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. RETENTION STATS (Numbers Fixed) ─── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Retention</p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Numbers that <br />
              <span className="italic text-muted-foreground/60">build trust.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-3xl mx-auto">
            {RETENTION.map((s, i) => (
              <Reveal key={`ret-${s.label}-${i}`}>
                <div className="text-center border-b border-border/40 pb-4">
                  <div className="font-medium text-4xl tracking-tight text-foreground sm:text-5xl">
                    {s.value}
                    <span className="text-muted-foreground">{s.suffix}</span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground italic">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. TESTIMONIALS (STARS BLACK - NO ORANGE) ─── */}
      <section className="border-y border-border/30 bg-surface/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase italic">Testimonials</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">In their words.</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={`test-${t.author}-${i}`} delay={i * 0.07}>
                <blockquote className="flex h-full flex-col rounded-xl border border-border/40 bg-card p-7">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={`${t.author}-star-${j}`} className="h-4 w-4 fill-foreground text-foreground/20" />
                    ))}
                  </div>
                  <p className="flex-1 text-base leading-relaxed text-foreground/80">
                    “{t.quote}”
                  </p>
                  <footer className="mt-6 border-t border-border/30 pt-4 text-sm">
                    <span className="font-medium text-foreground">{t.author}</span>
                    <span className="mx-1.5 text-muted-foreground">·</span>
                    <span className="italic text-muted-foreground/80">{t.role}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      

      {/* ─── 10. FINAL CTA (BLACK BUTTON - NO ORANGE) ─── */}
      <section className="bg-ink py-32 text-ink-foreground relative overflow-hidden text-center border-t border-ink-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none"></div>
        
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight">
              Ready to build something <br />
              <span className="italic font-normal text-ink-foreground/40">worth watching</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-foreground/60 text-lg">
              Let's create something extraordinary together. We'll map the right production approach.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-foreground/90 hover:scale-105 shadow-xl shadow-foreground/10"
              >
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm text-ink-foreground/60 hover:text-ink-foreground transition-colors"
              >
                View our Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}