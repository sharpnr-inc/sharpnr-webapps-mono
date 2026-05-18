import { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import { cn } from "@/lib/utils";
import { AlertCircle, Building2, CheckCircle2, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useHospitalityDomainModInfra } from "../api/queries";
import { useAppForm } from "@/components/forms";
import { useAddModulesInProperty } from "../api/mutation";
import { useQueryClient } from "@tanstack/react-query";
/* ---------- Types ---------- */

interface ModulesSelectionProps {
  propertyID: string;
  domain: string;
}

type InfrastructureItem = {
  infra_name: string;
  qty: number;
};

export function ModulesSelectionSection({
  domain,
  propertyID,
}: ModulesSelectionProps) {
  const q = useQueryClient();
  const navigate = useNavigate();
  const { data: domainData, isLoading } = useHospitalityDomainModInfra(domain);

  const modules = domainData?.data?.modules ?? [];
  const infrastructure = domainData?.data?.infrastructure ?? [];

  const addModules = useAddModulesInProperty();

  /* ---------- Form ---------- */

  const form = useAppForm({
    defaultValues: {
      property_id: "",
      domain: domain,
      modules: [] as string[],
      infrastructure: [] as InfrastructureItem[],
    },

    onSubmit: async ({ value }) => {
      addModules.mutateAsync(
        {
          payload: value,
          propertyID: value.property_id,
        },
        {
          onSuccess: () => {
            navigate({
              to: "/property/$propertyId/details",
              params: {
                propertyId: value.property_id,
              },
            });

            q.invalidateQueries({
              queryKey: ["launcher"],
            });
          },
        },
      );
    },
  });

  /* ---------- Sync propertyID ---------- */

  useEffect(() => {
    form.setFieldValue("property_id", propertyID);
  }, [propertyID]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="mx-auto space-y-12 pb-20">
        {/* ================= GUIDE ================= */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row gap-4 p-6">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <AlertCircle size={20} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">
                  Optimization Guide
                </CardTitle>
                <CardDescription className="max-w-3xl">
                  Infrastructure is designed for <strong>shared utility</strong>
                  . Select shared facilities once here.
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">
                View property configuration guide
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* ================= MODULES ================= */}

        <section className="space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white">
              <LayoutGrid size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Business Modules</h2>
              <p className="text-sm text-slate-500">
                Revenue-generating units.
              </p>
            </div>
          </div>

          <form.Field name="modules">
            {(field) => (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading ? (
                  <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl">
                    Loading modules…
                  </div>
                ) : (
                  modules.map((module: any) => {
                    const selected = field.state.value.includes(
                      module.ModuleName,
                    );

                    return (
                      <motion.div
                        key={module.ID}
                        whileHover={module.IsAvailable ? { y: -4 } : undefined}
                        onClick={() => {
                          if (!module.IsAvailable) return;

                          field.handleChange(
                            selected
                              ? field.state.value.filter(
                                  (m) => m !== module.ModuleName,
                                )
                              : [...field.state.value, module.ModuleName],
                          );
                        }}
                        className={cn(
                          "relative p-6 rounded-2xl border-2 transition-all min-h-[160px]",
                          selected
                            ? "border-blue-600"
                            : "border-slate-100 hover:border-slate-300",
                          !module.IsAvailable &&
                            "opacity-60 cursor-not-allowed grayscale",
                        )}
                      >
                        <div className="flex justify-between">
                          <span className="font-bold">{module.ModuleName}</span>
                          {selected && (
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
            )}
          </form.Field>
        </section>

        {/* ================= INFRASTRUCTURE ================= */}

        <section className="space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="p-2.5 bg-emerald-600 rounded-xl text-white">
              <Building2 size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Property Infrastructure</h2>
              <p className="text-sm text-slate-500">
                Shared physical facilities (max 3).
              </p>
            </div>
          </div>

          <form.Field name="infrastructure" mode="array">
            {(field) => (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {infrastructure.map((infra: any) => {
                  const index = field.state.value.findIndex(
                    (i) => i.infra_name === infra.ModuleName,
                  );

                  const selected = index !== -1;
                  const limitReached =
                    !selected && field.state.value.length >= 3;

                  const qty = selected ? field.state.value[index].qty : 0;

                  return (
                    <motion.div
                      key={infra.ID}
                      whileHover={
                        infra.IsAvailable && !limitReached
                          ? { y: -4 }
                          : undefined
                      }
                      onClick={() => {
                        if (!infra.IsAvailable || limitReached) return;

                        selected
                          ? field.removeValue(index)
                          : field.pushValue({
                              infra_name: infra.ModuleName,
                              qty: 1,
                            });
                      }}
                      className={cn(
                        "relative p-6 rounded-2xl border-2 transition-all min-h-[180px]",
                        selected
                          ? "border-emerald-600 "
                          : "border-slate-100 hover:border-slate-300",
                        (!infra.IsAvailable || limitReached) &&
                          "opacity-60 cursor-not-allowed grayscale",
                      )}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <span className="text-3xl">
                          {infra.ModuleName.toLowerCase().includes("kitchen")
                            ? "🍳"
                            : "🏗️"}
                        </span>

                        {selected && (
                          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="mt-4 space-y-1">
                        <h4 className="font-bold">{infra.ModuleName}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {infra.Description}
                        </p>
                      </div>

                      {/* QTY CONTROLS (ONLY WHEN SELECTED) */}
                      {selected && (
                        <div
                          className="mt-4 flex items-center justify-between bg-white/60 rounded-xl border px-3 py-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-xs text-gray-950">
                            Quantity
                          </span>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                if (qty <= 1) return;

                                const next = [...field.state.value];
                                next[index] = {
                                  ...next[index],
                                  qty: next[index].qty - 1,
                                };
                                field.setValue(next);
                              }}
                              className="h-7 w-7 rounded-md border text-sm font-bold"
                            >
                              −
                            </button>

                            <span className="min-w-[20px] text-center font-semibold">
                              {qty}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                const next = [...field.state.value];
                                next[index] = {
                                  ...next[index],
                                  qty: next[index].qty + 1,
                                };
                                field.setValue(next);
                              }}
                              className="h-7 w-7 rounded-md border text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}

                      {limitReached && (
                        <Badge
                          variant="secondary"
                          className="absolute top-4 right-4 text-[10px]"
                        >
                          Max 3 allowed
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </form.Field>
        </section>

        {/* ================= ACTION BAR ================= */}

        <Card className="bg-slate-900 border-none rounded-[2rem]">
          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between">
            <div>
              <h3 className="text-xl font-bold text-blue-100">
                Configuration Ready
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Review your selections before continuing.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-w-[280px]">
              <Button
                type="submit"
                size="lg"
                className="h-16 rounded-2xl text-lg"
              >
                Confirm Setup
              </Button>

              <p className="text-[10px] text-slate-500 text-center uppercase">
                Property ID: {propertyID}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </form>
  );
}
