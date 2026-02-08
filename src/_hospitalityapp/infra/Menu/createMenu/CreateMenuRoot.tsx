import React, { useEffect, useState } from "react";
import CreateMenuContext from "./create-menu.context";
import { dummyMenuData } from "@/lib/create_menu";
import type { MenuInterface } from "@/lib/create_menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

interface CreateMenuRootProps {
  children: React.ReactNode;
  DummyData?: MenuInterface;
}

const CreateMenuRoot: React.FC<CreateMenuRootProps> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const steps = React.Children.toArray(children);

  // Sync: Step -> Carousel
  useEffect(() => {
    if (api) {
      api.scrollTo(step);
    }
  }, [step, api]);

  // Sync: Carousel swipe -> Step
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setStep(api.selectedScrollSnap());
    });
  }, [api]);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) setStep(index);
  };

  return (
    <CreateMenuContext.Provider
      value={{
        dummyMenuData,
        nextStep,
        prevStep,
        goToStep,
        step,
      }}
    >
      <Carousel setApi={setApi} className="w-full" opts={{ watchDrag: false }}>
        <CarouselContent>
          {steps.map((child, i) => (
            <CarouselItem key={i}>{child}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </CreateMenuContext.Provider>
  );
};

export default CreateMenuRoot;
