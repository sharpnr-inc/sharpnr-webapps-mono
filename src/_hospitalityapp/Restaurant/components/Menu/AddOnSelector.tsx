import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMenuStore } from "./store/MenuStore";
import { Button } from "@/components/ui/button";

const AddOnSelector = () => {
  const { selectedItem, isAddonOpen, closeAddon } =
    useMenuStore();

  return (
    <Sheet open={isAddonOpen} onOpenChange={closeAddon}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Select Addons</SheetTitle>
        </SheetHeader>

        {selectedItem?.add_ons.map((addon) => (
          <Button key={addon.id} className="mt-2 w-full">
            {addon.name} (+₹{addon.price})
          </Button>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default AddOnSelector;
