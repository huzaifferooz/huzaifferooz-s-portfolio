"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { SKILLS } from "@/lib/data";

const SkillsOrbit = dynamic(() => import("./three/SkillsOrbit"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function Skills() {
  const [active, setActive] = useState<number | null>(null);
  const skill = active === null ? null : SKILLS[active];

  return (
    <section id="skills" className="relative px-[6vw] py-[14vh]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">Skills</h2>
          <p className="mt-3 max-w-[38ch] text-white/70">
            Languages and tools I'm learning and using. Hover or tap a tile to read more.
          </p>
          <div className="glass mt-8 min-h-[9rem] rounded-2xl p-5" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active ?? "none"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {skill ? (
                  <>
                    <h3 className="font-display text-lg font-bold" style={{ color: skill.color }}>
                      {skill.title}
                    </h3>
                    <p className="mt-2 text-white/75">{skill.detail}</p>
                  </>
                ) : (
                  <p className="text-white/60">Pick a tile to see what I do with it.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <ul className="sr-only">
            {SKILLS.map((s) => (
              <li key={s.title}>
                {s.title}: {s.detail}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[70svh] min-h-[420px] w-full">
          <SkillsOrbit active={active} setActive={setActive} />
        </div>
      </div>
    </section>
  );
}
