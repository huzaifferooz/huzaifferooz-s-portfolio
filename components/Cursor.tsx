"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Mode = "idle" | "hover" | "drag";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "a,button,[data-cursor]"
      ) as HTMLElement | null;
      if (!el) return setMode("idle");
      setMode(el.dataset.cursor === "drag" ? "drag" : "hover");
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "drag" ? 88 : mode === "hover" ? 64 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{ x, y }}
      >
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-white" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199]"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-neon-cyan/70 text-[11px] font-semibold text-white"
          animate={{
            width: size,
            height: size,
            backgroundColor:
              mode === "idle" ? "rgba(34,225,255,0)" : "rgba(34,225,255,0.12)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {mode === "drag" ? "Drag" : null}
        </motion.div>
      </motion.div>
    </>
  );
}
