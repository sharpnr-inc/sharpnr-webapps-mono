import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

/**
 * Mail mark, headline, and the address the code was sent to. Owns its own
 * entrance animation so the page body doesn't have to hold a ref for it.
 */
export function VerifyOtpHeader({ email }: { email?: string }) {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".otp-icon-ring",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.1,
        },
      );
      gsap.fromTo(
        ".otp-pulse",
        { scale: 1, opacity: 0.6 },
        {
          scale: 1.6,
          opacity: 0,
          duration: 1.8,
          ease: "power2.out",
          repeat: -1,
          delay: 0.6,
        },
      );
    }, iconRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={iconRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-5"
    >
      <div className="relative flex items-center justify-center">
        <div className="otp-pulse absolute h-16 w-16 rounded-full border border-foreground/10" />
        <div className="otp-icon-ring flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted shadow-sm">
          <Mail className="h-6 w-6 text-foreground/70" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-1.5 text-center"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          Verify your Sharpnr Account
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We&apos;ve sent a 6-digit OTP to this email address. The code is valid
          for 5 minutes — enter it below to continue.
        </p>

        {email && (
          <div className="mt-1.5 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5">
            <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate text-sm font-medium text-foreground">
              {email}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
