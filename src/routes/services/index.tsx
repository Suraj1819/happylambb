import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES, getServiceCoverImage } from "@/data/site"; // 🟢 New function imported

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      {
        title: "Production Services — Ad Films, Photography & Branding | HappyLamb",
      },
      {
        name: "description",
        content:
          "End-to-end advertising production: TVCs, product photography, corporate films, catalogue shoots, social media content and digital campaigns — all under one roof.",
      },
      {
        property: "og:title",
        content: "Production Services — HappyLamb Production",
      },
      {
        property: "og:description",
        content: "Strategy to delivery — every production speciality handled by our in-house team.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function ServicesIndex() {
  return (
    <>
      {/* ═══════════════ 1. HERO (PERFECT WEIGHT - NO ORANGE) ═══════════════ */}
      <section className="relative overflow-hidden min-h-[55vh] flex items-center pt-28 pb-16 bg-background dark:bg-zinc-950 border-b border-border/40 dark:border-zinc-800">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <Reveal className="max-w-4xl">
            {/* Divider Line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-border/50 dark:bg-zinc-700"></div>
              <p className="text-[10px] tracking-[0.4em] text-muted-foreground dark:text-zinc-400 uppercase font-medium">
                Our Services
              </p>
            </div>

            {/* Bold Heading + Italic Subtitle */}
            <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tight font-medium text-foreground dark:text-white">
              Creative production <br />
              <span className="italic font-normal text-muted-foreground dark:text-zinc-400">
                solutions built to elevate your brand.
              </span>
            </h1>

            {/* Professional Paragraph */}
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 dark:text-zinc-400 leading-relaxed tracking-wide font-light">
              Happy Lamb Production partners with leading brands across food & beverage, health &
              lifestyle, sports, technology, pharmaceuticals, and leisure. We help brands tell their
              stories through a unique blend of creativity, technology, innovation, and
              passion—creating impactful content that connects, inspires, and delivers results.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-b border-foreground/40 dark:border-zinc-500 pb-1 text-sm tracking-[0.15em] font-medium hover:gap-4 hover:border-foreground dark:hover:border-white transition-all duration-300"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 2. SERVICES GRID (FLAT 2D - NO 3D) ═══════════════ */}
      <section className="bg-background dark:bg-zinc-950 py-24 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/20 dark:border-zinc-800 bg-surface/40 dark:bg-zinc-900/50 transition-all duration-300 hover:border-border/60 dark:hover:border-zinc-600 hover:bg-surface/60 dark:hover:bg-zinc-800/50"
                >
                  {/* 🟢 Image: Folder se pehli photo uthayega */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={getServiceCoverImage(s.slug, s.image)}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content - Clean Minimal Layout */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    {/* Clean Title (No Bold) */}
                    <h2 className="font-normal text-xl tracking-tight text-foreground/90 dark:text-zinc-200 group-hover:text-foreground dark:group-hover:text-white transition-colors">
                      {s.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-3 flex-1 text-sm text-muted-foreground/80 dark:text-zinc-400 leading-relaxed tracking-wide font-light">
                      {s.short}
                    </p>

                    {/* Flat Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-border/30 dark:border-zinc-800 pt-5">
                      <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground/60 dark:text-zinc-500 uppercase group-hover:text-foreground/80 dark:group-hover:text-zinc-300 transition-colors">
                        View details
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/40 dark:text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground/70 dark:group-hover:text-zinc-300" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. BOTTOM CTA (NO ORANGE - DARK THEME) ═══════════════ */}
      <section className="bg-ink py-28 text-ink-foreground relative overflow-hidden border-t border-ink-foreground/10 dark:border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 dark:from-white/10 pointer-events-none"></div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight text-white">
              Ready to build something <br />
              <span className="italic font-normal text-zinc-400">worth watching</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-zinc-400 text-lg tracking-wide leading-relaxed font-light">
              Not sure which service fits? Tell us what you're trying to achieve. We'll map the
              right production approach and give you a straight answer.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* 🚫 ORANGE REMOVED: Black Button */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-foreground text-background dark:bg-white dark:text-zinc-950 px-10 py-4 rounded-full text-sm font-medium tracking-[0.1em] transition-all duration-300 hover:bg-foreground/90 dark:hover:bg-zinc-200 hover:scale-105 shadow-xl shadow-foreground/10 dark:shadow-white/10"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
              >
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
