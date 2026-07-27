'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { products } from '@/data/products';
import Image from 'next/image';

interface ProductPromotionProps {
  onClose: () => void;
}

export function ProductPromotion({ onClose }: ProductPromotionProps) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Rotate through featured products every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => 
        (prev + 1) % products.filter(p => p.featured).length
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const featuredProducts = products.filter(p => p.featured);
  const product = featuredProducts[currentProductIndex];

  if (!product) return null;

  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  return (
    <div className="relative w-full bg-background border rounded-lg shadow-lg p-3 sm:p-4">
      <div className="absolute -top-2 -left-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded">
        Deal
      </div>
      
      <button 
        onClick={onClose}
        className="absolute -top-2 -right-2 bg-muted-foreground/10 hover:bg-muted-foreground/20 rounded-full p-1 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
            <Image 
              src={product.imageUrl} 
              alt={product.title}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-xs sm:text-sm line-clamp-2">{product.title}</h3>
            <p className="text-green-600 text-xs font-medium">{discount}% OFF</p>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold">₹{product.sellingPrice}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
        </div>
        
        <a
          href={product.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-500 text-black text-center py-1.5 sm:py-2 rounded-md hover:bg-amber-400 transition-colors text-xs sm:text-sm font-medium"
        >
          Buy on Amazon →
        </a>
      </div>
    </div>
  );
} 