import React, { useEffect, useState } from "react";
import CreateMenuContext from "./create-menu.context";
import { useModulesMenu } from "../../infra/apis/api.Queries";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@sharpnr/ui";

interface CreateMenuRootProps {
  children: React.ReactNode;
  ownersID: string;
  ownersType: string;
  propertyID: string | undefined;
  owners_legal_entity_ID: string | null | undefined;
}

const CreateMenuRoot: React.FC<CreateMenuRootProps> = ({
  children,
  ownersID,
  ownersType,
  propertyID,
  owners_legal_entity_ID,
}) => {
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

  const {
    data: Menus,
    isLoading: isMenuLoading,
    isSuccess: isMenuLoaded,
  } = useModulesMenu(ownersID);

  return (
    <CreateMenuContext.Provider
      value={{
        Menus: Menus?.data,
        isMenuLoading,
        isMenuLoaded,
        nextStep,
        prevStep,
        goToStep,
        step,
        ownersID,
        ownersType,
        propertyID,
        owners_legal_entity_ID: owners_legal_entity_ID,
      }}
    >
      <Carousel setApi={setApi} className="" opts={{ watchDrag: false }}>
        <CarouselContent className="">
          {steps.map((child, i) => (
            <CarouselItem key={i}>{child}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </CreateMenuContext.Provider>
  );
};

export default CreateMenuRoot;
