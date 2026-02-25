import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration";
import { useAppForm } from "@/components/forms";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { getFloorNameShort } from "@/utilities/floor_naming";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";
import { useConfigureHotelMutation } from "../../property/api/mutation";

export interface ConfigureHotelRequestDto {
  propertyId: string; // uuid.UUID -> string
  hotelId: string; // uuid.UUID -> string
  genDetails: ConfigurationPropertyHotelGenDetailsReqDto;
  hotelLayout: HotelLayoutSetupReqDto[];
}

export interface ConfigurationPropertyHotelGenDetailsReqDto {
  hotelDisplayName: string;
  is24x7: boolean;
  openingTime: string;
  closingTime: string;
}

export interface HotelLayoutSetupReqDto {
  floorNumber: number;
  floorName: string;
  numberOfRooms: number;
}

// ✅ Schema
const HotelConfigurationFormSchema = z.object({
  propertyId: z.string(),
  hotelId: z.string(),

  genDetails: z.object({
    hotelDisplayName: z.string().min(1, "Hotel name is required"),
    is24x7: z.boolean(),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
  }),

  hotelLayout: z
    .array(
      z.object({
        floorNumber: z
          .string()
          .min(1, "Floor number is required")
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val) && val >= 0, {
            message: "Floor number must be positive",
          }),

        floorName: z.string().min(1, "Floor name is required"),

        numberOfRooms: z
          .string()
          .min(1, "Number of rooms is required")
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val) && val > 0, {
            message: "Number of rooms must be positive",
          }),
      }),
    )
    .min(1, "At least one floor is required"),
});

export type HotelConfigurationForm = z.infer<
  typeof HotelConfigurationFormSchema
>;

export function HotelConfigurationPage() {
  const { hotelId, propertyId } = Route.useParams();
  const setup = useConfigureHotelMutation();

  const form = useAppForm({
    // validators: {
    //   onChange: HotelConfigurationFormSchema,
    // },

    defaultValues: {
      propertyId: propertyId,
      hotelId: hotelId,

      genDetails: {
        hotelDisplayName: "",
        is24x7: false,
        openingTime: "",
        closingTime: "",
      },

      hotelLayout: [
        {
          floorNumber: "",
          floorName: "",
          numberOfRooms: "",
        },
      ],
    },

    onSubmit: ({ value }) => {
      const transformedValue = {
        ...value,
        hotelLayout: value.hotelLayout.map((layout) => ({
          ...layout,
          floorNumber: parseInt(layout.floorNumber, 10),
          numberOfRooms: parseInt(layout.numberOfRooms, 10),
        })),
      };

      console.log(transformedValue);
      setup.mutateAsync({
        propertyID: propertyId,
        request_payload: transformedValue,
      });
    },
  });
  return (
    <div className="mt-4">
      <Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle>Hotel Configuration</CardTitle>
            <CardDescription>Configure your Hotel first</CardDescription>
          </CardHeader>
          <CardContent>
            <form.AppField
              name="genDetails.hotelDisplayName"
              children={(f) => {
                return <f.TextField label="Hotel Display Name" />;
              }}
            />

            <form.AppField
              name="genDetails.is24x7"
              children={(f) => {
                return (
                  <f.CheckboxField
                    label="Is24X7"
                    checkedLabel="Your Hotels Open 24X7"
                    description="Check This if you hotel operates 24X7"
                    uncheckedLabel="Your Hotel does not operate 24x7"
                  />
                );
              }}
            />
            <div className="flex gap-5">
              <form.AppField
                name="genDetails.openingTime"
                children={(f) => {
                  return <f.TextField label="Opening Time" type="time" />;
                }}
              />

              <form.AppField
                name="genDetails.closingTime"
                children={(f) => {
                  return <f.TextField label="Closing Time" type="time" />;
                }}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Restaurant Layout Details</CardTitle>
                <CardDescription>
                  Tell us the Restaurant layout.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form.Field name="hotelLayout" mode="array">
                  {(rlField) => (
                    <div className="flex flex-col gap-4">
                      <AnimatePresence mode="popLayout">
                        {rlField.state.value.map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            layout
                            className="border border-accent-foreground rounded-xl p-4 shadow-sm"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end ">
                              <form.AppField
                                name={`hotelLayout[${i}].floorNumber`}
                                listeners={{
                                  onChange: ({ fieldApi, value }) => {
                                    const floorNumber = Number.parseInt(
                                      value,
                                      10,
                                    );
                                    if (Number.isNaN(floorNumber)) return;

                                    fieldApi.form.setFieldValue(
                                      `hotelLayout[${i}].floorName`,
                                      getFloorNameShort(floorNumber),
                                    );
                                  },
                                }}
                                validators={{
                                  onChange: ({ value, fieldApi }) => {
                                    const parsed = Number.parseInt(value, 10);
                                    if (Number.isNaN(parsed))
                                      return "Floor number is required";

                                    const allFloors =
                                      fieldApi.form.state.values.hotelLayout.map(
                                        (f) =>
                                          Number.parseInt(f.floorNumber, 10),
                                      );

                                    const duplicateCount = allFloors.filter(
                                      (num) => num === parsed,
                                    ).length;

                                    if (duplicateCount > 1) {
                                      return "Floor number already exists";
                                    }

                                    return undefined;
                                  },
                                }}
                                children={(f) => (
                                  <f.TextField label="Floor number" />
                                )}
                              />
                              <form.AppField
                                name={`hotelLayout[${i}].floorName`}
                                children={(f) => (
                                  <f.TextField label="Floor Name" />
                                )}
                              />
                              <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                  <form.AppField
                                    name={`hotelLayout[${i}].numberOfRooms`}
                                    children={(f) => (
                                      <f.NumberField label="Number of Rooms " />
                                    )}
                                  />
                                </div>
                                {i > 0 && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => {
                                        rlField.removeValue(i);
                                      }}
                                      aria-label="Remove floor"
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => {
                            rlField.pushValue({
                              floorNumber: "",
                              floorName: "",
                              numberOfRooms: "",
                            });
                          }}
                          className="w-full md:w-auto gap-2"
                        >
                          <PlusCircle className="h-4 w-4" />
                          Add Floor
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </form.Field>
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter>
            <form.AppForm>
              <form.SubmitButton>Complete Configuration</form.SubmitButton>
            </form.AppForm>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
