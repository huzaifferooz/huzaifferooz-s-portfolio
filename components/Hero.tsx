"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import LiquidButton from "./LiquidButton";
import { scrollToId } from "@/lib/lenis";
import { PROJECTS, SITE } from "@/lib/data";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const letter = {
  hidden: { opacity: 0, y: "0.35em", scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function Word({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block whitespace-nowrap" aria-hidden>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          variants={letter}
          transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-gradient-to-b from-white via-white to-[#a9b4ff] bg-clip-text py-[0.05em] text-transparent"
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [first, last] = SITE.name.split(" ");
  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-[9svh] z-10 h-[50svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:top-0 lg:h-auto lg:w-[60%]"
      >
        <HeroScene />
      </motion.div>

      <div className="pointer-events-none relative z-20 flex min-h-svh flex-col justify-end px-[6vw] pb-[9svh] pt-32">
        <motion.h1
          aria-label={SITE.name}
          initial="hidden"
          animate="show"
          className="font-display text-[clamp(3.4rem,14vw,13rem)] font-black leading-[0.9] tracking-[-0.03em]"
        >
          <Word text={first} delay={1.4} />
          <Word text={last} delay={1.75} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-label={`${SITE.role} | ${SITE.tagline}`}
          className="mt-6 flex max-w-[40rem] flex-wrap items-center gap-x-4 gap-y-1 text-base text-white/70 md:text-xl"
        >
          <span className="font-semibold text-white">{SITE.role}</span>
          <span aria-hidden className="h-5 w-px bg-white/30" />
          <span>{SITE.tagline}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto mt-9"
        >
          <LiquidButton onClick={() => scrollToId(PROJECTS.length ? "projects" : "about")}>
            {PROJECTS.length ? "View Projects" : "About me"}
          </LiquidButton>
        </motion.div>
      </div>
    </section>
  );
}
