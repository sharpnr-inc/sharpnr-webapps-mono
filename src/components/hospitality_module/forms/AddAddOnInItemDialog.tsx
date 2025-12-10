
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Switch } from "@/components/ui/switch";

import { useMutationAddAddonsInMenu } from "@/api_service/mutations/Hospitality/Menu";

// interface AddonFormData {
//   name: string;
//   price: string;
//   maxQuantity: number;
// }

export default function AddAddOnInItemDialog({
  menuItemId,
  // setAddon,
  // addon,
  // closeModal,
}: any) {
  // const [addonName, setAddonName] = useState<string>("");
  // const [price, setPrice] = useState<string>("");
  // const [maxQuantity, setMaxQuantity] = useState<number>(1);

  const createAddon = useMutationAddAddonsInMenu();

  const form = useForm({
    defaultValues: {
      menu_item_id: menuItemId,
      name: "",
      price: 0,
      is_veg: true,
    },

    onSubmit:({value})=>{
      console.log(value)
      createAddon.mutate(value, {
        
      })
    }
  });

  return (
    <div>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          (e.preventDefault(), e.stopPropagation(), form.handleSubmit());
        }}
      >
        {/* Addon Name */}
        <form.Field
          name="name"
          children={(field) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="addon-name">
                  Add-on Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="addon-name"
                  placeholder="e.g., Extra Cheese, Mushrooms, Olives"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            );
          }}
        />

        {/* Price */}
        <form.Field
          name="price"
          children={(field) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="addon-price">
                  Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    ₹
                  </span>

                  <Input
                    id="addon-price"
                    type="number"
                    className="pl-7"
                    placeholder="0.00"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value ? Number(e.target.value) : 0
                      )
                    }
                  />
                </div>
              </div>
            );
          }}
        />

        {/* Veg Switch */}
        <form.Field
          name="is_veg"
          children={(field) => {
            return (
              <div className="flex items-center gap-3">
                <Label>Add Type</Label>

                <Switch
                  checked={field.state.value}
                  onCheckedChange={(v) => field.handleChange(v)}
                />

                <div className="text-sm font-medium">
                  {field.state.value ? "Veg" : "Non-Veg"}
                </div>
              </div>
            );
          }}
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="flex-1"
        
          >
            Add Add-on
          </Button>
        </div>
      </form>
    </div>
  );
}
