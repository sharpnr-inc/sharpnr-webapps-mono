import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Building2 } from "lucide-react";

function CompaniesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Building2}
      title="Companies"
      description="The organizations behind your contacts — the account record the rest of the suite hangs off."
      capabilities={[
        "Company profile with parent and subsidiary hierarchy",
        "Associated contacts, deals and activities",
        "Automatic association by email domain",
        "Owner and territory assignment",
        "Rolled-up pipeline and revenue per company",
      ]}
    />
  );
}

export default CompaniesIndexPage;
