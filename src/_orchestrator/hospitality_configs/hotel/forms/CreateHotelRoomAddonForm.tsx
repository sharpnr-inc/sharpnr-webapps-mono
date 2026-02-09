import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, SaveIcon, RotateCcw, Box, CheckCircle2, Trash2 } from "lucide-react";
import { useState } from "react";

interface RoomAddon {
  name: string;
  description: string;
  code: string;
}

interface CreateHotelRoomAddonFormProps {
  hotelID: string;
  propertyID: string;
}

const CreateHotelRoomAddonForm: React.FC<CreateHotelRoomAddonFormProps> = ({
  hotelID,
  propertyID,
}) => {
  // States: 'empty' -> 'editing' -> 'list'
  const [viewState, setViewState] = useState<"empty" | "editing" | "list">("empty");
  const [savedAddons, setSavedAddons] = useState<RoomAddon[]>([]);

  const form = useAppForm({
    defaultValues: {
      addons: [{ name: "", description: "", code: "" }],
    },
    onSubmit: async ({ value }) => {
      // Logic: Merge new addons with existing ones
      setSavedAddons((prev) => [...prev, ...value.addons]);
      setViewState("list");
      form.reset();
    },
  });

  return (
    <div className="w-full  mx-auto min-h-[300px]">
      <AnimatePresence mode="wait">
        
        {/* 1. EMPTY STATE */}
        {viewState === "empty" && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Box className="text-muted-foreground h-6 w-6" />
              </div>
              <CardTitle className="text-xl">No Room Addons</CardTitle>
              <CardDescription className="mt-2 max-w-[250px]">
                Enhance guest experience by adding extras like Breakfast, Spa Access, or Airport Transfers.
              </CardDescription>
              <Button 
                onClick={() => setViewState("editing")} 
                className="mt-6"
                variant="outline"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Create First Addon
              </Button>
            </Card>
          </motion.div>
        )}

        {/* 2. FORM STATE */}
        {viewState === "editing" && (
          <motion.div
            key="editing"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Configure Addons</CardTitle>
                <CardDescription>Property: {propertyID} | Hotel: {hotelID}</CardDescription>
              </CardHeader>
              
              <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
                <CardContent className="pt-6 space-y-6">
                  <form.Field name="addons" mode="array">
                    {(field) => (
                      <div className="space-y-4">
                        {field.state.value.map((_, i) => (
                          <div key={i} className="p-4 rounded-lg border bg-muted/20 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <form.AppField name={`addons[${i}].name`}>
                                {(field) => <field.TextField label="Addon Name" />}
                              </form.AppField>
                              <form.AppField name={`addons[${i}].code`}>
                                {(field) => <field.TextField label="Service Code"  />}
                              </form.AppField>
                            </div>
                            <form.AppField name={`addons[${i}].description`}>
                              {(field) => <field.TextAreaField label="Description" />}
                            </form.AppField>
                          </div>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </CardContent>
                
                <CardFooter className="border-t p-6 flex justify-between">
                  <Button type="button" variant="ghost" onClick={() => setViewState(savedAddons.length > 0 ? "list" : "empty")}>
                    Cancel
                  </Button>
                  <Button type="submit" className="font-bold">
                    <SaveIcon className="mr-2 h-4 w-4" /> Save & Apply
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        )}

        {/* 3. LIST VIEW (SAVED STATE) */}
        {viewState === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                <div>
                  <CardTitle>Room Addons</CardTitle>
                  <CardDescription>Available services for guests</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setViewState("editing")}>
                  <PlusIcon className="h-4 w-4 mr-2" /> Add More
                </Button>
              </CardHeader>

              <CardContent className="divide-y">
                {savedAddons.map((addon, index) => (
                  <div key={index} className="flex items-center justify-between py-4 group">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm">{addon.name}</p>
                          <Badge variant="secondary" className="text-[10px]">{addon.code}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{addon.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="bg-muted/30 p-4 justify-center">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {savedAddons.length} Items Configured for {hotelID}
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateHotelRoomAddonForm;