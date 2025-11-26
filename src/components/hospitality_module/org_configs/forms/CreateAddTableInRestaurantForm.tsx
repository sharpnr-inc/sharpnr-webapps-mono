import { Field, FieldGroup, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { DeleteIcon, Plus, Trash2Icon } from "lucide-react";
import { useMutationAddTables } from "@/api_service/mutations/Hospitality/Restaurant";

interface CreateAddTableInRestaurantFormProps {
  floorId: any;
  restaurantId: string;
}

export default function CreateAddTableInRestaurantForm({
  floorId,
  restaurantId,
}: CreateAddTableInRestaurantFormProps) {

  const createTables = useMutationAddTables();

 const form = useForm({
  defaultValues: {
    restaurant_id: restaurantId,
    floor_id: floorId.id,
    tables: [{ table_name: "", table_capacity: 0 }],
  },
  onSubmit: async ({ value }) => {
    console.log("FINAL PAYLOAD --> ", value);
    createTables.mutate(value)
  },
});

return (
  <div className="space-y-4 p-3">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldSet>
        <FieldGroup>
          <form.Field
            name="tables"
            mode="array"
            children={(field) => {
              return (
                <div className="space-y-3">
                  {field.state.value.map((_, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <form.Field
                        name={`tables[${index}].table_name`}
                        children={(subField) => (
                          <Field>
                            <FieldTitle>Name</FieldTitle>
                            <Input
                              value={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                            />
                          </Field>
                        )}
                      />
                      <form.Field
                        name={`tables[${index}].table_capacity`}
                        children={(subField) => (
                          <Field>
                            <FieldTitle>Capacity</FieldTitle>
                            <Input
                              type="number"
                              value={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(Number(e.target.value))
                              }
                            />
                          </Field>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => field.removeValue(index)}
                        disabled={field.state.value.length === 1}
                      >
                        <Trash2Icon className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </FieldGroup>
      </FieldSet>
      <div className="flex gap-5 mt-2">
        <Button
          type="button"
          size="sm"
          onClick={() =>
            form.setFieldValue("tables", [
              ...form.getFieldValue("tables"),
              { table_name: "", table_capacity: 0 },
            ])
          }
        >
          Add tables
        </Button>
        <Button type="submit" size="sm">
          Save Tables
        </Button>
      </div>
    </form>
  </div>
);
}
