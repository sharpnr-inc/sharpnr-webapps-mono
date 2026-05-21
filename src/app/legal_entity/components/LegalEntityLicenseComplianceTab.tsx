import type { LegalEntityComplianceResponseDto } from "../api/types";

interface LegalEntityLicenseComplianceTabProps {
  data: LegalEntityComplianceResponseDto[] | undefined;
}

export function LegalEntityLicenseComplianceTab({
  data,
}: LegalEntityLicenseComplianceTabProps) {
  return (
    <div className="w-full text-zinc-900 dark:text-zinc-50">
      {/* Content goes here */}
    </div>
  );
}
