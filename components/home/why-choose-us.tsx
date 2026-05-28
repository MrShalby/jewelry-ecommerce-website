"use client"

import { motion } from "framer-motion"
import { Diamond, Shield, Award, Truck, Gem, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Diamond,
    title: "Certified Quality",
    description: "Every diamond and gemstone is certified by leading international laboratories.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Our jewellery comes with a lifetime warranty on craftsmanship and materials.",
  },
  {
    icon: Award,
    title: "60+ Years Legacy",
    description: "Three generations of master craftsmen ensuring unparalleled excellence.",
  },
  {
    icon: Truck,
    title: "Insured Delivery",
    description: "Free insured shipping across India with real-time tracking.",
  },
  {
    icon: Gem,
    title: "BIS Hallmarked",
    description: "All gold jewellery is BIS hallmarked for guaranteed purity.",
  },
  {
    icon: RefreshCw,
    title: "Easy Exchange",
    description: "Hassle-free 30-day exchange policy on all purchases.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase">
            Our Quality Guarantee
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            The Pillars of Our <span className="italic text-primary font-normal font-serif">Legacy</span>
          </h2>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Over six decades of crafting masterpieces with pure gold, sparkling diamonds, and unmatched devotion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 rounded-[1.8rem] bg-white border border-border/80 hover:border-primary/30 shadow-xs hover:shadow-lg transition-all duration-500 h-full flex flex-col items-start text-left">
                {/* Refined Icon Frame */}
                <div className="w-12 h-12 rounded-full bg-secondary/80 text-primary flex items-center justify-center mb-6 border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs font-sans leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
