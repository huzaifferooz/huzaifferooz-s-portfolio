"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/useDeviceTier";

const SCREEN_W = 1.34;
const SCREEN_H = 2.94;

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function rrPath(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

// Draws a Scrimmed-style app screen onto a canvas used as the phone display
function makeScreenTexture() {
  const w = 512;
  const h = 1024;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;

  const bg = g.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#1a1140");
  bg.addColorStop(0.55, "#0a0c1c");
  bg.addColorStop(1, "#062733");
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);

  const orb = (x: number, y: number, r: number, col: string) => {
    const rg = g.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, col);
    rg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, w, h);
  };
  orb(120, 220, 280, "rgba(139,92,255,.55)");
  orb(430, 780, 320, "rgba(34,225,255,.35)");

  g.fillStyle = "rgba(255,255,255,.85)";
  g.font = "600 26px system-ui, sans-serif";
  g.fillText("9:41", 44, 66);

  g.font = "800 58px system-ui, sans-serif";
  g.fillText("Scrimmed", 44, 196);
  g.font = "500 26px system-ui, sans-serif";
  g.fillStyle = "rgba(255,255,255,.6)";
  g.fillText("Find your next squad", 44, 240);

  const card = (y: number, handle: string, role: string, col: string) => {
    rrPath(g, 36, y, 440, 150, 30);
    g.fillStyle = "rgba(255,255,255,.08)";
    g.fill();
    g.strokeStyle = "rgba(255,255,255,.16)";
    g.lineWidth = 2;
    g.stroke();
    g.beginPath();
    g.arc(110, y + 75, 40, 0, Math.PI * 2);
    const ag = g.createLinearGradient(70, y, 150, y + 150);
    ag.addColorStop(0, col);
    ag.addColorStop(1, "#22e1ff");
    g.fillStyle = ag;
    g.fill();
    g.fillStyle = "#fff";
    g.font = "700 30px system-ui, sans-serif";
    g.fillText(handle, 172, y + 66);
    g.fillStyle = "rgba(255,255,255,.6)";
    g.font = "500 24px system-ui, sans-serif";
    g.fillText(role, 172, y + 106);
  };
  card(300, "@nova", "IGL · Conqueror", "#8b5cff");
  card(478, "@vex", "Entry · Ace", "#ff3d9a");
  card(656, "@lumen", "Support · Crown", "#22e1ff");

  rrPath(g, 36, 860, 440, 80, 40);
  const bt = g.createLinearGradient(36, 0, 476, 0);
  bt.addColorStop(0, "#8b5cff");
  bt.addColorStop(1, "#22e1ff");
  g.fillStyle = bt;
  g.fill();
  g.fillStyle = "#05060b";
  g.font = "800 28px system-ui, sans-serif";
  g.textAlign = "center";
  g.fillText("Send scrim invite", 256, 911);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function Phone() {
  const screenTex = useMemo(() => makeScreenTexture(), []);
  const bodyGeo = useMemo(() => {
    const shape = roundedRectShape(1.5 - 0.08, 3.1 - 0.08, 0.24);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 6,
      curveSegments: 24,
    });
    geo.center();
    return geo;
  }, []);
  const screenGeo = useMemo(() => {
    const geo = new THREE.ShapeGeometry(roundedRectShape(SCREEN_W, SCREEN_H, 0.19), 16);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) + SCREEN_W / 2) / SCREEN_W, (pos.getY(i) + SCREEN_H / 2) / SCREEN_H);
    }
    return geo;
  }, []);

  const lenses: [number, number][] = [
    [-0.55, 1.28],
    [-0.28, 1.28],
    [-0.42, 1.02],
  ];

  return (
    <group>
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial color="#0b0d18" metalness={0.95} roughness={0.22} />
      </mesh>
      <mesh geometry={screenGeo} position={[0, 0, 0.092]}>
        <meshBasicMaterial map={screenTex} toneMapped={false} />
      </mesh>
      {/* camera module */}
      <RoundedBox args={[0.66, 0.66, 0.06]} radius={0.03} position={[-0.4, 1.15, -0.115]}>
        <meshStandardMaterial color="#12142a" metalness={0.9} roughness={0.3} />
      </RoundedBox>
      {lenses.map(([x, y], i) => (
        <group key={i} position={[x + 0.14, y - 0.02, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.05, 28]} />
            <meshStandardMaterial color="#05060a" metalness={1} roughness={0.12} />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.01, 20]} />
            <meshBasicMaterial color="#22e1ff" toneMapped={false} />
          </mesh>
        </group>
      ))}
      {/* side buttons */}
      <mesh position={[0.77, 0.5, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.06]} />
        <meshStandardMaterial color="#1a1d33" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[-0.77, 0.7, 0]}>
        <boxGeometry args={[0.03, 0.26, 0.06]} />
        <meshStandardMaterial color="#1a1d33" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.12;
    if (b.current) b.current.rotation.x += dt * 0.09;
  });
  return (
    <>
      <mesh ref={a} position={[0, 0, -0.9]}>
        <torusGeometry args={[2.1, 0.012, 12, 128]} />
        <meshBasicMaterial color="#8b5cff" toneMapped={false} />
      </mesh>
      <mesh ref={b} position={[0, 0, -0.9]} rotation={[1.1, 0.3, 0]}>
        <torusGeometry args={[1.85, 0.008, 12, 128]} />
        <meshBasicMaterial color="#22e1ff" toneMapped={false} />
      </mesh>
    </>
  );
}

// Coarse pointers (phones) skip OrbitControls so vertical page scroll is never blocked
function SpinWhenTouch({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  const tier = useDeviceTier();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full" data-cursor={tier.coarse ? undefined : "drag"}>
      {tier.ready && (
        <Canvas
          dpr={[1, tier.mobile ? 1.5 : 2]}
          camera={{ position: [0, 0, 8], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={visible ? "always" : "never"}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <pointLight position={[-3, -2, 3]} intensity={18} color="#8b5cff" />
          <Environment resolution={128} frames={1}>
            <Lightformer form="rect" intensity={4} color="#8b5cff" position={[-4, 2, 2]} scale={[6, 3, 1]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={3} color="#22e1ff" position={[4, -1, 3]} scale={[5, 2, 1]} target={[0, 0, 0]} />
            <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 4, -3]} scale={4} target={[0, 0, 0]} />
          </Environment>
          <Rings />
          <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
            {tier.coarse ? (
              <SpinWhenTouch>
                <Phone />
              </SpinWhenTouch>
            ) : (
              <Phone />
            )}
          </Float>
          {!tier.coarse && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableDamping
              dampingFactor={0.06}
              autoRotate
              autoRotateSpeed={2.2}
              minPolarAngle={Math.PI * 0.35}
              maxPolarAngle={Math.PI * 0.65}
            />
          )}
        </Canvas>
      )}
    </div>
  );
}
