import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { config } from "@/configs/env";
import { Button } from "@/app/home/shared/Button";
import { Words } from "@/app/home/shared/Words";
import { useFinalCtaAnimation } from "./animations/useFinalCtaAnimation";

/*
 * Scene 08 — Final Call To Action.
 * "What should I do next?" Leave the visitor with confidence, not pressure.
 * Only typography, buttons and whitespace, on the same continuous canvas —
 * the website ends exactly how it began: calm, elegant, intentional.
 */
export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLAnchorElement>(null);

  useFinalCtaAnimation({ sectionRef, headingRef, copyRef, ctaRef, docRef });

  return (
    <section
      ref={sectionRef}
      style={{ "--glow-x": "50%", "--glow-y": "45%" } as React.CSSProperties}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh flex-col items-center justify-center px-6 py-24 text-center md:px-10"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <h2
          ref={headingRef}
          className="hp-h2 hp-h2--peak font-extrabold text-white"
        >
          <Words text="Ready to simplify your business?" />
        </h2>
        <p
          ref={copyRef}
          className="mx-auto mt-8 max-w-md hp-lede text-mute"
        >
          Start where you are. Expand when you&rsquo;re ready.
        </p>

        <div
          ref={ctaRef}
          className="mt-14 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center sm:gap-5"
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
            href="mailto:support@sharpnr.com?subject=Book a Demo"
            className="w-full sm:w-auto"
          >
            Book a Demo
          </Button>
        </div>

        <a
          ref={docRef}
          href="https://docs.sharpnr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-9 inline-flex items-center gap-1.5 text-sm font-medium text-mute transition-colors duration-200 hover:text-white/90"
        >
          <span className="relative">
            Explore Documentation
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-200 ease-out group-hover:scale-x-100" />
          </span>
          <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
