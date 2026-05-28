"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Diamond, Award, Users, Heart, ArrowRight, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"

const timeline = [
  {
    year: "1965",
    title: "The Workshop in Manek Chowk",
    description: "Shri Kantilal Shah established a small jewellery atelier, making custom ornaments with intricate hand filigree work.",
  },
  {
    year: "1985",
    title: "Legacy of the Sons",
    description: "Rajesh and Mahesh Shah joined the house, preserving ancestral methods while introducing modern auditing standards.",
  },
  {
    year: "2000",
    title: "Flagship CG Road Showroom",
    description: "Opened our flagship showroom on C.G. Road, establishing Shalby Jewels as Ahmedabad's premiere bridal atelier.",
  },
  {
    year: "2015",
    title: "E-Commerce Atelier",
    description: "The third generation expanded our presence nationwide, shipping fully insured diamond pieces across India.",
  },
  {
    year: "2024",
    title: "Golden Jubilee Heritage",
    description: "Celebrating nearly 60 years of absolute purity, legacy customer trust, and timeless designs.",
  },
]

const values = [
  {
    icon: Diamond,
    title: "GIA Certified Diamonds",
    description: "Every diamond is hand-selected and verified by world-leading gemological institutes.",
  },
  {
    icon: Award,
    title: "BIS 916 Hallmarked",
    description: "Absolute trust and gold purity certifications stamped on every heirloom ornament.",
  },
  {
    icon: Users,
    title: "Artisanal Heritage",
    description: "Support for master karigars preserving generations of traditional Indian designs.",
  },
  {
    icon: Heart,
    title: "Bespoke Design",
    description: "Collaborate directly with our design consultants to create one-of-a-kind treasures.",
  },
]

const stats = [
  { number: "60+", label: "Years of Excellence" },
  { number: "50K+", label: "Royal Clientele" },
  { number: "120+", label: "Master Artisans" },
  { number: "10K+", label: "Custom Blueprints" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
            alt="Shalby Jewels Heritage"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-6 text-center space-y-4"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.4em] text-primary uppercase block">
            Our Legacy
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground font-light leading-tight">
            The House of <span className="italic text-primary font-normal font-serif">Shalby Jewels</span>
          </h1>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Crafting royal gold and diamond masterpieces in the heart of Gujarat since 1965.
          </p>
        </motion.div>
      </section>

      {/* Story / Legacy section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text - Left 6 cols */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase">
                Established 1965
              </span>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground font-light leading-tight">
                Generations of Fine <span className="italic text-primary font-normal font-serif">Karigari</span>
              </h2>
              <div className="w-10 h-[1px] bg-primary/50" />
              
              <div className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                <p>
                  Our journey began in the legendary lanes of Manek Chowk, Ahmedabad. Our founder, Shri Kantilal Shah, envisioned a brand where the highest purity gold would blend with traditional Indian design blueprints to tell stories of royalty and elegance.
                </p>
                <p>
                  For six decades, we have remained committed to absolute integrity, GIA-level diamond certifications, and direct patronage to Gujarat’s artisan families. Today, under the third generation, we bring our CG Road couture experience directly to discerning customers nationwide.
                </p>
              </div>
            </motion.div>

            {/* Showcase Image - Right 6 cols */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative flex justify-center"
            >
              <div className="p-2 border border-border/80 bg-white rounded-[2rem] w-full max-w-[450px]">
                <div className="relative aspect-[4/5] rounded-[1.7rem] overflow-hidden bg-secondary">
                  <Image
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                    alt="Legacy Craftsmanship"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white border-y border-border/40">
        <div className="container mx-auto px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 space-y-4"
          >
            <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase">
              Brand Guidelines
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light">
              Purity in Every <span className="italic text-primary font-normal font-serif">Detail</span>
            </h2>
            <div className="w-12 h-[1px] bg-primary/60 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 border border-border/40 rounded-[1.5rem] bg-secondary/15 hover:shadow-xs transition-all"
              >
                <div className="w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10">
                  <value.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 space-y-4"
          >
            <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-primary uppercase">
              Historical Milestones
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground font-light">
              Our Journey of <span className="italic text-primary font-normal font-serif">Gold</span>
            </h2>
            <div className="w-12 h-[1px] bg-primary/60 mx-auto" />
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Central Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-border" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Gold Circle Node */}
                <div className="absolute left-8 md:left-1/2 w-3.5 h-3.5 -translate-x-1/2 rounded-full border border-primary/55 bg-background z-10" />

                {/* Content Frame */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <span className="text-primary font-serif italic text-2xl font-semibold">{item.year}</span>
                  <h3 className="font-serif text-lg font-semibold text-foreground mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-24 bg-white border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="text-center space-y-1"
              >
                <span className="font-serif text-4xl md:text-5xl font-light text-primary">
                  {stat.number}
                </span>
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center max-w-xl space-y-6">
          <MapPin className="w-8 h-8 text-primary mx-auto" />
          <h2 className="font-serif text-2xl md:text-4xl text-foreground font-light">
            Visit Our Showroom
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Experience our heritage gallery in CG Road, Ahmedabad. View the designs, touch the gold filigree, and co-create custom bridal sets with our gem consultants.
          </p>
          <Button
            size="lg"
            variant="gold"
            className="text-xs uppercase tracking-widest px-8 py-5 rounded-full mt-4"
            asChild
          >
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
