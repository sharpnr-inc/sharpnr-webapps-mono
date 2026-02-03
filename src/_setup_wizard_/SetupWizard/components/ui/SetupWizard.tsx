// TODO This component needs to Fix the
// * This components needs a rework
// FIXME this component need fixing this is still using the old 
// 

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type React from "react";
import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";

const STEP_ROUTES = {
  VERIFY_EMAIL: "verify-email",
  ADD_ORGANIZATION_DETAILS: "org-hq",
  ADD_PROPERTIES: "property",
  ADD_BILLING: "domain",
  ADD_USERS: "module-config",
} as const;

const STEPS = ["Org HQ", "Property", "Legal-Entity", "Summary"];

type StepStatus = {
  step_id: string;
  status: "IN_PROGRESS" | "COMPLETED";
  current_step: keyof typeof STEP_ROUTES;
  completed_steps: string[];
  total_steps: number;
  completed_count: number;
};

type WizardContextType = {
  status: StepStatus;
  goToNext: () => void;
  goToPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const WizardContext = createContext<WizardContextType | null>(null);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within SetupWizard");
  }
  return context;
};

export function SetupWizardLayout({
  status,
  children,
}: {
  status: any;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { step } = useParams({ strict: false });

  const steps = Object.values(STEP_ROUTES);
  const currentStepIndex = step ? steps.indexOf(step as any) : -1;

  const goToNext = async () => {
    if (currentStepIndex < steps.length - 1) {
      navigate({
        to: "/orchestrator/setup-wizard/step",
        params: { step: steps[currentStepIndex + 1] },
      });
    } else {
      // Complete wizard
      await fetch("/api/setup-wizard/complete", { method: "POST" });
      navigate({ to: "/dashboard" });
    }
  };

  const goToPrevious = () => {
    if (currentStepIndex > 0) {
      navigate({
        to: "/orchestrator/setup-wizard/step",
        params: { step: steps[currentStepIndex - 1] },
      });
    }
  };

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progressPercent = (currentStepIndex / (steps.length - 1)) * 100;

  return (
    <WizardContext.Provider
      value={{
        status,
        goToNext,
        goToPrevious,
        isFirstStep,
        isLastStep,
      }}
    >
      <SetupWizard>
        <SetupWizardHeader
          progressPercent={progressPercent}
          currentStep={currentStepIndex + 1}
        />
        <SetupWizardContent>{children}</SetupWizardContent>
      </SetupWizard>
    </WizardContext.Provider>
  );
}


function SetupWizard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function SetupWizardHeader({
  progressPercent,
  currentStep,
}: {
  progressPercent: number;
  currentStep: number;
}) {
  return (
    <CardHeader className="space-y-2 p-4">
      <CardTitle className="text-xl">Organization Setup</CardTitle>
      <CardDescription>
        Configure your Orchestrator to unlock all features.
      </CardDescription>

      {/* Progress Timeline */}
      <ProgressTimeline
        steps={STEPS}
        currentStep={currentStep}
        progressPercent={progressPercent}
      />

      <p className="text-xs text-muted-foreground">
        Step {currentStep} of {STEPS.length} · {STEPS[currentStep - 1]}
      </p>
    </CardHeader>
  );
}

function SetupWizardContent({ children }: { children: React.ReactNode }) {
  return <CardContent className="space-y-4">{children}</CardContent>;
}

function ProgressTimeline({
  steps,
  currentStep,
  progressPercent,
}: {
  steps: string[];
  currentStep: number;
  progressPercent: number;
}) {
  return (
    <div className="relative mt-2">
      {/* Background line */}
      <div className="absolute top-4 left-0 right-0 h-1 bg-muted rounded-full" />

      {/* Animated progress line */}
      <motion.div
        className="absolute top-4 left-0 h-1 bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={label} className="flex flex-col items-center">
              <div
                className={[
                  "z-10 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium",
                  isCompleted &&
                    "bg-primary text-primary-foreground border-primary",
                  isActive && "border-primary bg-background",
                  !isCompleted &&
                    !isActive &&
                    "bg-background text-muted-foreground",
                ].join(" ")}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
              </div>

              <span className="mt-2 text-xs text-muted-foreground text-center">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
