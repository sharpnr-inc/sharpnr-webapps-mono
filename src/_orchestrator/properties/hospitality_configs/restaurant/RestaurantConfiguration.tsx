import { useAppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFloorNameShort } from "@/utilities/floor_naming";
import { PlusCircle, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";
import { usePropertyDetails } from "@/_orchestrator/api/general";
import { Badge } from "@/components/ui/badge";
import { useConfigureRestuarantMutations } from "@/_orchestrator/properties/property/api/mutation";

const RestaurantConfigurationFormSchema = z.object({
  propertyID: z.string(),
  restaurantID: z.string(),

  general_details: z.object({
    name: z.string().min(1, "Restaurant name is required"),
    is_pure_veg: z.boolean(),
    opening_time: z.string().min(1, "Opening time is required"),
    closing_time: z.string().min(1, "Closing time is required"),
  }),

  restaurant_layout: z
    .array(
      z.object({
        floor_number: z
          .string()
          .min(0, "Floor number is required")
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val) && val >= 0, {
            message: "Floor number must be a positive number",
          }),

        floor_name: z.string().min(1, "Floor name is required"),

        number_of_tables: z
          .string()
          .min(1, "Number of tables is required")
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val) && val > 0, {
            message: "Number of tables must be a positive number",
          }),
      }),
    )
    .min(1, "At least one floor is required"),

  // preferred_kitchen: z.object({
  //   id: z.string().min(1, "Preferred kitchen is required"),
  // }),

  // legal_entity: z.object({
  //   id: z.string().min(1, "Legal entity is required"),
  // }),
});

export type RestaurantConfigurationForm = z.infer<
  typeof RestaurantConfigurationFormSchema
>;
interface RestaurantConfigurationProps {}

const RestaurantConfiguration: React.FC<RestaurantConfigurationProps> = () => {
  const { propertyId, restaurantID } = Route.useParams();

  const { data } = usePropertyDetails(propertyId);
  const { mutateAsync } = useConfigureRestuarantMutations();

  const propertyInfra = data?.data?.infra ?? [];

  const form = useAppForm({
    validators: {
      onChange: RestaurantConfigurationFormSchema,
    },

    defaultValues: {
      propertyID: propertyId,
      restaurantID: restaurantID,
      general_details: {
        name: "",
        is_pure_veg: false,
        opening_time: "",
        closing_time: "",
      },

      restaurant_layout: [
        {
          floor_number: "",
          floor_name: "",
          number_of_tables: "",
        },
      ],
      // preferred_kitchen: {
      //   id: "",
      // },

      // legal_entity: {
      //   id: "",
      // },
    },

    onSubmit: ({ value }) => {
      console.log(value);
      const transformedValue = {
        ...value,
        restaurant_layout: value.restaurant_layout.map((layout) => ({
          ...layout,
          floor_number: parseInt(layout.floor_number, 10),
          number_of_tables: parseInt(layout.number_of_tables, 10),
        })),
      };

      console.log(transformedValue);
      mutateAsync(
        { payload: transformedValue, propertyID: propertyId },
        {
          onSuccess: () => {
            console.log("Done");
          },
        },
      );
    },
  });
  return (
    <div className="mt-4">
      <Card>
        <CardContent>
          <form
            className=" space-y-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Restaurant General Info</CardTitle>
                <CardDescription>
                  Save the restaurant general details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form.AppField
                  name="general_details.name"
                  children={(f) => <f.TextField label="Restaurant Name" />}
                />
                <form.AppField
                  name="general_details.is_pure_veg"
                  children={(f) => (
                    <f.CheckboxField
                      checkedLabel="You serve pure veg"
                      uncheckedLabel="This property is hidden from customers"
                      label="Pure Veg"
                      description="Is you Restaurant Pure Veg, or Do you serve only pure veg food"
                    />
                  )}
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <form.AppField
                    name="general_details.opening_time"
                    children={(f) => (
                      <f.TextField label="Opening Time" type={"time"} />
                    )}
                  />
                  <form.AppField
                    name="general_details.closing_time"
                    children={(f) => (
                      <f.TextField label="Closing Time" type={"time"} />
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Restaurant Layout Details</CardTitle>
                <CardDescription>
                  Tell us the Restaurant layout.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form.Field name="restaurant_layout" mode="array">
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
                                name={`restaurant_layout[${i}].floor_number`}
                                listeners={{
                                  onChange: ({ fieldApi, value }) => {
                                    const floorNumber = Number.parseInt(
                                      value,
                                      10,
                                    );
                                    if (Number.isNaN(floorNumber)) return;

                                    fieldApi.form.setFieldValue(
                                      `restaurant_layout[${i}].floor_name`,
                                      getFloorNameShort(floorNumber),
                                    );
                                  },
                                }}
                                children={(f) => (
                                  <f.TextField label="Floor number" />
                                )}
                              />
                              <form.AppField
                                name={`restaurant_layout[${i}].floor_name`}
                                children={(f) => (
                                  <f.TextField label="Floor Name" />
                                )}
                              />
                              <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                  <form.AppField
                                    name={`restaurant_layout[${i}].number_of_tables`}
                                    children={(f) => (
                                      <f.NumberField label="Number Of Tables" />
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
                              floor_name: "",
                              floor_number: "",
                              number_of_tables: "",
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

            <Card>
              <CardHeader>
                <CardTitle>Kitchen and Order Processing</CardTitle>
                <CardDescription>
                  Choose Which Kitchen you want to use
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {propertyInfra.map((i: any) => {
                  // 🔮 future logic goes here
                  // if (!i.enabled) return null;

                  return (
                    <div
                      key={i.id ?? i.name}
                      className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-tight">
                          {i.name}
                        </h3>

                        <Badge
                          variant="secondary"
                          className="shrink-0 capitalize"
                        >
                          {i.infra_type}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal entity & Account Tax Codes</CardTitle>
                <CardDescription>
                  choose which legal entity do you want to use for Accounting
                  and Tax codes
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <div className="p-6 w-full">
              <form.AppForm>
                <form.SubmitButton>Save & Configure</form.SubmitButton>
              </form.AppForm>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantConfiguration;
