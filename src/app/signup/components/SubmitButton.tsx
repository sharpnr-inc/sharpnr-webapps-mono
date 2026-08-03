import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  canSubmit: boolean;
  isSubmitting: boolean;
}

export function SubmitButton({ canSubmit, isSubmitting }: SubmitButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Subtle lift on hover.
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
      const grow = () =>
        gsap.to(btn, { scale: 1.02, duration: 0.2, ease: "power2.out" });
      const shrink = () =>
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });

      btn.addEventListener("mouseenter", grow);
      btn.addEventListener("mouseleave", shrink);

      // The original left these bound for the life of the page; cleaning them
      // up keeps the listeners from stacking across remounts.
      return () => {
        btn.removeEventListener("mouseenter", grow);
        btn.removeEventListener("mouseleave", shrink);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <Button
      ref={buttonRef}
      type="submit"
      disabled={!canSubmit || isSubmitting}
      className="group h-10 w-full font-medium"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account…
        </>
      ) : (
        <>
          Continue &amp; Verify Email
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </Button>
  );
}
