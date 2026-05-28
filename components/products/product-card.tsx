"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Eye, ShoppingBag, MessageCircle } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { siteConfig } from "@/lib/config"
import type { Product } from "@/data/products"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, openQuickView, addToCart } = useStore()
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: siteConfig.currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const whatsappInquiryUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi ${siteConfig.name}! I am interested in inquiring about the "${product.name}" (${product.karat}, Price: ${formatPrice(product.price)}). Can you share more details?`
  )}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      {/* Outer frame styling */}
      <div className="p-3 bg-card border border-border/80 rounded-[1.6rem] transition-all duration-500 hover:shadow-lg hover:border-primary/40 relative flex flex-col justify-between h-full">
        
        <div>
          {/* Image Container with Rounded Corners */}
          <div className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-secondary mb-4">
            <Link href={`/product/${product.id}`} className="block w-full h-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </Link>

            {/* Shine effect overlay */}
            <div className="absolute inset-0 shine-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Left hovering badging */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
              {product.featured && (
                <span className="px-2.5 py-0.5 text-[9px] font-sans font-bold tracking-widest uppercase bg-primary text-primary-foreground rounded-full">
                  Featured
                </span>
              )}
              {product.bestseller && (
                <span className="px-2.5 py-0.5 text-[9px] font-sans font-bold tracking-widest uppercase bg-[#1C1917] text-white rounded-full">
                  Bestseller
                </span>
              )}
              <span className="px-2.5 py-0.5 text-[9px] font-sans font-bold tracking-widest uppercase bg-secondary/80 text-foreground border border-border/60 rounded-full">
                BIS 916
              </span>
            </div>

            {/* Quick Actions overlay */}
            <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  toggleWishlist(product)
                }}
                className={cn(
                  "p-2 bg-card/90 backdrop-blur-xs rounded-full shadow-xs transition-colors border border-border/30",
                  isInWishlist(product.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                )}
                aria-label="Wishlist"
              >
                <Heart className={cn("w-4 h-4", isInWishlist(product.id) && "fill-current")} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  openQuickView(product)
                }}
                className="p-2 bg-card/90 backdrop-blur-xs rounded-full shadow-xs text-muted-foreground hover:text-primary transition-colors border border-border/30"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Details */}
          <div className="px-1">
            <span className="text-[10px] text-primary font-sans font-bold tracking-widest uppercase block mb-1">
              {product.category}
            </span>
            <Link href={`/product/${product.id}`} className="block">
              <h3 className="font-serif text-base text-foreground font-semibold group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center justify-between mt-2 pt-1">
              <span className="font-serif text-base font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-[11px] font-sans uppercase font-bold text-muted-foreground tracking-wider bg-secondary px-2 py-0.5 rounded-sm">
                {product.karat}
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp & Cart Actions Section */}
        <div className="mt-4 pt-3 border-t border-border/40 flex flex-col gap-2">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-secondary hover:bg-primary/10 text-foreground hover:text-primary rounded-xl text-[11px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Inquire Now
          </a>

          <button
            onClick={() => addToCart(product, 1, product.sizes[0])}
            className="w-full py-2 bg-primary text-primary-foreground hover:opacity-90 rounded-xl text-[11px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>

      </div>
    </motion.div>
  )
}
