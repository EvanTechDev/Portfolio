"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';

export function GhibliSkyBackground() {
  const [clouds, setClouds] = useState<{ id: string; top: string }[]>([]);
  const isUpperRef = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addCloud = () => {
    const top = isUpperRef.current
      ? `${(1 + Math.random() * 11).toFixed(2)}%`
      : `${(19 + Math.random() * 11).toFixed(2)}%`;
    const id = Date.now().toString() + Math.random();
    setClouds((prev) => [...prev, { id, top }]);
  };

  const startCloudLoop = () => {
    addCloud();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      addCloud();
    }, 6500);
  };

  useEffect(() => {
    startCloudLoop();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setClouds([]);
        isUpperRef.current = true;
        startCloudLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleEnd = (id: string) => {
    setClouds((prev) => prev.filter((c) => c.id !== id));
    isUpperRef.current = !isUpperRef.current;
  };

  return (
    <>
      {/*clouds.map((cloud) => (
        <FloatingCloud
          key={cloud.id}
          top={cloud.top}
          onEnd={() => handleEnd(cloud.id)}
        />
      ))}
      <Rain />*/}
      <Background />
    </>
  );
}

function Background() {
  const Dither = dynamic(() => import('@/components/dither'), { ssr: false });
  
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Dither
    waveColor={[0.5, 0.5, 0.5]}
    disableAnimation={false}
    enableMouseInteraction={true}
    mouseRadius={0.3}
    colorNum={4}
    waveAmplitude={0.3}
    waveFrequency={3}
    waveSpeed={0.05}
  />
</div>
  )
}
