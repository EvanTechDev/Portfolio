"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import GridPattern from './ui/grid-pattern';

function FloatingCloud({
  top,
  onEnd,
}: {
  top: string;
  onEnd: () => void;
}) {
  const duration = 15;

  return (
    <motion.div
      className="absolute w-[200px] h-[110px] pointer-events-none ${className}"
      style={{ top }}
      initial={{ x: "-100%" }}
      animate={{ x: "100vw" }}
      transition={{
        duration,
        ease: "linear",
      }}
      onAnimationComplete={onEnd}
    >
      <svg
        width="200"
        height="110"
        viewBox="0 0 200 110"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M170 60C165 42 150 30 130 30C120 30 115 32 110 36C100 18 85 5 65 5C35 5 10 30 10 60C10 61 10 62 10 63C5 67 2 75 2 85C2 100 15 110 30 110H170C180 110 190 100 190 90C190 78 180 68 170 60Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
      </svg>
    </motion.div>
  );
}

export function GhibliSkyBackground() {
  const [clouds, setClouds] = useState<{ id: string; top: string }[]>([]);
  const isUpperRef = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addCloud = () => {
    const top = isUpperRef.current
      ? `${(1 + Math.random() * 11).toFixed(2)}%`
      : `${(19 + Math.random() * 11).toFixed(2)}%`;
    const id = Date.now().toString() + Math.random();
    setClouds((prev) => [...prev, { id, top }]);
  };

  const startCloudLoop = () => {
    addCloud();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      addCloud();
    }, 6500);
  };

  useEffect(() => {
    startCloudLoop();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setClouds([]);
        isUpperRef.current = true;
        startCloudLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleEnd = (id: string) => {
    setClouds((prev) => prev.filter((c) => c.id !== id));
    isUpperRef.current = !isUpperRef.current;
  };

  return (
    <>
      <Background />
    </>
  );
}


function Background() {
  return (
    <GridPattern className="w-full h-full" />
  );
}
