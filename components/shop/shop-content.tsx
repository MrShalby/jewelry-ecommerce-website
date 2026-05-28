"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, Grid, LayoutGrid } from "lucide-react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/products/product-card"
import { ShopFilters } from "@/components/shop/shop-filters"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ITEMS_PER_PAGE = 8

const topCategories = [
  { label: "All Jewellery", value: "All" },
  { label: "Necklaces", value: "Necklaces" },
  { label: "Rings", value: "Rings" },
  { label: "Earrings", value: "Earrings" },
  { label: "Bangles", value: "Bangles" },
  { label: "Bridal Sets", value: "Wedding Sets" },
  { label: "Temple Jewellery", value: "Temple Jewellery" },
]

export function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3)
  const [sortBy, setSortBy] = useState("featured")
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [filters, setFilters] = useState({
    category: categoryParam || "All",
    priceRange: [0, 1000000] as [number, number],
    karat: "All",
    gender: "All",
  })

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
    }
  }, [categoryParam])

  // Reset pagination when query or filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [searchQuery, filters, sortBy])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category
      if (filters.category !== "All" && product.category !== filters.category) {
        return false
      }

      // Price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false
      }

      // Karat / Metal
      if (filters.karat !== "All" && product.karat !== filters.karat) {
        return false
      }

      // Gender
      if (
        filters.gender !== "All" &&
        product.gender !== filters.gender.toLowerCase()
      ) {
        return false
      }

      return true
    })
  }, [searchQuery, filters])

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts]
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      // Featured first
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [filteredProducts, sortBy])

  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, displayCount)
  }, [sortedProducts, displayCount])

  const hasMore = displayCount < sortedProducts.length

  const loadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
  }

  return (
    <div className="container mx-auto px-6">
      {/* Page Hero */}
      <div className="relative py-20 text-center bg-secondary/30 border border-border/60 mb-16 rounded-[2rem] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <span className="text-[11px] font-sans font-bold tracking-[0.4em] text-primary uppercase block mb-3">Atelier Catalog</span>
        <h1 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">Discover Fine Jewellery</h1>
        <div className="w-12 h-[1px] bg-primary/50 mx-auto mt-4" />
        <p className="text-muted-foreground text-xs font-sans mt-3 max-w-md mx-auto">
          Explore our collection of BIS-certified royal gold, GIA diamonds, and custom necklaces.
        </p>
      </div>

      {/* Category Filter Bar - Horizontal Scroll */}
      <div className="flex items-center justify-start lg:justify-center gap-3 overflow-x-auto pb-4 mb-10 -mx-6 px-6 scrollbar-none">
        {topCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilters((prev) => ({ ...prev, category: cat.value }))}
            className={cn(
              "px-5 py-2.5 rounded-full text-[11px] font-sans uppercase tracking-widest font-semibold transition-all shrink-0 border",
              filters.category === cat.value
                ? "gold-gradient text-primary-foreground border-primary"
                : "border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/50"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Toolbar / Filters bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/40">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search our heritage catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card text-foreground border border-border/80 rounded-full text-xs font-sans placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all shadow-2-xs"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          {/* Sorting Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-card border border-border/80 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider text-foreground focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="featured" className="bg-card text-foreground">Featured First</option>
            <option value="price-asc" className="bg-card text-foreground">Price: Low to High</option>
            <option value="price-desc" className="bg-card text-foreground">Price: High to Low</option>
            <option value="newest" className="bg-card text-foreground">Featured Highlights</option>
          </select>

          {/* Filter Toggle (Mobile) */}
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(true)}
            className="lg:hidden border-border/80 rounded-full text-xs font-semibold py-5"
          >
            <SlidersHorizontal className="w-4 h-4 mr-1.5" />
            Filters
          </Button>

          {/* Grid Columns Selector */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-card border border-border/80 rounded-full shadow-2-xs">
            <button
              onClick={() => setGridCols(2)}
              className={cn(
                "p-2 rounded-full transition-colors",
                gridCols === 2 ? "bg-secondary text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="2 columns"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={cn(
                "p-2 rounded-full transition-colors",
                gridCols === 3 ? "bg-secondary text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="3 columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={cn(
                "p-2 rounded-full transition-colors",
                gridCols === 4 ? "bg-secondary text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="4 columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs font-sans text-muted-foreground whitespace-nowrap hidden sm:inline">
            {sortedProducts.length} items found
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex gap-8 items-start">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0 bg-card border border-border/60 p-6 rounded-[1.6rem] shadow-2-xs">
          <ShopFilters
            isOpen={true}
            onClose={() => {}}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Mobile Filters Drawer */}
        <div className="lg:hidden">
          <ShopFilters
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Products Showcase Grid */}
        <div className="flex-1">
          {displayedProducts.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border/60 rounded-[1.6rem] p-8">
              <span className="text-4xl block mb-4">💎</span>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">No Jewellery Found</h3>
              <p className="text-xs text-muted-foreground mb-6 max-w-xs mx-auto leading-relaxed">We couldn&apos;t find any items matching your exact specifications. Try adjusting your parameters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({
                    category: "All",
                    priceRange: [0, 1000000],
                    karat: "All",
                    gender: "All",
                  })
                  setSearchQuery("")
                }}
                className="border-primary/40 text-primary hover:bg-primary/5 rounded-full px-6 text-xs uppercase tracking-wider"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <>
              <div
                className={cn(
                  "grid gap-6 md:gap-8",
                  gridCols === 2 && "grid-cols-1 sm:grid-cols-2",
                  gridCols === 3 && "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
                  gridCols === 4 && "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                )}
              >
                {displayedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-16">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMore}
                    className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-sans text-xs uppercase tracking-widest px-8 py-5 rounded-full"
                  >
                    Load More Designs
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
