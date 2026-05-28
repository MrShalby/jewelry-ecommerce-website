"use client"

import { motion } from "react-transition-group" // Wait, is framer-motion preferred? Let's use framer-motion as in original.
import { motion as motionFramer } from "framer-motion"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const { wishlist } = useStore()

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motionFramer.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.4em] text-primary uppercase block">
            Saved Treasures
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            My <span className="italic text-primary font-normal font-serif">Wishlist</span>
          </h1>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
          <p className="text-muted-foreground text-xs font-sans">
            {wishlist.length} {wishlist.length === 1 ? "design" : "designs"} currently bookmarked.
          </p>
        </motionFramer.div>

        {wishlist.length === 0 ? (
          <motionFramer.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center py-20 bg-white border border-border/60 rounded-[1.6rem] p-8 max-w-lg mx-auto"
          >
            <div className="w-14 h-14 bg-secondary text-primary/45 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-muted-foreground mb-8 max-w-xs mx-auto leading-relaxed">
              Explore our fine jewellery collections and save your favorite designs to view them later or share with a consultant.
            </p>
            <Button
              variant="gold"
              className="text-xs uppercase tracking-widest font-sans font-bold px-8 py-5 rounded-full"
              asChild
            >
              <Link href="/shop">Explore Collection</Link>
            </Button>
          </motionFramer.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((item, index) => (
              <ProductCard key={item.product.id} product={item.product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
