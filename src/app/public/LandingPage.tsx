import { HeroSection } from "@/components/PageComps/LandingPage/HeroSection";
import Footer from "@/components/SharedComps/Footer";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
