"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const collections = [
  {
    id: 1,
    title: "Bridal Collection",
    description: "Timeless pieces for your special day",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    href: "/shop?category=Wedding%20Sets",
  },
  {
    id: 2,
    title: "Diamond Jewellery",
    description: "Brilliance that captivates",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    href: "/shop?category=Rings",
  },
  {
    id: 3,
    title: "Temple Collection",
    description: "Heritage meets elegance",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    href: "/shop?category=Temple%20Jewellery",
  },
]

export function FeaturedCollections() {
  return (
    <section className="py-28 bg-background relative">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase">
            Curated Showcases
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            Our Signature <span className="italic text-primary font-normal font-serif">Collections</span>
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Meticulously designed masterpieces crafted to honor the golden chapters of your life.
          </p>
        </motion.div>

        {/* Asymmetrical/Premium Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <Link href={collection.href} className="block relative">
                {/* Gold Outer Border Frame */}
                <div className="p-2 border border-border/80 rounded-[2.2rem] bg-card/50 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-lg">
                  {/* Image Container with high border-radius */}
                  <div className="relative aspect-[3/4] rounded-[1.8rem] overflow-hidden bg-secondary">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Shadow Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-90 transition-opacity duration-500" />
                    
                    {/* Content inside Image */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 text-white">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-2 block">
                        Fine Couture
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-2 group-hover:text-primary transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-white/70 text-xs font-sans font-light leading-relaxed mb-5 max-w-xs group-hover:text-white transition-colors">
                        {collection.description}
                      </p>
                      
                      {/* Premium Button */}
                      <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-primary group-hover:text-white transition-colors duration-300">
                        View Showcase
                        <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </div>

                    {/* Subtle Gold Shimmer Hover Overlay */}
                    <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
