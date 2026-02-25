import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DeleteIcon, PlusIcon, Edit2, CheckCircle2, Loader2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CreateHotelRoomTypesProps {
  hotelID: string;
  propertyID: string;
}

const CreateHotelRoomTypes: React.FC<CreateHotelRoomTypesProps> = ({ hotelID, propertyID }) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const form = useAppForm({
    defaultValues: {
      hotel_room_categories: [
        {
          name: "",
          description: "",
          code: "",
          max_occupancy: "",
          min_occupancy: "",
        },
      ],
    },
    onSubmit: async ({ value }) => {
      setStatus("saving");
      // Using props for API context
      console.log(`Saving Room Types for Hotel: ${hotelID} (Property: ${propertyID})`, value);
      
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("saved");
    },
  });

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {status !== "saved" ? (
          /* --- EDIT FORM VIEW --- */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-none border-2">
              <CardHeader className="border-b">
                <CardTitle>Room Category / Type</CardTitle>
                <CardDescription>
                  Setup categories for <span className="font-mono font-bold underline">{hotelID}</span>
                </CardDescription>
              </CardHeader>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <CardContent className="space-y-6 pt-6">
                  <form.Field name="hotel_room_categories" mode="array">
                    {(field) => (
                      <div className="space-y-6">
                        {field.state.value.map((_, i) => (
                          <div
                            key={i}
                            className="rounded-lg border bg-muted/20 p-4 md:p-6 space-y-4 shadow-sm"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-muted">
                              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                                Category Entry #{i + 1}
                              </h3>

                              {field.state.value.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => field.removeValue(i)}
                                  className="text-destructive hover:bg-destructive/10 h-8"
                                  type="button"
                                >
                                  <DeleteIcon className="mr-1 h-4 w-4" />
                                  Remove
                                </Button>
                              )}
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <form.AppField name={`hotel_room_categories[${i}].name`}>
                                  {(field) => <field.TextField label="Category Name" />}
                                </form.AppField>
                                <form.AppField name={`hotel_room_categories[${i}].code`}>
                                  {(field) => <field.TextField label="Category Code" />}
                                </form.AppField>
                              </div>

                              <form.AppField name={`hotel_room_categories[${i}].description`}>
                                {(field) => <field.TextAreaField label="Category Description" />}
                              </form.AppField>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <form.AppField name={`hotel_room_categories[${i}].min_occupancy`}>
                                  {(field) => <field.TextField label="Min Occupancy"  />}
                                </form.AppField>
                                <form.AppField name={`hotel_room_categories[${i}].max_occupancy`}>
                                  {(field) => <field.TextField label="Max Occupancy"  />}
                                </form.AppField>
                              </div>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-dashed py-8 bg-muted/5 hover:bg-muted/10 transition-colors"
                          onClick={() =>
                            field.pushValue({
                              name: "",
                              description: "",
                              code: "",
                              max_occupancy: "",
                              min_occupancy: "",
                            })
                          }
                        >
                          <PlusIcon className="mr-2 h-4 w-4" />
                          Add Another Room Category
                        </Button>
                      </div>
                    )}
                  </form.Field>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 border-t p-6 mt-4">
                  <Button type="button" variant="ghost" onClick={() => form.reset()} disabled={status === "saving"}>
                    Reset
                  </Button>
                  <Button type="submit" className="px-10 font-bold" disabled={status === "saving"}>
                    {status === "saving" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving to {propertyID}
                      </>
                    ) : (
                      "Confirm Categories"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        ) : (
          /* --- SUMMARY VIEW --- */
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <Card className="border-2 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <CardTitle className="text-xl font-bold">Inventory Verified</CardTitle>
                  </div>
                  <CardDescription>Hotel ID: {hotelID}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
                  <Edit2 size={14} className="mr-2" /> Modify Setup
                </Button>
              </CardHeader>

              <CardContent className="py-6 space-y-4">
                {form.state.values.hotel_room_categories.map((room, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-muted/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{room.name || "Unnamed"}</span>
                        <Badge variant="secondary" className="font-mono text-[10px] tracking-widest">{room.code || "N/A"}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground max-w-md">{room.description}</p>
                    </div>

                    <div className="flex items-center gap-6 px-5 py-2 border rounded-md bg-background shadow-sm">
                      <div className="text-center">
                        <p className="text-[9px] uppercase font-black text-muted-foreground">Min</p>
                        <p className="font-bold text-sm">{room.min_occupancy || "0"}</p>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="text-center">
                        <p className="text-[9px] uppercase font-black text-muted-foreground">Max</p>
                        <p className="font-bold text-sm">{room.max_occupancy || "0"}</p>
                      </div>
                      <Users size={14} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter className="bg-muted/10 border-t py-3 px-6 flex justify-between">
                <p className="text-[9px] font-mono text-muted-foreground uppercase">
                  Property UID: {propertyID}
                </p>
                <p className="text-[9px] font-mono text-muted-foreground">
                  Timestamp: {new Date().toLocaleTimeString()}
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateHotelRoomTypes;