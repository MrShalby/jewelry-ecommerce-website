"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function WhatsAppButton() {
  const [isMinimal, setIsMinimal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const bottomThreshold = document.documentElement.scrollHeight - 450 // Trigger near the footer
      
      if (scrollPosition >= bottomThreshold) {
        setIsMinimal(true)
      } else {
        setIsMinimal(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    // Run once initially to check state
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const message = encodeURIComponent(
    `Hi ${siteConfig.name}! I'm interested in your jewellery collection. Can you help me?`
  )
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${message}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: isMinimal ? 0.45 : 1,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 group",
        isMinimal ? "w-12 h-12 rounded-full p-0" : "px-4 py-3 rounded-full gap-3 h-12"
      )}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      
      {!isMinimal && (
        <span className="hidden sm:block font-medium whitespace-nowrap text-sm">
          Chat with us
        </span>
      )}
      
      {/* Pulse animation - only when not minimal */}
      {!isMinimal && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
      )}
    </motion.a>
  )
}
