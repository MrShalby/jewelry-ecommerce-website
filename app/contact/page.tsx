"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background relative overflow-hidden z-10">
      {/* Decorative background glow accents */}
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] rounded-full bg-primary/3 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[30vw] h-[30vw] rounded-full bg-gold-light/10 blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.4em] text-primary uppercase block">
            Atelier Booking
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground font-light leading-tight">
            Begin Your <span className="italic text-primary font-normal font-serif">Journey</span>
          </h1>
          <div className="w-12 h-[1px] bg-primary/60 mx-auto mt-4" />
          <p className="text-muted-foreground text-xs font-sans max-w-md mx-auto">
            Schedule a private consultation at our CG Road flagship showroom or request a virtual presentation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form - Left 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/90 backdrop-blur-xs border border-border/80 rounded-[2.2rem] p-8 md:p-10 shadow-md hover:border-primary/25 transition-all duration-500">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Request Private Consultation</h2>

              {isSubmitted ? (
                <div className="text-center py-16 space-y-6">
                  <div className="w-14 h-14 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto border border-primary/10">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      Booking Request Received
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      Our showroom coordinator will contact you via WhatsApp/Phone within 12 hours to confirm your calendar slot.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 bg-secondary/15 border border-border/80 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all focus:ring-1 focus:ring-primary/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3.5 bg-secondary/15 border border-border/80 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all focus:ring-1 focus:ring-primary/20"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3.5 bg-secondary/15 border border-border/80 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all focus:ring-1 focus:ring-primary/20"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Interest Area
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3.5 bg-secondary/15 border border-border/80 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all focus:ring-1 focus:ring-primary/20"
                    >
                      <option value="">Select a service</option>
                      <option value="bridal">Bridal Kundan Set Viewing</option>
                      <option value="rings">Fine Solitaire Diamond Rings</option>
                      <option value="custom">Bespoke Jewelry Customization</option>
                      <option value="showroom">Showroom Tour (CG Road)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Special Requests / Notes
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 bg-secondary/15 border border-border/80 rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none focus:ring-1 focus:ring-primary/20"
                      placeholder="Share metal purity preferences, wedding dates, or design ideas..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="gold"
                    className="w-full py-6 text-xs uppercase tracking-widest font-sans font-bold rounded-full transition-all duration-300"
                  >
                    {isSubmitting ? "Submitting Request..." : "Request Appointment"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Details - Right 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Flagship Showroom Card */}
              <div className="bg-white border border-border/80 rounded-[1.6rem] p-6 space-y-4 hover:border-primary/35 hover:shadow-xs transition-all duration-300 group">
                <div className="w-10 h-10 rounded-full bg-secondary/80 text-primary flex items-center justify-center border border-primary/15 group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Flagship Showroom</h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>

              {/* Call Us Card */}
              <div className="bg-white border border-border/80 rounded-[1.6rem] p-6 space-y-4 hover:border-primary/35 hover:shadow-xs transition-all duration-300 group">
                <div className="w-10 h-10 rounded-full bg-secondary/80 text-primary flex items-center justify-center border border-primary/15 group-hover:scale-105 transition-transform duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Call Us</h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-[11px] text-muted-foreground hover:text-primary transition-colors block mt-1"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white border border-border/80 rounded-[1.6rem] p-6 space-y-4 hover:border-primary/35 hover:shadow-xs transition-all duration-300 group">
                <div className="w-10 h-10 rounded-full bg-secondary/80 text-primary flex items-center justify-center border border-primary/15 group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Email</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[11px] text-muted-foreground hover:text-primary transition-colors block mt-1"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white border border-border/80 rounded-[1.6rem] p-6 space-y-4 hover:border-primary/35 hover:shadow-xs transition-all duration-300 group">
                <div className="w-10 h-10 rounded-full bg-secondary/80 text-primary flex items-center justify-center border border-primary/15 group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Hours</h3>
                  <div className="text-[11px] text-muted-foreground mt-1 space-y-0.5 font-sans">
                    <p>Weekdays: {siteConfig.storeHours.weekdays}</p>
                    <p>Sat - Sun: {siteConfig.storeHours.saturday}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* WhatsApp CTA Banner */}
            <div className="bg-white border border-[#25D366]/20 rounded-[1.6rem] p-6 flex items-start gap-4 shadow-2-xs hover:border-[#25D366]/40 transition-all duration-300">
              <div className="w-10 h-10 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 border border-[#25D366]/20">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-sm font-semibold text-foreground">Chat via WhatsApp</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Have an urgent question regarding pricing or gold weight? Reach out to our design managers on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hi ${siteConfig.name}! I'd like to book an appointment and ask about your custom jewellery.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#25D366] font-bold hover:underline pt-1.5"
                >
                  Start Consultation Chat →
                </a>
              </div>
            </div>

            {/* Framed Google Maps */}
            <div className="p-2 border border-border/80 bg-white rounded-[2rem] overflow-hidden shadow-2-xs h-72 hover:border-primary/30 transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.904062618965!2d72.5713621!3d23.0225784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8483a6fe40ef%3A0x5c7d8a9e1c29d4c5!2sManek%20Chowk%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Atelier Location"
                className="rounded-[1.6rem]"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
