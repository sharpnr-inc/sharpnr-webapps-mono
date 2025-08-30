import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import type React from "react";

/**
 * HeroSection Component
 *
 * Renders a full-screen hero section with an interactive background ripple effect.
 * This component includes:
 * - `BackgroundRippleEffect` for animated background interaction
 * - A centered heading and paragraph describing the effect
 *
 * Intended for use in **hero sections** or **call-to-action sections** of a page.
 * Note: The ripple effect should not be overused on multiple sections.
 *
 * @function
 * @name HeroSection
 * @returns {React.JSX.Element} The rendered hero section component
 *
 * @example
 * ```tsx
 * import { HeroSection } from './HeroSection';
 *
 * function App() {
 *   return (
 *     <div>
 *       <HeroSection />
 *     </div>
 *   );
 * }
 * ```
 */
export function HeroSection(): React.JSX.Element {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Interactive Background Boxes Ripple Effect
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          Hover over the boxes above and click. To be used on backgrounds of hero
          sections OR Call to Action sections. I beg you don&apos;t use it
          everywhere.
        </p>
      </div>
    </div>
  );
}

