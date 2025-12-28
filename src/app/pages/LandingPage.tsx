import { HeroSection } from "@/components/LandingPage/HeroSection";
import { Features } from "@/components/LandingPage/Features";
import { Pricing } from "@/components/LandingPage/Pricing";
import { Testimonials } from "@/components/LandingPage/Testimonials";
import { CTA } from "@/components/LandingPage/CTA";
import Footer from "@/components/SharedComps/Footer";
import Header from "@/components/SharedComps/Header";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black">
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
  );
};

export default LandingPage;

