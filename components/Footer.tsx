"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/data";
import { scrollToId } from "@/lib/lenis";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden px-[6vw] pb-8 pt-[18vh]"
    >
      <p className="max-w-md text-lg text-white/70">
        Have an app, a tool or a team that needs shipping? Send me a message.
      </p>

      <div>
        <motion.a
          href={`mailto:${SITE.email}`}
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileFocus="hover"
          data-cursor="big"
          aria-label={`Let's Build. Email ${SITE.email}`}
          className="group block select-none font-display text-[19vw] font-black leading-[0.95] sm:text-[10.5vw]"
        >
          <motion.span
            variants={{
              rest: { letterSpacing: "-0.04em", scale: 1 },
              hover: { letterSpacing: "0.01em", scale: 1.03 },
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block origin-left bg-gradient-to-r from-neon-violet via-neon-cyan to-neon-pink bg-clip-text text-transparent transition-[background-size] duration-700 [background-repeat:no-repeat] [background-size:0%_100%] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)] group-hover:[background-size:100%_100%] group-focus-visible:[background-size:100%_100%]"
          >
            Let&apos;s
            <br className="sm:hidden" /> Build
          </motion.span>
        </motion.a>
        <p className="mt-6 text-white/60">{SITE.email}</p>
      </div>

      <div className="mt-16 flex items-center justify-between text-sm text-white/50">
        <span>&copy; {new Date().getFullYear()} {SITE.name}</span>
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="rounded-full border border-white/15 px-4 py-2 transition-colors hover:bg-white/10 hover:text-white"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
