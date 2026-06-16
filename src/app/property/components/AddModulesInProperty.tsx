import { CheckCircle2 } from "lucide-react";
import { useHospitalityDomainModInfra } from "../api/queries";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { useForm } from "@tanstack/react-form";
import { useAddModulesInProperty } from "../api/mutation";
import type { DomainModuleInfra } from "../api/types";

interface AddModulesInPropertyProps {
  domain: string;
  propertyID: string;
  closeModal: () => void;
}

const AddModulesInProperty: React.FC<AddModulesInPropertyProps> = ({
  domain,
  propertyID,
  closeModal,
}) => {
  const { data: domainData, isLoading } = useHospitalityDomainModInfra(domain);
  const modules = domainData?.data?.modules ?? [];

  const addModulesInProperty = useAddModulesInProperty();

  const form = useForm({
    defaultValues: {
      domain,
      property_id: propertyID,
      modules: [] as string[],
    },
    onSubmit: async ({ value }) => {
      console.log("SUBMIT:", value);
      await addModulesInProperty.mutateAsync(
        {
          payload: value,
          propertyID: propertyID,
        },
        {
          onSuccess: () => {
            closeModal();
          },
        },
      );
    },
  });

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="modules">
          {(field) => {
            const selected = field.state.value;

            const toggleModule = (id: string) => {
              if (selected.includes(id)) {
                field.setValue(selected.filter((m) => m !== id));
              } else {
                field.setValue([...selected, id]);
              }
            };

            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading ? (
                  <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl">
                    Loading modules…
                  </div>
                ) : (
                  modules.map((module: DomainModuleInfra) => {
                    const isSelected = selected.includes(module.ID);

                    return (
                      <motion.div
                        key={module.ID}
                        whileHover={module.IsAvailable ? { y: -4 } : undefined}
                        onClick={() =>
                          module.IsAvailable && toggleModule(module.ID)
                        }
                        className={cn(
                          "relative p-6 rounded-2xl border-2 min-h-40 cursor-pointer transition-all",
                          isSelected
                            ? "border-blue-600 bg-blue-600/30"
                            : "border-teal-200",
                          !module.IsAvailable &&
                            "opacity-60 cursor-not-allowed",
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-bold">{module.ModuleName}</span>

                          {isSelected && (
                            <CheckCircle2 className="h-6 w-6 text-blue-600" />
                          )}
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-3 mt-4">
                          {module.Description}
                        </p>

                        {!module.IsAvailable && (
                          <Badge
                            variant="secondary"
                            className="absolute top-4 right-4 text-[10px]"
                          >
                            Coming Soon
                          </Badge>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            );
          }}
        </form.Field>

        <Button type="submit" className="w-full mt-6">
          Add Modules
        </Button>
      </form>
    </div>
  );
};

export default AddModulesInProperty;
