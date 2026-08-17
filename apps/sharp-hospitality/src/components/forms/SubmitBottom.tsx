import { useStore } from "@tanstack/react-form";
import { useFormContext } from "./form-context";
import { Button } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const form = useFormContext();

  // Fix: correct order - isSubmitting first, canSubmit second
  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting, // This should be first
    state.canSubmit, // This should be second
  ]);

  return (
    <Button
      type="submit"
      className={cn("w-fit", className)}
      disabled={isSubmitting || !canSubmit}
    >
      {children}
    </Button>
  );
};
export default SubmitButton;
