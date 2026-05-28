"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Calendar, Gem, Shield, Award, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&q=80",
    alt: "Luxury Bridal Pearl Collection - Shalby Jewels",
  },
  {
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&q=80",
    alt: "Exquisite Diamond Rings - Shalby Jewels",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&q=80",
    alt: "Heritage Gold Jewellery Collection - Shalby Jewels",
  },
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1000&q=80",
    alt: "Royal Emerald and Diamond Showcase - Shalby Jewels",
  }
]

const trustBadges = [
  { icon: Shield, title: "BIS Hallmarked", desc: "100% Certified Purity" },
  { icon: Gem, title: "Certified Diamonds", desc: "GIA & IGI Graded" },
  { icon: Award, title: "60+ Years Legacy", desc: "Trusted Craftsmanship" },
  { icon: Truck, title: "Insured Delivery", desc: "Safe Nationwide Shipping" },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length)
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 md:pt-32 md:pb-12 overflow-hidden bg-background"
    >
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[#05160E] blur-3xl -z-10" />

      {/* Main Campaign Grid */}
      <div className="container mx-auto px-6 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Text Content - Left 6 cols */}
          <div className="lg:col-span-6 space-y-8 text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2"
            >
              <span className="text-[11px] font-sans font-bold tracking-[0.4em] uppercase text-primary">
                Since 1965 • Ahmedabad
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] tracking-tight"
            >
              Where Legacy <br />
              <span className="italic font-normal font-serif text-primary">Meets Timeless</span> <br />
              Elegance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Explore our curated bridal and gold jewelry collections. Each masterpiece is handcrafted to celebrate your family&apos;s most cherished moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Button
                size="lg"
                variant="gold"
                className="transition-all text-sm uppercase tracking-wider px-8 py-6 rounded-full group"
                asChild
              >
                <Link href="/shop">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-sm uppercase tracking-wider px-8 py-6 rounded-full transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Main Campaign Image Slider - Right 6 cols */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-8 lg:mt-0 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full max-w-[540px] aspect-[4/3] group"
            >
              {/* Main Image Container with Gold Border Frame */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border-[6px] border-secondary shadow-xl bg-secondary">
                {heroImages.map((image, idx) => (
                  <div
                    key={image.src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <motion.div
                      animate={idx === currentIndex ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 7, ease: "easeOut" }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={idx === 0}
                        className="object-cover"
                      />
                      {/* Dark overlay gradient for luxury readability & text contrast if dots overlap */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none z-10" />
                    </motion.div>
                  </div>
                ))}

                {/* Manual Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrev()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-black/60 transition-all duration-300 shadow-md group/btn opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4.5 h-4.5 group-hover/btn:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-black/60 transition-all duration-300 shadow-md group/btn opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4.5 h-4.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                          ? "w-5 bg-[#D4AF37]" 
                          : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Elegant Gold Outline Accent Frame */}
              <div className="absolute -inset-3 border border-primary/20 rounded-[2.3rem] pointer-events-none -z-10 translate-x-3 translate-y-3" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Trust Badges - Bottom Row */}
      <div className="w-full border-t border-border/40 mt-16 lg:mt-24 pt-8 bg-background/40 backdrop-blur-xs">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustBadges.map((badge, idx) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-3.5 group justify-start md:justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <badge.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
