import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property-configuration";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ModulesSelectionSection } from "./ModulesSelection";

const HOSPITALITY_SLIDES = [
  {
    title: "Kitchen Management",
    description:
      "Manage recipes, inventory, and back-of-house operations seamlessly.",
    icon: "🍳",
  },
  {
    title: "Bar & Beverage",
    description:
      "Track liquor stock, cocktail menus, and pour costs in real-time.",
    icon: "🍸",
  },
  {
    title: "Property Orchestration",
    description:
      "Connect all your outlets under one unified hospitality dashboard.",
    icon: "🏨",
  },
];

export function PropertyConfigurationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { propertyId } = Route.useParams();
  const searchParams = useSearch({
    from: "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property-configuration",
  });

  useEffect(() => {
    const hasSkipped = localStorage.getItem("hideHospitalityWelcome");
    if (!hasSkipped) setIsVisible(true);
  }, []);

  const handleSkip = () => {
    localStorage.setItem("hideHospitalityWelcome", "true");
    setIsVisible(false);
  };

  return (
    <div className="space-y-6 p-2 mx-auto">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="onboarding-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
            className="space-y-6 overflow-hidden"
          >
            {/* --- CARD 1: WELCOME CAROUSEL --- */}
            <Card className="">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary-foreground/80 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                    Welcome Guide
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  Welcome to Sharpnr's Hospitality
                </CardTitle>
                <CardDescription className="text-slate-400">
                  A quick overview of what's possible in this domain.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-14">
                <Carousel className="w-full">
                  <CarouselContent>
                    {HOSPITALITY_SLIDES.map((slide, index) => (
                      <CarouselItem key={index}>
                        <div className="p-8 flex flex-col items-center text-center space-y-4 bg-white/5 border border-white/10 rounded-xl shadow-inner">
                          <span className="text-5xl mb-2">{slide.icon}</span>
                          <h3 className="font-bold text-xl text-blue-100">
                            {slide.title}
                          </h3>
                          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                            {slide.description}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
                  <CarouselNext className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
                </Carousel>
              </CardContent>

              <CardFooter className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                <p className="text-[11px] text-slate-400 italic">
                  Tip: These modules can be toggled individually below.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Skip
                </Button>
              </CardFooter>
            </Card>

            {/* --- CARD 2: DOMAIN INSIGHT --- */}
            <Card className="">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary-foreground/80 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    System Architecture
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <CardTitle className="text-2xl font-light">
                  Understanding{" "}
                  <span className="font-bold text-white">
                    Property Configuration
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-6 md:grid-cols-2 pt-4">
                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                      💼
                    </div>
                    <h4 className="font-bold text-blue-100">
                      Business Modules
                    </h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Revenue-generating units like your{" "}
                    <strong>Hotel, Bar, or Restaurant</strong>. Each can operate
                    as a distinct legal entity with specific settings.
                  </p>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                      🏗️
                    </div>
                    <h4 className="font-bold text-emerald-100">
                      Shared Infrastructure
                    </h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Service points like your <strong>Kitchen</strong>. One
                    property can house separate businesses that all utilize the
                    same shared infra.
                  </p>
                </div>
              </CardContent>

              <CardFooter className="bg-white/5 border-t border-white/10 py-3 px-6 flex justify-between items-center">
                <p className="text-[11px] text-slate-400">
                  Connect business units to physical service points in the next
                  step.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                  onClick={handleSkip}
                >
                  Dismiss All
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <ModulesSelectionSection
        domain={searchParams.p_domain}
        propertyID={propertyId}
      />
    </div>
  );
}
