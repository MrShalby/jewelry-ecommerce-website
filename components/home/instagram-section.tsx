"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import { instagramPosts } from "@/data/products"
import { siteConfig } from "@/lib/config"

export function InstagramSection() {
  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-primary hover:opacity-85 transition-opacity"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold">@shalbyjewels</span>
          </a>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            Our Social <span className="italic text-primary font-normal font-serif">Lookbook</span>
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Follow us on Instagram for daily inspirations, royal bridal designs, and custom craft updates.
          </p>
        </motion.div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-square rounded-[1.25rem] overflow-hidden group border border-border/40 shadow-xs block"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
