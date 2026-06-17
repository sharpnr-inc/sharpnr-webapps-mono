import { useAppForm } from "@/components/forms";
import { Button } from "@sharpnr/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { getFloorNameShort } from "@/utilities/floor_naming";
import { PlusCircle, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useAddRestaurantLayout } from "@/business_operation/hospitality/restaurant/apis/mutations";
import { useQueryClient } from "@tanstack/react-query";

const RestaurantConfigurationFormSchema = z.object({
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
});

export type RestaurantConfigurationForm = z.infer<
  typeof RestaurantConfigurationFormSchema
>;
interface RestaurantConfigurationProps {
  restaurantID: string;
  closeModal: () => void;
}

const RestaurantConfiguration: React.FC<RestaurantConfigurationProps> = ({
  restaurantID,
  closeModal,
}) => {
  const { mutateAsync } = useAddRestaurantLayout();
  const q = useQueryClient();

  const form = useAppForm({
    validators: {
      onChange: RestaurantConfigurationFormSchema,
    },

    defaultValues: {
      restaurant_layout: [
        {
          floor_number: "",
          floor_name: "",
          number_of_tables: "",
        },
      ],
    },

    onSubmit: ({ value }) => {
      const transformedValue = {
        ...value,
        restaurant_layout: value.restaurant_layout.map((layout) => ({
          ...layout,
          floor_number: parseInt(layout.floor_number, 10),
          number_of_tables: parseInt(layout.number_of_tables, 10),
        })),
      };

      mutateAsync(
        { payload: transformedValue, restaurantID },
        {
          onSuccess: () => {
            closeModal();

            // 🔥 REFRESH RESTAURANT LAYOUT
            q.invalidateQueries({
              queryKey: ["Restaurant", "Restaurant Layout", restaurantID],
            });
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
