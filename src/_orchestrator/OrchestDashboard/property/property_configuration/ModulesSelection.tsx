import { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useHospitalityDomainModInfra } from "../api/queries";

/* ---------- Types ---------- */

interface ModulesSelectionProps {
  propertyID: string;
  domain: string;
}

export function ModulesSelectionSection({
  domain,
  propertyID,
}: ModulesSelectionProps) {
  const { data: domainData, isLoading } =
    useHospitalityDomainModInfra(domain);

  const navigate = useNavigate();

  /* ---------- Extract API Data ---------- */
  const modules = domainData?.data?.modules ?? [];
  const infrastructure = domainData?.data?.infrastructure ?? [];

  /* ---------- Selection State ---------- */
  const [selections, setSelections] = useState<{
    modules: string[];
    infra: string[];
  }>({
    modules: [],
    infra: [],
  });

  /* ---------- Handlers ---------- */

  const toggleModule = (id: string, isAvailable: boolean) => {
    if (!isAvailable) return;

    setSelections((prev) => ({
      ...prev,
      modules: prev.modules.includes(id)
        ? prev.modules.filter((m) => m !== id)
        : [...prev.modules, id],
    }));
  };

  const toggleInfra = (id: string, isAvailable: boolean) => {
    if (!isAvailable) return;

    setSelections((prev) => ({
      ...prev,
      infra: prev.infra.includes(id)
        ? prev.infra.filter((i) => i !== id)
        : [...prev.infra, id],
    }));
  };

  const handleNav = () => {
    navigate({
      to: "/orchestrator/property/$propertyId/details",
      params: {
        propertyId: propertyID,
      },
    });
  };

  /* ---------- UI ---------- */

  return (
    <div className="mx-auto space-y-12 pb-20">
      {/* =====================================================
          GUIDANCE
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
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
                Infrastructure is designed for{" "}
                <strong>shared utility</strong>. Select shared facilities once
                here and assign them to modules during advanced setup.
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

      {/* =====================================================
          BUSINESS MODULES
      ===================================================== */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="p-2.5 bg-blue-600 rounded-xl">
            <LayoutGrid size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Business Modules</h2>
            <p className="text-sm text-slate-500">
              Revenue-generating units within this property.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl">
              Loading modules…
            </div>
          ) : (
            modules.map((module: any) => {
              const isSelected = selections.modules.includes(module.ID);

              return (
                <motion.div
                  key={module.ID}
                  whileHover={
                    module.IsAvailable ? { y: -4 } : undefined
                  }
                  onClick={() =>
                    toggleModule(module.ID, module.IsAvailable)
                  }
                  className={cn(
                    "p-6 rounded-2xl border-2 transition-all cursor-pointer min-h-[160px] flex flex-col justify-between",
                    isSelected
                      ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-600/5"
                      : "border-slate-100 hover:border-slate-200",
                    !module.IsAvailable &&
                      "opacity-60 cursor-not-allowed grayscale-[0.4]"
                  )}
                >
                  <div className="flex justify-between">
                    <span className="font-bold">
                      {module.ModuleName}
                    </span>
                    <CheckCircle2
                      className={cn(
                        "h-6 w-6",
                        isSelected
                          ? "text-blue-600"
                          : ""
                      )}
                    />
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
      </section>

      {/* =====================================================
          INFRASTRUCTURE
      ===================================================== */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="p-2.5 bg-emerald-600 rounded-xl text-white">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Property Infrastructure</h2>
            <p className="text-sm text-slate-500">
              Shared physical facilities.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {infrastructure.map((infra: any) => {
            const isSelected = selections.infra.includes(infra.ID);

            return (
              <motion.div
                key={infra.ID}
                whileHover={
                  infra.IsAvailable ? { y: -4 } : undefined
                }
                onClick={() =>
                  toggleInfra(infra.ID, infra.IsAvailable)
                }
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all min-h-[160px] flex flex-col justify-between",
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/30 ring-4 ring-emerald-600/5"
                    : "border-slate-100",
                  !infra.IsAvailable &&
                    "opacity-60 cursor-not-allowed grayscale-[0.4]"
                )}
              >
                <div className="flex justify-between">
                  <span className="text-3xl">
                    {infra.ModuleName.toLowerCase().includes("kitchen")
                      ? "🍳"
                      : "🏗️"}
                  </span>

                  {isSelected && (
                    <Badge className="bg-emerald-600 border-none">
                      ACTIVE
                    </Badge>
                  )}
                </div>

                <div>
                  <h4 className="font-bold">
                    {infra.ModuleName}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {infra.Description}
                  </p>
                </div>

                {!infra.IsAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <Badge variant="secondary">Coming Soon</Badge>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          FINAL ACTION BAR
      ===================================================== */}
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
              size="lg"
              className="h-16 rounded-2xl text-lg"
              disabled={selections.modules.length === 0}
              onClick={handleNav}
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
  );
}
