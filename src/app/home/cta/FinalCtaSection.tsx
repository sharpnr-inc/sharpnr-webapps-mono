import { useRef } from "react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { useFinalCtaAnimation } from "./animations/useFinalCtaAnimation";

const PARTICLE_COUNT = 10;

/*
 * The invitation.
 *
 * The visitor already understands the platform — nothing left to explain.
 * No urgency, no scarcity, no sales language. A large, soft echo of the
 * Scene 03 structure sits on the left, ambient rather than explanatory;
 * two calm actions on the right close the page.
 *
 * Visual-left, argument-right.
 */
export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useFinalCtaAnimation({ sectionRef, headingRef, copyRef, shapeRef, ctaRef });

  return (
    <section
      ref={sectionRef}
      style={{ "--glow-x": "30%", "--glow-y": "50%" } as React.CSSProperties}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The ambient close — visual-left on desktop */}
        <div className="order-2 w-full lg:order-1" aria-hidden="true">
          <div
            ref={shapeRef}
            className="relative mx-auto aspect-square w-full max-w-sm"
          >
            <div className="platform-halo absolute -inset-16 -z-10" />
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
              const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + 0.4;
              const radius = 30 + ((i * 13) % 24);
              return (
                <span
                  key={i}
                  className="hp-particle"
                  style={{
                    left: `${50 + radius * Math.cos(angle)}%`,
                    top: `${50 + radius * Math.sin(angle)}%`,
                    width: 2 + (i % 3),
                    height: 2 + (i % 3),
                  }}
                />
              );
            })}
            <div className="hp-ambient-shape absolute inset-[8%]">
              <div className="absolute left-1/2 top-[38%] h-px w-[70%] -translate-x-1/2 bg-sky/10" />
              <div className="absolute left-[42%] top-1/2 h-[64%] w-px -translate-y-1/2 bg-sky/10" />
            </div>
          </div>
        </div>

        {/* The argument — right column on desktop */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <h2
            ref={headingRef}
            className="hp-scene-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Ready to simplify," />
            </span>
            <span className="block text-twilight">
              <Words text="Your business?" />
            </span>
          </h2>
          <p ref={copyRef} className="mt-6 max-w-md hp-lede text-mute">
            Start where you are. Expand when you&rsquo;re ready.
          </p>

          <div
            ref={ctaRef}
            className="mt-12 flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:gap-5"
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
      </div>
    </section>
  );
}
