import TaxCode from "@/_accountingapp/components/Taxation/TaxCode/TaxCode";

/**
 * TaxCodesPage
 * High-contrast, monochromatic UI for managing Tax Categories and Accounting Mappings.
 * Uses Tailwind CSS for styling.
 */
export function TaxCodesPage() {
  return (
    <TaxCode>
      <div className="flex gap-5">
        <div className=" p-2">
          <TaxCode.Codes />
        </div>
        <div className=" w-full p-2">
          <TaxCode.CodesDetails />
        </div>
      </div>
    </TaxCode>
  );
}
