import { useAppForm } from "@/components/forms";
import { motion } from "framer-motion";
import { Package, FileText, MapPin } from "lucide-react";
import type { NewInventoryRequestPayload } from "../apis/restaurant.api";
import { useAddInventoryMutation } from "../apis/mutations";
import { useSelectedRestaurantID } from "../store/selectors";

interface AddInventoryFormProps {
  inventoryAccountID: string;
}

const fields = [
  {
    name: "name" as const,
    label: "Inventory Name",
    placeholder: "e.g. Main Kitchen Stock",
    icon: Package,
    hint: "A short, recognizable name.",
  },
  {
    name: "description" as const,
    label: "Description",
    placeholder: "e.g. Dry goods and dairy for the main kitchen",
    icon: FileText,
    hint: "What does this inventory track?",
  },
  {
    name: "location" as const,
    label: "Location",
    placeholder: "e.g. Kitchen Storeroom B",
    icon: MapPin,
    hint: "Where is this physically stored?",
  },
];

export function AddRestaurantInventoryForm({
  inventoryAccountID,
}: AddInventoryFormProps) {
  const { mutateAsync } = useAddInventoryMutation();
  const restaurantID = useSelectedRestaurantID();

  const form = useAppForm({
    defaultValues: {
      inventory_account_id: inventoryAccountID,
      name: "",
      description: "",
      location: "",
    } as NewInventoryRequestPayload,
    onSubmit: async ({ value }) => {
      if (!restaurantID) {
        console.error("No restaurant ID found");
        return;
      }
      await mutateAsync(
        {
          payload: value,
          restaurantID: restaurantID,
        },
        {
          onSuccess: () => {
            console.log("this is done");
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 pt-2"
    >
      {fields.map(({ name, label, placeholder, icon: Icon, hint }, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
          className="space-y-1.5"
        >
          <div className="flex items-center gap-1.5">
            <Icon className="size-3.5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>

          <form.AppField
            name={name}
            children={(f) => (
              <f.TextField label={label} placeholder={placeholder} />
            )}
          />

          <p className="text-xs text-muted-foreground pl-0.5">{hint}</p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: fields.length * 0.07 + 0.1, duration: 0.3 }}
        className="pt-2"
      >
        <form.AppForm>
          <form.SubmitButton className="w-full">
            Add Inventory
          </form.SubmitButton>
        </form.AppForm>
      </motion.div>
    </form>
  );
}
