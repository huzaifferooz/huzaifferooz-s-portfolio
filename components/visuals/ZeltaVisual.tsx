"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ZELTA_MEDIA } from "@/lib/data";

function Tile({
  index,
  active,
  className,
  children,
}: {
  index: number;
  active: number;
  className: string;
  children: React.ReactNode;
}) {
  const media = ZELTA_MEDIA[index];
  const on = active === index;
  return (
    <motion.div
      animate={{ scale: on ? 1.04 : 1, opacity: on ? 1 : 0.7 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl border ${on ? "border-neon-pink/70" : "border-white/15"} ${className}`}
      style={{ boxShadow: on ? "0 0 30px -6px rgba(255,61,154,0.7)" : undefined }}
    >
      {media?.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={media.label} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        children
      )}
      <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur">
        {media?.label}
      </span>
    </motion.div>
  );
}

export default function ZeltaVisual() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ZELTA_MEDIA.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2"
      style={{ transform: "translateZ(30px)" }}
    >
      <Tile index={0} active={active} className="row-span-2 grid place-items-center bg-gradient-to-br from-[#2a0f3d] to-[#12061f]">
        <svg viewBox="0 0 100 100" className="w-3/4" aria-hidden>
          <defs>
            <linearGradient id="zl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff3d9a" />
              <stop offset="1" stopColor="#8b5cff" />
            </linearGradient>
          </defs>
          <polygon points="50,4 92,27 92,73 50,96 8,73 8,27" fill="url(#zl)" />
          <path d="M32 34h36L32 66h36" fill="none" stroke="#05060b" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Tile>

      <Tile index={1} active={active} className="bg-gradient-to-br from-neon-pink/80 to-neon-violet/80">
        <div className="absolute inset-0 grid place-items-center">
          <span className="h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white/90" />
        </div>
        <div className="absolute left-2 top-2 h-1.5 w-1/2 rounded-full bg-white/60" />
        <div className="absolute left-2 top-5 h-1.5 w-1/3 rounded-full bg-white/35" />
      </Tile>

      <Tile index={2} active={active} className="bg-gradient-to-br from-neon-violet/80 to-neon-cyan/70">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/25 blur-xl" />
        <div className="absolute left-2 top-2 h-1.5 w-2/3 rounded-full bg-white/60" />
        <div className="absolute left-2 top-5 h-1.5 w-1/2 rounded-full bg-white/35" />
      </Tile>

      <Tile index={3} active={active} className="col-span-2 bg-[#0d0a18] p-2">
        <div className="space-y-1.5 pt-1">
          {[
            ["w-2/3", "bg-neon-pink/70", "ml-0"],
            ["w-1/2", "bg-neon-violet/70", "ml-[20%]"],
            ["w-3/4", "bg-neon-cyan/70", "ml-[8%]"],
          ].map(([w, c, m], i) => (
            <div key={i} className={`h-3 rounded ${w} ${c} ${m}`} />
          ))}
        </div>
        <motion.div
          className="absolute bottom-6 top-2 w-px bg-white"
          initial={{ left: "4%" }}
          animate={{ left: "96%" }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
        />
      </Tile>
    </div>
  );
}
