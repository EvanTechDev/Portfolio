'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

interface HostingerAdProps {
  onClose: () => void;
}

export function HostingerAd({ onClose }: HostingerAdProps) {
  return (
    <div className="relative w-full bg-background border rounded-lg shadow-lg p-3 sm:p-4">      
      <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded">
        Ad
      </div>
      
      <button 
        onClick={onClose}
        className="absolute -top-2 -right-2 bg-muted-foreground/10 hover:bg-muted-foreground/20 rounded-full p-1 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
          <Image 
            src="/images/hostinger-logo.png" 
            alt="Hostinger"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-xs sm:text-sm">Special Offer!</h3>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Get premium web hosting starting at ₹69/month with a free domain!
          </p>
          
          <a
            href="https://hostinger.in?REFERRALCODE=NP4PRASENELF"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white text-center py-1.5 sm:py-2 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
          >
            Claim Offer →
          </a>
        </div>
      </div>
    </div>
  );
} 