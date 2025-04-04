"use client"

import React from "react";
import { motion } from "framer-motion";

export function FloatingCloud({ className, delay = 0, duration = 25 }: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: "-120%", opacity: 0.8 }}
      animate={{ x: "110vw", opacity: [0.8, 1, 0.8] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width="200"
        height="110"
        viewBox="0 0 200 110"
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
  return (
    <>
      <FloatingCloud className="top-[10%] opacity-80" delay={0} duration={30} />
      <FloatingCloud className="top-[5%] opacity-85 scale-75" delay={7} duration={35} />
      <FloatingCloud className="top-[12%] opacity-75 scale-50" delay={3} duration={28} />
    </>
  );
}
