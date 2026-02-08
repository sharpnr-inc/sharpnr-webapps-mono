import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateMenuStore } from "../stores/CreateMenu/create-menu_store";
import { useCreateMenuCtx } from "./create-menu.context";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

const CreateSubCategory = () => {
  const { dummyMenuData, prevStep } = useCreateMenuCtx();
  const activeCategoryID = useCreateMenuStore((s) => s.activeCategoryID);

  const categories = dummyMenuData.menuCategory;
  const activeCat = categories.find((c) => c.id === activeCategoryID);

  const subCategories = activeCat?.menuSubCategory || [];

  return (
    <div className="border p-2 relative">
      <Card className="">
        <CardHeader>
          <CardTitle>
            {activeCat ? activeCat.name : "Select Category"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {subCategories.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No SubCategories Found
            </div>
          )}

          <div className="grid grid-cols-6 gap-5">
            {subCategories.map((sc) => {
              return (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>{sc.name}</CardTitle>
                      <CardDescription>{sc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>
        </CardContent>
        <Button className="absolute bottom-2.5 left-5" onClick={() => prevStep()}>
          <MoveLeft /> Go Back to Categories
        </Button>
      </Card>
    </div>
  );
};

export default CreateSubCategory;
