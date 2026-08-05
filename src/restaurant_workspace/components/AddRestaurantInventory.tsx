import { useAppForm } from "@/components/forms";
import { motion } from "framer-motion";
import { Package, FileText, MapPin, Warehouse, Share2 } from "lucide-react";
import type { NewInventoryRequestPayload } from "../apis/restaurant.api";
import { useAddInventoryMutation } from "../apis/mutations";
import { useAllInventoriesAccounts } from "../apis/queries";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Route } from "@/routes/workspace/_user/restaurant/$restaurantID/inventory/index";

// ── Text fields only (account_id handled separately as a Select) ────────────
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

export function AddRestaurantInventoryForm() {
  const { mutateAsync } = useAddInventoryMutation();
  const { restaurantID } = Route.useParams();
  const { data: warehouseOrAccounts, isLoading: isWarehouseLoading } =
    useAllInventoriesAccounts(restaurantID!);

  const warehouses = warehouseOrAccounts?.data ?? [];

  const form = useAppForm({
    defaultValues: {
      inventory_account_id: "",
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
        { payload: value, restaurantID },
        {
          onSuccess: () => {
            console.log("Inventory added successfully");
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
      {/* ── Warehouse / Account Select ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.3, ease: "easeOut" }}
        className="space-y-1.5"
      >
        <Label className="text-sm font-medium">Warehouse / Account</Label>

        {isWarehouseLoading ? (
          <Skeleton className="h-9 w-full rounded-md" />
        ) : (
          <form.AppField
            name="inventory_account_id"
            children={(f) => (
              <>
                <Select
                  value={f.state.value}
                  onValueChange={(val) => f.handleChange(val)}
                >
                  <SelectTrigger
                    className={`w-full ${
                      f.state.meta.errors.length
                        ? "border-destructive focus:ring-destructive"
                        : ""
                    }`}
                  >
                    <Warehouse className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                    <SelectValue placeholder="Select a warehouse…" />
                  </SelectTrigger>

                  <SelectContent>
                    {warehouses.length === 0 ? (
                      <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                        No warehouses found.
                      </div>
                    ) : (
                      warehouses.map((w: any) => (
                        <SelectItem key={w.ID} value={w.ID}>
                          <div className="flex items-center gap-2 w-full">
                            <Warehouse className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate">{w.Name}</span>
                            <div className="flex items-center gap-1 ml-auto pl-3">
                              {w.Type && (
                                <Badge
                                  variant="outline"
                                  className="text-[9px] px-1.5 py-0 h-4"
                                >
                                  {w.Type}
                                </Badge>
                              )}
                              {w.IsShared && (
                                <Badge
                                  variant="secondary"
                                  className="text-[9px] px-1.5 py-0 h-4 gap-0.5"
                                >
                                  <Share2 className="h-2.5 w-2.5" />
                                  Shared
                                </Badge>
                              )}
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                {/* Validation error */}
                {f.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive pl-0.5">
                    {f.state.meta.errors[0]}
                  </p>
                )}
              </>
            )}
          />
        )}

        <p className="text-xs text-muted-foreground pl-0.5">
          Which warehouse will hold this inventory?
        </p>
      </motion.div>

      {/* ── Text Fields ─────────────────────────────────────────────────── */}
      {fields.map(({ name, label, placeholder, hint }, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (i + 1) * 0.07, duration: 0.3, ease: "easeOut" }}
          className="space-y-1.5"
        >
          <form.AppField
            name={name}
            children={(f) => (
              <f.TextField label={label} placeholder={placeholder} />
            )}
          />
          <p className="text-xs text-muted-foreground pl-0.5">{hint}</p>
        </motion.div>
      ))}

      {/* ── Submit ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (fields.length + 1) * 0.07 + 0.1, duration: 0.3 }}
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
