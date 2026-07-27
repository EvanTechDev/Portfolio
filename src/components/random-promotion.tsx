'use client';

import { useState, useEffect } from 'react';
import { HostingerAd } from './hostinger-ad';
import { ProductPromotion } from './product-promotion';

export function RandomPromotion() {
  const [selectedAd, setSelectedAd] = useState<'hostinger' | 'product' | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if ad was closed for this blog post
    const pathname = window.location.pathname;
    const wasAdClosed = localStorage.getItem(`adClosed_${pathname}`);
    
    if (!wasAdClosed) {
      // 40% chance for Hostinger, 60% chance for product
      const random = Math.random();
      setSelectedAd(random < 0.4 ? 'hostinger' : 'product');
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    const pathname = window.location.pathname;
    localStorage.setItem(`adClosed_${pathname}`, 'true');
    setIsVisible(false);
  };

  if (!isVisible || !selectedAd) return null;

  return (
    <div className="fixed bottom-4 w-full flex justify-center z-50 px-4 sm:px-0">
      <div className="w-[calc(100%-2rem)] sm:w-full max-w-[320px] sm:max-w-sm">
        {selectedAd === 'hostinger' ? (
          <HostingerAd onClose={handleClose} />
        ) : (
          <ProductPromotion onClose={handleClose} />
        )}
      </div>
    </div>
  );
} 