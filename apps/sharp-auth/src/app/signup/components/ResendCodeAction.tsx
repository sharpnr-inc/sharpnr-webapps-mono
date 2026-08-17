import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@sharpnr/ui";
import { FieldDescription } from "@sharpnr/ui";
import { CountdownRing } from "./CountdownRing";
import { RESEND_COOLDOWN_SECONDS, formatDuration } from "../otp";

interface ResendCodeActionProps {
  /** Promotes the control from a quiet link to the page's primary action. */
  prominent: boolean;
  isSending: boolean;
  isCoolingDown: boolean;
  cooldown: number;
  onResend: () => void;
}

/**
 * Asks for a new code. While a code is still live this is a quiet inline link;
 * once it has expired resending is the only way forward, so it becomes a
 * full-width button instead.
 */
export function ResendCodeAction({
  prominent,
  isSending,
  isCoolingDown,
  cooldown,
  onResend,
}: ResendCodeActionProps) {
  const disabled = isCoolingDown || isSending;

  if (prominent) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={onResend}
        disabled={disabled}
        className="h-10 w-full gap-2 font-medium"
      >
        {isSending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending a new code…
          </>
        ) : isCoolingDown ? (
          <>
            <CountdownRing
              remaining={cooldown}
              total={RESEND_COOLDOWN_SECONDS}
            />
            <span className="tabular-nums">
              Resend in {formatDuration(cooldown)}
            </span>
          </>
        ) : (
          <>
            <RotateCcw className="h-4 w-4" />
            Send me a new code
          </>
        )}
      </Button>
    );
  }

  return (
    <FieldDescription className="flex items-center justify-center gap-1.5 text-center text-sm">
      <span className="text-muted-foreground">
        Didn&apos;t receive the code?
      </span>
      <Button
        type="button"
        variant="link"
        className="h-auto gap-1.5 p-0 text-sm font-semibold"
        onClick={onResend}
        disabled={disabled}
      >
        {isSending ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            Resending…
          </>
        ) : isCoolingDown ? (
          <span className="flex items-center gap-1.5 font-normal tabular-nums text-muted-foreground">
            <CountdownRing
              remaining={cooldown}
              total={RESEND_COOLDOWN_SECONDS}
            />
            Resend in {formatDuration(cooldown)}
          </span>
        ) : (
          <>
            <RotateCcw className="h-3 w-3" />
            Resend code
          </>
        )}
      </Button>
    </FieldDescription>
  );
}
