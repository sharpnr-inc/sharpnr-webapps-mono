import { useState } from "react";
import { useCreateMenuCtx } from "./create-menu.context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMenuAction } from "../stores/actions";
import EmptyMenu from "../components/EmptyMenu";
import { useAddPreferredKitchenToMenuGroupMutation } from "../apis/api.Mutations";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDetails } from "@/_orchestrator/properties/property/api/queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AddMenuCategoryForm } from "./forms/AddMenuCategory";
import { AddNewMenuGroupForm } from "./forms/AddNewMenuGroup";

const CreateCategory = () => {
  const { Menus, nextStep, ownersID, ownersType, propertyID } =
    useCreateMenuCtx();

  const [open, setOpen] = useState(false);
  const [openMenuForm, setOpenMenuForm] = useState(false);
  const queryClient = useQueryClient();
  const [selectedMenuID, setSelectedMenuID] = useState<string>("");

  const { data: propertyData } = usePropertyDetails(propertyID!);
  const kitchens = propertyData?.data?.infra ?? [];

  const { mutateAsync, isPending } =
    useAddPreferredKitchenToMenuGroupMutation();

  const handleAddPreferredKitchenToMenuGroup = async (
    menuID: string,
    kitchenID: string,
  ) => {
    await mutateAsync({
      ownersID: ownersID,
      payload: {
        menu_group_id: menuID,
        kitchen_id: kitchenID,
      },
    });

    await queryClient.invalidateQueries({
      queryKey: ["Menu", ownersID],
    });
  };

  return (
    <div>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg">Menu</CardTitle>
          <CardDescription className="text-sm">
            Manage your menus, categories and structure.
          </CardDescription>
        </CardHeader>

        {!Menus || Menus.length === 0 ? (
          <div className="px-6 pb-6">
            <EmptyMenu onCreateClick={() => setOpenMenuForm(true)} />
          </div>
        ) : (
          <CardContent className="space-y-8">
            {Menus.map((m) => {
              const preferredKitchen = kitchens.find(
                (k: any) => k.id === m.preferred_kitchen,
              );

              return (
                <Card
                  key={m.id}
                  className="rounded-xl border bg-muted/30 shadow-sm"
                >
                  {/* Menu Header */}
                  <CardHeader className="">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-base">
                          {m.menu_name}
                        </CardTitle>

                        <CardDescription className="text-sm line-clamp-2">
                          {m?.menu_description || "No description provided"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Preferred Kitchen */}
                  <CardContent className="p-4 border">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold">
                        Preferred Kitchen
                      </h3>

                      <Alert variant={"suggestion"}>
                        <AlertTitle>About Preferred Kitchen</AlertTitle>
                        <AlertDescription>
                          In Order to Order to Process and Send to kichen you
                          have specify kitchen, when you add the
                        </AlertDescription>
                      </Alert>

                      {preferredKitchen ? (
                        <div className="rounded-xl border bg-muted/30 p-3 text-sm flex items-center justify-between">
                          <span>{preferredKitchen.name}</span>

                          {!preferredKitchen.status && (
                            <span className="text-xs text-red-500">
                              (Inactive)
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed bg-muted/20 p-3 text-sm text-muted-foreground">
                          No preferred kitchen selected.
                          <div className="mt-1 text-xs">
                            If none is selected, orders route to the
                            restaurant’s default kitchen.
                          </div>
                        </div>
                      )}

                      <Select
                        value={m.preferred_kitchen ?? ""}
                        onValueChange={(kitchenID) =>
                          handleAddPreferredKitchenToMenuGroup(m.id, kitchenID)
                        }
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Kitchen" />
                        </SelectTrigger>

                        <SelectContent>
                          {kitchens.map((kitchen: any) => (
                            <SelectItem key={kitchen.id} value={kitchen.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{kitchen.name}</span>

                                {!kitchen.status && (
                                  <span className="text-xs text-red-500 ml-2">
                                    (Inactive)
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>

                  {/* Categories */}
                  <CardContent>
                    {!m.categories || m.categories.length === 0 ? (
                      <div className="text-xs text-muted-foreground py-2">
                        No categories added yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {m.categories.map((c) => (
                          <Card
                            key={c.id}
                            onClick={() => {
                              createMenuAction.setActiveCategory(c.id);
                              createMenuAction.setModulesMenu(m);
                              nextStep();
                            }}
                            className="cursor-pointer rounded-lg transition-all hover:shadow-md hover:-translate-y-1"
                          >
                            <CardHeader className="p-4">
                              <CardTitle className="text-sm truncate">
                                {c.category_name}
                              </CardTitle>

                              <CardDescription className="text-xs line-clamp-2">
                                {c.category_description || "No description"}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>

                  {/* Footer */}
                  <CardFooter className="pt-4 flex flex-col gap-4">
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedMenuID(m.id);
                        setOpen(true);
                      }}
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Category in {m.menu_name}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </CardContent>
        )}

        <CardFooter>
          <Button className="w-full" onClick={() => setOpenMenuForm(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Menu
          </Button>
        </CardFooter>
      </Card>

      {/* Category Dialog */}
      <AddMenuCategoryForm
        open={open}
        setOpen={setOpen}
        ownersID={ownersID}
        menuID={selectedMenuID}
      />

      {/* Menu Dialog */}
      <AddNewMenuGroupForm
        open={openMenuForm}
        setOpen={setOpenMenuForm}
        ownersID={ownersID}
        ownersType={ownersType}
        kitchens={kitchens}
      />
    </div>
  );
};

export default CreateCategory;
