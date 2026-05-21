import { PlusCircle, Building2 } from "lucide-react";
import { Button } from "@sharpnr/ui";

interface EmptyLegalEntityProps {
  onCreateClick?: () => void;
}

const steps = [
  {
    step: "Step 1",
    desc: "Add the entity with its legal name, type, and jurisdiction.",
  },
  {
    step: "Step 2",
    desc: "Attach tax IDs, registration numbers, and compliance details.",
  },
  {
    step: "Step 3",
    desc: "Assign employees, bank accounts, and branch locations.",
  },
];

export function EmptyLegalEntity({ onCreateClick }: EmptyLegalEntityProps) {
  return (
    <div className="flex flex-col items-center justify-center sm:py-24 px-4 sm:px-6 text-center">
      {/* Dashed icon box */}
      <div className="w-16 h-16 rounded-2xl border-2 border-dashed flex items-center justify-center mb-5">
        <Building2 className="w-7 h-7 text-muted-foreground" />
      </div>

      {/* Heading */}
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
        No Legal Entities Yet
      </h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground max-w-sm leading-6 mb-2">
        You haven't added any legal entities to your organization. Legal
        entities let you manage taxes, compliance, and business operations
        independently across separate units or regions.
      </p>
      <p className="text-sm text-muted-foreground max-w-sm leading-6 mb-8">
        Start with your primary company and expand from there — subsidiaries,
        branches, and regional offices can all be added at any time.
      </p>

      {/* CTA */}
      <Button onClick={onCreateClick} className="w-full sm:w-auto">
        <PlusCircle className="w-4 h-4" />
        Add Your First Legal Entity
      </Button>

      {/* Divider */}
      <div className="mt-4 w-full max-w-md border-t" />

      {/* Steps */}
      <div className="mt-8 w-full max-w-md grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-sm text-left sm:text-center">
        {steps.map(({ step, desc }) => (
          <div
            key={step}
            className="flex sm:flex-col gap-3 sm:gap-1.5 sm:items-center"
          >
            <span className="font-medium text-foreground shrink-0 w-14 sm:w-auto">
              {step}
            </span>
            <span className="text-xs text-muted-foreground leading-5">
              {desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
