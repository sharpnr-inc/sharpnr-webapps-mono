import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(".cta-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .fromTo(".cta-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".cta-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.5");
  }, []);

  return (
    <section className="cta-section py-24 px-4 bg-transparent">
      <div className="container mx-auto text-center">
        <h2 className="cta-title text-4xl font-bold text-foreground md:text-5xl">
          Sharpnr is designed to grow with you.
        </h2>
        <p className="cta-text text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Start free. Enable what you need. Scale when ready.
        </p>
        <div className="cta-button mt-8">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  );
}
