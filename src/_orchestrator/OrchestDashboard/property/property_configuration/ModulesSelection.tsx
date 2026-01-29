import { useEffect, useMemo, useState } from "react";
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

/**
 * System-level capability (can this module EVER have a kitchen?)
 * This should ideally come from backend later.
 */
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

  /* Selected modules */
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  /* Per-module kitchen enabled (user choice) */
  const [moduleKitchenEnabled, setModuleKitchenEnabled] = useState<
    Record<string, boolean | undefined>
  >({});

  /* Shared vs Separate */
  const [kitchenSharing, setKitchenSharing] = useState<
    "COMMON" | "SEPARATE" | null
  >(null);

  /* ---------- Derived State ---------- */

  const kitchenCapableModules = useMemo(
    () =>
      selectedModules.filter(
        (m) => MODULE_KITCHEN_CAPABLE[m]
      ),
    [selectedModules]
  );

  const kitchenEnabledModules = useMemo(
    () =>
      kitchenCapableModules.filter(
        (m) => moduleKitchenEnabled[m] === true
      ),
    [kitchenCapableModules, moduleKitchenEnabled]
  );

  /* Reset sharing if no longer applicable */
  useEffect(() => {
    if (kitchenEnabledModules.length <= 1) {
      setKitchenSharing(null);
    }
  }, [kitchenEnabledModules]);

  /* ---------- Actions ---------- */

  const toggleModule = (moduleName: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  /* ---------- Summary Payload ---------- */

  const summary = useMemo(() => {
    return {
      property_id: propertyID,
      domain,
      modules: selectedModules.map((m) => ({
        name: m,
        kitchen_capable: MODULE_KITCHEN_CAPABLE[m],
        kitchen_enabled:
          MODULE_KITCHEN_CAPABLE[m] ? moduleKitchenEnabled[m] ?? false : false,
      })),
      kitchen: {
        applicable_modules: kitchenEnabledModules,
        sharing:
          kitchenEnabledModules.length > 1
            ? kitchenSharing
            : null,
      },
    };
  }, [
    propertyID,
    domain,
    selectedModules,
    moduleKitchenEnabled,
    kitchenEnabledModules,
    kitchenSharing,
  ]);

  const logSummary = () => {
    console.log("FINAL CONFIGURATION →", summary);
  };

  if (isLoading) return <div>Loading modules…</div>;

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
                <CardTitle className="flex justify-between">
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

      {/* ---------- Per-module Kitchen Questions ---------- */}
      {kitchenCapableModules.length > 0 && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">
              Kitchen Availability
            </CardTitle>
            <CardDescription>
              Tell us which modules actually have kitchens
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
                    variant={
                      moduleKitchenEnabled[module] === true
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setModuleKitchenEnabled((p) => ({
                        ...p,
                        [module]: true,
                      }))
                    }
                  >
                    Has Kitchen
                  </Button>

                  <Button
                    variant={
                      moduleKitchenEnabled[module] === false
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setModuleKitchenEnabled((p) => ({
                        ...p,
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

      {/* ---------- Kitchen Sharing ---------- */}
      {kitchenEnabledModules.length > 1 && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-base">
              Kitchen Sharing
            </CardTitle>
            <CardDescription>
              These modules use kitchens:
              <strong> {kitchenEnabledModules.join(", ")}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex gap-3">
            <Button
              variant={
                kitchenSharing === "COMMON" ? "default" : "outline"
              }
              onClick={() => setKitchenSharing("COMMON")}
            >
              Shared Kitchen
            </Button>

            <Button
              variant={
                kitchenSharing === "SEPARATE" ? "default" : "outline"
              }
              onClick={() => setKitchenSharing("SEPARATE")}
            >
              Separate Kitchens
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ---------- Summary ---------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Configuration Summary
          </CardTitle>
          <CardDescription>
            This is the complete picture of what the user configured
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
            {JSON.stringify(summary, null, 2)}
          </pre>

          <Button onClick={logSummary}>
            Console.log Summary
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
