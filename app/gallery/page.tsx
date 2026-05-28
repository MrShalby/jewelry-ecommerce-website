"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    alt: "Royal Bridal Kundan Necklace Set",
    category: "Bridal",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    alt: "Heritage Temple Gold Choker",
    category: "Traditional",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    alt: "Brilliant Solitaire Diamond Ring",
    category: "Rings",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    alt: "Artisan Gold Filigree Jhumkas",
    category: "Earrings",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    alt: "Luxury Round Cut Tennis Bracelet",
    category: "Bracelets",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=800&q=80",
    alt: "Traditional Gujarati Gold Bangles",
    category: "Bangles",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
    alt: "Brilliant Cut Diamond Band",
    category: "Rings",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    alt: "Carved Gold Heritage Kada",
    category: "Bracelets",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
    alt: "Solid Linked Gold Chain",
    category: "Traditional",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1599459183200-59c3a0e770b9?w=800&q=80",
    alt: "Embellished Peacock Motif Pendant",
    category: "Bridal",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    alt: "Intricate Kundan Maang Tikka",
    category: "Traditional",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    alt: "Diamond Cluster Drop Earrings",
    category: "Earrings",
  },
]

const categories = ["All", "Bridal", "Traditional", "Rings", "Earrings", "Bracelets", "Bangles"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.4em] text-primary uppercase block">
            Visual Catalog
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            The Gallery of <span className="italic text-primary font-normal font-serif">Masterpieces</span>
          </h1>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
          <p className="text-muted-foreground text-xs font-sans max-w-md mx-auto">
            A visual showcase of our bespoke commissions and custom creations.
          </p>
        </motion.div>

        {/* Category Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest transition-all duration-300 border",
                selectedCategory === category
                  ? "gold-gradient text-primary-foreground border-primary"
                  : "border-border bg-white text-muted-foreground hover:text-primary hover:border-primary/50"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Premium Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="break-inside-avoid mb-6 group cursor-pointer"
            >
              {/* Outer frame */}
              <div
                onClick={() => openLightbox(index)}
                className="p-2.5 border border-border/80 bg-white rounded-[2rem] hover:border-primary/40 hover:shadow-lg transition-all duration-500 block relative"
              >
                {/* Image Wrap */}
                <div className="relative overflow-hidden rounded-[1.6rem] bg-secondary">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={index % 3 === 0 ? 520 : index % 3 === 1 ? 400 : 460}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Rich Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 z-10 text-left">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-1.5 block">
                      {image.category} Showcase
                    </span>
                    <h3 className="font-serif text-lg text-white font-medium mb-1">
                      {image.alt}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-2">
                      <Eye className="w-3.5 h-3.5" />
                      Expand View
                    </div>
                  </div>

                  {/* Gold Shimmer Overlay */}
                  <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#1C1917]/95 backdrop-blur-md flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 border border-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 border border-white/10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Showcase Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative max-w-4xl max-h-[75vh] mx-6 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative p-2.5 border border-white/15 bg-white/5 rounded-[2.5rem]">
                  <Image
                    src={filteredImages[lightboxIndex].src}
                    alt={filteredImages[lightboxIndex].alt}
                    width={1000}
                    height={700}
                    className="max-h-[70vh] w-auto object-contain rounded-[2rem]"
                  />
                </div>
                <div className="text-center mt-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-1 block">
                    {filteredImages[lightboxIndex].category} Collection
                  </span>
                  <p className="text-white font-serif text-lg md:text-xl">
                    {filteredImages[lightboxIndex].alt}
                  </p>
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 border border-white/10"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
