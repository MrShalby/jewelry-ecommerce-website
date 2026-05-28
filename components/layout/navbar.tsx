"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, Heart, Calendar } from "lucide-react"
import { useStore } from "@/hooks/use-store"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { setIsCartOpen, cartCount, wishlistCount } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass py-3 shadow-sm border-b border-border/40" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex lg:grid lg:grid-cols-3 items-center justify-between w-full">
            {/* Logo - Left */}
            <div className="flex items-center justify-start">
              <Link href="/" className="group relative z-50">
                <div className="flex flex-col items-start select-none">
                  <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-foreground group-hover:text-primary transition-colors">
                    SHALBY
                  </span>
                  <span className="font-sans text-[8px] md:text-[10px] text-primary/95 tracking-[0.4em] uppercase font-semibold -mt-1">
                    JEWELS
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-2 text-xs uppercase tracking-widest transition-colors duration-300 font-sans font-medium",
                      isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center justify-end gap-3 md:gap-5">
              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-foreground/80 hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Consultation CTA */}
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-[11px] uppercase tracking-widest font-sans px-5 py-4 rounded-full"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Book Consult
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground/80 hover:text-primary transition-colors z-50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col bg-background/98 backdrop-blur-xl"
          >
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 pt-20">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-2xl font-serif tracking-wide block transition-colors",
                        isActive ? "text-primary font-bold" : "text-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mt-4"
              >
                <Button
                  variant="gold"
                  className="uppercase tracking-widest text-xs px-6 py-5 rounded-full"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/contact">Book Consultation</Link>
                </Button>
              </motion.div>
            </nav>
            <div className="p-8 border-t border-border/40 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2"> અમદાવાદ • Since 1965</p>
              <p className="text-xs text-muted-foreground">{siteConfig.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
