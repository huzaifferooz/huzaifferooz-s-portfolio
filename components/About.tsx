"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Avatar from "./Avatar";
import { Icon } from "./icons";
import { ACHIEVEMENTS, SITE, type Achievement } from "@/lib/data";

function Milestone({ item }: { item: Achievement }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "start 48%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <motion.article ref={ref} style={{ opacity, x }} className="max-w-xl">
      <div className="glass mb-6 grid h-14 w-14 place-items-center rounded-2xl text-neon-cyan">
        <Icon name={item.icon} className="h-7 w-7" />
      </div>
      {item.year && <p className="mb-2 text-sm font-semibold text-neon-pink">{item.year}</p>}
      <h3 className="font-display text-2xl font-extrabold leading-tight sm:text-4xl">
        {item.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{item.body}</p>
    </motion.article>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-[6vw]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="grid place-items-center pt-[12vh] lg:sticky lg:top-0 lg:h-svh lg:self-start lg:pt-0">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass relative aspect-[4/5] w-[min(82%,420px)] overflow-hidden rounded-[32px] p-2"
          >
            <div className="h-full w-full overflow-hidden rounded-[26px]">
              {SITE.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={SITE.avatar} alt={SITE.name} className="h-full w-full object-cover" />
              ) : (
                <Avatar />
              )}
            </div>
            <div className="glass absolute inset-x-6 bottom-6 rounded-2xl px-4 py-3">
              <p className="font-display text-sm font-bold">{SITE.name}</p>
              <p className="text-xs text-white/60">{SITE.role}</p>
            </div>
          </motion.div>
        </div>

        <div className="space-y-[24vh] pb-[24vh] pt-[8vh] lg:pt-[30vh]">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold sm:text-5xl">About</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              I build apps for competitive gamers and tune the hardware they play on.
            </p>
          </div>
          {ACHIEVEMENTS.map((a) => (
            <Milestone key={a.title} item={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
