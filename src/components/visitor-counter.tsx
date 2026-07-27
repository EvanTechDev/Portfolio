// components/visitor-counter.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Debug log
    console.log('Current stored count:', localStorage.getItem('visitorCount'));

    try {
      const storedCount = localStorage.getItem('visitorCount');
      const currentCount = storedCount ? parseInt(storedCount) : 0;
      
      // Increment and store
      const newCount = currentCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      
      // Debug log
      console.log('New count:', newCount);
      
      setCount(newCount);
    } catch (error) {
      console.error('Error updating visitor count:', error);
      // Fallback to showing 0 if localStorage fails
      setCount(0);
    }
  }, []);

  // Don't render anything until client-side count is set
  if (count === null) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2"
    >
      <motion.span
        key={count}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-foreground/80"
        suppressHydrationWarning
      >
        <span className="font-medium" suppressHydrationWarning>
          {count.toLocaleString()}
        </span>
      </motion.span>
    </motion.div>
  );
}