// this the app/index/website.tsx
// this is the websites main or landing page, so the idea is here we bring all the components that will shown into
// and use scroll animation effects or we can figure out something else.

import { HeroSection } from "./HeroSection";
import WobbleCardDemo from "@/components/wobble-card-demo";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

export function Website() {
  return (
    <div className="bg-[#02000d] flex flex-col items-center min-h-screen">
      <Header />
      <HeroSection />
      <div className="w-full">
        <WobbleCardDemo />
      </div>
      <div className="mt-10 w-full">
        <Footer />
      </div>
    </div>
  );
}

// website's main theme color is #03045e
// website backgrond should on darker side like near black but not far from from the blue
//
