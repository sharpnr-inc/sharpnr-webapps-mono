import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { UserPlus } from "lucide-react";

function LeadsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={UserPlus}
      title="Leads"
      description="Prospects you have not qualified yet. Leads live here until they convert into a contact, a company and a deal — or are disqualified."
      capabilities={[
        "Capture from forms, campaigns, imports and manual entry",
        "Lead scoring and qualification criteria",
        "Assignment and routing rules",
        "Conversion into contact, company and deal in one step",
        "Source attribution back to the campaign that produced them",
      ]}
    />
  );
}

export default LeadsIndexPage;
