"use client";

import { useEffect, useState } from "react";

const LINES: { t: string; c: string }[] = [
  { t: "$ repo sync -c --no-tags", c: "text-white" },
  { t: "$ source build/envsetup.sh", c: "text-white" },
  { t: "$ brunch lineage", c: "text-white" },
  { t: "kernel: tuning scheduler and thermal limits", c: "text-neon-cyan" },
  { t: "kernel: gaming profile for sustained clocks", c: "text-neon-cyan" },
  { t: "build completed successfully", c: "text-neon-amber" },
];

const DEVICES = [
  { name: "Redmi Note 10S", meta: "Helio G95 · LineageOS" },
  { name: "OnePlus 7T", meta: "SM8150 · Kernel work" },
];

export default function RomVisual() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= LINES.length + 3 ? 1 : v + 1)), 900);
    return () => clearInterval(id);
  }, []);
  const shown = LINES.slice(0, Math.min(n, LINES.length));

  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-3 [transform-style:preserve-3d]">
      <div className="absolute left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-neon-cyan/20 blur-3xl" />
      <div
        className="relative rounded-2xl border border-white/15 bg-black/50 p-3 font-mono text-[10px] leading-6 sm:text-xs"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="mb-2 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        {shown.map((l) => (
          <p key={l.t} className={`truncate ${l.c}`}>
            {l.t}
          </p>
        ))}
        <span className="inline-block h-3 w-1.5 animate-blink bg-white/80 align-middle" />
      </div>
      <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(60px)" }}>
        {DEVICES.map((d) => (
          <div key={d.name} className="glass rounded-xl px-3 py-2">
            <p className="text-xs font-bold text-white">{d.name}</p>
            <p className="text-[10px] text-white/60">{d.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
