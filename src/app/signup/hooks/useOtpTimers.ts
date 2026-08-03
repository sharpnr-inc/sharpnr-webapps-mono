import { useCallback, useEffect, useRef, useState } from "react";
import { OTP_EXPIRY_SECONDS, RESEND_COOLDOWN_SECONDS } from "../otp";

/**
 * Owns both clocks on the verify screen: how long the current code stays
 * valid, and how long until the user may ask for another one.
 */
export function useOtpTimers() {
  const [expiresIn, setExpiresIn] = useState(OTP_EXPIRY_SECONDS);
  const [cooldown, setCooldown] = useState(0);
  const expiryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Drains the validity window for whichever code is currently in the inbox.
  const startTicking = useCallback(() => {
    if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
    expiryTimerRef.current = setInterval(() => {
      setExpiresIn((prev) => {
        if (prev <= 1) {
          if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // A resend replaces the code outright, so the window restarts from the top.
  const restartExpiry = useCallback(() => {
    setExpiresIn(OTP_EXPIRY_SECONDS);
    startTicking();
  }, [startTicking]);

  const startCooldown = useCallback(() => {
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    setCooldown(RESEND_COOLDOWN_SECONDS);
    cooldownTimerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // On mount the state already holds the full window — only the clock needs
  // starting, so nothing is set directly from the effect.
  useEffect(() => {
    startTicking();
    return () => {
      if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [startTicking]);

  return {
    expiresIn,
    isExpired: expiresIn === 0,
    cooldown,
    isCoolingDown: cooldown > 0,
    restartExpiry,
    startCooldown,
  };
}
