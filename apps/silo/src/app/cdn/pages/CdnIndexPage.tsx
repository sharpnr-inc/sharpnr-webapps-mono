import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Globe } from "lucide-react";

function CdnIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Globe}
      title="CDN"
      description="Delivery for the objects you want served fast and publicly, without moving them out of Silo."
      capabilities={[
        "Edge caching for public objects",
        "Custom domains with managed certificates",
        "Signed URLs for time-limited private delivery",
        "Cache invalidation by path or prefix",
        "Bandwidth, hit-rate and origin-load metrics",
      ]}
    />
  );
}

export default CdnIndexPage;
