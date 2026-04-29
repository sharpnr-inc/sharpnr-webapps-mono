import { InitialSignupForm } from "./InitialSignupForm";
import { VerifyOtpForm } from "./VerifyOtpFrom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialSignupPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            {!showOtp && (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full max-w-4xl"
              >
                <InitialSignupForm
                  setShowOtp={setShowOtp}
                  setUserEmail={setUserEmail}
                />
              </motion.div>
            )}

            {showOtp && (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                  scale: { duration: 0.3 },
                }}
                className="w-full max-w-xs"
              >
                <VerifyOtpForm setShowOtp={setShowOtp} email={userEmail} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
