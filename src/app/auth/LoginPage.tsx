"use client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { useForm } from "@tanstack/react-form";
import { LoginSchema, type LoginPayload } from "@/schemas/Auth";
import { useLoginUser } from "@/api_service/mutations/useLogin";

export default function RootOrgLoginCard(): React.JSX.Element {
  const navigate = useNavigate();
  const loginUser = useLoginUser();

  const form = useForm({
    validators: { onBlur: LoginSchema, onMount: LoginSchema },
    defaultValues: {
      email: "",
      password: "",
    } as LoginPayload,
    onSubmit: ({ value }) => {
      loginUser.mutate(value);
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
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {state.meta.errors.length > 0 && state.meta.isTouched ? (
                    <p className="text-destructive">
                      {state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
            <form.Field name="password">
              {({ state, handleBlur, handleChange }) => (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {state.meta.errors.length > 0 && state.meta.isTouched ? (
                    <p>{state.meta.errors[0]?.message}</p>
                  ) : null}
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
                navigate("/register");
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
