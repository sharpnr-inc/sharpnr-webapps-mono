import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DeleteIcon, Loader2, PlusIcon } from "lucide-react";

const CreateHotelAmenitiesForm = () => {
  const form = useAppForm({
    defaultValues: {
      amenities: [{ name: "", description: "" }],
    },
    onSubmit: ({ value }) => {
      console.log("Submitted Data:", value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 p-4 border rounded-lg"
    >
      <div className="space-y-4">
        {/* 1. Subscribe to the 'amenities' field to map over the array */}
        <form.Field name="amenities" mode="array">
          {(field) => (
            <div className="space-y-4">
              {field.state.value.map((_, i) => (
                <div key={i} className="p-4 border rounded-md relative">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Amenity #{i + 1}</h3>
                    <Button
                      variant={"destructive"}
                      onClick={() => field.removeValue(i)}
                      className="text-xs  hover:underline"
                    >
                      Remove
                      <DeleteIcon />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {/* 2. Use your custom TextField inside the array */}
                    <form.AppField
                      name={`amenities[${i}].name`}
                      children={(field) => (
                        <field.TextField label="Amenity Name" />
                      )}
                    />

                    {/* 3. Using TextArea for description */}
                    <form.AppField
                      name={`amenities[${i}].description`}
                      children={(field) => (
                        <field.TextAreaField label="Amenity Description" />
                      )}
                    />
                  </div>
                </div>
              ))}

              {/* 4. Button to add new items to the array */}
              <Button
                type="button"
                className="rounded"
                onClick={() => field.pushValue({ name: "", description: "" })}
              >
                <PlusIcon /> Add Amenity
              </Button>
            </div>
          )}
        </form.Field>
        <div className="flex justify-end pt-4 border-t">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Amenities"
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
};

export default CreateHotelAmenitiesForm;
