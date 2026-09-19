"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const BLOBS = [0, 1, 2, 3, 4];

export default function LiquidButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Magnetic>
      <motion.button
        type="button"
        onClick={onClick}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap={{ scale: 0.97 }}
        className="relative isolate animate-glow overflow-hidden rounded-full border border-white/20 bg-white/[0.06] px-10 py-5 font-display text-sm font-semibold text-white backdrop-blur-md"
      >
        <span
          className="absolute inset-0 -z-10"
          style={{ filter: "url(#goo)" }}
          aria-hidden
        >
          {BLOBS.map((i) => (
            <motion.span
              key={i}
              variants={{
                rest: { y: "105%", scale: 0.8 },
                hover: { y: "-15%", scale: 1.5 },
              }}
              transition={{
                duration: 0.75,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-0 h-full rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan"
              style={{ left: `${i * 20 - 10}%`, width: "36%" }}
            />
          ))}
        </span>
        <span className="relative">{children}</span>
      </motion.button>
    </Magnetic>
  );
}
