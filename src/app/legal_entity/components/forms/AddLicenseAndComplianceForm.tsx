interface AddLicenseAndComplianceFormProps {
  legalEntityID: string;
  closeModal: () => void;
}

export function AddLicenseAndComplianceForm({
  closeModal,
  legalEntityID,
}: AddLicenseAndComplianceFormProps) {
  return <div>{legalEntityID}</div>;
}
