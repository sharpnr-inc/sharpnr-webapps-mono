import { useStore } from "@tanstack/react-form";
import { useFormContext } from "./form-context";
import { cn } from "@sharpnr/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@sharpnr/ui";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  /** Disables the button on top of the form's own submitting/invalid state. */
  disabled?: boolean;
};

const SubmitButton = ({
  children,
  className,
  disabled: forceDisabled = false,
}: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  const disabled = isSubmitting || !canSubmit || forceDisabled;

  return (
    <Button type="submit" disabled={disabled} className={cn(className)}>
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" size={14} />
          Processing…
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default SubmitButton;
