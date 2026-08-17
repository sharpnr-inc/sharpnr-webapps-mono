import { CheckCircle2, Clock, TimerOff } from "lucide-react";
import { cn } from "@sharpnr/utils";
import { OTP_URGENT_SECONDS, formatDuration } from "../otp";

interface OtpStatusLineProps {
  expiresIn: number;
  isExpired: boolean;
  isVerified: boolean;
}

/**
 * The one-line status under the code field. Announced politely so the
 * countdown and the expiry aren't purely visual.
 */
export function OtpStatusLine({
  expiresIn,
  isExpired,
  isVerified,
}: OtpStatusLineProps) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 text-xs"
      role="status"
      aria-live="polite"
    >
      {isVerified ? (
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span className="font-medium text-emerald-600">
            Verified — taking you to setup…
          </span>
        </>
      ) : isExpired ? (
        <>
          <TimerOff className="h-3.5 w-3.5 text-destructive" />
          <span className="font-medium text-destructive">
            This code has expired — request a new one below.
          </span>
        </>
      ) : (
        <>
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">
            This code expires in{" "}
            <span
              className={cn(
                "font-semibold tabular-nums",
                expiresIn <= OTP_URGENT_SECONDS
                  ? "text-destructive"
                  : "text-foreground",
              )}
            >
              {formatDuration(expiresIn)}
            </span>
          </span>
        </>
      )}
    </div>
  );
}
