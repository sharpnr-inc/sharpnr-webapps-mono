import { useForm } from "@tanstack/react-form";
import "leaflet/dist/leaflet.css";
import { useParams } from "@tanstack/react-router";
import { useAddPropertyMutation } from "./api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { setupProgressQuery } from "./api/queries";

export function SetupWizardProperty() {
  //------------Hoisting-------------
  // -----------------------------------------------------
  const addproprt = useAddPropertyMutation();
  const queryClient = useQueryClient();

  const { stepId } = useParams({ strict: false });

  const defaultOnBoardingVal: any = {
    step_id: stepId,
    name: "Sharpnr Complex",
    address_line: "",
    city: "",
    state: "",
    country: "",
    pincode: "",

    latitude: 0,
    longitude: 0,
    accuracy_m: 0,
  };

  const form = useForm({
    defaultValues: defaultOnBoardingVal,
    onSubmit: async ({ value }) => {
      console.log(value);
      await addproprt.mutateAsync(value, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: setupProgressQuery.queryKey,
          });
        },
      });
    },
  });

  return (
    <div className="space-y-4 p-6 flex">
      <form
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
        <form.Field name="name">
          {(field) => (
            <input type="hidden" value={field.state.value ?? "something"} />
          )}
        </form.Field>
      </form>
    </div>
  );
}
