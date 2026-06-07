import { useRef } from "react";
import { useSharpnrPlatformIntro } from "./useSharpnrPlatformIntro";

const SharpnrPlatformIntro = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useSharpnrPlatformIntro({ mainContainerRef, headingRef });

  return (
    <section
      ref={mainContainerRef}
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <h1
        ref={headingRef}
        className="text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-tight tracking-tight will-change-transform"
        style={{ overflow: "hidden" }}
      >
        Sharpnr platform intro
      </h1>
    </section>
  );
};

export default SharpnrPlatformIntro;
