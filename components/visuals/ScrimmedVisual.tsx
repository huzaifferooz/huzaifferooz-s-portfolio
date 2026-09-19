"use client";

import { motion } from "framer-motion";

const PLAYERS = [
  { handle: "@nova", role: "IGL · Conqueror", c: "from-neon-violet to-neon-cyan" },
  { handle: "@vex", role: "Entry · Ace", c: "from-neon-pink to-neon-violet" },
  { handle: "@lumen", role: "Support · Crown", c: "from-neon-cyan to-neon-violet" },
];

function Chip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`glass absolute rounded-xl px-3 py-1.5 text-[11px] font-semibold text-white ${className}`}
      style={{ transform: "translateZ(90px)" }}
    >
      {children}
    </motion.div>
  );
}

export default function ScrimmedVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center [transform-style:preserve-3d]">
      <div className="absolute h-2/3 w-2/3 rounded-full bg-neon-violet/30 blur-3xl" />
      <div className="h-full [transform-style:preserve-3d]" style={{ transform: "translateZ(40px)" }}>
        <motion.div
          animate={{ rotateY: [-22, -8, -22], rotateX: [8, 4, 8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative aspect-[9/19] h-full rounded-[26px] border border-white/25 bg-[#0a0b16] p-[5px] shadow-[0_30px_60px_-20px_rgba(139,92,255,0.6)] [transform-style:preserve-3d]"
        >
          <div className="h-full w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#1a1140] via-[#0a0c1c] to-[#062733] p-3">
            <p className="text-[8px] font-semibold text-white/80">9:41</p>
            <p className="mt-2 text-[15px] font-extrabold leading-none text-white">Scrimmed</p>
            <p className="mt-1 text-[8px] text-white/60">Find your next squad</p>
            <div className="mt-3 space-y-2">
              {PLAYERS.map((p) => (
                <div
                  key={p.handle}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] p-2"
                >
                  <div className={`h-7 w-7 shrink-0 rounded-full bg-gradient-to-br ${p.c}`} />
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-white">{p.handle}</p>
                    <p className="truncate text-[7px] text-white/60">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan py-1.5 text-center text-[8px] font-extrabold text-ink">
              Send scrim invite
            </div>
          </div>
        </motion.div>
      </div>
      <Chip className="left-[4%] top-[14%]">Open to team</Chip>
      <Chip className="bottom-[16%] right-[3%]">Scrim tonight 9 PM</Chip>
    </div>
  );
}
