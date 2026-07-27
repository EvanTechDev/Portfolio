import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CartFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export function CartFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: CartFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2 block">Search Carts</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="sm:w-48">
          <Label htmlFor="category" className="mb-2 block">Category</Label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {(searchQuery || selectedCategory) && (
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery('');
            setSelectedCategory('');
          }}
          className="text-sm"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
