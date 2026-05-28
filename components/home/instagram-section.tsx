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

        {/* Lookbook Marquee */}
        <div className="marquee-container py-4">
          <div className="marquee-track-ltr">
            {[...instagramPosts, ...instagramPosts, ...instagramPosts].map((post, index) => (
              <a
                key={`${post.id}-${index}`}
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] aspect-square rounded-[1.5rem] overflow-hidden group border border-border/40 shadow-xs block shrink-0 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30"
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
