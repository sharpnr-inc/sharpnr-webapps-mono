/** How long a code stays valid, in seconds. */
export const OTP_EXPIRY_SECONDS = 5 * 60;

/** How long the user must wait between resend requests, in seconds. */
export const RESEND_COOLDOWN_SECONDS = 60;

/** Seconds remaining below which the expiry timer reads as urgent. */
export const OTP_URGENT_SECONDS = 60;

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
