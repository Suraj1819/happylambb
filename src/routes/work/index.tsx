import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS, CATEGORIES, getProjectFolderImages } from "@/data/site";

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  head: () => ({
    meta: [
      { title: "Our Work — HappyLamb Production" },
      {
        name: "description",
        content:
          "Explore our portfolio of ad films, corporate videos, product photography, and brand campaigns.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});

function WorkIndex() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const getCount = (cat: string) => {
    if (cat === "All") return PROJECTS.length;
    return PROJECTS.filter(p => p.category === cat).length;
  };

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <>
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="relative overflow-hidden min-h-[55vh] flex items-center pt-28 pb-16 bg-background dark:bg-zinc-950 border-b border-border/40 dark:border-zinc-800">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <Reveal className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-border/50 dark:bg-zinc-700"></div>
              <p className="text-[10px] tracking-[0.4em] text-muted-foreground dark:text-zinc-400 uppercase font-medium">
                Portfolio
              </p>
            </div>
            
            <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tight font-medium text-foreground dark:text-white">
              Work we're <br />
              <span className="italic font-normal text-muted-foreground dark:text-zinc-400">
                proud of.
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground/90 dark:text-zinc-400 leading-relaxed tracking-wide font-light">
              A curated selection of brand films, commercial spots, catalogue campaigns, 
              and corporate stories we've crafted for clients across India.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-b border-foreground/40 dark:border-zinc-500 pb-1 text-sm tracking-[0.15em] font-medium hover:gap-4 hover:border-foreground dark:hover:border-white transition-all duration-300 cursor-pointer"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 2. FILTER TABS + GRID ═══════════════ */}
      <section className="bg-background dark:bg-zinc-950 py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          
          {/* 🟢 TABS - Tight kiye hain */}
          <div className="mb-10 border-b border-border/30 dark:border-zinc-800 pb-4 overflow-x-auto">
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {CATEGORIES.map((cat) => {
                const count = getCount(cat);
                if (count === 0) return null;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group flex items-center gap-2 pb-1 border-b-2 transition-all duration-300 text-sm tracking-wide font-medium cursor-pointer ${
                      activeCategory === cat
                        ? "border-foreground text-foreground dark:border-white dark:text-white"
                        : "border-transparent text-muted-foreground/70 hover:text-foreground dark:text-zinc-500 dark:hover:text-zinc-300"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] font-normal transition-colors ${
                      activeCategory === cat
                        ? "text-foreground/60 dark:text-white/60"
                        : "text-muted-foreground/40 dark:text-zinc-600"
                    }`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🟢 GRID - Gap ko 6 kar diya hai */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p, i) => {
              const folderImages = getProjectFolderImages(p.slug);
              const thumbnailSrc = folderImages.length > 0 ? folderImages[0] : p.image;

              return (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/20 dark:border-zinc-800 bg-surface/40 dark:bg-zinc-900/50 transition-all duration-300 hover:border-border/60 dark:hover:border-zinc-600 hover:bg-surface/60 dark:hover:bg-zinc-800/50 cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={thumbnailSrc}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h2 className="font-normal text-lg sm:text-xl tracking-tight text-foreground/90 dark:text-zinc-200 group-hover:text-foreground dark:group-hover:text-white transition-colors">
                        {p.title}
                      </h2>
                      
                      <p className="mt-2 flex-1 text-sm text-muted-foreground/80 dark:text-zinc-400 leading-relaxed tracking-wide font-light">
                        {p.client} &middot; {p.category}
                      </p>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-border/30 dark:border-zinc-800 pt-4">
                        <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground/60 dark:text-zinc-500 uppercase group-hover:text-foreground/80 dark:group-hover:text-zinc-300 transition-colors">
                          View details
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/40 dark:text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground/70 dark:group-hover:text-zinc-300" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground dark:text-zinc-500">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ 3. BOTTOM CTA ═══════════════ */}
      <section className="bg-ink py-28 text-ink-foreground relative overflow-hidden border-t border-ink-foreground/10 dark:border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 dark:from-white/10 pointer-events-none"></div>
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight text-white">
              Ready to build something <br />
              <span className="italic font-normal text-zinc-400">
                worth watching
              </span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-zinc-400 text-lg tracking-wide leading-relaxed font-light">
              Not sure which project fits your brand? Let's talk. We'll show you how we turn briefs into films.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-foreground text-background dark:bg-white dark:text-zinc-950 px-10 py-4 rounded-full text-sm font-medium tracking-[0.1em] transition-all duration-300 hover:bg-foreground/90 dark:hover:bg-zinc-200 hover:scale-105 shadow-xl shadow-foreground/10 dark:shadow-white/10 cursor-pointer"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                Explore services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}