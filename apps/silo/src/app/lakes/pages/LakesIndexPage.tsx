import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Waves } from "lucide-react";

function LakesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Waves}
      title="Data Lakes"
      description="Raw and semi-structured data kept in open formats, on the same storage as your objects — queryable without being copied first."
      capabilities={[
        "Lakes organized by zone: raw, refined, curated",
        "Open formats, Parquet first",
        "Schema-on-read with catalogued metadata",
        "Partitioning and compaction",
        "Retention and lifecycle policy per zone",
      ]}
    />
  );
}

export default LakesIndexPage;
