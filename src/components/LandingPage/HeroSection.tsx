import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "../ui/BlurTextCom";

export function HeroSection(): React.JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    );
    tl.fromTo(
      ".hero-button",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 },
      "-=0.5"
    );
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center px-4 bg-transparent"
    >
      <div className="relative z-10 flex flex-col items-center">
        <BlurText
          text="Too Many Tools Slowing you down?"

          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-2xl mb-8"
        />
        <div className="text-7xl font-bold text-amber-50"> SHARPNR</div>
        <h1 className="hero-title max-w-4xl text-4xl font-bold text-amber-50">

          Build faster. Operate smarter.
        </h1>
        <p className="hero-subtitle mt-6 max-w-2xl text-lg text-muted-foreground">
          A freemium, modular SaaS platform for hospitality and
          operations-driven businesses.
        </p>

        <div className="hero-button mt-8">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </div>
  );
}
