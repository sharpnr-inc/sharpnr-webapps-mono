import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { SiteHeader } from "./sections/SiteHeader";
import { AlphaBar } from "./sections/AlphaBar";
import { HeroSection } from "./sections/HeroSection";
import { TerminalBanner } from "./sections/TerminalBanner";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { WhySection } from "./sections/WhySection";
import { CTASection } from "./sections/CTASection";
import { SiteFooter } from "./sections/SiteFooter";

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden"
    >
      <SiteHeader />

      <div className="pt-14">
        <AlphaBar />
      </div>

      <HeroSection y={heroY} opacity={heroOpacity} />
      <TerminalBanner />
      <CapabilitiesSection />
      <WhySection />
      <CTASection />
      <SiteFooter />

      {/* Display font + scrollbar helpers used across sections */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        .font-display { font-family: 'DM Serif Display', Georgia, serif; }
        .scrollbar-none { scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
