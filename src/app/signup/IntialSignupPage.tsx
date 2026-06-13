import { InitialSignupForm } from "./InitialSignupForm";
import { VerifyOtpForm } from "./VerifyOtpFrom";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AuthLayout } from "@/components/ui/AuthLayout";

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
    <AuthLayout>
      <AnimatePresence mode="wait" custom={showOtp ? 1 : -1}>
        {!showOtp ? (
          <motion.div
            key="signup"
            custom={-1}
            variants={formVariants}
            initial="enter"
            animate="center"
            exit="exit"
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
          >
            <VerifyOtpForm setShowOtp={setShowOtp} email={userEmail} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground/70"
      >
        By continuing, you agree to our{" "}
        <a
          href="#"
          className="underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Terms
        </a>{" "}
        &amp;{" "}
        <a
          href="#"
          className="underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Privacy Policy
        </a>
      </motion.p>
    </AuthLayout>
  );
}
