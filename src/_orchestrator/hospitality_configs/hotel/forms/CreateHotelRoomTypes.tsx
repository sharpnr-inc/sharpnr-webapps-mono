import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field name="hotel_room_categories" mode="array">
            {(field) => (
              <div>
                {field.state.value.map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        Room Category/Type #{i + 1}
                      </h3>
                      <Button
                        variant={"destructive"}
                        onClick={() => field.removeValue(i)}
                        className="text-xs  hover:underline"
                      >
                        Remove
                        <DeleteIcon />
                      </Button>
                    </div>

                    <div>
                      <form.AppField name={`hotel_room_categories[${i}].name`}
                      children={(field)=> (
                        <field.TextField label="Category Name"/>
                      )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
            )}
          </form.Field>

        </div>
      </form>
    </div>
  );
};

export default CreateHotelRoomTypes;
