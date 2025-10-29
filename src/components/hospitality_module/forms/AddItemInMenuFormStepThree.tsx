import { Button } from "@/components/ui/button";
import { useDialogModal } from "@/context/DialogModalContext";

import {
  ArrowBigLeft,
  ArrowRight,
  PenIcon,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useState } from "react";
import AddVariantInItemDialog from "./AddVariantInItemDialog";

export interface VariantList {
  id: string;
  name: string;
  price: string;
}
export interface Variant {
  id: string;
  variant_name: string;
  var_list: VariantList[];
}

export default function AddItemInMenuStepThree({ onNext, onBack }: any) {
  const [variant, setVarient] = useState<Variant[]>([]);
  const { openModal, closeModal } = useDialogModal();

  const handleAddVarient = () => {
    openModal(
      <AddVariantInItemDialog
        setVariant={setVarient}
        variant={variant}
        closeModal={closeModal}
      />,
      "Add Variant",
      "Add Variants"
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <div>
          <p className="">Varient & Sizes</p>
          <p className="text-xs ">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit
            amet consectetur adipiscing elit quisque faucibus.
          </p>
        </div>
        <div>
          <Button className="cursor-pointer" onClick={handleAddVarient}>
            <PlusIcon />
            Add Variant
          </Button>
        </div>
      </div>

      {variant.length > 0 ? (
        <div className="space-y-4">
          {variant.map((v) => (
            <div
              key={v.id}
              className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                {/* Left: Variant Info */}
                <div>
                  <h3 className="text-base font-semibold ">{v.variant_name}</h3>
                  <p className="text-sm text-gray-500">
                    {v.var_list.length} Sizes
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <PenIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Size List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {v.var_list.map((i) => (
                  <div
                    key={i.id}
                    className="bg-accent p-3 border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    <div className="text-sm font-medium ">{i.name}</div>
                    <div className="text-xs">{i.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed h-25 w-full place-content-center rounded-2xl">
          <p className="text-center">No Variant for this Dish</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-6 mt-6 ">
        <div className="w-full">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 "
          >
            <ArrowBigLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Button>
        </div>
        <div className="w-full">
          {/* Next Button */}
          <Button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 bg-primary cursor-pointer"
          >
            <span className="font-medium">Next</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
