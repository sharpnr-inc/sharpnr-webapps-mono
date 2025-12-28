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
    <div className="relative min-h-screen bg-background">
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={['#0A192F', '#112240', '#64FFDA']} amplitude={1.0} blend={0.6} speed={0.3}/>
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

