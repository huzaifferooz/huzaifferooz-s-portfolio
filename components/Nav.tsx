"use client";

import { motion } from "framer-motion";
import { scrollToId } from "@/lib/lenis";
import { PROJECTS } from "@/lib/data";

const LINKS: [string, string][] = [
  ...(PROJECTS.length ? ([["Work", "projects"]] as [string, string][]) : []),
  ["Skills", "skills"],
  ["About", "about"],
  ["Contact", "contact"],
];

export default function Nav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
          aria-label="Back to top"
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-neon-violet to-neon-cyan font-display text-xs font-black text-ink"
        >
          HF
        </a>
        {LINKS.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(id);
            }}
            className="rounded-full px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
          >
            {label}
          </a>
        ))}
      </motion.nav>
    </div>
  );
}
