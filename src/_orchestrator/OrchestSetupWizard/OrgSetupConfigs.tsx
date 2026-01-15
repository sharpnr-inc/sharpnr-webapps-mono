"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { OrchestratorHQSetup } from "@/_orchestrator/components/orchestratorConfigSteps/OrchestHQSetup";
import OrchestratorGeneralDetailsSetup from "@/_orchestrator/components/orchestratorConfigSteps/OrchestGenDetailsSetup";
import OrchestratorDomainSetup from "@/_orchestrator/components/orchestratorConfigSteps/OrchestDomainSetup";


/* ------------------------------------------------------
 * Step Configuration
 * ---------------------------------------------------- */
const STEPS = ["Org HQ", "Domain", "Org Legal Details", "Compliances", "Summary"];

/* ------------------------------------------------------
 * Main Page
 * ---------------------------------------------------- */
export function OrgSetupConfiguration() {
  const [step, setStep] = useState(1);

  const totalSteps = STEPS.length;
  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full rounded-2xl">
        {/* Header */}
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl">Organization Setup</CardTitle>
          <CardDescription>
            Configure your Orchestrator to unlock all features.
          </CardDescription>

          {/* Progress Timeline */}
          <ProgressTimeline
            steps={STEPS}
            currentStep={step}
            progressPercent={progressPercent}
          />

          <p className="text-xs text-muted-foreground">
            Step {step} of {totalSteps} · {STEPS[step - 1]}
          </p>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6">
          {step === 1 && <OrchestratorHQSetup />}
          {step === 2 && <OrchestratorDomainSetup />}
          {step === 3 && <OrchestratorGeneralDetailsSetup />}
          {step === 4 && <DomainStep />}
          {step === 5 && <ModulesStep />}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            {/* Back */}
            <Button
              variant="outline"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {/* Continue / Finish */}
            {step < totalSteps ? (
              <Button onClick={() => setStep(step + 1)}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button>Finish Setup</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------
 * Progress Timeline (Framer Motion)
 * ---------------------------------------------------- */
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

function DomainStep() {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Choose Business Domain</h3>
      <p className="text-sm text-muted-foreground">
        Select the primary domain your organization operates in.
      </p>

      <ul className="list-disc pl-5 text-sm">
        <li>Hospitality</li>
        <li>Medical</li>
        <li>Retail</li>
      </ul>
    </div>
  );
}

function ModulesStep() {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Select Modules</h3>
      <p className="text-sm text-muted-foreground">
        Choose the modules you want to enable for your domain.
      </p>

      <ul className="list-disc pl-5 text-sm">
        <li>Hotel</li>
        <li>Restaurant</li>
        <li>Bar</li>
      </ul>
    </div>
  );
}
