import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { ScrollText } from "lucide-react";

function AuditLogIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ScrollText}
      title="Audit Log"
      description="The durable record of everything that touched your data: uploads, downloads, deletions, provisioning and permission changes."
      capabilities={[
        "Append-oriented event log with actor and resource",
        "File, database, lake and dataset events in one place",
        "Filter and export for compliance evidence",
        "Retention policy independent of the data it describes",
        "Sensitive payloads deliberately excluded",
      ]}
    />
  );
}

export default AuditLogIndexPage;
