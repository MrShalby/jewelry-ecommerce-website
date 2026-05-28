"use client"

import { useState, use, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  ShoppingBag,
  Share2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
  ZoomIn,
  MessageCircle,
} from "lucide-react"
import { products } from "@/data/products"
import { useStore } from "@/hooks/use-store"
import { siteConfig } from "@/lib/config"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [rotation, setRotation] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: siteConfig.currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handle360 = () => {
    const interval = setInterval(() => {
      setRotation((prev) => {
        if (prev >= 360) {
          clearInterval(interval)
          return 0
        }
        setCurrentImageIndex((imgPrev) =>
          imgPrev === product.images.length - 1 ? 0 : imgPrev + 1
        )
        return prev + 45
      })
    }, 200)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    imageRef.current.style.transformOrigin = `${x}% ${y}%`
  }

  const whatsappInquiryUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi ${siteConfig.name}! I am viewing the "${product.name}" (${product.karat}, ${product.weight}, Price: ${formatPrice(product.price)}) on your website. I'd like to ask a few questions about this design.`
  )}`

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Luxury Breadcrumb */}
        <nav className="flex items-center gap-2.5 text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-12">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground/45">/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span className="text-muted-foreground/45">/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-primary transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-muted-foreground/45">/</span>
          <span className="text-foreground tracking-normal normal-case font-serif">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-start">
          
          {/* Left: Image Gallery - 6 cols */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Main Image Frame */}
            <div className="p-2.5 border border-border/85 bg-white rounded-[2rem] shadow-xs">
              <div
                ref={imageRef}
                className={cn(
                  "relative aspect-square rounded-[1.6rem] overflow-hidden bg-secondary cursor-zoom-in z-10",
                  isZoomed && "cursor-zoom-out"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isZoomed && setIsZoomed(false)}
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-300",
                    isZoomed && "scale-150"
                  )}
                  style={{ transform: `rotate(${rotation}deg)` }}
                />

                {/* Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/95 backdrop-blur-xs rounded-full shadow-xs hover:text-primary transition-colors z-20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/95 backdrop-blur-xs rounded-full shadow-xs hover:text-primary transition-colors z-20"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Zoom indicator overlay */}
                <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-xs rounded-full shadow-2-xs pointer-events-none">
                  <ZoomIn className="w-4 h-4 text-muted-foreground" />
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.featured && (
                    <span className="px-2.5 py-0.5 text-[9px] font-sans font-bold tracking-widest uppercase bg-primary text-primary-foreground rounded-full">
                      Featured
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="px-2.5 py-0.5 text-[9px] font-sans font-bold tracking-widest uppercase bg-foreground text-background rounded-full">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-4 px-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-xl overflow-hidden p-1 bg-white border transition-all duration-300",
                    currentImageIndex === index
                      ? "border-primary shadow-xs scale-102"
                      : "border-border/60 hover:border-primary/45"
                  )}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
              {/* 360 View */}
              <button
                onClick={handle360}
                className="w-20 h-20 rounded-xl border border-border/80 hover:border-primary/50 flex flex-col items-center justify-center bg-white text-[10px] font-sans font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300 shadow-2-xs shrink-0"
              >
                <span className="text-xs">360°</span>
                <span className="text-[8px] text-primary mt-0.5">Spin</span>
              </button>
            </div>
          </motion.div>

          {/* Right: Product Details - 6 cols */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* Headers */}
            <div className="space-y-3">
              <span className="text-[10px] text-primary font-sans font-bold tracking-widest uppercase block">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground font-semibold leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-serif text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold font-sans text-muted-foreground bg-secondary px-2.5 py-1 rounded-md border border-border/40">
                  {product.karat} Purity • {product.weight}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Select */}
            <div className="space-y-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">
                Select Size / Length
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 border rounded-full text-xs font-sans font-semibold tracking-wider transition-all duration-300",
                      selectedSize === size
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
            <div className="space-y-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border bg-white rounded-full flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-sans font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border bg-white rounded-full flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => addToCart(product, quantity, selectedSize)}
                className="flex-1 py-4 bg-primary text-primary-foreground hover:opacity-90 rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-secondary hover:bg-primary/10 text-foreground hover:text-primary rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                Inquire on WhatsApp
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "p-4 border rounded-full transition-all",
                    isInWishlist(product.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white text-muted-foreground hover:border-primary"
                  )}
                  aria-label="Wishlist"
                >
                  <Heart className={cn("w-4 h-4", isInWishlist(product.id) && "fill-current")} />
                </button>

                <button
                  className="p-4 border border-border bg-white rounded-full text-muted-foreground hover:border-primary transition-all"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary/80 text-primary flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-muted-foreground leading-tight text-left">Free Insured Shipping</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary/80 text-primary flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-muted-foreground leading-tight text-left">Lifetime Warranty</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary/80 text-primary flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-muted-foreground leading-tight text-left">30-Day Exchange</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 bg-secondary/20 p-1 rounded-full border border-border/40">
              <TabsTrigger value="details" className="rounded-full text-xs font-sans uppercase tracking-widest font-semibold py-2">Specs</TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-full text-xs font-sans uppercase tracking-widest font-semibold py-2">Shipping</TabsTrigger>
              <TabsTrigger value="care" className="rounded-full text-xs font-sans uppercase tracking-widest font-semibold py-2">Ornament Care</TabsTrigger>
            </TabsList>
            <div className="mt-8 p-8 bg-white rounded-[2rem] border border-border/80 text-left shadow-2-xs">
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-1">Category</span>
                    <span className="text-sm text-foreground font-semibold font-serif">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-1">Metal Composition</span>
                    <span className="text-sm text-foreground font-semibold font-serif">{product.karat} Gold</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-1">Gross Weight</span>
                    <span className="text-sm text-foreground font-semibold font-serif">{product.weight}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block mb-1">Gender Class</span>
                    <span className="text-sm text-foreground font-semibold font-serif capitalize">{product.gender}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/40 space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground block">Detailed Description</span>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                <p className="text-foreground font-serif text-base mb-2">Secure Home Delivery Across India</p>
                <p>
                  We coordinate with leading secured logistics partners to provide 100% insured delivery directly to your home. Every item requires a signature and photo verification upon receipt.
                </p>
                <ul className="space-y-1.5 mt-4">
                  <li>• Free shipping across India</li>
                  <li>• Fully insured value protection transit</li>
                  <li>• Real-time digital tracking links</li>
                  <li>• Delivery within 5-7 business days</li>
                </ul>
              </TabsContent>
              <TabsContent value="care" className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                <p className="text-foreground font-serif text-base mb-2">Preserving the Sparkle</p>
                <p>
                  To maintain the brilliant luster of your handcrafted heritage jewellery, we recommend checking your settings and getting cleanings done regularly.
                </p>
                <ul className="space-y-1.5 mt-4">
                  <li>• Store individually in fabric-lined pouches</li>
                  <li>• Remove before physical exercise, swimming, or chemical contact</li>
                  <li>• Buff gently with a micro-polishing cloth</li>
                  <li>• Visit our CG Road atelier for annual audits and complimentary ultrasonic cleanings</li>
                </ul>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-t border-border/40 pt-20"
          >
            <div className="text-center mb-16 space-y-3">
              <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase block">Matching Sets</span>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground font-light">
                You May Also <span className="italic text-primary font-normal font-serif">Like</span>
              </h2>
              <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
