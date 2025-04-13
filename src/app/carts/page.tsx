'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { CartCard } from '@/components/carts/cart-card';
import { CartFilters } from '@/components/carts/cart-filters';
import { products } from '@/data/products';
import BlurFade from '@/components/magicui/blur-fade';
import { CartSkeleton } from "@/components/skeletons/cart-skeleton";

export default function GadgetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)));
  }, []);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="container max-w-6xl mx-auto px-4 py-12">
      <div 
      className="relative min-h-screen bg-background"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23595959' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
      }}
    >
      <Suspense fallback={<CartSkeleton />}>
        <BlurFade>
          <div className="max-w-3xl mx-auto mb-16 text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Cart 🛒</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My shopping cart!🛒 Here are the things I like😇🔥
            </p>
          </div>
          
          <div className="space-y-8">
            <CartFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No gadgets found matching your criteria
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <CartCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </BlurFade>
      </Suspense>
      </div>
    </main>
  );
}
