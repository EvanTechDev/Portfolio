'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/data/products';
import Link from 'next/link';
import { ShoppingCart } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";

interface CartCardProps {
  product: Product;
}

export function CartCard({ product }: CartCardProps) {
  return (
    <MagicCard className="group relative overflow-hidden bg-card rounded-xl">
      <div className="relative aspect-video">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          priority={product.featured}
        />
        {product.featured && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Featured
          </Badge>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">{product.category}</Badge>
        </div>
        <h3 className="font-semibold mb-2 line-clamp-1 text-lg">{product.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">${product.sellingPrice}</span>
            {/*<span className="text-sm text-muted-foreground line-through">${product.mrp}</span>*/}
          </div>
          {/*<Badge variant="secondary" className="text-green-600 bg-green-50 dark:bg-green-950">
            {Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)}% OFF
          </Badge>*/}
        </div>

        {/*<Button
          variant="default"
          size="lg"
          className="w-full font-semibold text-base"
          asChild
        >
          <Link
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2"
          >
            Buy on Amazon
            <ShoppingCart className="size-4" />
          </Link>
        </Button>*/}
      </div>
    </MagicCard>
  );
}
