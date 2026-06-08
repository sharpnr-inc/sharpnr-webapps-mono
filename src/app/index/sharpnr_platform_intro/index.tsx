import { useRef } from "react";
import { useSharpnrPlatformIntro } from "./useSharpnrPlatformIntro";
import { FEATURES } from "./data";

const SharpnrPlatformIntro = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);
  const explainerItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useSharpnrPlatformIntro({
    mainContainerRef,
    headingRef,
    headingWrapperRef,
    explainerItemRefs,
    cardItemRefs,
  });

  return (
    // 600vh — 100vh heading intro + ~125vh per feature
    <div ref={mainContainerRef} className="relative rounded-2xl h-[600vh]">
      {/* Sticky canvas — everything animates inside here */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Heading wrapper */}
        <div
          ref={headingWrapperRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
        >
          <h1
            ref={headingRef}
            className="text-5xl md:text-9xl font-semibold leading-[1.05] tracking-tight text-center text-white"
          >
            Sharpnr platform intro
          </h1>
        </div>

        {/* Feature panels — all stacked, GSAP controls opacity/transform */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center px-6 md:px-8 gap-6 pt-24 md:pt-24">
          {/* Left — explainers */}
          <div className="relative w-full md:w-1/3 h-1/2 md:h-full flex items-center">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => {
                  explainerItemRefs.current[i] = el;
                }}
                className="absolute opacity-0 translate-y-8 space-y-2 md:space-y-4 text-center md:text-left w-full"
              >
                <span className="text-[10px] md:text-xs font-mono tracking-widest text-white/40 uppercase">
                  {feature.label}
                </span>
                <h2 className="text-2xl md:text-4xl font-semibold leading-tight text-white">
                  {feature.heading}
                </h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xs mx-auto md:mx-0">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right — cards */}
          <div className="relative w-full md:w-2/3 h-1/2 md:h-[75%]">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => {
                  cardItemRefs.current[i] = el;
                }}
                className={`absolute inset-0 rounded-2xl opacity-0 scale-95 ${feature.cardBg} border border-white/10 flex items-center justify-center`}
              >
                {/* Placeholder — replace with real card content */}
                <span className="text-white/20 text-sm font-mono tracking-widest uppercase">
                  {feature.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharpnrPlatformIntro;
