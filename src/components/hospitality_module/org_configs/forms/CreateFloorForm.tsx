import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mutateFloorInHotel } from "@/api_service/mutations/Hospitality/HotelsMutations";
import { useToastService } from "@/context/ToastContext";

export default function CreateFloorForm() {
  const mutation = mutateFloorInHotel();
  const { success, error } = useToastService();

const form = useForm({
  defaultValues: {
    floor_name: "",
    hotel_id: "49266647-1fdb-49f7-8b36-d7819b7dc56a",
  },
  onSubmit: async ({ value }) => {
    try {
      const res = await mutation.mutateAsync(value); // ✅ now typed
      success(`Floor "${res.floor_name}" created successfully.`);
      form.reset();
    } catch (err: any) {
      error(err.message || "Something went wrong");
    }
  },
});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4 py-2"
    >
      {/* Floor Name */}
      <div className="space-y-2">
        <Label htmlFor="floor_name">Floor Name</Label>
        <form.Field
          name="floor_name"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Floor name is required"
                : value.length < 2
                  ? "Name must be at least 2 characters"
                  : undefined,
          }}
        >
          {(field) => (
            <>
              <Input
                id="floor_name"
                placeholder="e.g. Ground Floor"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors?.length ? (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </>
          )}
        </form.Field>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button type="submit">Create Floor</Button>
      </div>
    </form>
  );
}
