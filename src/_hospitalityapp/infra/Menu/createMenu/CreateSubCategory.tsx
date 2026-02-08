import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateMenuStore } from "../stores/CreateMenu/create-menu_store";
import { useCreateMenuCtx } from "./create-menu.context";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PlusIcon } from "lucide-react";
import { createMenuAction } from "../stores/CreateMenu/actions";

const CreateSubCategory = () => {
  const { dummyMenuData, prevStep, nextStep } = useCreateMenuCtx();
  const activeCategoryID = useCreateMenuStore((s) => s.activeCategoryID);

  const categories = dummyMenuData.menuCategory;
  const activeCat = categories.find((c) => c.id === activeCategoryID);

  const subCategories = activeCat?.menuSubCategory || [];

  return (
    <div className="p-4">
      <Card className="shadow-sm">
        {/* Header */}
        <CardHeader className="flex flex-row items-center gap-4">
          <Button variant="ghost" size="sm" onClick={prevStep}>
            <MoveLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <CardTitle className="text-xl">
              {activeCat ? activeCat.name : "Select Category"}
            </CardTitle>
            <CardDescription>
              Choose a sub-category to continue
            </CardDescription>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent>
          {subCategories.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              No Sub-Categories Found
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {subCategories.map((sc) => {
                return (
                  <Card
                    key={sc.id}
                    className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
                    onClick={() => {
                      createMenuAction.setActiveSubCategory(sc.id);
                      nextStep();
                    }}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">
                        {sc.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {sc.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter>
          <Button className="w-full" variant="secondary">
            <PlusIcon className="mr-2 h-4 w-4" />
            {`Add Sub-Categories in ${activeCat?.name}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};


export default CreateSubCategory;
