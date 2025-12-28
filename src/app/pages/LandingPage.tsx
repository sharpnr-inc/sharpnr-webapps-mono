import { HeroSection } from "@/components/LandingPage/HeroSection";
import { Features } from "@/components/LandingPage/Features";
import { Pricing } from "@/components/LandingPage/Pricing";
import { Testimonials } from "@/components/LandingPage/Testimonials";
import { CTA } from "@/components/LandingPage/CTA";
import Footer from "@/components/SharedComps/Footer";
import Header from "@/components/SharedComps/Header";
import Aurora from "@/components/ui/aurora-backgound";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen ">
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#0F172A", "#1E3A8A", "#38BDF8"]}
          amplitude={0.35}
          blend={0.65}
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
