import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { TEAM, INTERNS } from "@/data/site";

// Main Team

import teamGroup from "@/assets/team.jpeg";
import m1 from "@/assets/Dilip Cofounder.jpeg";
import m2 from "@/assets/Executive Director.jpeg";
import m3 from "@/assets/Creative Director.jpeg";
import m4 from "@/assets/Director.jpeg";
import m5 from "@/assets/Head Editor.jpeg";
import m6 from "@/assets/Social Media.jpeg";
import m7 from "@/assets/Assistant.jpeg";

// Interns

import intern1 from "@/assets/interns/Editor.jpeg";
import intern2 from "@/assets/interns/Client Relation Associate.jpeg";
import intern3 from "@/assets/interns/Creative Media Associate.jpeg";

export const Route = createFileRoute("/team/")({
  component: Team,
  head: () => ({
    meta: [
      { title: "Our Team — Directors, DOPs & Producers | HappyLamb Production" },
      {
        name: "description",
        content:
          "The directors, cinematographers, producers, strategists and post artists behind HappyLamb Production's advertising and film work.",
      },
      { property: "og:title", content: "Meet the HappyLamb Production Team" },
      {
        property: "og:description",
        content: "The people who write, shoot, cut and deliver every campaign.",
      },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
});

const PHOTOS = [m1, m2, m3, m4, m5, m6, m7];
const INTERN_PHOTOS = [intern1, intern2, intern3];

function Team() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Check if member is Founder & CEO
  const isFounder = (role: string) => {
    return role === "Founder & CEO";
  };

  // Check if member is Creative Director - Patna Branch (HEAD)
  const isBranchHead = (role: string) => {
    return role === "Creative Director - Patna Branch (HEAD)";
  };

  return (
    <>
      {/* ═══════════════ 1. HERO (SYMMETRIC) ═══════════════ */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center pt-28 pb-12 bg-background dark:bg-zinc-950 border-b border-border/40 dark:border-zinc-800">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 w-full">
          <Reveal>
            {/* Tiny Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-border/50 dark:bg-zinc-700"></div>
              <p className="text-xs tracking-[0.3em] text-foreground/60 dark:text-zinc-400 uppercase font-medium">
                Our Team
              </p>
            </div>

            {/* Italic + Bold Heading */}
            <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-tighter font-medium text-foreground dark:text-white max-w-4xl">
              The crew behind <br />
              <span className="italic text-muted-foreground/60 dark:text-zinc-400">
                every frame.
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 2. TEAM GROUP PHOTO ═══════════════ */}
      <section className="py-12 bg-background dark:bg-zinc-950">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal
            delay={0.1}
            className="overflow-hidden rounded-xl border border-border/40 dark:border-zinc-800 shadow-sm"
          >
            <img
              src={teamGroup}
              alt="The full HappyLamb Production crew in the studio"
              width={1920}
              height={912}
              className="w-full aspect-video object-cover grayscale-[10%] dark:grayscale-[20%]"
            />
          </Reveal>
          <p className="mt-4 text-center text-xs text-muted-foreground dark:text-zinc-500 tracking-wider">
            Studio 04, Mumbai — the full crew, between two shoot days.
          </p>
        </div>
      </section>

      {/* ═══════════════ 3. TEAM GRID (Professional & Minimal) ═══════════════ */}
      <section className="py-24 bg-background dark:bg-zinc-950">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => {
              const photo = PHOTOS[i % PHOTOS.length];
              const lead = member.rank === 1;
              const offset =
                i % 3 === 1 ? "lg:translate-y-14" : i % 3 === 2 ? "lg:translate-y-6" : "";
              const isFounderMember = isFounder(member.role);
              const isBranchHeadMember = isBranchHead(member.role);
              const showSocial = isFounderMember || isBranchHeadMember;

              return (
                <Reveal
                  key={member.name}
                  delay={(i % 3) * 0.08}
                  className={`${lead ? "sm:col-span-2 lg:col-span-2" : ""} ${offset}`}
                >
                  <article
                    className={`group h-full ${lead ? "grid gap-8 sm:grid-cols-2 sm:items-center" : ""}`}
                    onMouseEnter={() => setHoveredId(member.name)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Photo */}
                    <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-border/40 dark:border-zinc-800 bg-surface shadow-sm transition-all duration-300 hover:border-border/60 dark:hover:border-zinc-600">
                      <img
                        src={photo}
                        alt={`${member.name}, ${member.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Social Links - Only visible on hover */}
                      {showSocial && (
                        <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {/* LinkedIn */}
                          <a
                            href={member.linkedin || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground dark:bg-zinc-900 dark:text-white transition hover:bg-foreground hover:text-background dark:hover:bg-white dark:hover:text-zinc-950"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>

                          {/* Instagram */}
                          <a
                            href={member.instagram || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground dark:bg-zinc-900 dark:text-white transition hover:bg-foreground hover:text-background dark:hover:bg-white dark:hover:text-zinc-950"
                          >
                            <Instagram className="h-4 w-4" />
                          </a>

                          {/* YouTube - only for Branch Head */}
                          {isBranchHeadMember && (
                            <a
                              href={member.youtube || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on YouTube`}
                              className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground dark:bg-zinc-900 dark:text-white transition hover:bg-foreground hover:text-background dark:hover:bg-white dark:hover:text-zinc-950"
                            >
                              <Youtube className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Text - Professional & Minimal */}
                    <div className={lead ? "max-w-xl sm:mt-0" : "mt-6"}>
                      {/* FULL NAME */}
                      <h2
                        className={`font-medium tracking-tight text-foreground dark:text-white ${lead ? "text-4xl sm:text-5xl" : "text-3xl"}`}
                      >
                        {member.name}
                      </h2>

                      {/* ROLE */}
                      <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground/80 dark:text-zinc-400 uppercase font-medium">
                        {member.role}
                      </p>

                      {/* BIO */}
                      <p
                        className={`mt-4 leading-relaxed italic text-muted-foreground/80 dark:text-zinc-400 ${lead ? "text-base" : "text-sm"}`}
                      >
                        {member.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. INTERNSHIP PROGRAM (Clean & Premium) ═══════════════ */}
      <section className="border-y border-border/30 dark:border-zinc-800 bg-surface/50 dark:bg-zinc-900/50 py-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-6 bg-border dark:bg-zinc-700"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground dark:text-zinc-400 uppercase">
                Internship Program
              </p>
              <div className="h-px w-6 bg-border dark:bg-zinc-700"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground dark:text-white">
              Future talent <br />
              <span className="italic text-muted-foreground/60 dark:text-zinc-400">
                in the making.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground dark:text-zinc-400 text-base">
              Meet the bright minds learning the craft alongside our core team — bringing fresh
              energy, new perspectives, and a hunger to create.
            </p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {INTERNS.map((intern, i) => {
              const photo = INTERN_PHOTOS[i % INTERN_PHOTOS.length];
              return (
                <Reveal key={intern.name} delay={i * 0.08}>
                  <div
                    className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-border/40 dark:border-zinc-800 bg-background dark:bg-zinc-950 shadow-sm transition-all duration-300 hover:border-border/60 dark:hover:border-zinc-600"
                    onMouseEnter={() => setHoveredId(intern.name)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Intern Photo - Same as Team */}
                    <div className="relative aspect-3/4 overflow-hidden">
                      <img
                        src={photo}
                        alt={`${intern.name}, ${intern.role}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Social Links - Same transparent gradient as Team (Only LinkedIn) */}
                      <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <a
                          href={intern.linkedin || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${intern.name} on LinkedIn`}
                          className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground dark:bg-zinc-900 dark:text-white transition hover:bg-foreground hover:text-background dark:hover:bg-white dark:hover:text-zinc-950"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Intern Info - Made EXACTLY like Team Card */}
                    <div className="mt-6 px-6 pb-6 flex-grow">
                      {/* FULL NAME - Same as Team */}
                      <h3 className="font-medium text-3xl tracking-tight text-foreground dark:text-white">
                        {intern.name}
                      </h3>

                      {/* ROLE - Same as Team */}
                      <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground/80 dark:text-zinc-400 uppercase font-medium">
                        {intern.role}
                      </p>

                      {/* BIO - Same as Team (Italic) */}
                      <p className="mt-4 text-sm leading-relaxed italic text-muted-foreground/80 dark:text-zinc-400">
                        {intern.bio}
                      </p>

                      {/* Subtle Intern Line (To differentiate, but VERY clean) */}
                      <div className="mt-4 pt-4 border-t border-border/30 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] tracking-wider text-muted-foreground dark:text-zinc-500 uppercase">
                            Intern
                          </span>
                          <span className="text-[10px] text-muted-foreground/60 dark:text-zinc-500">
                            {intern.duration || "6 months"} • Mentored by{" "}
                            {intern.mentor || "Core Team"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* CTA - Apply for Internship */}
          <Reveal delay={0.2} className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-border/40 dark:border-zinc-800 bg-background/50 dark:bg-zinc-900/50 px-6 py-3 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground dark:text-zinc-400">
                🌱 Interested in interning with us?
              </span>
              <a
                href="/careers"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground dark:text-white transition hover:gap-3"
              >
                Apply now →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ 5. STUDIO CULTURE (Clean Split) ═══════════════ */}
      <section className="py-24 bg-background dark:bg-zinc-950">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-6 bg-border dark:bg-zinc-700"></div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground dark:text-zinc-400 uppercase">
                Culture
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground dark:text-white">
              How we work together.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-muted-foreground dark:text-zinc-400">
            <p className="text-lg leading-relaxed">
              Small teams, senior people, no layers between the client and the person actually
              making the work. Every project has one producer who owns it end to end.
            </p>
            <p className="leading-relaxed">
              We invest in craft and in tooling — our AI-assisted post pipeline exists so our
              editors spend their hours on taste, not on logging footage. Machines handle the
              repetition. The decisions stay human.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
