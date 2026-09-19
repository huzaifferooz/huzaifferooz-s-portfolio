"use client";

import dynamic from "next/dynamic";

const Background = dynamic(() => import("./three/Background"), { ssr: false });

export default function BackgroundLayer() {
  return <Background />;
}
