import { HeroSection } from "@/components/LandingPage/HeroSection";
import { Features } from "@/components/LandingPage/Features";
import { Pricing } from "@/components/LandingPage/Pricing";
import { Testimonials } from "@/components/LandingPage/Testimonials";
import { CTA } from "@/components/LandingPage/CTA";
import Footer from "@/components/SharedComps/Footer";
import Header from "@/components/SharedComps/Header";
import Aurora from "@/components/ui/aurora-backgound";
import React from "react";
import { useDevice } from "@/hooks/useDevice";

const LandingPage: React.FC = () => {
  const { isMobile } = useDevice();
  return (
    <div className="relative min-h-screen ">
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#48cae4", "#3dccc7", "#7400b8"]}
          amplitude={isMobile ? 0.32 : 0.60} // 👈 mobile ↓ desktop ↑
          blend={0.75}
          speed={0.9}
        />
      </div>
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <section id="features">
            <Features />
          </section>
          <section id="pricing">
            <Pricing />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
