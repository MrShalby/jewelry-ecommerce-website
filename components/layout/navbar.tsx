"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, Heart, Calendar, ArrowRight } from "lucide-react"
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
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const pathname = usePathname()
  const { setIsCartOpen, cartCount, wishlistCount } = useStore()
  
  const logoLetters = Array.from("SHALBY")

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Scrolled state for visual style transition
      setIsScrolled(currentScrollY > 50)
      
      // Smart show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: isVisible || isMobileMenuOpen ? 0 : -120 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none"
      >
        <div className="container mx-auto px-4 md:px-6 pointer-events-auto">
          <div
            className={cn(
              "mx-auto transition-all duration-500 ease-out flex items-center justify-between w-full",
              isScrolled
                ? "max-w-5xl glass py-3 px-4 md:px-6 rounded-full shadow-lg border border-primary/25 mt-4"
                : "max-w-full bg-transparent py-6 px-0 border-transparent mt-0"
            )}
          >
            {/* Logo - Left */}
            <div className="flex items-center justify-start">
              <Link href="/" className="group relative z-50">
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  className="flex flex-col items-start select-none w-fit"
                >
                  <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-foreground flex">
                    {logoLetters.map((char, i) => (
                      <motion.span
                        key={i}
                        variants={{
                          initial: { y: 0, color: "var(--foreground)" },
                          hover: {
                            y: -3,
                            color: "var(--primary)",
                            textShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
                            transition: { type: "spring", stiffness: 350, damping: 9, delay: i * 0.02 }
                          }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  <span className="font-sans text-[8px] md:text-[10px] text-primary/95 tracking-[0.4em] uppercase font-semibold -mt-1 transition-all duration-300 group-hover:tracking-[0.5em] group-hover:text-primary">
                    JEWELS
                  </span>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <nav
              className={cn(
                "hidden lg:flex items-center justify-center gap-1 transition-all duration-500 relative",
                isScrolled ? "" : "bg-secondary/15 px-2 py-1 rounded-full border border-border/20 backdrop-blur-xs"
              )}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href
                const isHovered = hoveredIndex === idx
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    className={cn(
                      "relative px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300 font-sans font-medium rounded-full z-10",
                      isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Sliding Hover Capsule Backdrop */}
                    {isHovered && (
                      <motion.span
                        layoutId="hoverHighlight"
                        className="absolute inset-0 bg-white/5 rounded-full border border-white/10 z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center justify-end gap-3 md:gap-5">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 text-foreground/80 hover:text-primary transition-colors block group"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative z-10"
                >
                  <Heart className="w-5 h-5 group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] transition-all" />
                </motion.div>
                <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 border border-transparent group-hover:border-primary/10" />
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0.6, y: -2 }}
                    animate={{ scale: [0.6, 1.3, 1] }}
                    className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold pointer-events-none shadow-md"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-foreground/80 hover:text-primary transition-colors cursor-pointer group"
                aria-label="Open cart"
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, -4, 4, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  <ShoppingBag className="w-5 h-5" />
                </motion.div>
                <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 border border-transparent group-hover:border-primary/10" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6, y: -2 }}
                    animate={{ scale: [0.6, 1.3, 1] }}
                    className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-bold pointer-events-none shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Consultation CTA */}
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-[11px] uppercase tracking-widest font-sans px-5 py-4 rounded-full group/btn relative overflow-hidden transition-all duration-300 shine-effect"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 group-hover/btn:scale-110 transition-transform" />
                  <span className="relative z-10">Book Consult</span>
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground/80 hover:text-primary transition-colors z-50 cursor-pointer"
                aria-label="Toggle menu"
              >
                <motion.div
                  initial={false}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center gap-1.5 relative items-center"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col bg-background/98 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Decorative background blurs inside mobile menu */}
            <div className="absolute top-1/4 left-1/4 w-[220px] h-[220px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[180px] h-[180px] rounded-full bg-gold-light/3 blur-[80px] pointer-events-none" />

            <div className="flex-1 flex flex-col pt-28 pb-10 px-6 container mx-auto justify-between min-h-[90vh]">
              {/* Primary links + Collections grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left col: Main Nav Links */}
                <div className="space-y-6">
                  <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-primary uppercase block border-b border-primary/20 pb-2">
                    Menu
                  </span>
                  <nav className="flex flex-col gap-5">
                    {navLinks.map((link, index) => {
                      const isActive = pathname === link.href
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 150, damping: 15, delay: index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "text-xl font-serif tracking-wide block transition-all duration-300 hover:text-primary hover:pl-2",
                              isActive ? "text-primary font-bold pl-2 border-l border-primary" : "text-foreground"
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                </div>

                {/* Right col: Collections & Shortcuts */}
                <div className="space-y-6">
                  <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-primary uppercase block border-b border-primary/20 pb-2">
                    Our Collections
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Bridal Couture", href: "/shop?category=bridal", desc: "Handcrafted sets" },
                      { name: "Heritage Gold", href: "/shop?category=gold", desc: "Legacy pieces" },
                      { name: "Solitaire Diamonds", href: "/shop?category=diamond", desc: "Exquisite cuts" },
                      { name: "Minimalist Fine", href: "/shop?category=minimalist", desc: "Daily luxury" },
                    ].map((col, idx) => (
                      <motion.div
                        key={col.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 + idx * 0.05 }}
                      >
                        <Link
                          href={col.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block p-3 rounded-lg bg-card/50 border border-border/40 hover:border-primary/30 transition-all hover:bg-card group"
                        >
                          <h4 className="font-serif text-xs text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                            {col.name}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {col.desc}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Info Row */}
              <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left relative z-10">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans">
                    અમદાવાદ • Since 1965
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    C.G. Road Flagship Showroom
                  </p>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-1">
                  <p className="text-[11px] text-primary tracking-widest font-medium">
                    {siteConfig.phone}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {siteConfig.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
