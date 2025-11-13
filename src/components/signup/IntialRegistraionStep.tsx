import { useRegisterOrganization } from "@/api_service/mutations/Auth/createOrg";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import createOrgTypeQuery from "@/api_service/queries/Shared/useUtils";
import { useQuery } from "@tanstack/react-query";
import {
  RegisterOrganizationSchema,
  type RegisterOrganizationRequestPayload,
} from "@/schemas/Auth";
import { useForm } from "@tanstack/react-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "@tanstack/react-router";

export default function RegisterOrganization(): React.JSX.Element {
  const registerOrg = useRegisterOrganization(); // our mutation hook
  const navigate = useNavigate();
  const { data } = useQuery(createOrgTypeQuery());
  const orgTypes = data?.data.ORG_TYPE ?? [];

  const form = useForm({
    validators: { onBlur: RegisterOrganizationSchema },
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      org_type: "",
      password: "",
    } as RegisterOrganizationRequestPayload,
    onSubmit: ({ value }) => {
      registerOrg.mutate(value, {
        onSuccess: (response) => {
          if (!response.error.isError) {
            navigate({
              to: "/signup/verify-otp",
              search: {
                email: response.data?.email || "",
                VerificationKey: "nothing",
              },
            });
          }
        },
      });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen border px-4 py-2">
      <Card className="w-2xl">
        <CardHeader>
          <CardTitle>Register to Sharpnr</CardTitle>
          <CardDescription>
            Register Your Organisation with Sharpnr
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-2"
          >
            <form.Field name="name">
              {({ state, handleBlur, handleChange }) => (
                <>
                  <Label>Organisation Name</Label>
                  <Input
                    aria-invalid={
                      state.meta.errors.length > 0 && state.meta.isTouched
                    }
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {state.meta.errors.length > 0 && state.meta.isTouched ? (
                    <p
                      className={
                        state.meta.errors.length > 0 && state.meta.isTouched
                          ? "text-destructive"
                          : ""
                      }
                    >
                      {state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>

            <form.Field name="org_type">
              {({ state, handleChange }) => (
                <>
                  <Label>Organisation Business Type</Label>
                  <Select
                    value={state.value} // bind value to form
                    onValueChange={(val) => handleChange(val)} // update form on change
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="ORG Business Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {orgTypes.map((org: any) => (
                        <SelectItem key={org} value={org}>
                          {org}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.meta.errors.length > 0 && state.meta.isTouched ? (
                    <p
                      className={
                        state.meta.errors.length > 0 && state.meta.isTouched
                          ? "text-destructive"
                          : ""
                      }
                    >
                      {state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </>
              )}
            </form.Field>
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="email">
                {({ state, handleBlur, handleChange }) => (
                  <div className="space-y-2">
                    <Label>Organisation Email</Label>
                    <Input
                      aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                      }
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {state.meta.errors.length > 0 && state.meta.isTouched ? (
                      <p
                        className={
                          state.meta.errors.length > 0 && state.meta.isTouched
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field name="mobile">
                {({ state, handleBlur, handleChange }) => (
                  <div className="space-y-2">
                    <Label>Organisation Phone</Label>
                    <Input
                      aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                      }
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {state.meta.errors.length > 0 && state.meta.isTouched ? (
                      <p
                        className={
                          state.meta.errors.length > 0 && state.meta.isTouched
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field name="password">
                {({ state, handleBlur, handleChange }) => (
                  <div className="space-y-2">
                    <Label>Choose Password</Label>
                    <Input
                      aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                      }
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {state.meta.errors.length > 0 && state.meta.isTouched ? (
                      <p
                        className={
                          state.meta.errors.length > 0 && state.meta.isTouched
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>
              <form.Field name="conformPassword">
                {({ state, handleBlur, handleChange }) => (
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                      }
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {state.meta.errors.length > 0 && state.meta.isTouched ? (
                      <p
                        className={
                          state.meta.errors.length > 0 && state.meta.isTouched
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="w-full"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Regestering..." : "Register"}
                </Button>
              )}
            ></form.Subscribe>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-5">
          <div>
            <p>Already Registered? </p>
            <Button variant={"secondary"} className="w-full">
              Login
            </Button>
          </div>
          <p className="text-xs">Copyright reserved Sharpnr Soloution LLP</p>
        </CardFooter>
      </Card>
    </div>
  );
}
