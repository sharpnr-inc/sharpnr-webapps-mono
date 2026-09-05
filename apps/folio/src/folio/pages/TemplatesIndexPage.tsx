import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { LayoutTemplate } from "lucide-react";

function TemplatesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={LayoutTemplate}
      title="Templates"
      description="Starting points for the documents your organization writes over and over."
      capabilities={[
        "Organization template library",
        "Templates for documents, sheets, slides and boards",
        "Shared per workspace or org-wide",
        "Branded defaults applied on creation",
        "Create a template from any existing file",
      ]}
    />
  );
}

export default TemplatesIndexPage;
