"use client"

import React from "react";
import { motion } from "framer-motion";

export function FloatingCloud({ className, delay = 0, duration = 20 }: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: "-100%" }}
      animate={{ x: "100vw" }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: delay,
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

export function GhibliSpirit({ className }: { className?: string }) {
  return (
    <motion.div
      className={`${className} floating-animation`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <svg
        width="40"
        height="50"
        viewBox="0 0 40 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2C16.2 2 13.5 5.8 13.5 10.5C13.5 15.2 16.2 19 20 19C23.8 19 26.5 15.2 26.5 10.5C26.5 5.8 23.8 2 20 2Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
        <path
          d="M19.9999 17C16.6862 17 14.5 22.3726 14.5 29C14.5 35.6274 16.6862 41 19.9999 41C23.3137 41 25.5 35.6274 25.5 29C25.5 22.3726 23.3137 17 19.9999 17Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
        <ellipse cx="17" cy="9" rx="1.5" ry="2" fill="black" />
        <ellipse cx="23" cy="9" rx="1.5" ry="2" fill="black" />
      </svg>
    </motion.div>
  );
}

export function LeafDecoration({ className }: { className?: string }) {
  return (
    <div className={`${className} absolute pointer-events-none`}>
      <svg
        width="100"
        height="80"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.5 2C14.5 15.5 10.5 35 23.5 48C36.5 61 61.5 58 78 47C94.5 36 94.5 13 78 5C61.5 -3 32.5 -11.5 23.5 2Z"
          fill="#A5D6A7"
          fillOpacity="0.2"
        />
      </svg>
    </div>
  );
}

export function GhibliSkyBackground() {
  return (
    <>
      <FloatingCloud className="top-[10%] opacity-80" delay={0} />
      <FloatingCloud className="top-[5%] opacity-90 scale-75" delay={7} duration={25} />
      <FloatingCloud className="top-[15%] opacity-70 scale-50" delay={3} duration={18} />
    </>
  );
}
