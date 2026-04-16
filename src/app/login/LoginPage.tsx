import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/apis/mutation";
import { useToastService } from "@/hooks/ToastContext";
import { config } from "@/configs/env";

export function LoginPage(): React.JSX.Element {
  const navigate = useNavigate();
  const loginUser = useUserAuth();
  const { error, success } = useToastService();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      loginUser.mutateAsync(value, {
        onError: () => {
          error("Invalid Email or Password");
          form.reset();
        },

        onSuccess: () => {
          success("Logged In successfully");
          window.location.replace(config.iamAppUrl);
        },
      });
    },
  });

  // ------------------------ UI -------------------------------------
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Login to Sharpnr Account
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent className="space-y-4">
            <form.Field name="email">
              {({ state, handleBlur, handleChange }) => (
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    className={cn(
                      state.meta.isTouched &&
                        state.meta.errors.length > 0 &&
                        "border-red-500! ring-red-500!",
                    )}
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="password">
              {({ state, handleBlur, handleChange }) => (
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <Button variant={"link"}>Forget Password ?</Button>
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
                email: state.values.email,
                password: state.values.password,
              })}
              children={({ canSubmit, isSubmitting, email, password }) => {
                const isDisabled =
                  !canSubmit ||
                  isSubmitting ||
                  !email?.trim() ||
                  !password?.trim();

                return (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isDisabled}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                );
              }}
            />
          </CardContent>

          <CardFooter className="flex flex-col items-center">
            <div className="text-sm p-2 text-gray-500">
              Don’t have an account?
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate({ to: "/signup" });
              }}
            >
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
