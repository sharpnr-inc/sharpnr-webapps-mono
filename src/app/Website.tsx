import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { HeroSection } from "./HeroSection";
import { SharpnrIntroductionSection } from "./whatIsSharpnr";
import { WhySharpnrSection } from "./WhyUsSection";
import { SharpnrPlatformSection } from "./SharpnrPlatformSection";
import { SharpnrBusinessOpsSection } from "./SharpnrBusinessOpsSection";

gsap.registerPlugin(ScrollTrigger);

export function Website() {
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".section-title", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <SharpnrIntroductionSection />
      <WhySharpnrSection />
      <SharpnrPlatformSection />
      <SharpnrBusinessOpsSection />
      <Footer />
    </div>
  );
}
