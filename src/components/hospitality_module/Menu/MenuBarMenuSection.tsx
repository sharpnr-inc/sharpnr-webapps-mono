import AddItemInMenuForm from "../forms/AddItemInMenuForm";
import { Button } from "@/components/ui/button";
import { barMenu } from "@/dummy_data/menu_data"; // ✅ make sure your dummy data is exported from this path
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircleIcon } from "lucide-react";

export default function MenuBarMenuSection() {
  return (
    <div className="p-4 border rounded-2xl shadow-sm">

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-3"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {" "}
            <Button>
              <PlusCircleIcon />
              Add Item
            </Button>
          </AccordionTrigger>
          <AccordionContent className="place-items-center">
            <AddItemInMenuForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance"></AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {barMenu.items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Name & Category */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold ">{item.name}</h3>
                    <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Sizes */}
                  {item.sizes && item.sizes.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs">Sizes:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.sizes.map((size) => (
                          <span
                            key={size.id}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                          >
                            {size.name} ({size.quantity}ml)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
