"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS } from "@/lib/data";
import { pointer } from "@/lib/pointer";
import { Icon } from "../icons";

type Props = {
  active: number | null;
  setActive: (i: number | null) => void;
};

// Spreads n points evenly over a sphere so many tiles never stack up
function fibSphere(n: number, r: number): [number, number, number][] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const t = golden * i;
    return [Math.cos(t) * ring * r, y * r * 0.9, Math.sin(t) * ring * r];
  });
}

function Orbit({ active, setActive }: Props) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const speed = useRef(0.25);
  const { viewport } = useThree();
  const R = Math.min(2.9, viewport.width * 0.32);
  const points = useMemo(() => fibSphere(SKILLS.length, R), [R]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    speed.current = THREE.MathUtils.damp(speed.current, active === null ? 0.25 : 0.02, 4, dt);
    g.rotation.y += dt * speed.current;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.2 + pointer.y * 0.2, 3, dt);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, pointer.x * 0.1, 3, dt);
    if (core.current) core.current.rotation.y -= dt * 0.15;
  });

  return (
    <group ref={group}>
      <mesh ref={core} scale={R * 0.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8b5cff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={R * 0.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#22e1ff" />
      </mesh>
      <mesh scale={R * 0.75}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cff"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.008, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>

      {SKILLS.map((s, i) => {
        const on = active === i;
        return (
          <Html key={s.title} position={points[i]} center distanceFactor={5.5} zIndexRange={[20, 0]}>
            <button
              type="button"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onClick={() => setActive(on ? null : i)}
              aria-pressed={on}
              className="glass flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-left transition-transform duration-300"
              style={{
                borderColor: on ? s.color : undefined,
                boxShadow: on ? `0 0 28px -4px ${s.color}` : undefined,
                transform: on ? "scale(1.12)" : undefined,
              }}
            >
              <span
                className="grid h-7 w-7 place-items-center rounded-lg"
                style={{ background: `${s.color}26`, color: s.color }}
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold text-white">{s.short}</span>
            </button>
          </Html>
        );
      })}
    </group>
  );
}

export default function SkillsOrbit(props: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? "always" : "never"}
      >
        <Orbit {...props} />
      </Canvas>
    </div>
  );
}
