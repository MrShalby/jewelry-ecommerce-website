"use client"

import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"

export function CartSlideOver() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
  } = useStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: siteConfig.currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-xs z-50"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-border/80 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/40 text-left">
              <div className="space-y-0.5">
                <h2 className="font-serif text-lg font-bold text-foreground">Shopping Bag</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-sans font-bold">Your Saved Selections</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 bg-secondary/80 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-all"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 text-left">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-14 h-14 bg-secondary text-primary/45 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Your Bag is Empty</h3>
                  <p className="text-xs text-muted-foreground mb-8 max-w-xs mx-auto">Discover our collection of handcrafted jewellery to add treasures.</p>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    variant="gold"
                    className="text-xs uppercase tracking-widest font-sans font-bold px-8 py-4 rounded-full"
                    asChild
                  >
                    <Link href="/shop">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => (
                    <motion.li
                      key={`${item.product.id}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 items-center pb-6 border-b border-border/30"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0 border border-border/60 p-0.5">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="text-xs font-semibold text-foreground truncate font-sans">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] text-muted-foreground font-sans">
                          Size: {item.selectedSize}
                        </p>
                        <p className="text-primary font-serif font-bold text-xs">
                          {formatPrice(item.product.price)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3 pt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-7 h-7 border border-border bg-white rounded-full flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-all"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-xs w-5 text-center font-sans font-bold">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-7 h-7 border border-border bg-white rounded-full flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-all"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[10px] uppercase tracking-wider font-sans font-bold text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border/40 p-6 space-y-4 text-left">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-sans uppercase font-bold text-muted-foreground tracking-wider">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-primary">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-sans">
                  Free insured premium shipping on all orders.
                </p>
                <div className="space-y-2 pt-2">
                  <Button
                    variant="gold"
                    className="w-full text-xs uppercase tracking-widest font-sans font-bold py-5 rounded-full"
                    asChild
                  >
                    <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary/40 text-primary hover:bg-primary/5 text-xs uppercase tracking-widest font-sans py-5 rounded-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  )
}
