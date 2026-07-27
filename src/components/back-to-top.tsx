"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useCallback } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 400);
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full 
        bg-foreground/90 text-background 
        shadow-lg hover:shadow-xl
        hover:scale-110 active:scale-95
        transition-all duration-200
        backdrop-blur-sm
        group cursor-pointer"
      aria-label="Back to top"
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.2 }}
    >
      <ArrowUp className="size-5 group-hover:-translate-y-0.5 transition-transform" />
    </motion.button>
  );
}