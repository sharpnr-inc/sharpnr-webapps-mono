import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutationCreateVariantInMenuItem } from "@/_hospitalityapp/shared/Menu/apis/mutations/Menu";

export default function AddVariantInItemDialog({
  closeModal,
  menuItemId,
  // setVariant,
  // variant,
}: {
  closeModal: () => void;
  menuItemId: string;
  setVariant: any;
  variant: any[];
}) {
  // -----------------------------------------------------
  // 1. TANSTACK FORM — ARRAY MODE
  // -----------------------------------------------------
  const createVariant = useMutationCreateVariantInMenuItem();
  const form = useForm({
    defaultValues: {
      menu_item_id: menuItemId,
      variant_name: "",
      variant: [
        { name: "Small", price: 0 },
        { name: "Medium", price: 0 },
        { name: "Large", price: 0 },
      ],
    },

    onSubmit: ({ value }) => {
      console.log("FINAL VARIANT PAYLOAD →", value);
      createVariant.mutate(value, {
        onSuccess: () => {
         closeModal()
        },
      });

      closeModal();
    },
  });

  // -----------------------------------------------------
  // 2. UI
  // -----------------------------------------------------
  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Variant Group Name */}
        <form.Field
          name="variant_name"
          children={(field) => (
            <div className="space-y-2">
              <Label>
                Variant Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Size, Crust Type"
              />
            </div>
          )}
        />

        {/* Variant Array */}
        <form.Field
          name="variant"
          mode="array"
          children={(variantField) => (
            <div className="space-y-3">
              {/* Header + Add Button */}
              <div className="flex justify-between items-center">
                <Label>
                  Sizes & Prices <span className="text-red-500">*</span>
                </Label>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => variantField.pushValue({ name: "", price: 0 })}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Size
                </Button>
              </div>

              {/* Sizes */}
              {variantField.state.value.map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Size Name */}
                  <form.Field
                    name={`variant[${index}].name`}
                    children={(field) => (
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Small / Medium / Large"
                        className="flex-1"
                      />
                    )}
                  />

                  {/* Price */}
                  <form.Field
                    name={`variant[${index}].price`}
                    children={(field) => (
                      <div className="relative w-32">
                        <span className="absolute left-3 top-2.5 text-gray-500">
                          ₹
                        </span>
                        <Input
                          type="number"
                          className="pl-7"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          placeholder="Price"
                        />
                      </div>
                    )}
                  />

                  {/* Remove */}
                  {variantField.state.value.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => variantField.removeValue(index)}
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={closeModal}
          >
            Cancel
          </Button>

          <Button type="submit" className="flex-1">
            Add Variant
          </Button>
        </div>
      </form>
    </div>
  );
}
