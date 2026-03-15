import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCollections } from "@/components/home/featured-collections"
import { BestsellersSection } from "@/components/home/bestsellers-section"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { InstagramSection } from "@/components/home/instagram-section"
import { CTABanner } from "@/components/home/cta-banner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestsellersSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <InstagramSection />
      <CTABanner />
    </>
  )
}
