import "leaflet/dist/leaflet.css";

// import { useParams } from "@tanstack/react-router";
// import { useAddOrgHQMutation } from "./api/mutation";
// import { useQueryClient } from "@tanstack/react-query";
// import { setupProgressQuery } from "./api/queries";

export function OrchestratorHQSetup() {
  // -----------------------------------------------------
  // const queryClient = useQueryClient();
  // const addOrgHq = useAddOrgHQMutation();
  // const { stepId } = useParams({ strict: false });

  // const defaultOnBoardingVal: OrgOnBoardingPayload = {
  //   address_line: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   pincode: "",

  //   latitude: 0,
  //   longitude: 0,
  //   accuracy_m: 0,
  // };

  // const form = useForm({
  //   defaultValues: defaultOnBoardingVal,
  //   onSubmit: async ({ value }) => {
  //     console.log(value);
  //     await addOrgHq.mutateAsync(value, {
  //       onSuccess: async () => {
  //         await queryClient.invalidateQueries({
  //           queryKey: setupProgressQuery.queryKey,
  //         });
  //       },
  //     });
  //   },
  // });

  return (
    <div className="space-y-4 p-6 flex">
      {/* <form
        className="flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="latitude">
          {(field) => <input type="hidden" value={field.state.value ?? 0} />}
        </form.Field>

        <form.Field name="longitude">
          {(field) => <input type="hidden" value={field.state.value ?? 0} />}
        </form.Field>

        <form.Field name="accuracy_m">
          {(field) => <input type="hidden" value={field.state.value ?? 0} />}
        </form.Field>
        <Card className="border-2 shadow-lg overflow-hidden">
          <CardHeader className="">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Organization Office details
            </CardTitle>
            <CardDescription>
              Provide your organization's address information
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
           
            <form.Field
              name="address_line"
              validators={{
                onChange: ({ value }) =>
                  !value || value.length < 10
                    ? "Address must be at least 10 characters"
                    : undefined,
              }}
              children={(field) => (
                <Field>
                  <FieldLabel>Full Address</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    placeholder="Enter your complete address (e.g., Baney Vihar Colony, Joshi Marg...)"
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="min-h-[100px] resize-none"
                  />
                  <FieldDescription>
                    Include street, building number, and any landmarks
                  </FieldDescription>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <FieldError>{field.state.meta.errors[0]}</FieldError>
                    )}
                </Field>
              )}
            />
          </CardContent>
        </Card>
      </form> */}
    </div>
  );
}
