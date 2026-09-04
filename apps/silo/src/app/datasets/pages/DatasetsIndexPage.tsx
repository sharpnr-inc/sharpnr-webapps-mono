import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Layers } from "lucide-react";

function DatasetsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Layers}
      title="Datasets"
      description="The catalogue of what data exists, what shape it is in, and who owns it — so data is findable rather than folklore."
      capabilities={[
        "Dataset registry across lakes and warehouses",
        "Schema and column-level metadata",
        "Ownership, description and tagging",
        "Version and freshness tracking",
        "Lineage from source through every transformation",
      ]}
    />
  );
}

export default DatasetsIndexPage;
