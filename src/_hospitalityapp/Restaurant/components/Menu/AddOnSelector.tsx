import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMenuStore } from "./store/MenuStore";
import { Button } from "@/components/ui/button";

const AddOnSelector = () => {
  const { selectedItem, isAddonOpen, closeAddon } = useMenuStore();

  return (
    <Sheet open={isAddonOpen} onOpenChange={closeAddon}>
      <SheetContent side="bottom" className="p-4 mb-5 h-[40vh]">
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
