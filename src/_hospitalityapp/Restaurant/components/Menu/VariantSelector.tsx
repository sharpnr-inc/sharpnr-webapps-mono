import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMenuStore } from "./store/MenuStore";
import { Button } from "@/components/ui/button";

const VariantSelector = () => {
  const {
    selectedItem,
    isVariantOpen,
    closeVariant,
    openAddon,
  } = useMenuStore();

  return (
    <Sheet open={isVariantOpen} onOpenChange={closeVariant}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Select Variant</SheetTitle>
        </SheetHeader>

        {selectedItem?.variant_groups.map((group) => (
          <div key={group.id} className="mt-4">
            <h4 className="font-semibold">
              {group.variant_group_name}
            </h4>
            {group.variants.map((variant) => (
              <Button
                key={variant.id}
                className="mt-2 w-full"
                onClick={() => {
                  closeVariant();
                  openAddon();
                }}
              >
                {variant.name} (+₹{variant.price_modifier})
              </Button>
            ))}
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default VariantSelector;
