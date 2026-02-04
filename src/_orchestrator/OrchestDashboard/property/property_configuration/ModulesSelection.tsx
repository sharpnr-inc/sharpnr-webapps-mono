import { useState } from "react";
import { useSectorsModules } from "@/apis/Queries";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createId } from "@/utilities/id";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

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

interface HospitalityPropertyInfra {
  id: string;
  name: string;
  description: string;
  available: boolean;
}

/* ---------- Dummy Data for Infra ---------- */

const propertyInfra: HospitalityPropertyInfra[] = [
  {
    id: createId(),
    name: "Main Production Kitchen",
    description:
      "Primary hot and cold food preparation area serving all dining outlets.",
    available: true,
  },
  {
    id: createId(),
    name: "Central Beverage Cellar",
    description:
      "Climate-controlled storage for wine, spirits, and draught kegs.",
    available: true,
  },
  {
    id: createId(),
    name: "Pastry & Bakery Station",
    description: "Dedicated space for dessert prep and bread baking.",
    available: false,
  },
  {
    id: createId(),
    name: "Loading Dock & Receiving",
    description: "Shared infrastructure for all incoming inventory.",
    available: true,
  },
  {
    id: createId(),
    name: "Rooftop Event Space",
    description: "Open air infrastructure for seasonal bar operations.",
    available: false,
  },
];

/* ---------- Main Component ---------- */

