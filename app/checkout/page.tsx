"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Shield, Truck, CreditCard, Banknote, Building2, Check } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI Payment", icon: Banknote },
  { id: "netbanking", label: "Net Banking", icon: Building2 },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
]

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: siteConfig.currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const shipping = cartTotal > 50000 ? 0 : 500
  const tax = Math.round(cartTotal * 0.03) // 3% GST
  const total = cartTotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1800))
    setIsSubmitting(false)
    setIsComplete(true)
    clearCart()
  }

  if (cart.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-background flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-md">
          <span className="text-4xl block mb-4">🛒</span>
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-3">Your Bag is Empty</h1>
          <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
            Please add some beautiful handcrafted jewellery to your shopping bag before checking out.
          </p>
          <Button variant="gold" className="text-xs uppercase tracking-widest font-sans font-bold px-8 py-5 rounded-full" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-background flex items-center justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-16 bg-white border border-border/80 rounded-[2.2rem] p-8 shadow-xs"
          >
            <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
              <Check className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-3">Order Confirmed</h1>
            <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
              Thank you for trusting Shalby Jewels. We have received your order details and sent a confirmation message to your email.
            </p>
            <Button variant="gold" className="text-xs uppercase tracking-widest font-sans font-bold px-8 py-5 rounded-full" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Back Link */}
        <div className="mb-10 text-left">
          <Link
            href="/shop"
            className="inline-flex items-center text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Catalog
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground font-light mt-4">
            Secure Checkout
          </h1>
          <div className="w-12 h-[1px] bg-primary/50 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Checkout Details Form - Left 7 cols */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 space-y-8"
          >
            
            {/* Contact Information */}
            <div className="bg-white border border-border/80 rounded-[2.2rem] p-8 space-y-6 text-left shadow-2-xs">
              <h2 className="font-serif text-lg font-semibold text-foreground pb-2 border-b border-border/40">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-border/80 rounded-[2.2rem] p-8 space-y-6 text-left shadow-2-xs">
              <h2 className="font-serif text-lg font-semibold text-foreground pb-2 border-b border-border/40">Shipping Address</h2>
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  placeholder="House no., Building name, Street"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                    placeholder="State"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  className="w-full px-4 py-3 bg-secondary/15 border border-border/85 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                  placeholder="6-digit pincode"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-border/80 rounded-[2.2rem] p-8 space-y-6 text-left shadow-2-xs">
              <h2 className="font-serif text-lg font-semibold text-foreground pb-2 border-b border-border/40">Payment Gateway</h2>
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all duration-300 flex flex-col items-start justify-between h-24",
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <method.icon
                      className={cn(
                        "w-5 h-5",
                        paymentMethod === method.id ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="text-xs font-sans font-bold uppercase tracking-wider block mt-2">
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="gold"
              className="w-full py-6 text-xs uppercase tracking-widest font-sans font-bold rounded-full transition-all duration-300"
            >
              {isSubmitting ? "Processing Transaction..." : `Confirm & Pay ${formatPrice(total)}`}
            </Button>

            {/* Secured indicators */}
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>128-Bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest">
                <Truck className="w-3.5 h-3.5 text-primary" />
                <span>Transit Insured</span>
              </div>
            </div>

          </motion.form>

          {/* Order Summary - Right 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-white border border-border/80 rounded-[2.2rem] p-6 sticky top-28 space-y-6 text-left shadow-2-xs">
              <h2 className="font-serif text-lg font-semibold text-foreground pb-2 border-b border-border/40">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 items-center"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0 border border-border/60">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-foreground truncate font-sans">
                        {item.product.name}
                      </h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Size: {item.selectedSize} | Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-serif font-bold text-primary mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3.5 border-t border-border/40 pt-5 text-sm font-sans">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Gross Subtotal</span>
                  <span className="text-foreground font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Insured Shipping</span>
                  <span className="text-foreground font-semibold">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>GST/Tax (3%)</span>
                  <span className="text-foreground font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-border/40 pt-4 items-baseline">
                  <span className="font-serif text-base font-semibold text-foreground">Total Payable</span>
                  <span className="font-serif text-xl font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="p-3 bg-secondary/20 rounded-xl border border-primary/10 text-center">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary">
                    Qualifies for Free Premium Delivery
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
