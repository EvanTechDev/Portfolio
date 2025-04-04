"use client"

import React from "react";
import { motion } from "framer-motion";

export function FloatingCloud({ className, duration = 20 }: {
  className?: string;
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
      }}
    >
      <svg
        width="180"
        height="100"
        viewBox="0 0 180 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M165.243 57.95C161.019 41.214 146.761 29.099 129.764 29.099C123.221 29.099 116.883 30.815 111.427 34.003C102.94 16.002 85.085 3.998 64.757 3.998C35.269 3.998 11.262 27.899 11.262 57.261C11.262 58.189 11.288 59.112 11.339 60.03C4.75 65.508 0.5 74.19 0.5 83.9C0.5 100.063 13.55 113 29.85 113H158.65C169.798 113 178.845 104.024 178.845 92.962C178.845 79.988 173.209 69.077 165.243 57.95Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
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
      <FloatingCloud className="top-[10%] opacity-80" duration={20} />
      <FloatingCloud className="top-[5%] opacity-90 scale-75" duration={25} />
      <FloatingCloud className="top-[15%] opacity-70 scale-50" duration={18} />
    </>
  );
}
