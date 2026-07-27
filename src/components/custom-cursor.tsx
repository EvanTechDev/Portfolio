"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHoverIn = () => setLinkHovered(true);
    const handleLinkHoverOut = () => setLinkHovered(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverIn);
      link.addEventListener('mouseleave', handleLinkHoverOut);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverIn);
        link.removeEventListener('mouseleave', handleLinkHoverOut);
      });
    };
  }, []);
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary z-50 pointer-events-none mix-blend-difference"
        style={{ translateX: position.x - 12, translateY: position.y - 12 }}
        animate={{
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-50 pointer-events-none"
        style={{ translateX: position.x - 4, translateY: position.y - 4 }}
      />
    </>
  );
} 