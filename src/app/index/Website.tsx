// this the app/index/website.tsx
// this is the websites main or landing page, so the idea is here we bring all the components that will shown into
// and use scroll animation effects or we can figure out something else.

import { HeroSection } from "./HeroSection";
import { SharpnrIntroSection } from "./SharpnrIntroSection";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "@/animations/gsap";

export function Website() {
  useGSAP(() => {
    let smoother = ScrollSmoother.create({
      wrapper: "#scroll-wrapper",
      content: "#srcoll-content",
      smooth: 2,
    });

    return () => smoother.kill();
  }, []);

  return (
    <div>
      <HeroSection />
      <SharpnrIntroSection />
    </div>
  );
}

// website's main theme color is #03045e
// website backgrond should on darker side like near black but not far from from the blue
