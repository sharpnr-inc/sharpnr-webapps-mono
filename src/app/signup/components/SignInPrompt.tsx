import { Button } from "@/components/ui/button";
import { FieldDescription, FieldSeparator } from "@/components/ui/field";
import { useNavigate } from "@tanstack/react-router";
import { AnimatedField } from "./AnimatedField";

export function SignInPrompt({ index }: { index: number }) {
  const navigate = useNavigate();

  return (
    <>
      <FieldSeparator>Or</FieldSeparator>
      <AnimatedField index={index}>
        <FieldDescription className="text-center text-sm">
          Already have an account?
          <Button
            variant="ghost"
            className="h-auto font-semibold"
            onClick={() => navigate({ to: "/" })}
            type="button"
          >
            Sign in
          </Button>
        </FieldDescription>
      </AnimatedField>
    </>
  );
}
