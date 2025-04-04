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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
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
          d="M168 50C163 40 150 32 135 32C130 32 125 34 120 37C112 22 95 10 75 10C50 10 30 30 30 50C30 51 30 52 30 53C10 60 10 80 30 85H150C160 85 170 75 170 65C170 60 165 55 168 50Z"
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
      <FloatingCloud className="top-[25%] opacity-80" duration={20} />
      <FloatingCloud className="top-[5%] opacity-90 scale-75" duration={25} />
      <FloatingCloud className="top-[15%] opacity-70 scale-50" duration={18} />
    </>
  );
}
