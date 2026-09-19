"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TiltCard from "./TiltCard";
import ScrimmedVisual from "./visuals/ScrimmedVisual";
import ShockShieldVisual from "./visuals/ShockShieldVisual";
import RomVisual from "./visuals/RomVisual";
import ZeltaVisual from "./visuals/ZeltaVisual";
import { PROJECTS, type Project } from "@/lib/data";

const VISUALS: Record<Project["id"], () => JSX.Element> = {
  scrimmed: ScrimmedVisual,
  shockshield: ShockShieldVisual,
  roms: RomVisual,
  zelta: ZeltaVisual,
};

function ProjectCard({ p }: { p: Project }) {
  const Visual = VISUALS[p.id];
  return (
    <TiltCard
      accent={p.accent}
      className="h-[66svh] max-h-[640px] min-h-[440px] w-[82vw] shrink-0 sm:w-[62vw] lg:w-[44vw] xl:w-[38vw]"
    >
      <div className="flex h-full flex-col p-5 [transform-style:preserve-3d] sm:p-6">
        <div className="relative min-h-0 flex-1 [transform-style:preserve-3d]">
          <Visual />
        </div>
        <div className="pt-5" style={{ transform: "translateZ(24px)" }}>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }}
            />
            {p.kind}
          </div>
          <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{p.title}</h3>
          <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-white/70 sm:text-base">
            {p.blurb}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
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
    <section
      id="projects"
      ref={section}
      className="relative"
      style={{ height: `calc(100svh + ${dist}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-6 overflow-hidden pt-16">
        <div className="px-[6vw]">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Projects</h2>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            Apps, hardware, operating systems and brand work.
          </p>
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max items-center gap-[4vw] px-[6vw] will-change-transform"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </motion.div>

        <div className="mx-[6vw] flex items-center gap-4">
          <div className="h-[2px] flex-1 bg-white/15">
            <motion.div
              style={{ scaleX: smooth }}
              className="h-full origin-left bg-gradient-to-r from-neon-violet to-neon-cyan"
            />
          </div>
          <motion.span className="w-12 text-right text-xs tabular-nums text-white/60">
            {label}
          </motion.span>
        </div>
      </div>
    </section>
  );
}
