import type { LegalEntityTaxRegistrationResponseDto } from "../api/types";

interface LegalEntityTaxRegistrationsTabProps {
  data: LegalEntityTaxRegistrationResponseDto[] | undefined;
}

export function LegalEntityTaxRegistrationsTab({
  data,
}: LegalEntityTaxRegistrationsTabProps) {
  return (
    <div className="w-full text-zinc-900 dark:text-zinc-50">
      {/* Content goes here */}
    </div>
  );
}
