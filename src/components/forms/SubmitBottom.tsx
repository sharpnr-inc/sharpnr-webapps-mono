import { useStore } from "@tanstack/react-form";
import { useFormContext } from "./form-context";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@sharpnr/ui";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  const disabled = isSubmitting || !canSubmit;

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
