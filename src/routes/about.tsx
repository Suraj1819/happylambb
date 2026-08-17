import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarCheck,
  Camera,
  CheckCircle2,
  Clock,
  Clapperboard,
  Compass,
  FileCheck,
  Globe2,
  Layers,
  Lightbulb,
  MonitorPlay,
  Palette,
  Target,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import heroStudio from "@/assets/hero-studio.jpg";
import teamGroup from "@/assets/team.jpeg";
import m1 from "@/assets/Dilip Cofounder.jpeg";
import { Reveal } from "@/components/site/Reveal";

// ✅ FIX: Lowercase images for Vercel
import mumbaiStudioImg from "@/assets/mumbai-studio.jpg";
import patnaStudioImg from "@/assets/patna-studio.jpg";

import mumbaiHeadImg from "@/assets/Dilip Cofounder.jpeg";
import patnaHeadImg from "@/assets/Creative Director.jpeg";

// ✅ GSTIN
const GSTIN = "27AAGCH9980B1ZC";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About HappyLamb Production — Premium Creative Studio" },
      {
        name: "description",
        content:
          "A full-service production, film & branding studio in India. Built on craft, contracts, and credibility since 2022.",
      },
      { property: "og:title", content: "About HappyLamb Production" },
      {
        property: "og:description",
        content:
          "From strategy to screen. Discover our story, process, and the people behind the work.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

/* ──────────────────────────────────────── DATA ──────────────────────────────────────── */

const TIMELINE = [
  {
    year: "2022",
    title: "Founded with a vision",
    text: "HappyLamb Production was established in Mumbai with a single goal: to bring world-class advertising craft to mid-market Indian brands. One camera, one light kit, and an unwavering belief in quality.",
  },
  {
    year: "2023",
    title: "Performance creative lab",
    text: "Merged media planning and creative execution into a single performance team, closing the feedback loop between data and craft.",
  },
  {
    year: "2024",
    title: "Expansion to Patna",
    text: "Opened our second studio in Patna to serve clients across Eastern India, maintaining the same premium production standards with local accessibility.",
  },
  {
    year: "2025",
    title: "AI-accelerated workflows",
    text: "Integrated AI-assisted workflows cutting average review cycles by 45% and turnaround times by a third, without compromising quality.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Precision",
    text: "Every frame, every word, every pixel has a reason to exist. We don't ship work we wouldn't sign our names to.",
  },
  {
    icon: Sparkles,
    title: "Informed Creativity",
    text: "Intuition backed by data. We combine audience insights and cultural context to make work that moves people.",
  },
  {
    icon: Zap,
    title: "Speed & Integrity",
    text: "AI tools and lean processes help us move fast. Craft standards ensure we never move careless.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Immerse",
    text: "We study the brand book, audit existing assets, and map the competitive landscape before writing a single word.",
  },
  {
    step: "02",
    title: "Strategize",
    text: "Data-informed creative strategy. We define the single-minded proposition and pressure-test it before ideation.",
  },
  {
    step: "03",
    title: "Pre-Production",
    text: "Storyboards, casting, recce, permits, and shot lists — all signed off before any gear leaves the shelf.",
  },
  {
    step: "04",
    title: "Execute",
    text: "Producer-led floor management with real-time client dashboards. Executed to the exact frame plan.",
  },
  {
    step: "05",
    title: "Perfect",
    text: "Edit, VFX, colour grading, sound design — all in-house. Review happens on secure portals with frame-accurate annotations.",
  },
  {
    step: "06",
    title: "Launch & Learn",
    text: "Final assets delivered in every required format. Post-launch, we measure performance and feed learnings back into the next brief.",
  },
];

const CAPABILITIES = [
  { icon: Clapperboard, label: "Film Commercials (TVC & Digital)" },
  { icon: Camera, label: "Product & Lifestyle Photography" },
  { icon: Palette, label: "Brand Identity & Packaging Design" },
  { icon: MonitorPlay, label: "Social Media Content Production" },
  { icon: TrendingUp, label: "Performance Creative & A/B Testing" },
  { icon: Globe2, label: "Pan-India Line Production" },
  { icon: Building2, label: "Catalogue & E-commerce Shoots" },
  { icon: Layers, label: "End-to-End Brand Strategy" },
];

/* ─── Studio Data ─── */
const STUDIOS = [
  {
    city: "Mumbai",
    address:
      "Happy Lamb Production OPC PVT.LTD, 505, 5th Floor, Bhoomi Building, Sanjay Nagar Co.Op. Society, Cama Estate, Behind Future Studio, Goregoan (E.), Mumbai - 400063",
    phone: "+91 9820778491",
    email: "dilip@happylamb.co.in",
    image: mumbaiStudioImg,
    headName: "Dilip Gupta",
    headRole: "Founder & CEO",
    headImage: mumbaiHeadImg,
    headQuote:
      "Mumbai is our creative powerhouse. From here, we oversee the largest productions, ensuring every frame meets the highest standards of cinematic excellence.",
  },
  {
    city: "Patna",
    address:
      "WorkSpace - Co-Working Space in Patna, 2nd Floor, Kanti Factory Rd, above Drug Point, near Bank of Baroda, New Colony, Mahatma Gandhi Nagar, Kankarbagh, Patna, Bihar 800020",
    phone: "+91 6207462473",
    email: "ankit@happylamb.co.in",
    image: patnaStudioImg,
    headName: "Ankit Kumar",
    headRole: "Studio Head - Patna",
    headImage: patnaHeadImg,
    headQuote:
      "Patna represents our commitment to pan-India reach. We bring world-class production values to the heart of Bihar, empowering local brands and stories.",
  },
];

// ═══ 2 STUDIO CAROUSEL COMPONENT ═══
function StudioCarousel() {
  const [current, setCurrent] = useState(0);

  const visuals = [
    { src: mumbaiStudioImg, alt: "Mumbai Studio" },
    { src: patnaStudioImg, alt: "Patna Studio" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % visuals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visuals.length]);

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden border border-border/40 shadow-xl">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={visuals[current].src}
            alt={visuals[current].alt}
            className="w-full h-full object-cover grayscale-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-white">
            {visuals[current].alt}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 right-6 flex gap-1.5">
        {visuals.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────── COMPONENT ──────────────────────────────────── */

function About() {
  return (
    <>
      {/* ═══════════════ 1. HERO SECTION ═══════════════ */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center pt-28 pb-16 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text Content */}
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-border/50"></div>
                <p className="text-[10px] tracking-[0.4em] text-foreground/50 uppercase font-medium">
                  Est. 2022
                </p>
              </div>

              <h1 className="text-[clamp(3.5rem,9vw,6rem)] leading-[0.95] tracking-tighter font-medium text-foreground max-w-4xl">
                Craft, contracts <br />
                <span className="italic text-muted-foreground/60">& credibility.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                We are mumbai based company, we specialize in collaborating with new and not so new
                companies across many industries to amplify thier marketing performance. Happy lamb
                production works with feel good brands including food and drink, health and
                lifestyle, sports and technology, pharmaceutical and leisure. we help brands to tell
                their stories in the most creative way using mix of creativity , technology, ideas
                and passion.
              </p>
            </Reveal>

            {/* RIGHT: 2 Studio Carousel */}
            <Reveal delay={0.2}>
              <StudioCarousel />
              <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground tracking-wider uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                  Mumbai
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                  Patna
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. FOUNDER NOTE ═══════════════ */}
      <section className="bg-ink py-28 text-ink-foreground relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Founder Profile */}
            <Reveal className="lg:col-span-4 flex flex-col">
              <div className="relative pl-6 border-l-2 border-ink-foreground/30 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-ink-foreground/50" />
                  <span className="text-xs tracking-[0.2em] text-ink-foreground/40 uppercase">
                    From the founder
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 pl-6">
                <img
                  src={m1}
                  alt="Dilip Gupta"
                  className="h-14 w-14 rounded-full object-cover border-2 border-ink-foreground/20"
                />
                <div>
                  <h3 className="text-xl font-medium tracking-tight">Dilip Gupta</h3>
                  <p className="text-sm text-ink-foreground/60">
                    Founder & CEO, HappyLamb Production
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right: Quote */}
            <Reveal delay={0.1} className="lg:col-span-8">
              <blockquote className="text-2xl sm:text-3xl md:text-4xl leading-tight font-light text-ink-foreground/90">
                "Now a days entrepreneurs coming with new Idea of product and we Make it look better
                with stunning packaging .we design your product we give a feeling to it that
                customer relate them self to buy it ..not only this ,The age of the typical
                brand-consumer relationship is over.
                <span className="font-bold text-white italic">
                  {" "}
                  In its place is an audience of human beings looking for real relationships with
                  human-centered.
                </span>{" "}
                It's no longer sufficient to simply make the sale and move on. Showing you truly
                understand the human behind the purchase, their hopes and fears, will forge a
                relationship that endures."
              </blockquote>
              <div className="mt-8 flex items-center gap-6">
                <div className="w-px h-8 bg-ink-foreground/20"></div>
                <p className="text-sm text-ink-foreground/50">Creative Director & Producer</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. VALUES & TIMELINE ═══════════════ */}
      <section className="py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          {/* Values Grid */}
          <Reveal className="mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Our Core</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
              Principles we don't{" "}
              <span className="italic font-normal text-muted-foreground/60">compromise</span> on.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1} className="group">
                  <div className="flex flex-col border-t-2 border-foreground/10 pt-6 transition-all duration-300 group-hover:border-foreground">
                    <div className="mb-4">
                      <v.icon className="h-6 w-6 text-foreground/40" />
                    </div>
                    <h4 className="font-bold text-lg tracking-tight mb-2">{v.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Timeline */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                OUR JOURNEY
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How we <span className="italic font-normal text-muted-foreground/60">got here</span>.
            </h2>

            <div className="flex items-center gap-2 mb-8 text-muted-foreground/50">
              <span className="h-px w-12 bg-border"></span>
              <ArrowRight className="h-4 w-4 animate-pulse" />
              <span className="text-[10px] tracking-widest uppercase">Progress</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-border/30 pb-12">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.05}>
                  <div className="flex flex-col border-t-2 border-foreground/10 pt-4 hover:border-foreground transition-all duration-300">
                    <span className="text-base font-bold text-foreground/70 tracking-wide">
                      {t.year}
                    </span>
                    <h4 className="font-bold text-base text-foreground tracking-tight mt-1">
                      {t.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 4. WORKFLOW / PROCESS ═══════════════ */}
      <section className="bg-surface/30 py-28 border-y border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-border/40">
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-2">
                WORKFLOW
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Six steps.{" "}
                <span className="italic font-normal text-muted-foreground/60">Zero surprises.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground mt-4 md:mt-0">
              Every project follows this exact process. No shortcuts, no skipped stages. This rigour
              is why our deadlines hold.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl font-light tracking-tighter text-muted-foreground/30">
                      {p.step}
                    </span>
                    <div className="h-px flex-1 bg-border/30"></div>
                  </div>
                  <h4 className="font-bold text-lg tracking-tight mb-2">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed pr-4">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. CAPABILITIES ═══════════════ */}
      <section className="py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Services</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Full-service{" "}
              <span className="italic font-normal text-muted-foreground/60">capabilities.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.04}>
                <div className="group flex items-center gap-4 border-b border-border/50 py-5 transition-all duration-300 hover:border-foreground/30 hover:pl-2">
                  <c.icon className="h-5 w-5 shrink-0 text-foreground/40" />
                  <span className="text-sm font-medium leading-snug text-foreground/80 group-hover:text-foreground transition-colors">
                    {c.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. STUDIOS SECTION ═══════════════ */}
      <section className="py-28 bg-surface/30 border-y border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Our Studios
              </p>
              <div className="h-px w-6 bg-border"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Mumbai <span className="text-muted-foreground/40">·</span> Patna
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Two production hubs. Pan-India crew and permissions capability. World-class craft,
              delivered locally.
            </p>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2">
            {STUDIOS.map((studio, i) => (
              <Reveal key={studio.city} delay={i * 0.1}>
                <div className="group bg-background border border-border/40 rounded-2xl overflow-hidden transition-all duration-300 hover:border-border/60">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={studio.image}
                      alt={`${studio.city} Studio`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-8">
                    <div className="space-y-3 text-sm text-muted-foreground border-b border-border/30 pb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 shrink-0 text-foreground/60 mt-0.5" />
                        <span>{studio.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0 text-foreground/60" />
                        <span>{studio.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 shrink-0 text-foreground/60" />
                        <span>{studio.email}</span>
                      </div>
                      {/* ✅ Professional GSTIN Display */}
                      <div className="flex items-center gap-3 pt-3 mt-2 border-t border-border/40">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700">
                          <FileText className="h-3.5 w-3.5 text-gray-500 dark:text-zinc-400" />
                          <span className="text-[10px] font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                            GSTIN
                          </span>
                          <span className="w-px h-4 bg-gray-300 dark:bg-zinc-600" />
                          <span className="font-mono text-xs font-bold text-black dark:text-white tracking-wider">
                            {GSTIN}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={studio.headImage}
                        alt={studio.headName}
                        className="h-14 w-14 rounded-full object-cover border-2 border-border/40"
                      />
                      <div>
                        <p className="font-bold text-sm">{studio.headName}</p>
                        <p className="text-xs text-muted-foreground">{studio.headRole}</p>
                      </div>
                    </div>

                    <div className="mt-4 pl-4 border-l-2 border-foreground/30">
                      <p className="text-sm italic text-muted-foreground/80 leading-relaxed">
                        "{studio.headQuote}"
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. TEAM SECTION ═══════════════ */}
      <section className="py-28 bg-background border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-6 bg-border"></div>
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">The Team</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                The people behind <br />
                <span className="italic font-normal text-foreground/60">the work.</span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg mb-10">
                Directors, DOPs, editors, designers, producers, and strategists — 35+ full-time
                specialists united by an unreasonable standard of craft.
              </p>

              <Link
                to="/team"
                className="inline-flex w-fit items-center gap-3 bg-ink text-ink-foreground px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-ink/80 hover:text-ink-foreground transition-all duration-300"
              >
                Meet the team <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-border/40 shadow-xl group">
                <img
                  src={teamGroup}
                  alt="The HappyLamb Production Crew"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-[1.03] grayscale-[10%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. FINAL BOTTOM CTA ═══════════════ */}
      <section className="bg-ink py-32 text-ink-foreground relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 via-transparent to-foreground/5 pointer-events-none"></div>
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Ready to build something <br />
              <span className="italic font-normal text-ink-foreground/40">worth watching</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-foreground/60 text-lg">
              Whether it's a single product shoot or a full brand launch — let's talk about what you
              need.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-foreground/10"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm text-ink-foreground/60 hover:text-ink-foreground transition-colors"
              >
                View portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
