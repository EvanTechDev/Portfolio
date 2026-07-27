"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 z-40 p-2.5 rounded-full 
        bg-foreground/90 text-background 
        shadow-lg hover:shadow-xl
        backdrop-blur-sm
        group transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <ArrowUp className="size-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}