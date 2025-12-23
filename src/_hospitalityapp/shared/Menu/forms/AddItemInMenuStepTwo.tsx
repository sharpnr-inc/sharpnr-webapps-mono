import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigLeft, ArrowRight, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useMutationCreateItemInMenu } from "@/_hospitalityapp/shared/Menu/apis/mutations/Menu";

export default function AddItemInMenuStepTwo({
  onNext,
  onBack,
  categoryId,
  subCategoryId,
  setMenuId,
}: {
  onNext: () => void;
  onBack: () => void;
  categoryId: string;
  subCategoryId: string;
  setMenuId: (id: string) => void;
}) {
  const createitem = useMutationCreateItemInMenu();


  const form = useForm({
    defaultValues: {
      category_id: categoryId,
      sub_category_id: subCategoryId,
      name: "",
      description: "",
      is_veg: true,
      base_price: 0.00,
      served_by: "Kitchen",
      unit: "",
    },

    onSubmit: ({ value }) => {
      console.log("FINAL PAYLOAD →", value);
      createitem.mutate(value, {
        onSuccess:(res)=>{
          console.log("RES", res)
          setMenuId(res?.data?.menu_item_id)
        }
      });
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Item Name */}
        <form.Field
          name="name"
          children={(field) => (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Item Name
              </Label>
              <Input
                placeholder="e.g. Margherita Pizza, Mojito"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Description */}
        <form.Field
          name="description"
          children={(field) => (
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Item Description
              </Label>
              <Textarea
                placeholder="Describe your dish briefly..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Item Type + Price + Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Veg / Non-Veg Toggle */}
          <form.Field
            name="is_veg"
            children={(field) => {
              const isVeg = field.state.value === true;

              return (
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Item Type
                  </Label>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={isVeg}
                      onCheckedChange={(val) => field.handleChange(val)}
                    />

                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isVeg ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                </div>
              );
            }}
          />

          {/* Base Price */}
          <form.Field
            name="base_price"
            children={(field) => (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Item Price
                </Label>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(parseFloat(e.target.value) || 0)
                  }
                  placeholder="e.g. 150.00"
                />
              </div>
            )}
          />

          {/* Unit */}
          <form.Field
            name="unit"
            children={(field) => (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Unit
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="piece">Piece</SelectItem>
                      <SelectItem value="plate">Plate</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="bottle">Bottle</SelectItem>
                      <SelectItem value="bowl">Bowl</SelectItem>
                      <SelectItem value="cup">Cup</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        {/* Bottom Buttons */}
        <form.Subscribe>
          {() => (
            <div className="flex justify-between gap-4 pt-4">
              {/* Back */}
              <Button
                onClick={onBack}
                variant="outline"
                className=" flex items-center justify-center gap-2"
              >
                <ArrowBigLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </Button>

              {/* Add Item */}
              <Button
                type="submit"
                className=" flex items-center justify-center gap-2 bg-primary"
              >
                <span className="font-medium">Add Item to Menu</span>
                <PlusIcon className="w-5 h-5" />
              </Button>

              {/* Add Variant */}
              <Button
                onClick={onNext}
                type="button"
                className=" flex items-center justify-center gap-2 bg-primary"
              >
                <span className="font-medium">Add Variant</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
