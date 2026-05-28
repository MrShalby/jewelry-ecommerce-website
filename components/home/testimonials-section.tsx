"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { testimonials } from "@/data/products"

const testimonialFeaturedImages = [
  {
    productImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    productName: "Royal Heritage Bridal Set"
  },
  {
    productImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    productName: "1.5 Carat Solitaire Ring"
  },
  {
    productImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    productName: "Temple Gold Filigree Jhumkas"
  },
  {
    productImage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
    productName: "Classic 22K Gold Chain"
  }
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, current])

  const next = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Framer Motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0
    })
  }

  const imageVariants = {
    enter: { scale: 0.95, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 }
  }

  const badgeVariants = {
    enter: { scale: 0.8, y: 15, opacity: 0 },
    center: { scale: 1, y: 0, opacity: 1 },
    exit: { scale: 0.8, y: -15, opacity: 0 }
  }

  return (
    <section className="py-28 relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-[#FDFCF7]/40 to-background">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-[30vw] h-[30vw] rounded-full bg-[#C5A059]/3 blur-[120px] -z-10 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[25vw] h-[25vw] rounded-full bg-[#F1E4C3]/5 blur-[120px] -z-10 -translate-y-1/2" />

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.4em] text-primary uppercase block">
            Client Journals
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            Stories of Gold & <span className="italic text-primary font-normal font-serif">Gratitude</span>
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
        </motion.div>

        {/* Dual-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Testimonial Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="relative glass rounded-[2.5rem] p-8 md:p-12 border border-[#C5A059]/15 shadow-xl text-left bg-white/75 backdrop-blur-md">
              {/* Quote Mark */}
              <Quote className="absolute top-8 right-8 w-20 h-20 text-[#C5A059]/5 pointer-events-none" />

              <div className="min-h-[220px] flex flex-col justify-between">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.08 + i * 0.05, type: "spring", stiffness: 200 }}
                        >
                          <Star className="w-4 h-4 fill-primary text-primary" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="font-serif text-lg md:text-xl text-foreground/90 leading-relaxed font-light italic">
                      &ldquo;{testimonials[current].text}&rdquo;
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-[1px] bg-gradient-to-r from-primary/60 to-transparent" />

                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                      {/* Mobile view avatar */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/20 shadow-xs lg:hidden shrink-0">
                        <Image
                          src={testimonials[current].image}
                          alt={testimonials[current].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-foreground">
                          {testimonials[current].name}
                        </h4>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-sans font-semibold mt-0.5">
                          {testimonials[current].location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation controls within the card */}
              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-border/40">
                <button
                  onClick={prev}
                  className="p-3 rounded-full border border-border bg-white text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary/40 transition-all duration-300 shadow-2-xs hover:shadow-xs group cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false)
                        setDirection(index > current ? 1 : -1)
                        setCurrent(index)
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        index === current
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-border hover:bg-primary/50"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="p-3 rounded-full border border-border bg-white text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary/40 transition-all duration-300 shadow-2-xs hover:shadow-xs group cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 hidden lg:flex justify-center items-center relative">
            <div className="relative w-full max-w-[320px] aspect-[4/5]">
              {/* Outer floating golden ring border frame */}
              <div className="absolute -inset-4 border border-[#C5A059]/20 rounded-[2.8rem] pointer-events-none z-0 translate-x-3 translate-y-3" />
              
              {/* Main Image Frame */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl bg-secondary z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover scale-102 filter brightness-[0.97]"
                    />
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Jewelry Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  variants={badgeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute -bottom-6 -right-6 bg-white border border-[#C5A059]/15 p-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 max-w-[220px]"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-secondary border border-border shrink-0">
                    <Image
                      src={testimonialFeaturedImages[current].productImage}
                      alt={testimonialFeaturedImages[current].productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-[8px] font-sans font-bold tracking-widest text-primary uppercase block">Couture Piece</span>
                    <span className="font-serif text-xs font-bold text-foreground block truncate max-w-[130px]">{testimonialFeaturedImages[current].productName}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

