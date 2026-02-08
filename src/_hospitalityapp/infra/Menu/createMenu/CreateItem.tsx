import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateMenuCtx } from "./create-menu.context";
import { useCreateMenuStore } from "../stores/CreateMenu/create-menu_store";
import { Button } from "@/components/ui/button";
import { MoveLeft, PlusIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DietaryBadgeColor } from "./utils";

const CreateItem = () => {
  const { dummyMenuData, prevStep } = useCreateMenuCtx();
  const activeSubCategoryID = useCreateMenuStore((s) => s.activeSubCategoryID);

  // Find Active SubCategory (search inside all categories)
  const activeSubCategory = dummyMenuData.menuCategory
    .flatMap((cat) => cat.menuSubCategory)
    .find((sc) => sc.id === activeSubCategoryID);

  const items = activeSubCategory?.menu_item || [];

  return (
    <div className="border p-2">
      <Card>
        <CardHeader className="flex gap-5">
          <Button variant={"ghost"} onClick={() => prevStep()}>
            <MoveLeft />
            Back
          </Button>
          <div>
            <CardTitle>
              {activeSubCategory
                ? activeSubCategory.name
                : "Select SubCategory"}
            </CardTitle>
            <CardDescription>
              This is the Card for the Item Display of Selected Field
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {items.length === 0 && (
            <div className="text-sm text-muted-foreground">No Items Found</div>
          )}

          <div className="grid grid-cols-4 gap-4">
            {items.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card
                      className="
            cursor-pointer
            transition-all
            hover:border-primary
            hover:bg-muted/40
          "
                      onClick={() => {
                        // later you can open edit modal here
                        console.log("Edit Item", item.id);
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {item.name}
                          </CardTitle>

                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-sm ${DietaryBadgeColor[item.dietaryType]}`}
                            />
                            <span className="text-xs text-muted-foreground">
                              {item.dietaryType}
                            </span>
                          </div>
                        </div>

                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="text-sm font-semibold">
                          Base Price: ₹ {item.base_price}
                        </div>

                        {/* Variants */}
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1">
                            Variants
                          </div>

                          <div className="space-y-1 max-h-28 overflow-auto">
                            {item.menuItemVariants?.variants?.length ? (
                              item.menuItemVariants.variants.map((v) => (
                                <div
                                  key={v.id}
                                  className="flex justify-between text-sm border rounded-md px-2 py-1"
                                >
                                  <span>{v.name}</span>
                                  <span>+ ₹ {v.price}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-muted-foreground">
                                No Variants
                              </div>
                            )}
                          </div>
                        </div>

                        {/* AddOns */}
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1">
                            AddOns
                          </div>

                          <div className="space-y-1 max-h-28 overflow-auto">
                            {item.addOns?.length ? (
                              item.addOns.map((a) => (
                                <div
                                  key={a.id}
                                  className="flex justify-between text-sm border rounded-md px-2 py-1"
                                >
                                  <span>{a.name}</span>
                                  <span>+ ₹ {a.price}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-muted-foreground">
                                No AddOns
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs ">
                        <div className="border rounded-3xl w-fit p-1 px-2">
                          Server by: Main Kitchen
                        </div>
                      </CardFooter>
                    </Card>
                  </TooltipTrigger>

                  <TooltipContent>
                    Click to edit Item, Variants or AddOns
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>

        <Button className="m-3" onClick={() => console.log("clicked")}>
          <PlusIcon /> {`Add Item in ${activeSubCategory?.name}`}
        </Button>
      </Card>
    </div>
  );
};

export default CreateItem;
