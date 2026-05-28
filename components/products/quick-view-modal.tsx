"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function QuickViewModal() {
  const {
    isQuickViewOpen,
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore()

  const [selectedSize, setSelectedSize] = useState<string>("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!quickViewProduct) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: siteConfig.currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    const size = selectedSize || quickViewProduct.sizes[0]
    addToCart(quickViewProduct, quantity, size)
    closeQuickView()
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === quickViewProduct.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? quickViewProduct.images.length - 1 : prev - 1
    )
  }

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-xs z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white border border-border/80 rounded-[2.2rem] z-50 overflow-hidden flex flex-col md:flex-row shadow-2xl max-w-4xl mx-auto my-auto h-[90vh] md:h-[650px]"
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-20 p-2 bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-full transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image Section - Left 1/2 */}
            <div className="relative w-full md:w-1/2 h-60 md:h-auto bg-secondary">
              <Image
                src={quickViewProduct.images[currentImageIndex]}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
              />

              {/* Navigation Arrows */}
              {quickViewProduct.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-xs rounded-full shadow-xs hover:text-primary transition-all z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-xs rounded-full shadow-xs hover:text-primary transition-all z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {quickViewProduct.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      idx === currentImageIndex ? "bg-primary w-4" : "bg-white/60"
                    )}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Section - Right 1/2 */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto text-left flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] text-primary font-sans font-bold tracking-widest uppercase block">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="font-serif text-2xl text-foreground font-semibold">
                    {quickViewProduct.name}
                  </h2>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl font-bold text-primary">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold font-sans text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-border/40">
                    {quickViewProduct.karat} • {quickViewProduct.weight}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Size select */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block">Size / Length</span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-3.5 py-1.5 border rounded-full text-xs font-sans font-semibold tracking-wider transition-all duration-300",
                          selectedSize === size || (!selectedSize && size === quickViewProduct.sizes[0])
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/80 bg-white text-muted-foreground hover:border-primary/50"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border border-border bg-white rounded-full flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-all"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-sans font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 border border-border bg-white rounded-full flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions & details redirect */}
              <div className="pt-6 border-t border-border/40 mt-6 space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-primary text-primary-foreground hover:opacity-90 rounded-full text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>
                  
                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={cn(
                      "p-3 border rounded-full transition-all",
                      isInWishlist(quickViewProduct.id)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-white text-muted-foreground hover:border-primary"
                    )}
                    aria-label="Wishlist"
                  >
                    <Heart className={cn("w-4 h-4", isInWishlist(quickViewProduct.id) && "fill-current")} />
                  </button>
                </div>

                <Link
                  href={`/product/${quickViewProduct.id}`}
                  onClick={closeQuickView}
                  className="block text-center text-[10px] uppercase tracking-widest font-sans font-bold text-primary hover:underline"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
