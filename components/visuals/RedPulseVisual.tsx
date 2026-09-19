"use client";

import { motion } from "framer-motion";

function Chip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`glass absolute rounded-xl px-3 py-1.5 text-[11px] font-semibold text-white ${className}`}
      style={{ transform: "translateZ(70px)" }}
    >
      {children}
    </motion.div>
  );
}

// Map-style panel: pulsing location pin plus an animated heartbeat line
export default function RedPulseVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center [transform-style:preserve-3d]">
      <div className="absolute h-2/3 w-2/3 rounded-full bg-[#ff3b4e]/25 blur-3xl" />
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40"
        style={{ transform: "translateZ(20px)" }}
      >
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Map with a pulsing location marker and a heartbeat line"
        >
          <defs>
            <pattern id="rp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          <rect width="400" height="240" fill="url(#rp-grid)" />
          <path
            d="M0 70 C80 60 120 110 200 100 S330 60 400 90M90 0 C100 60 80 140 120 240M280 0 C270 80 310 150 290 240"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="200"
              cy="85"
              r="14"
              fill="none"
              stroke="#ff3b4e"
              strokeWidth="2"
              animate={{ r: [14, 70], opacity: [0.8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.85, ease: "easeOut" }}
            />
          ))}
          <circle cx="200" cy="85" r="13" fill="#ff3b4e" />
          <path d="M200 78v14M193 85h14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <motion.path
            d="M0 155 H120 L138 155 L152 124 L172 184 L192 138 L206 155 H400"
            fill="none"
            stroke="#ff3b4e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
      <Chip className="left-[4%] top-[10%]">Location-based</Chip>
      <Chip className="bottom-[10%] right-[4%]">Home healthcare</Chip>
    </div>
  );
}
