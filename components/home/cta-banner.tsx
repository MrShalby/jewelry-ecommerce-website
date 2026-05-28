"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function CTABanner() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-border/40">
      {/* Background image with soft cream overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80"
          alt="Luxury jewellery workshop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xs" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase block">
            Bespoke Commissions
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            Craft Your <span className="italic text-primary font-normal font-serif">Family Heirloom</span>
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto" />
          
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Schedule a private viewing at our flagship showroom in CG Road, Ahmedabad, or coordinate a virtual design session. Let our master artisans bring your custom diamond and gold visions to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              variant="gold"
              className="transition-all text-xs uppercase tracking-widest px-8 py-6 rounded-full group"
              asChild
            >
              <Link href="/contact">
                Book Showroom Visit
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/5 text-xs uppercase tracking-widest px-8 py-6 rounded-full"
              asChild
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call Showroom
              </a>
            </Button>
          </div>

          <p className="pt-4 text-xs text-muted-foreground uppercase tracking-widest font-sans">
            Ahmedabad Atelier • C.G. Road showroom
          </p>
        </motion.div>
      </div>
    </section>
  )
}
