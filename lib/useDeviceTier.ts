"use client";

import { useEffect, useState } from "react";

export type DeviceTier = { ready: boolean; mobile: boolean; coarse: boolean };

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>({
    ready: false,
    mobile: false,
    coarse: false,
  });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setTier({
        ready: true,
        coarse: coarse.matches,
        mobile: coarse.matches || narrow.matches,
      });
    update();
    coarse.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  return tier;
}
