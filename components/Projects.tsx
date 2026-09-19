"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TiltCard from "./TiltCard";
import RedPulseVisual from "./visuals/RedPulseVisual";
import { PROJECTS, type Project } from "@/lib/data";

// Add a visual here for each project id. Projects without one get a plain placeholder.
const VISUALS: Record<string, () => JSX.Element> = {
  redpulse: RedPulseVisual,
};

function Placeholder() {
  return <div className="h-full w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />;
}

function StatusBadge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      style={{ borderColor: `${color}66`, color, background: `${color}14` }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: color }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
      </span>
      {text}
    </span>
  );
}

function ProjectCard({ p, className }: { p: Project; className: string }) {
  const Visual = VISUALS[p.id] ?? Placeholder;
  return (
    <TiltCard accent={p.accent} className={className}>
      <div className="flex h-full flex-col p-5 [transform-style:preserve-3d] sm:p-6">
        <div className="relative min-h-0 flex-1 [transform-style:preserve-3d]">
          <Visual />
        </div>
        <div className="pt-5" style={{ transform: "translateZ(24px)" }}>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="h-2 w-2 rounded-full" style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
            {p.kind}
            {p.status && <StatusBadge text={p.status} color={p.accent} />}
          </div>
          <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{p.title}</h3>
          <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-white/70 sm:text-base">{p.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TiltCard>
  );
}

// One project: a single centered card, no horizontal scrolling
function Featured({ p }: { p: Project }) {
  return (
    <section id="projects" className="relative px-[6vw] py-[14vh]">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Project</h2>
        <p className="mt-2 text-sm text-white/60 sm:text-base">What I'm building right now.</p>
        <div className="mt-10">
          <ProjectCard p={p} className="mx-auto h-[70svh] min-h-[480px] max-h-[660px] w-full" />
        </div>
      </div>
    </section>
  );
}

// Two or more projects: pinned section that scrolls the cards sideways
function Scroller() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);
  const label = useTransform(
    smooth,
    (v) => `${Math.min(PROJECTS.length, Math.floor(v * PROJECTS.length) + 1)} / ${PROJECTS.length}`
  );

  return (
    <section id="projects" ref={section} className="relative" style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-6 overflow-hidden pt-16">
        <div className="px-[6vw]">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Projects</h2>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-[4vw] px-[6vw] will-change-transform">
          {PROJECTS.map((p) => (
            <a
              key={p.id}
              href={p.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
          >
            <ProjectCard
              p={p}
              className="h-[66svh] max-h-[640px] min-h-[440px] w-[82vw] shrink-0 sm:w-[62vw] lg:w-[44vw] xl:w-[38vw]"
            />
          </a>
        ))}
        </motion.div>
        <div className="mx-[6vw] flex items-center gap-4">
          <div className="h-[2px] flex-1 bg-white/15">
            <motion.div style={{ scaleX: smooth }} className="h-full origin-left bg-gradient-to-r from-neon-violet to-neon-cyan" />
          </div>
          <motion.span className="w-12 text-right text-xs tabular-nums text-white/60">{label}</motion.span>
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  if (PROJECTS.length === 0) return null;
  if (PROJECTS.length === 1) return <Featured p={PROJECTS[0]} />;
  return <Scroller />;
}
