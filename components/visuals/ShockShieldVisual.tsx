"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const YS = [55, 120, 185];
const LOADS = ["Lights", "Sockets", "Fan"];

const PHASES = [
  { status: "All circuits normal", leak: "0.3 mA", tone: "#22e1ff" },
  { status: "Fault detected on circuit 2", leak: "38 mA", tone: "#ff4d5e" },
  { status: "Circuit 2 isolated", leak: "0 mA", tone: "#ffb020" },
];

export default function ShockShieldVisual() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), 2600);
    return () => clearInterval(id);
  }, []);

  const fault = phase === 1;
  const isolated = phase === 2;
  const cur = PHASES[phase];

  const wireColor = (i: number) => {
    if (i !== 1) return "#22e1ff";
    if (fault) return "#ff4d5e";
    if (isolated) return "rgba(255,255,255,0.2)";
    return "#22e1ff";
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 [transform-style:preserve-3d]">
      <div className="relative min-h-0 w-full flex-1" style={{ transform: "translateZ(30px)" }}>
        <svg
          viewBox="0 0 400 240"
          className="h-full w-full"
          role="img"
          aria-label="Home wiring diagram: a fault on circuit 2 is detected and the circuit is isolated"
        >
          <defs>
            <pattern id="ss-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.06)" />
            </pattern>
            <filter id="ss-glow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="400" height="240" fill="url(#ss-grid)" />

          {/* breaker box */}
          <rect x="20" y="70" width="76" height="100" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" />
          {YS.map((_, i) => {
            const y = 82 + i * 27;
            const off = i === 1 && isolated;
            return (
              <g key={i}>
                <rect x="34" y={y} width="20" height="22" rx="4" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.25)" />
                <motion.rect
                  x="37"
                  width="14"
                  height="9"
                  rx="3"
                  fill={off ? "#ffb020" : "#22e1ff"}
                  animate={{ y: off ? y + 11 : y + 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <text x="62" y={y + 15} fontSize="9" fill="rgba(255,255,255,0.6)">
                  C{i + 1}
                </text>
              </g>
            );
          })}

          {/* wires */}
          {YS.map((y, i) => {
            const dead = i === 1 && isolated;
            return (
              <path
                key={i}
                d={`M96 120 H150 V${y} H316`}
                fill="none"
                stroke={wireColor(i)}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={dead ? undefined : "flow"}
                strokeDasharray={dead ? "2 7" : undefined}
                filter={dead ? undefined : "url(#ss-glow)"}
              />
            );
          })}

          {/* loads */}
          {YS.map((y, i) => {
            const dead = i === 1 && isolated;
            return (
              <g key={i} opacity={dead ? 0.35 : 1}>
                <rect x="316" y={y - 16} width="52" height="32" rx="9" fill="rgba(255,255,255,0.06)" stroke={wireColor(i)} />
                <text x="342" y={y + 4} fontSize="9" textAnchor="middle" fill="white">
                  {LOADS[i]}
                </text>
              </g>
            );
          })}

          {/* fault spark */}
          {fault && (
            <motion.g
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.45, repeat: Infinity }}
              filter="url(#ss-glow)"
            >
              <circle cx="233" cy="120" r="14" fill="rgba(255,77,94,0.25)" />
              <path d="M227 108 L238 120 L230 122 L241 136" fill="none" stroke="#ff4d5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          )}
        </svg>
      </div>

      <div
        className="glass flex items-center gap-3 rounded-full px-4 py-2 text-xs"
        style={{ transform: "translateZ(60px)" }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: cur.tone, boxShadow: `0 0 10px ${cur.tone}` }}
        />
        <span className="font-semibold text-white">{cur.status}</span>
        <span className="tabular-nums text-white/60">Leakage {cur.leak}</span>
      </div>
    </div>
  );
}
