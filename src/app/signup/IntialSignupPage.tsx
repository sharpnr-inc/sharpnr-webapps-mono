import { InitialSignupForm } from "./InitialSignupForm";
import { VerifyOtpForm } from "./VerifyOtpFrom";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const formVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 40,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -30,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  }),
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export function InitialSignupPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* ── Left: Form panel ── */}
      <div className="relative flex flex-col gap-4 overflow-hidden p-6 md:p-10">
        {/* Subtle background texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--muted)/0.4),transparent_60%)]" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex items-center gap-2"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
            <img src="https://cdn.sharpnr.com/shicon.svg" />
          </div>
          <span className="text-2xl font-semibold font-serif tracking-tight">
            Sharpnr
          </span>
        </motion.div>

        {/* Form area */}
        <div className="relative flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait" custom={showOtp ? 1 : -1}>
            {!showOtp ? (
              <motion.div
                key="signup"
                custom={-1}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-lg"
              >
                <InitialSignupForm
                  setShowOtp={setShowOtp}
                  setUserEmail={setUserEmail}
                />
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                custom={1}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-sm"
              >
                <VerifyOtpForm setShowOtp={setShowOtp} email={userEmail} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative text-center text-[11px] text-muted-foreground/60"
        >
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Terms
          </a>{" "}
          &amp;{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
        </motion.p>
      </div>
    </div>
  );
}
