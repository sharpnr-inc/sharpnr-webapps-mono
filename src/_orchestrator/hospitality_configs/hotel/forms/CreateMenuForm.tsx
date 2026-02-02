import { useAppForm } from "@/components/forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createId } from "@/utilities/id";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Edit2,
  LayoutGrid,
  ListTree,
  Loader2,
  PlusIcon,
  Trash2,
  Utensils,
} from "lucide-react";
import { useState } from "react";

interface CreateMenuFormProps {
  hotelID: string;
  propertyID: string;
}

export interface Menu {
  id: string;
  name: string;
  description: string;
  menuCategory: MenuCategory[];
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  menuSubCategory: MenuSubCategory[];
}

interface MenuSubCategory {
  id: string;
  name: string;
  description: string;
  menu_item: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  base_price: string;
  menuItemVariants: VariantGroup;
  addOns: MenuAddOn[];
}

interface VariantGroup {
  variants: Variant[];
}

interface Variant {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface MenuAddOn {
  id: string;
  name: string;
  price: string;
}

const CreateMenuForm: React.FC<CreateMenuFormProps> = ({
  hotelID,
  propertyID,
}) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const form = useAppForm({
    defaultValues: {
      id: createId(),
      name: "",
      description: "",
      menuCategory: [
        {
          id: createId(),
          name: "",
          description: "",
          menuSubCategory: [
            {
              id: createId(),
              name: "",
              description: "",
              menu_item: [],
            },
          ],
        },
      ],
    },
    onSubmit: async ({ value }) => {
      setStatus("saving");
      console.log("Submitting Menu Data:", value);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("saved");
    },
  });

  return (
    <div className="w-full  mx-auto pb-24">
      <AnimatePresence mode="wait">
        {status !== "saved" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {/* --- HEADER CARD --- */}
              <Card className="mb-6 shadow-none border-2">
                <CardHeader>
                  <CardTitle>Global Menu Settings</CardTitle>
                  <CardDescription>
                    Configure the main identity for this menu at {hotelID}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <form.AppField name="name">
                    {(field) => <field.TextField label="Menu Name" />}
                  </form.AppField>
                  <form.AppField name="description">
                    {(field) => <field.TextAreaField label="Description" />}
                  </form.AppField>
                </CardContent>
              </Card>

              {/* --- CATEGORIES ARRAY --- */}
              <form.Field name="menuCategory" mode="array">
                {(catField) => (
                  <div className="space-y-6">
                    {catField.state.value.map((_, i) => (
                      <Card key={i} className="shadow-none border-2">
                        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 py-3">
                          <div className="flex items-center gap-2">
                            <LayoutGrid
                              size={16}
                              className="text-muted-foreground"
                            />
                            <span className="text-xs font-bold uppercase tracking-widest">
                              Category {i + 1}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-destructive hover:bg-destructive/10"
                            onClick={() => catField.removeValue(i)}
                          >
                            <Trash2 size={14} className="mr-2" /> Remove
                          </Button>
                        </CardHeader>

                        <CardContent className="pt-6 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.AppField name={`menuCategory[${i}].name`}>
                              {(field) => (
                                <field.TextField label="Category Title" />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`menuCategory[${i}].description`}
                            >
                              {(field) => (
                                <field.TextField label="Description" />
                              )}
                            </form.AppField>
                          </div>

                          <Separator />

                          {/* --- SUB-CATEGORIES ARRAY --- */}
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed h-14 bg-muted/5 hover:bg-muted/10"
                      onClick={() =>
                        catField.pushValue({
                          id: createId(),
                          name: "",
                          description: "",
                          menuSubCategory: [],
                        })
                      }
                    >
                      <PlusIcon className="mr-2 h-4 w-4" /> Add New Category
                    </Button>
                  </div>
                )}
              </form.Field>

              {/* --- ACTION BAR --- */}
              <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-end gap-3 z-50">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  disabled={status === "saving"}
                  className="px-12 font-bold"
                >
                  {status === "saving" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Create Full Menu"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* --- SUMMARY / SAVED VIEW --- */
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Card className="border-2 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <CardTitle className="text-2xl">
                      {form.state.values.name}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {form.state.values.description}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus("idle")}
                >
                  <Edit2 size={14} className="mr-2" /> Edit Menu
                </Button>
              </CardHeader>

              <CardContent className="py-8">
                <div className="space-y-6">
                  {form.state.values.menuCategory.map((cat, ci) => (
                    <div key={ci} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Utensils size={18} className="text-muted-foreground" />
                        <h3 className="font-bold text-lg">
                          {cat.name || "Untitled Category"}
                        </h3>
                        <Separator className="flex-1" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                        {cat.menuSubCategory.map((sub, si) => (
                          <div
                            key={si}
                            className="p-4 border rounded-lg bg-muted/5"
                          >
                            <p className="font-bold text-sm">
                              {sub.name || "Untitled Sub-Category"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {sub.description}
                            </p>
                            <Badge
                              variant="secondary"
                              className="mt-3 text-[10px]"
                            >
                              Ready for Items
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="bg-muted/20 border-t py-4 justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">
                  Property: {propertyID}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground tracking-tighter">
                  REF: {form.state.values.id}
                </span>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateMenuForm;
