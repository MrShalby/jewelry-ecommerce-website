"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Facebook, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/config"

const footerLinks = {
  shop: [
    { label: "All Jewellery", href: "/shop" },
    { label: "Necklaces", href: "/shop?category=Necklaces" },
    { label: "Rings", href: "/shop?category=Rings" },
    { label: "Earrings", href: "/shop?category=Earrings" },
    { label: "Bangles", href: "/shop?category=Bangles" },
    { label: "Wedding Sets", href: "/shop?category=Wedding%20Sets" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Store Locations", href: "/contact" },
  ],
}

export function Footer() {
  const logoLetters = Array.from("SHALBY");

  // Animations configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14
      }
    }
  };

  return (
    <footer className="bg-[#05160E] border-t border-border/80 relative overflow-hidden z-10">
      {/* Subtle floating gold background light blurs */}
      <div className="absolute top-0 left-1/4 w-[250px] h-[250px] rounded-full bg-primary/3 blur-[90px] pointer-events-none -z-10 animate-pulse duration-5000" />
      <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] rounded-full bg-gold-light/2 blur-[80px] pointer-events-none -z-10 animate-pulse duration-7000" />

      {/* Main Footer Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Socials */}
          <motion.div variants={itemVariants} className="space-y-4 text-left">
            <motion.div 
              initial="initial"
              whileHover="hover"
              className="flex flex-col cursor-pointer select-none w-fit"
            >
              <span className="font-serif text-3xl font-bold tracking-wider text-foreground flex">
                {logoLetters.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      initial: { y: 0, color: "var(--foreground)" },
                      hover: { 
                        y: -3, 
                        color: "var(--primary)",
                        transition: { type: "spring", stiffness: 350, damping: 9, delay: i * 0.025 }
                      }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="font-sans text-[10px] text-primary tracking-[0.4em] uppercase font-semibold -mt-1">
                JEWELS
              </span>
            </motion.div>
            <p className="text-muted-foreground leading-relaxed text-xs">
              {siteConfig.tagline}. Crafting bespoke luxury jewellery since 1965. Experience gold, diamonds, and heritage Kundan artistry from Ahmedabad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden p-2.5 border border-border bg-background rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_12px_rgba(212,175,55,0.15)] transition-all duration-300 group"
                aria-label="Instagram"
              >
                <span className="absolute inset-0 w-[40%] h-full bg-white/25 transform skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <Instagram className="w-4 h-4 relative z-10" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden p-2.5 border border-border bg-background rounded-full text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_12px_rgba(212,175,55,0.15)] transition-all duration-300 group"
                aria-label="Facebook"
              >
                <span className="absolute inset-0 w-[40%] h-full bg-white/25 transform skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <Facebook className="w-4 h-4 relative z-10" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Shop Links */}
          <motion.div variants={itemVariants} className="text-left">
            <h4 className="font-serif text-base font-semibold text-foreground mb-6 uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-sans relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: The House & Showroom Info */}
          <motion.div variants={itemVariants} className="text-left space-y-5">
            <div>
              <h4 className="font-serif text-base font-semibold text-foreground mb-4 uppercase tracking-wider">The House</h4>
              <ul className="space-y-2 text-sm">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors font-sans relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border/40 pt-4">
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2.5 group/item">
                  <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-primary hover:translate-x-0.5 transition-all duration-300 inline-block font-sans">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 group/item">
                  <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-primary hover:translate-x-0.5 transition-all duration-300 inline-block font-sans">
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Column 4: Atelier Journal (Newsletter Signup) */}
          <motion.div variants={itemVariants} className="space-y-5 text-left">
            <div>
              <h4 className="font-serif text-base font-semibold text-foreground mb-4 uppercase tracking-wider">Atelier Journal</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Join our private circle to receive updates on bespoke collections, legacy insights, and exclusive invitations.
              </p>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center group/form">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-border/80 text-xs px-1 py-3 focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 pr-10"
              />
              <button
                type="submit"
                className="absolute right-0 p-2 text-primary hover:text-white transition-colors duration-300 rounded-full group-hover/form:translate-x-1"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              {/* Decorative line highlight */}
              <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary group-focus-within/form:w-full transition-all duration-500" />
            </form>

            <div className="text-[10px] text-muted-foreground/80 flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>Showroom Hours: Mon-Fri {siteConfig.storeHours.weekdays}</span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-border/60 bg-background/40">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs font-sans">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Handcrafted legacy in Ahmedabad.
            </p>
            
            <p className="text-muted-foreground text-[11px] font-sans">
              Designed with elegance for <span className="text-primary font-medium">{siteConfig.name}</span>.
            </p>

            <div className="flex items-center gap-6 text-xs text-muted-foreground font-sans">
              <Link href="/privacy" className="hover:text-primary transition-colors relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
