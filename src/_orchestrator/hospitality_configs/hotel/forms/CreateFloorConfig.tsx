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
import { DeleteIcon, PlusIcon, Edit2, CheckCircle2, Loader2, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CreateHotelFloorConfigProps {
  hotelID: string;
  propertyID: string;
}

const CreateHotelFloorConfig: React.FC<CreateHotelFloorConfigProps> = ({ hotelID, propertyID }) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const form = useAppForm({
    defaultValues: {
      floors: [
        {
          floor_number: "",
          floor_name: "",
          room_count: "",
        },
      ],
    },
    onSubmit: async ({ value }) => {
      setStatus("saving");
      console.log(`Saving floors for ${hotelID} at ${propertyID}`, value);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("saved");
    },
  });

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {status !== "saved" ? (
          /* --- ORIGINAL LOGIC / IMPROVED UI --- */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <Card className="shadow-none border-2">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Building2 size={20} /> Floor Setup
                </CardTitle>
                <CardDescription>
                  Configure floors for {hotelID} (Property ID: {propertyID})
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
                  <form.Field name="floors" mode="array">
                    {(field) => (
                      <div className="space-y-4">
                        {field.state.value.map((_, i) => (
                          <div
                            key={i}
                            className="group relative rounded-xl border bg-muted/10 p-4 transition-all hover:bg-muted/20"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                              {/* Floor Identity */}
                              <div className="md:col-span-2">
                                <form.AppField name={`floors[${i}].floor_number`}>
                                  {(f) => <f.TextField label="Floor #"  />}
                                </form.AppField>
                              </div>

                              {/* Floor Label */}
                              <div className="md:col-span-6">
                                <form.AppField name={`floors[${i}].floor_name`}>
                                  {(f) => <f.TextField label="Floor Name" />}
                                </form.AppField>
                              </div>

                              {/* Room Count */}
                              <div className="md:col-span-3">
                                <form.AppField name={`floors[${i}].room_count`}>
                                  {(f) => <f.TextField label="Room Count"  />}
                                </form.AppField>
                              </div>

                              {/* Remove Action */}
                              <div className="md:col-span-1 flex justify-end md:justify-center pt-7">
                                {field.state.value.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => field.removeValue(i)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                    type="button"
                                  >
                                    <DeleteIcon size={18} />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-dashed h-12 bg-background hover:bg-muted/10"
                          onClick={() =>
                            field.pushValue({
                              floor_number: "",
                              floor_name: "",
                              room_count: "",
                            })
                          }
                        >
                          <PlusIcon className="mr-2 h-4 w-4" />
                          Add Floor Level
                        </Button>
                      </div>
                    )}
                  </form.Field>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 border-t p-6 mt-4">
                  <Button type="button" variant="ghost" onClick={() => form.reset()}>
                    Reset
                  </Button>
                  <Button type="submit" className="px-10 font-bold" disabled={status === "saving"}>
                    {status === "saving" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Plan...
                      </>
                    ) : (
                      "Save Configuration"
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Card className="border-2 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-4 bg-muted/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <CardTitle className="text-xl">Vertical Layout Saved</CardTitle>
                  </div>
                  <CardDescription>Hotel: {hotelID}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
                  <Edit2 size={14} className="mr-2" /> Modify Floors
                </Button>
              </CardHeader>

              <CardContent className="py-6 space-y-3">
                {form.state.values.floors.map((floor, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-background">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded border flex flex-col items-center justify-center bg-muted/10">
                          <span className="text-[8px] font-black text-muted-foreground uppercase leading-none">Floor</span>
                          <span className="text-sm font-bold">{floor.floor_number}</span>
                       </div>
                       <div>
                         <p className="font-bold text-sm uppercase tracking-tight">{floor.floor_name || "Standard Level"}</p>
                         <p className="text-[10px] text-muted-foreground font-mono italic">REF: FL-{floor.floor_number}</p>
                       </div>
                    </div>
                    <Badge variant="outline" className="px-4 py-1 font-mono">
                      {floor.room_count} ROOMS
                    </Badge>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter className="bg-muted/10 border-t py-4 px-6 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                <span className="uppercase tracking-widest">Property ID: {propertyID}</span>
                <span className="font-bold">TOTAL: {form.state.values.floors.reduce((acc, f) => acc + Number(f.room_count || 0), 0)} ROOMS</span>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateHotelFloorConfig;