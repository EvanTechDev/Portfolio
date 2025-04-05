"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function FloatingCloud({
  top,
  duration,
  offset,
}: {
  top: string;
  duration: number;
  offset: number;
}) {
  const currentX = `calc(${(offset % duration) / duration * 100 + -100}% + ${offset % duration}px)`;

  return (
    <motion.div
      className="absolute w-[200px] h-[110px] pointer-events-none"
      style={{ top }}
      initial={false}
      animate={{ x: "100vw" }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    >
      <motion.div
        initial={{ x: currentX }}
        animate={{ x: "100vw" }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
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
    </motion.div>
  );
}

export function GhibliSkyBackground() {
  const [clouds, setClouds] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const duration = 15;
    const now = Date.now();
    const positions = [
      [1, 12],
      [19, 30],
    ];
    const list: JSX.Element[] = [];

    for (let i = 0; i < 8; i++) {
      const range = positions[i % 2];
      const top = `${range[0] + Math.random() * (range[1] - range[0])}%`;
      const offset = (now + i * 3000) % (duration * 1000);
      list.push(<FloatingCloud key={i} top={top} duration={duration} offset={offset} />);
    }

    setClouds(list);
  }, []);

  return (
    <>
      {clouds}
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
