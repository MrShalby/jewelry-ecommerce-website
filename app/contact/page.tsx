"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Get in <span className="gold-gradient-text">Touch</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our showroom or reach out to us. We&apos;d love to help you find the perfect piece.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-serif text-2xl text-foreground mb-6">Send us a Message</h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    We&apos;ve received your message and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="custom">Custom Jewellery Request</option>
                      <option value="appointment">Book an Appointment</option>
                      <option value="order">Order Related</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gold-gradient text-primary-foreground hover:opacity-90 py-6 text-lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">Visit Us</h3>
                <p className="text-muted-foreground text-sm">{siteConfig.address}</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <Phone className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">Call Us</h3>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <Mail className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">Email Us</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">Store Hours</h3>
                <div className="text-muted-foreground text-sm space-y-1">
                  <p>Mon-Fri: {siteConfig.storeHours.weekdays}</p>
                  <p>Sat: {siteConfig.storeHours.saturday}</p>
                  <p>Sun: {siteConfig.storeHours.sunday}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">
                    Chat on WhatsApp
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Get instant responses from our team
                  </p>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Hi ${siteConfig.name}! I'd like to know more about your jewellery collection.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#25D366] hover:underline text-sm font-medium"
                  >
                    Start Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-card border border-border rounded-xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.904062618965!2d72.5713621!3d23.0225784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8483a6fe40ef%3A0x5c7d8a9e1c29d4c5!2sManek%20Chowk%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
