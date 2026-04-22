import { useState } from "react";
import { useCreateMenuCtx } from "./create-menu.context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createMenuAction } from "../stores/actions";
import EmptyMenu from "../../infra/components/EmptyMenu";
import {
  useAddPreferredKitchenToMenuGroupMutation,
  useAddTaxCategoryOfMenuGroup,
} from "../../infra/apis/api.Mutations";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  ChefHat,
  Tag,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  LayoutGrid,
  Utensils,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDetails } from "@/app/property/api/queries";
import { AddMenuCategoryForm } from "./forms/AddMenuCategory";
import { AddNewMenuGroupForm } from "./forms/AddNewMenuGroup";
import { useLegalEntityAllTaxCategory } from "@/app/legal_entity/api/legalEntity.api.queries";
import { NIL } from "uuid";

const CreateCategory = () => {
  const {
    Menus,
    nextStep,
    ownersID,
    ownersType,
    propertyID,
    owners_legal_entity_ID,
  } = useCreateMenuCtx();

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [openMenuForm, setOpenMenuForm] = useState(false);
  const [selectedMenuID, setSelectedMenuID] = useState<string>("");
  const [menuTaxMap, setMenuTaxMap] = useState<Record<string, string>>({});

  const { data: propertyData } = usePropertyDetails(propertyID!);
  const kitchens = propertyData?.data?.infra ?? [];

  const { data: taxCategories } = useLegalEntityAllTaxCategory(
    owners_legal_entity_ID && owners_legal_entity_ID !== NIL
      ? owners_legal_entity_ID
      : NIL,
  );

  const { mutateAsync, isPending } =
    useAddPreferredKitchenToMenuGroupMutation();
  const AddTaxCategoryOfMenuCategory = useAddTaxCategoryOfMenuGroup();

  const handleAddPreferredKitchenToMenuGroup = async (
    menuID: string,
    kitchenID: string,
  ) => {
    await mutateAsync({
      ownersID,
      payload: {
        menu_group_id: menuID,
        kitchen_id: kitchenID,
      },
    });

    await queryClient.invalidateQueries({
      queryKey: ["Menu", ownersID],
    });
  };

  const handleAddTaxCategoryofMenuGroup = async (
    menuID: string,
    taxCategoryID: string,
  ) => {
    if (owners_legal_entity_ID) {
      await AddTaxCategoryOfMenuCategory.mutateAsync({
        ownerID: ownersID,
        payload: {
          legalEntityId: owners_legal_entity_ID,
          menuGroupId: menuID,
          taxCategoryId: taxCategoryID,
        },
      });
    }
  };

  return (
    <div className="space-y-2">
      {/* ── Page Header ─────────────────────────────────────── */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-semibold">Menus</CardTitle>
              <CardDescription className="text-sm">
                Manage your menus, categories and structure.
              </CardDescription>
            </div>

            <Button
              size="sm"
              onClick={() => setOpenMenuForm(true)}
              className="gap-1.5"
            >
              <PlusIcon className="h-4 w-4" />
              Add Menu
            </Button>
          </div>
        </CardHeader>

        {(!Menus || Menus.length === 0) && (
          <CardContent className="pb-6">
            <EmptyMenu onCreateClick={() => setOpenMenuForm(true)} />
          </CardContent>
        )}
      </Card>

      {/* ── Menu Cards ──────────────────────────────────────── */}
      {Menus?.map((m) => {
        const preferredKitchen = kitchens.find(
          (k: any) => k.id === m.preferred_kitchen,
        );

        const selectedTaxID = menuTaxMap[m.id] ?? "";
        const selectedTax = taxCategories?.data?.find(
          (t: any) => t.id === selectedTaxID,
        );
        const selectedRule = selectedTax?.rules?.[0];
        const categoryCount = m.categories?.length ?? 0;

        return (
          <Card
            key={m.id}
            className="rounded-2xl border shadow-sm overflow-hidden"
          >
            {/* ── Menu Header Band ── */}
            <div className="bg-muted/50 border-b px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2">
                  <Utensils className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-foreground truncate">
                    {m.menu_name}
                  </h2>
                  <p className="text-xs text-muted-foreground truncate">
                    {m?.menu_description || "No description provided"}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full whitespace-nowrap">
                {categoryCount}{" "}
                {categoryCount === 1 ? "category" : "categories"}
              </span>
            </div>

            <div className="divide-y">
              {/* ── Preferred Kitchen ── */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-orange-50 p-1.5">
                    <ChefHat className="h-3.5 w-3.5 text-orange-500" />
                  </div>
                  <h3 className="text-sm font-semibold">Preferred Kitchen</h3>
                </div>

                {preferredKitchen ? (
                  <div className="flex items-center justify-between rounded-xl border bg-emerald-50/50 border-emerald-100 px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm font-medium">
                        {preferredKitchen.name}
                      </span>
                    </div>
                    {!preferredKitchen.status && (
                      <span className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                        <AlertCircle className="h-3 w-3" />
                        Inactive
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-amber-200 bg-amber-50/50 px-3.5 py-2.5">
                    <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-amber-700">
                      No kitchen selected — orders will use the default kitchen.
                    </span>
                  </div>
                )}

                <Select
                  value={m.preferred_kitchen ?? ""}
                  onValueChange={(kitchenID) =>
                    handleAddPreferredKitchenToMenuGroup(m.id, kitchenID)
                  }
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full h-9 text-sm">
                    <SelectValue placeholder="Change kitchen…" />
                  </SelectTrigger>

                  <SelectContent>
                    {kitchens.map((kitchen: any) => (
                      <SelectItem key={kitchen.id} value={kitchen.id}>
                        <div className="flex items-center justify-between w-full gap-3">
                          <span>{kitchen.name}</span>
                          {!kitchen.status && (
                            <span className="text-xs text-red-400">
                              Inactive
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ── Tax Category ── */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-violet-50 p-1.5">
                    <Tag className="h-3.5 w-3.5 text-violet-500" />
                  </div>
                  <h3 className="text-sm font-semibold">Tax Category</h3>
                </div>

                <Select
                  value={selectedTaxID}
                  onValueChange={async (taxCategoryID) => {
                    // update UI immediately
                    setMenuTaxMap((prev) => ({
                      ...prev,
                      [m.id]: taxCategoryID,
                    }));

                    // call API
                    await handleAddTaxCategoryofMenuGroup(m.id, taxCategoryID);

                    // refresh menu data
                    await queryClient.invalidateQueries({
                      queryKey: ["Menu", ownersID],
                    });
                  }}
                >
                  <SelectTrigger className="w-full h-9 text-sm">
                    <SelectValue placeholder="Select a tax category…">
                      {selectedTax && (
                        <div className="flex items-center justify-between w-full gap-2">
                          <span className="font-medium">
                            {selectedTax.category_name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {selectedRule?.rate}% GST
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {taxCategories?.data?.map((tax: any) => {
                      const rule = tax.rules?.[0];
                      const components =
                        rule?.components
                          ?.map((c: any) => `${c.component_code} ${c.rate}%`)
                          .join(" + ") ?? "No components";

                      return (
                        <SelectItem key={tax.id} value={tax.id}>
                          <div className="flex flex-col gap-0.5 py-1">
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-medium text-sm">
                                {tax.category_name}
                              </span>
                              <span className="text-xs font-mono text-muted-foreground">
                                {tax.code}
                              </span>
                            </div>

                            <div className="text-xs text-muted-foreground">
                              {rule?.rate ?? 0}% total · {rule?.tax_type} ·{" "}
                              {components}
                            </div>

                            <div className="text-xs text-muted-foreground">
                              ₹{rule?.min_value} – ₹{rule?.max_value}
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* ── Categories ── */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md  p-1.5">
                      <LayoutGrid className="h-3.5 w-3.5 text-sky-500" />
                    </div>
                    <h3 className="text-sm font-semibold">Categories</h3>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs"
                    onClick={() => {
                      setSelectedMenuID(m.id);
                      setOpen(true);
                    }}
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                    Add Category
                  </Button>
                </div>

                {!m.categories || m.categories.length === 0 ? (
                  <div className="rounded-xl border border-dashed bg-muted/20 py-8 flex flex-col items-center text-center gap-2">
                    <LayoutGrid className="h-5 w-5 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">
                      No categories yet.
                    </p>
                    <button
                      className="text-xs text-primary font-medium hover:underline underline-offset-2"
                      onClick={() => {
                        setSelectedMenuID(m.id);
                        setOpen(true);
                      }}
                    >
                      Add the first category
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {m.categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          createMenuAction.setActiveCategory(c.id);
                          createMenuAction.setModulesMenu(m);
                          nextStep();
                        }}
                        className="group text-left rounded-xl border bg-card p-3.5 space-y-1 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-xs font-semibold leading-snug truncate flex-1">
                            {c.category_name}
                          </p>
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                        </div>
                        {c.category_description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {c.category_description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}

      {/* ── Dialogs ── */}
      <AddMenuCategoryForm
        open={open}
        setOpen={setOpen}
        ownersID={ownersID}
        menuID={selectedMenuID}
      />

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
