import type { LegalEntityTaxRegistrationResponseDto } from "../../api/types";

interface LegalEntityTaxRegistrationsTabProps {
  legalEntityID: string;
  data: LegalEntityTaxRegistrationResponseDto[] | undefined;
}

export function LegalEntityTaxRegistrationsTab({
  legalEntityID,
  data,
}: LegalEntityTaxRegistrationsTabProps) {
  return (
    <div className="w-full text-zinc-900 dark:text-zinc-50">
      {legalEntityID}
    </div>
  );
}
