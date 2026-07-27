import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { useFinalCtaAnimation } from "./animations/useFinalCtaAnimation";

/*
 * The invitation.
 *
 * The last length of bus. One charge crosses it, reaches the terminal pad,
 * and stops — the page has been an engineering document, so it closes on
 * the motif it was built from rather than on decoration.
 *
 * Nothing else moves here. The visitor already understands the platform;
 * this scene only has to be calm and get out of the way.
 *
 * Full-width and centred, continuing the settled rhythm from Scene 05.
 */
export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useFinalCtaAnimation({ sectionRef, headingRef, copyRef, railRef, ctaRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh flex-col items-center justify-center px-6 md:px-10"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <h2 ref={headingRef} className="hp-scene-title font-extrabold text-white">
          <span className="block">
            <Words text="Ready to simplify," />
          </span>
          <span className="block text-twilight">
            <Words text="Your business?" />
          </span>
        </h2>

        <p ref={copyRef} className="hp-hero-copy mt-6 max-w-md text-mute">
          Start where you are. Expand when you&rsquo;re ready.
        </p>

        <div
          ref={ctaRef}
          className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        >
          <Button
            variant="primary"
            href={config.authAppUrl + "/signup"}
            arrow
            className="w-full sm:w-auto"
          >
            Get Started
          </Button>
          <Button
            variant="secondary"
            href="https://docs.sharpnr.com"
            className="w-full sm:w-auto"
          >
            Explore Documentation
          </Button>
        </div>
      </div>

      {/* The last length of bus — one charge, then rest */}
      <div
        ref={railRef}
        className="hp-cta-rail mx-auto mt-16 w-full max-w-xl md:mt-20"
        aria-hidden="true"
      >
        <div className="hp-cta-pad left-0 -translate-x-1/2" />
        <div className="hp-cta-pad right-0 translate-x-1/2" />
        <div className="hp-cta-charge" />
      </div>
    </section>
  );
}
