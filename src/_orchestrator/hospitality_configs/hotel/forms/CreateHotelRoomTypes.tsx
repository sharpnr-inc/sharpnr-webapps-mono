import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { DeleteIcon, PlusIcon } from "lucide-react";

interface CreateHotelRoomTypesProps {}

const CreateHotelRoomTypes: React.FC<CreateHotelRoomTypesProps> = () => {
  const form = useAppForm({
    defaultValues: {
      hotel_room_categories: [
        {
          name: "",
          description: "",
          code: "",
          max_occupancy: "",
          min_occupancy: "",
        },
      ],
    },
  });

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Room Category / Type</CardTitle>
        <CardDescription>
          Create and manage hotel room categories.
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
          <form.Field name="hotel_room_categories" mode="array">
            {(field) => (
              <div className="space-y-4">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-muted/30 p-4 md:p-6 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h3 className="font-semibold text-lg">
                        Room Category #{i + 1}
                      </h3>

                      {field.state.value.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => field.removeValue(i)}
                          className="text-destructive hover:text-destructive"
                          type="button"
                        >
                          <DeleteIcon className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      {/* Name and Code Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <form.AppField
                          name={`hotel_room_categories[${i}].name`}
                          children={(field) => (
                            <field.TextField label="Category Name"  />
                          )}
                        />
                        <form.AppField
                          name={`hotel_room_categories[${i}].code`}
                          children={(field) => (
                            <field.TextField label="Category Code"  />
                          )}
                        />
                      </div>

                      {/* Description */}
                      <form.AppField
                        name={`hotel_room_categories[${i}].description`}
                        children={(field) => (
                          <field.TextAreaField 
                            label="Category Description" 
                          
                          />
                        )}
                      />

                      {/* Occupancy Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <form.AppField
                          name={`hotel_room_categories[${i}].min_occupancy`}
                          children={(field) => (
                            <field.TextField 
                              label="Min Occupancy" 
                             
                            />
                          )}
                        />
                        <form.AppField
                          name={`hotel_room_categories[${i}].max_occupancy`}
                          children={(field) => (
                            <field.TextField 
                              label="Max Occupancy" 
                             
                             
                            />
                          )}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                        >
                          <PlusIcon className="mr-1 h-4 w-4" />
                          Add Addons
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                        >
                          <PlusIcon className="mr-1 h-4 w-4" />
                          Add Room Type
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Category Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    field.pushValue({
                      name: "",
                      description: "",
                      code: "",
                      max_occupancy: "",
                      min_occupancy: "",
                    })
                  }
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Another Category
                </Button>
              </div>
            )}
          </form.Field>
        </CardContent>

        <CardFooter className="flex justify-end gap-3  pt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <form.AppForm>
            <form.SubmitButton>Create Categories</form.SubmitButton>
          </form.AppForm>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateHotelRoomTypes;