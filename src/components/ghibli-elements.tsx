"use client"

import React from "react";
import { motion } from "framer-motion";

export function FloatingCloud({ className, delay = 0, duration = 20 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ x: "-20%", opacity: 0.6 }}
      animate={{ x: "110vw", opacity: [0.6, 0.8, 0.6] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <svg
        width="200"
        height="120"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M180 70C170 50 150 35 130 35C120 35 110 38 102 43C90 20 70 5 45 5C15 5 0 30 0 60C0 62 0.2 64 0.5 66C-5 72 0 82 5 90C10 98 20 105 35 105H165C180 105 195 95 195 80C195 72 188 65 180 70Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
      </svg>
    </motion.div>
  );
}

export function GhibliSpirit({ className }) {
  return (
    <motion.div
      className={`${className}`}
      animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <svg
        width="36"
        height="48"
        viewBox="0 0 36 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 1C14 1 11 5 11 10C11 15 14 19 18 19C22 19 25 15 25 10C25 5 22 1 18 1Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
        <path
          d="M18 16C14 16 12 22 12 30C12 38 14 44 18 44C22 44 24 38 24 30C24 22 22 16 18 16Z"
          fill="hsl(var(--ghibli-element-fill))"
          fillOpacity="var(--ghibli-element-opacity)"
        />
        <ellipse cx="15" cy="8" rx="1" ry="1.5" fill="black" />
        <ellipse cx="21" cy="8" rx="1" ry="1.5" fill="black" />
      </svg>
    </motion.div>
  );
}

export function LeafDecoration({ className }) {
  return (
    <motion.div
      className={`${className} absolute pointer-events-none`}
      animate={{ y: [0, 5, 0], rotate: [0, 3, -3, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <svg
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 5C12 15 10 30 20 40C30 50 50 48 65 38C80 28 78 10 65 3C50 -2 28 -5 20 5Z"
          fill="#A5D6A7"
          fillOpacity="0.3"
        />
      </svg>
    </motion.div>
  );
}

export function GhibliSkyBackground() {
  return (
    <>
      <FloatingCloud className="top-[8%] opacity-70" delay={0} duration={22} />
      <FloatingCloud className="top-[3%] opacity-85 scale-80" delay={5} duration={28} />
      <FloatingCloud className="top-[12%] opacity-60 scale-60" delay={2} duration={16} />
    </>
  );
}
