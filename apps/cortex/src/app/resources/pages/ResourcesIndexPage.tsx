import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Boxes } from "lucide-react";

function ResourcesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Boxes}
      title="Resources"
      description="Every organizational resource on the platform — databases, storage, APIs, services — and the permissions attached to each."
      capabilities={[
        "Inventory of resources across the platform",
        "Per-resource permission sets managed centrally",
        "Ownership and responsible team per resource",
        "Effective-access view: who can reach this, and how",
        "Tagging by environment and sensitivity",
      ]}
    />
  );
}

export default ResourcesIndexPage;
