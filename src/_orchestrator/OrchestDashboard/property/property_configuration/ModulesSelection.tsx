import { useMemo, useState } from "react";
import { useSectorsModules } from "@/apis/Queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAddModulesInProperty } from "../../api/mutations/property_mutation";

/* ---------- Types ---------- */

interface ModulesSelectionProps {
  propertyID: string;
  domain: string;
}

interface SubModule {
  id: string;
  module_name: string;
  description: string;
}

/* ---------- Backend-aligned Payload Types ---------- */

type ModuleConfigurationPayload = {
  name: string;
  kitchen_capable: boolean;
  kitchen_enabled: boolean;
};

type PropertyModuleConfigurationPayload = {
  property_id: string;
  domain: string;
  modules: ModuleConfigurationPayload[];
};

/* ---------- System Capability Map ---------- */

const MODULE_KITCHEN_CAPABLE: Record<string, boolean> = {
  HOTEL: true,
  RESTAURANT: true,
  BAR: true,
  "PUB/CLUB": true,
  "CLOUD KITCHEN/TAKEAWAYS": true,
};

/* ---------- Component ---------- */

export function ModulesSelectionSection({
  domain,
  propertyID,
}: ModulesSelectionProps) {
  const { data, isLoading } = useSectorsModules(domain.toLowerCase());
  const submodules: SubModule[] = data?.data?.submodules ?? [];

  const addModules = useAddModulesInProperty();

  /* ---------- Local State ---------- */

  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [moduleKitchenEnabled, setModuleKitchenEnabled] = useState<
    Record<string, boolean | undefined>
  >({});

  /* ---------- Derived State ---------- */

  const kitchenCapableModules = useMemo(
    () =>
      selectedModules.filter(
        (m) => MODULE_KITCHEN_CAPABLE[m]
      ),
    [selectedModules]
  );

  const hasUnansweredKitchenQuestion = kitchenCapableModules.some(
    (m) => moduleKitchenEnabled[m] === undefined
  );

  /* ---------- Actions ---------- */

  const toggleModule = (moduleName: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  const buildPayload = (): PropertyModuleConfigurationPayload => {
    return {
      property_id: propertyID,
      domain,
      modules: selectedModules.map((moduleName) => {
        const kitchenCapable = !!MODULE_KITCHEN_CAPABLE[moduleName];
        const kitchenEnabled =
          kitchenCapable && moduleKitchenEnabled[moduleName] === true;

        return {
          name: moduleName,
          kitchen_capable: kitchenCapable,
          kitchen_enabled: kitchenEnabled,
        };
      }),
    };
  };

  const handleAddModules = async () => {
    const payload = buildPayload();

    await addModules.mutateAsync({
      propertyID,
      payload,
    });
  };

  /* ---------- Loading ---------- */

  if (isLoading) {
    return <div className="p-4">Loading modules…</div>;
  }

  /* ---------- Render ---------- */

  return (
    <div className="space-y-8">
      {/* ---------- Header ---------- */}
      <div>
        <h2 className="text-xl font-semibold">Module Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Select modules and configure operational details
        </p>
      </div>

      {/* ---------- Module Selection ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {submodules.map((module) => {
          const isSelected = selectedModules.includes(module.module_name);

          return (
            <Card
              key={module.id}
              onClick={() => toggleModule(module.module_name)}
              className={cn(
                "cursor-pointer transition-all border",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              )}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {module.module_name}
                  {isSelected && (
                    <span className="text-xs text-primary">Selected</span>
                  )}
                </CardTitle>
                <CardDescription>
                  {module.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* ---------- Kitchen Configuration ---------- */}
      {kitchenCapableModules.length > 0 && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">
              Kitchen Availability
            </CardTitle>
            <CardDescription>
              Tell us which selected modules actually have kitchens
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {kitchenCapableModules.map((module) => (
              <div
                key={module}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="font-medium">{module}</div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={
                      moduleKitchenEnabled[module] === true
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      setModuleKitchenEnabled((prev) => ({
                        ...prev,
                        [module]: true,
                      }))
                    }
                  >
                    Has Kitchen
                  </Button>

                  <Button
                    size="sm"
                    variant={
                      moduleKitchenEnabled[module] === false
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      setModuleKitchenEnabled((prev) => ({
                        ...prev,
                        [module]: false,
                      }))
                    }
                  >
                    No Kitchen
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ---------- Submit ---------- */}
      <Button
        onClick={handleAddModules}
        disabled={
          selectedModules.length === 0 ||
          hasUnansweredKitchenQuestion ||
          addModules.isPending
        }
      >
        {addModules.isPending ? "Adding Modules..." : "Add Modules"}
      </Button>
    </div>
  );
}
