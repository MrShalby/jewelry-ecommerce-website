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

  // Simulate 360 rotation by cycling through images
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

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-primary transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div
              ref={imageRef}
              className={cn(
                "relative aspect-square rounded-2xl overflow-hidden bg-card gold-border mb-4 cursor-zoom-in",
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

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 p-2 bg-background/80 rounded-full">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="px-3 py-1 text-xs font-medium gold-gradient text-primary-foreground rounded-full">
                    Featured
                  </span>
                )}
                {product.bestseller && (
                  <span className="px-3 py-1 text-xs font-medium bg-foreground text-background rounded-full">
                    Bestseller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              {/* 360 View Button */}
              <button
                onClick={handle360}
                className="w-20 h-20 rounded-lg border-2 border-border hover:border-primary flex items-center justify-center bg-card transition-colors"
              >
                <span className="text-xs text-muted-foreground">360°</span>
              </button>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="text-primary text-sm uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-4xl gold-gradient-text">
                  {formatPrice(product.price)}
                </span>
                <span className="text-muted-foreground">
                  {product.karat} | {product.weight}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-5 py-2.5 border rounded-lg text-sm transition-all",
                      selectedSize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border border-border rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border border-border rounded-lg flex items-center justify-center hover:border-primary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => addToCart(product, quantity, selectedSize)}
                className="flex-1 gold-gradient text-primary-foreground hover:opacity-90 py-6"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "border-primary py-6",
                  isInWishlist(product.id)
                    ? "bg-primary text-primary-foreground"
                    : "text-primary hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    isInWishlist(product.id) && "fill-current"
                  )}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-muted-foreground hover:border-primary hover:text-primary py-6"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Free Insured Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Lifetime Warranty</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">30-Day Exchange</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 bg-card">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
            </TabsList>
            <div className="mt-8 p-6 bg-card rounded-2xl border border-border">
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="text-foreground">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Metal</p>
                    <p className="text-foreground">{product.karat} Gold</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="text-foreground">{product.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="text-foreground capitalize">{product.gender}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-foreground leading-relaxed">{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="space-y-4">
                <p className="text-foreground">
                  We offer free insured shipping on all orders across India. Your precious jewellery will be carefully packaged and delivered within 5-7 business days.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Free shipping on all orders</li>
                  <li>• Fully insured delivery</li>
                  <li>• Real-time tracking available</li>
                  <li>• Signature required upon delivery</li>
                </ul>
              </TabsContent>
              <TabsContent value="care" className="space-y-4">
                <p className="text-foreground">
                  To maintain the brilliance of your jewellery, we recommend the following care instructions:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Store in a cool, dry place away from direct sunlight</li>
                  <li>• Remove before swimming, bathing, or exercising</li>
                  <li>• Clean gently with a soft cloth</li>
                  <li>• Avoid contact with perfumes and chemicals</li>
                  <li>• Get professional cleaning annually</li>
                </ul>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              You May Also <span className="gold-gradient-text">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
