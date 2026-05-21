interface LegalEntityTaxCategoriesTabProps {
  legalEntityID: string;
  data: any;
}

export function LegalEntityTaxCategoriesTab({
  legalEntityID,
  data,
}: LegalEntityTaxCategoriesTabProps) {
  return (
    <div className="w-full text-zinc-900 dark:text-zinc-50">
      {legalEntityID}
    </div>
  );
}
