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
import { formOptions } from "@tanstack/react-form";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteIcon, PlusIcon, CheckCircle2, Edit2, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

interface HotelAmenitiesFormProps {
  hotelID: string;
  propertyID: string;
}

export interface Amenity {
  name: string;
  description: string;
}

export interface HotelAmenitiesFormValues {
  amenities: Amenity[];
}

const amenitySchema = z.object({
  amenities: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string(),
    }),
  ),
});

const hotelAmenitiesOptions = formOptions({
  defaultValues: {
    amenities: [{ name: "", description: "" }],
  } as HotelAmenitiesFormValues,
});

const CreateHotelAmenitiesForm = ({ hotelID, propertyID }: HotelAmenitiesFormProps) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const form = useAppForm({
    ...hotelAmenitiesOptions,
    validators: {
      onChange: amenitySchema,
    },
    onSubmit: async ({ value }) => {
      setStatus("saving");
      // Simulate API call using props
      console.log(`Saving amenities for Hotel: ${hotelID} at Property: ${propertyID}`, value);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("saved");
    },
  });

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {status !== "saved" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Hotel Amenities</CardTitle>
                <CardDescription>
                  Configure available services for {hotelID}
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
                  <form.Field name="amenities" mode="array">
                    {(field) => (
                      <div className="space-y-4">
                        {field.state.value.map((_, i) => (
                          <div
                            key={i}
                            className="rounded-lg border bg-muted/20 p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Amenity #{i + 1}
                              </h3>

                              {field.state.value.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:bg-destructive/10"
                                  onClick={() => field.removeValue(i)}
                                >
                                  <DeleteIcon className="mr-1 h-4 w-4" />
                                  Remove
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <form.AppField name={`amenities[${i}].name`}>
                                {(field) => <field.TextField label="Amenity Name" />}
                              </form.AppField>

                              <form.AppField name={`amenities[${i}].description`}>
                                {(field) => <field.TextAreaField label="Description" />}
                              </form.AppField>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-dashed"
                          onClick={() => field.pushValue({ name: "", description: "" })}
                        >
                          <PlusIcon className="mr-2 h-4 w-4" />
                          Add Amenity
                        </Button>
                      </div>
                    )}
                  </form.Field>
                </CardContent>

                <CardFooter className="flex justify-end border-t p-6">
                  <form.AppForm>
                    <Button disabled={status === "saving"} className="px-8 font-bold">
                      {status === "saving" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          Processing...
                        </>
                      ) : (
                        "Create Amenities"
                      )}
                    </Button>
                  </form.AppForm>
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
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <Badge variant="secondary" className="mb-1">
                    Amenity Profile Active
                  </Badge>
                  <CardTitle className="text-2xl">Configured Amenities</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setStatus("idle")}
                  className="rounded-full"
                >
                  <Edit2 size={14} className="mr-2" /> Edit
                </Button>
              </CardHeader>

              <CardContent className="space-y-3 py-6">
                {form.state.values.amenities.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-md border shadow-sm">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="px-6 pb-4 flex justify-between items-center border-t pt-4 mt-2">
                <p className="text-[9px] text-muted-foreground font-mono italic">
                  ID: {propertyID} / {hotelID}
                </p>
                <Badge variant="outline" className="text-[10px]">
                  {form.state.values.amenities.length} Services
                </Badge>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateHotelAmenitiesForm;