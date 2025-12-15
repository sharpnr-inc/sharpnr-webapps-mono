import { AddressField } from "@/components/custom/CscForm";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: AddrCard,
});

function AddrCard() {
  const form = useForm({
    defaultValues: {
      country: null as string | null,
      state: null as string | null,
      city: null as string | null,
    },
    onSubmit: async ({ value }) => {
      console.log("FORM SUBMIT VALUE:", value);
      alert(JSON.stringify(value, null, 2));
    },
  });
  return (
    <div className="p-4 rounded shadow border-2 m-2">
      <h2 className="text-xl font-bold mb-2">Dashboard Home</h2>
      <p className="mb-5">Welcome to your dashboard!</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6 max-w-sm"
      >
        <AddressField
          form={form}
          countryName="country"
          stateName="state"
          cityName="city"
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>

        {/* Debug */}
        <pre className="text-xs bg-muted p-2 rounded">
          {JSON.stringify(form.state.values, null, 2)}
        </pre>
      </form>
    </div>
  );
}
