import { useStore } from "@tanstack/react-form";
import { useFormContext } from "./form-context";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
};

const SubmitButton = ({ children }: SubmitButtonProps) => {
  const form = useFormContext();

  // Fix: correct order - isSubmitting first, canSubmit second
  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,  // This should be first
    state.canSubmit,     // This should be second
  ]);

  return (
    <Button type="submit" disabled={isSubmitting || !canSubmit}>
      {children}
    </Button>
  );
};
export default SubmitButton;