export function ModulesSelectionSection({
  domain,
  propertyID,
}: ModulesSelectionProps) {
  const { data, isLoading } = useSectorsModules(domain.toLowerCase());
  const submodules: SubModule[] = data?.data?.submodules ?? [];

  const n = useNavigate();
  // Track state for both categories
  const [selections, setSelections] = useState<{
    modules: string[];
    infra: string[];
  }>({
    modules: [],
    infra: [],
  });

  const toggleModule = (id: string) => {
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
    n({
      to: "/orchestrator/property/$propertyId/details",
      params: {
        propertyId: propertyID,
      },
    });
  };

  return (
    <div className=" mx-auto space-y-12 pb-20">
      {/* --- GUIDANCE SECTION --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-blue-100 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6">
            <div className="bg-blue-600 p-2 rounded-lg shadow-md">
              <AlertCircle size={20} />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold ">
                Optimization Guide
              </CardTitle>
              <CardDescription className=" leading-relaxed max-w-3xl">
                Infrastructure is designed for <strong>shared utility</strong>.
                If your units (e.g., Bar and Hotel) utilize a common facility
                like a <strong>Main Kitchen</strong>, select it once here. You
                can assign dedicated or private infrastructure to specific
                modules during advanced setup.
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter>
            <Button variant={"outline"}>
              you can check out the our detail guide to property configuration
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* --- 1. BUSINESS MODULES (FULL WIDTH GRID) --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-blue-200 shadow-lg">
            <LayoutGrid size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Business Modules</h2>
            <p className="text-sm text-slate-500">
              Revenue-generating units operating within this property.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl text-slate-400">
              Loading available modules...
            </div>
          ) : (
            submodules.map((module) => {
              const isSelected = selections.modules.includes(module.id);
              return (
                <motion.div
                  key={module.id}
                  whileHover={{ y: -4 }}
                  onClick={() => toggleModule(module.id)}
                  className={cn(
                    "relative p-6 cursor-pointer rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[140px]",
                    isSelected
                      ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-600/5 shadow-md"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 tracking-tight">
                      {module.module_name}
                    </span>
                    <CheckCircle2
                      className={cn(
                        "h-6 w-6 transition-all",
                        isSelected
                          ? "text-blue-600 scale-110"
                          : "text-slate-100",
                      )}
                    />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mt-4">
                    {module.description}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* --- 2. PROPERTY INFRASTRUCTURE (FULL WIDTH GRID) --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
          <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-emerald-200 shadow-lg">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Property Infrastructure</h2>
            <p className="text-sm text-slate-500">
              Shared physical service points and facilities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {propertyInfra.map((infra) => {
            const isSelected = selections.infra.includes(infra.id);
            return (
              <motion.div
                key={infra.id}
                whileHover={infra.available ? { y: -4 } : {}}
                onClick={() => toggleInfra(infra.id, infra.available)}
                className={cn(
                  "relative overflow-hidden p-6 rounded-2xl border-2 transition-all cursor-pointer min-h-[140px] flex flex-col justify-between",
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/30 shadow-md ring-4 ring-emerald-600/5"
                    : "bg-white border-slate-100",
                  !infra.available &&
                    "opacity-60 cursor-not-allowed grayscale-[0.5]",
                )}
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl">
                    {infra.name.includes("Kitchen") ? "🍳" : "🧱"}
                  </span>
                  {isSelected && (
                    <Badge className="bg-emerald-600 border-none px-3">
                      ACTIVE
                    </Badge>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{infra.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {infra.description}
                  </p>
                </div>

                {!infra.available && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                    <Badge
                      variant="secondary"
                      className="font-black text-[10px] tracking-widest shadow-sm border-slate-200 uppercase"
                    >
                      Coming Soon
                    </Badge>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Background set to transparent and border/shadow simplified */}
        <Card className="bg-transparent shadow-none overflow-hidden">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6">
          
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold">
                Access All Infrastructure via Our Mobile App
              </CardTitle>
              <CardDescription className="leading-relaxed max-w-3xl ">
                Manage your Property, Bar, and Kitchen modules from anywhere.
              </CardDescription>

              {/* Official Store Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                {/* Play Store */}
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 px-4"
                >
                  <svg viewBox="0 0 512 512" width="20" height="20">
                    <path fill="#4285F4" d="M103 44L284 225 103 406z" />
                    <path
                      fill="#34A853"
                      d="M380 321L284 225 103 44c-3-2-7-3-11-2l217 217z"
                    />
                    <path
                      fill="#FBBC04"
                      d="M380 125L284 225l96 96c4-3 7-8 7-14V139c0-6-3-11-7-14z"
                    />
                    <path
                      fill="#EA4335"
                      d="M103 406c4 1 8 0 11-2l266-151-96-96z"
                    />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase">Get it on</span>
                    <span className="text-sm font-semibold">Google Play</span>
                  </div>
                </Button>

                {/* App Store */}
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 px-4"
                >
                  <svg viewBox="0 0 384 512" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-22.1-82.6-21.5-41.6.8-79.8 24.3-101.3 61.5-43.5 75.2-11.1 186.4 30.9 247.2 20.5 29.8 44.8 63.3 76.8 62.1 30.4-1.2 41.8-19.8 78.6-19.8 36.8 0 47.3 19.8 79.2 19.2 32.5-.5 53.3-30.3 73.1-59.2 22.8-33.3 32.2-65.6 32.6-67.3-.8-.3-62.7-24.1-63.1-98.4zm-63.1-192.3c15.2-18.4 25.5-44 22.7-69.4-21.9 1.1-48.4 14.8-64.1 33.1-14.1 16.2-26.4 42.6-23.1 67.2 24.5 1.9 48.4-12.8 64.5-30.9z"
                    />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase">
                      Download on the
                    </span>
                    <span className="text-sm font-semibold">App Store</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardHeader>

        
        </Card>
      </motion.div>

      {/* --- 3. FINAL SUMMARY (HORIZONTAL ACTION BAR) --- */}
      <Card className="bg-slate-900 border-none shadow-2xl rounded-[2rem] overflow-hidden ">
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="space-y-4 text-center md:text-left flex-1">
            <h3 className="text-xl font-bold text-blue-100">
              Configuration Ready
            </h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-black block leading-none mb-1">
                  Modules
                </span>
                <span className="font-mono text-blue-400">
                  {selections.modules.length} Selected
                </span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-black block leading-none mb-1">
                  Infra
                </span>
                <span className="font-mono text-emerald-400">
                  {selections.infra.length} Linked
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-4 min-w-[280px]">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-lg h-16 rounded-2xl shadow-xl shadow-blue-900/40 transition-all active:scale-95 disabled:opacity-50"
              disabled={selections.modules.length === 0}
              onClick={() => handleNav()}
            >
              Confirm Setup
            </Button>
            <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
              Property ID: {propertyID}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
