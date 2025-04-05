"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function FloatingCloud({
  top,
  delay,
  duration,
}: {
  top: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute w-[200px] h-[110px] pointer-events-none"
      style={{ top }}
      initial={{ x: "-100%" }}
      animate={{ x: "100vw" }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay,
      }}
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

interface CloudConfig {
  key: string;
  top: string;
  delay: number;
  duration: number;
}

export function GhibliSkyBackground() {
  const [cloudConfigs, setCloudConfigs] = useState<CloudConfig[]>([]);
  const [isUpper, setIsUpper] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const delay = 0;
      const duration = 20;
      const topValue = isUpper
        ? (1 + Math.random() * 11).toFixed(2)
        : (19 + Math.random() * 11).toFixed(2);
      const newConfig: CloudConfig = {
        key: Date.now().toString() + Math.random().toString(36),
        top: `${topValue}%`,
        delay,
        duration,
      };

      setCloudConfigs((prev) => [...prev, newConfig]);
      setIsUpper((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [isUpper]);

  return (
    <>
      {cloudConfigs.map((config) => (
        <FloatingCloud
          key={config.key}
          top={config.top}
          delay={config.delay}
          duration={config.duration}
        />
      ))}
      <Rain />
    </>
  );
}

function Rain() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {Array.from({ length: 42 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[15px] bg-blue-400 dark:bg-blue-200 opacity-60"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -20 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}
