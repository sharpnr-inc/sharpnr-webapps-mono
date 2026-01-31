import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DeleteIcon } from "lucide-react";

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
    <Card className=" mx-auto">
      <CardHeader>
        <CardTitle>Room Category / Type</CardTitle>
        <CardDescription>
          Create and manage hotel room categories.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="hotel_room_categories" mode="array">
            {(field) => (
              <div className="space-y-4">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        Room Category / Type #{i + 1}
                      </h3>

                      <Button
                        variant="destructive"
                        onClick={() => field.removeValue(i)}
                        className="text-xs"
                        type="button"
                      >
                        <DeleteIcon className="mr-1 h-4 w-4" />
                        Remove
                      </Button>
                    </div>

                    <form.AppField
                      name={`hotel_room_categories[${i}].name`}
                      children={(field) => (
                        <field.TextField label="Category Name" />
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </form.Field>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateHotelRoomTypes;
