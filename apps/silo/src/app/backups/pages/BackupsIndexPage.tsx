import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Archive } from "lucide-react";

function BackupsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Archive}
      title="Backups"
      description="Copies of your data that exist somewhere else — and, more importantly, restores you have actually tested."
      capabilities={[
        "Scheduled backups for databases and buckets",
        "Point-in-time recovery windows",
        "Cross-region replication",
        "Restore to a new resource without overwriting the original",
        "Restore testing with verification reports",
      ]}
    />
  );
}

export default BackupsIndexPage;
