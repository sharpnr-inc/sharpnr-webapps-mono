import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formOptions } from "@tanstack/react-form";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { z } from "zod";

// 1. Interfaces
export interface Amenity {
  name: string;
  description: string;
}

export interface HotelAmenitiesFormValues {
  amenities: Amenity[];
}

// 2. The Fixed Schema
// We use z.string() without .default() or .optional()
// This ensures the Input type is 'string', matching the interface perfectly.
const amenitySchema = z.object({
  amenities: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string(), // Validates "" as a valid string, so button will enable
    }),
  ),
});

// 3. Form Options
const hotelAmenitiesOptions = formOptions({
  defaultValues: {
    amenities: [{ name: "", description: "" }],
  } as HotelAmenitiesFormValues,
});

const CreateHotelAmenitiesForm = () => {
  const form = useAppForm({
    ...hotelAmenitiesOptions,
    validators: {
      onChange: amenitySchema,
    },
    defaultState: {
      canSubmit: true,
    },
    onSubmit: ({ value }) => {
      console.log("Submitted Data:", value);
    },
  });

  return (
    <Card className=" mx-auto">
      <CardHeader>
        <CardTitle>Hotel Amenities</CardTitle>
        <CardDescription>
          Add and manage amenities available in your hotel.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CardContent className="space-y-6">
          {/* Amenities Array */}
          <form.Field name="amenities" mode="array">
            {(field) => (
              <div className="space-y-4">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-muted/30 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Amenity #{i + 1}</h3>

                      {field.state.value.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => field.removeValue(i)}
                        >
                          <DeleteIcon className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <form.AppField name={`amenities[${i}].name`}>
                        {(field) => <field.TextField label="Amenity Name" />}
                      </form.AppField>

                      <form.AppField name={`amenities[${i}].description`}>
                        {(field) => <field.TextAreaField label="Description" />}
                      </form.AppField>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => field.pushValue({ name: "", description: "" })}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Amenity
                </Button>
              </div>
            )}
          </form.Field>
        </CardContent>

        <CardFooter className=" flex justify-end">
          <form.AppForm>
            <form.SubmitButton>Create Amenities</form.SubmitButton>
          </form.AppForm>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateHotelAmenitiesForm;
