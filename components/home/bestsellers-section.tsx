"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"

export function BestsellersSection() {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4)

  return (
    <section className="py-28 bg-white border-y border-border/40">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase block mb-2">
              Client Favorites
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light">
              Our <span className="italic text-primary font-normal font-serif">Bestsellers</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-4 max-w-xl leading-relaxed">
              Our most loved handcrafted creations, selected by customers who appreciate heritage techniques and brilliant diamonds.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-6 md:mt-0 border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-widest px-6 py-5 rounded-full group shrink-0"
            asChild
          >
            <Link href="/shop">
              View Catalog
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
