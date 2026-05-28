"use client"

import { motion } from "framer-motion"
import { Diamond, Shield, Award, Truck, Gem, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

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
              <div className="relative p-8 rounded-[1.8rem] bg-card border border-border/70 hover:border-primary/40 shadow-xs hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] hover:bg-gradient-to-br hover:from-card hover:to-[#0B281B] -translate-y-0 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col items-start text-left overflow-hidden">
                {/* Deluxe Gold corner brackets */}
                <span className="absolute top-0 right-0 w-0 h-0 border-t-[1.5px] border-r-[1.5px] border-primary/0 group-hover:w-6 group-hover:h-6 group-hover:border-primary/60 group-hover:opacity-100 transition-all duration-500 rounded-tr-[1.8rem] pointer-events-none" />
                <span className="absolute bottom-0 left-0 w-0 h-0 border-b-[1.5px] border-l-[1.5px] border-primary/0 group-hover:w-6 group-hover:h-6 group-hover:border-primary/60 group-hover:opacity-100 transition-all duration-500 rounded-bl-[1.8rem] pointer-events-none" />

                {/* Refined Icon Frame with spinning ring and specific item hover transitions */}
                <div className="relative w-12 h-12 rounded-full bg-secondary/60 text-primary flex items-center justify-center mb-6 border border-primary/20 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                  {/* Outer spinning dash ring on hover */}
                  <span className="absolute inset-0 rounded-full border border-dashed border-primary/0 group-hover:border-primary/45 group-hover:animate-[spin_8s_linear_infinite] transition-all" />
                  <feature.icon className={cn(
                    "w-5 h-5 transition-all duration-500 relative z-10",
                    feature.title === "Certified Quality" && "group-hover:rotate-[360deg]",
                    feature.title === "Lifetime Warranty" && "group-hover:scale-115 group-hover:rotate-6",
                    feature.title === "60+ Years Legacy" && "group-hover:-translate-y-1 group-hover:scale-110",
                    feature.title === "Insured Delivery" && "group-hover:translate-x-1 group-hover:scale-110",
                    feature.title === "BIS Hallmarked" && "group-hover:scale-120 group-hover:rotate-12",
                    feature.title === "Easy Exchange" && "group-hover:rotate-180"
                  )} />
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
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
