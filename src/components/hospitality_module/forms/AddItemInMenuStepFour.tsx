import { Button } from "@/components/ui/button";
import {
  ArrowBigLeft,
  ArrowRight,
  PenIcon,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useState } from "react";

export default function AddItemInMenuStepFour({ onNext, onBack }: any) {
  const [varient, setVarient] = useState(true);
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <div>
          <p className="">Addons</p>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit
            amet consectetur adipiscing elit quisque faucibus.
          </p>
        </div>
        <div>
          <Button className="cursor-pointer">
            <PlusIcon />
            Add Addons
          </Button>
        </div>
      </div>

      {varient ? (
        <div className="space-y-4">
          <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3">
            {/* Header */}
            <div className="flex justify-between items-center">
              {/* Left: Variant Info */}
              <div>
                <h3 className="text-base font-semibold ">Addon</h3>
                <p className="text-sm text-gray-500">3 Addon</p>
              </div>
            </div>

            {/* Size List */}
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="p-3 bg-accent border flex justify-between rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <div>
                    <div className="text-sm font-medium ">AddName</div>
                    <div className="text-xs">
                      Max Quantity:<span>5</span>
                    </div>
                  </div>
                  <div className="flex gap-4 place-items-center">
                    <div className="">₹985</div>
                    <div className="flex items-center gap-4">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <PenIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed h-25 w-full place-content-center rounded-2xl">
          <p className="text-center">No Addons for this Dish</p>
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
