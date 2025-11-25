import { Field, FieldGroup, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

interface CreateAddTableInRestaurantFormProps {
  floorId: string;
  restaurantId: string;
}

export default function CreateAddTableInRestaurantForm({
  floorId,
  restaurantId,
}: CreateAddTableInRestaurantFormProps) {
  // ✅ local state for dynamic table array
  const [tables, setTables] = useState([
    { table_name: "", table_capacity: 2 },
  ]);

  const form = useForm({
    defaultValues: {
      restaurant_id: restaurantId,
      floor_id: floorId,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        tables: tables,
      };

      console.log("FINAL PAYLOAD --> ", payload);
    },
  });

  const addTable = () => {
    setTables([...tables, { table_name: "", table_capacity: 2 }]);
  };

  const removeTable = (index: number) => {
    const updated = tables.filter((_, i) => i !== index);
    setTables(updated);
  };

  return (
    <div className="space-y-4 p-3">
      <FieldSet>
        <FieldTitle className="text-lg font-semibold">Add Tables</FieldTitle>

        {tables.map((tbl, index) => (
          <FieldGroup className="flex gap-3" key={index}>
            {/* Table Name */}
            <Field className="w-2/3">
              <FieldTitle>Table Name</FieldTitle>
              <Input
                value={tbl.table_name}
                onChange={(e) => {
                  const updated = [...tables];
                  updated[index].table_name = e.target.value;
                  setTables(updated);
                }}
                placeholder={`Table ${index + 1}`}
              />
            </Field>

            {/* Capacity */}
            <Field className="w-1/3">
              <FieldTitle>Capacity</FieldTitle>
              <Input
                type="number"
                min="1"
                value={tbl.table_capacity}
                onChange={(e) => {
                  const updated = [...tables];
                  updated[index].table_capacity = parseInt(e.target.value) || 1;
                  setTables(updated);
                }}
              />
            </Field>

            {/* Remove Button */}
            <Button
              variant="destructive"
              onClick={() => removeTable(index)}
            >
              Remove
            </Button>
          </FieldGroup>
        ))}

        {/* Add Another Table */}
        <Button variant="outline" onClick={addTable}>
          + Add Another Table
        </Button>
      </FieldSet>

      {/* Submit */}
      <Button onClick={() => form.handleSubmit()}>
        Save Tables
      </Button>
    </div>
  );
}
