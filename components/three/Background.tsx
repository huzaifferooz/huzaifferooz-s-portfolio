"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { pointer } from "@/lib/pointer";
import { useDeviceTier } from "@/lib/useDeviceTier";

// Soft round sprite so points render as dots instead of squares
function useDotTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.4, "rgba(255,255,255,0.85)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);
}

function Particles({
  count,
  color,
  size,
}: {
  count: number;
  color: string;
  size: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const dot = useDotTexture();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += dt * 0.02;
    p.position.x = THREE.MathUtils.damp(p.position.x, pointer.x * 0.7, 2.5, dt);
    p.position.y = THREE.MathUtils.damp(p.position.y, pointer.y * 0.45, 2.5, dt);
    p.rotation.x = THREE.MathUtils.damp(p.rotation.x, -pointer.y * 0.08, 2.5, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        map={dot}
        alphaTest={0.01}
        color={color}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

type ShapeDef = {
  kind: "ico" | "octa" | "torus" | "tetra";
  pos: [number, number, number];
  s: number;
  color: string;
};

const SHAPES: ShapeDef[] = [
  { kind: "ico", pos: [-5.2, 2.2, -2], s: 0.9, color: "#8b5cff" },
  { kind: "octa", pos: [5.5, -1.8, -3], s: 1.1, color: "#22e1ff" },
  { kind: "torus", pos: [-3.8, -2.8, -1], s: 0.7, color: "#ff3d9a" },
  { kind: "tetra", pos: [4.2, 2.6, -4], s: 0.8, color: "#8b5cff" },
  { kind: "ico", pos: [0.5, -3.6, -5], s: 1.2, color: "#22e1ff" },
];

// Wireframe shapes that drift and get pushed away from the cursor
function Shape({ kind, pos, s, color }: ShapeDef) {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state, dt) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += dt * 0.15;
    m.rotation.y += dt * 0.2;
    const mx = (pointer.x * viewport.width) / 2;
    const my = (pointer.y * viewport.height) / 2;
    const dx = pos[0] - mx;
    const dy = pos[1] - my;
    const d = Math.hypot(dx, dy) || 1;
    const push = Math.max(0, 2.6 - d) * 0.55;
    const bob = Math.sin(state.clock.elapsedTime * 0.5 + pos[0]) * 0.15;
    m.position.x = THREE.MathUtils.damp(m.position.x, pos[0] + (dx / d) * push, 3, dt);
    m.position.y = THREE.MathUtils.damp(m.position.y, pos[1] + (dy / d) * push + bob, 3, dt);
  });

  return (
    <mesh ref={ref} position={pos} scale={s}>
      {kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
      {kind === "octa" && <octahedronGeometry args={[1, 0]} />}
      {kind === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
      {kind === "torus" && <torusGeometry args={[1, 0.28, 12, 32]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

export default function Background() {
  const tier = useDeviceTier();
  const reduce = useReducedMotion();
  if (!tier.ready) return null;

  const count = tier.mobile ? 700 : 2200;
  const shapes = SHAPES.slice(0, tier.mobile ? 2 : SHAPES.length);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, tier.mobile ? 1.25 : 1.75]}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce ? "demand" : "always"}
        style={{ pointerEvents: "none" }}
      >
        <Particles count={count} color="#9fb0ff" size={0.04} />
        <Particles count={Math.round(count / 4)} color="#22e1ff" size={0.07} />
        {shapes.map((sh, i) => (
          <Shape key={i} {...sh} />
        ))}
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,6,11,0.85)_100%)]" />
    </div>
  );
}
