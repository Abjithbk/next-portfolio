"use client";

import { useEffect, type DependencyList } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GSAPCallback = () => void | (() => void);

export default function useGSAP(callback: GSAPCallback, deps: DependencyList = []): void {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cleanup = callback();

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, deps);
}
