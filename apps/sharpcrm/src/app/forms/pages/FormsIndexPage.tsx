import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { ClipboardList } from "lucide-react";

function FormsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ClipboardList}
      title="Forms"
      description="Forms that capture leads straight into the CRM, embedded on your site or hosted here."
      capabilities={[
        "Drag-and-drop form builder",
        "Embeddable and hosted forms",
        "Field mapping onto lead and contact records",
        "Lead scoring applied on submission",
        "Spam protection and submission notifications",
      ]}
    />
  );
}

export default FormsIndexPage;
