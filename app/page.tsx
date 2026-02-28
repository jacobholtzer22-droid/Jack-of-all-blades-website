import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HomeAboutPreview from "@/components/HomeAboutPreview";
import HomeTestimonialPreview from "@/components/HomeTestimonialPreview";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HomeAboutPreview />
      <HomeTestimonialPreview />
      <CTABanner />
    </>
  );
}
