import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { ScrollText } from "lucide-react";

function AuditLogsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ScrollText}
      title="Audit Logs"
      description="Every access event and administrative action on the platform: who reached which resource, what changed, and when."
      capabilities={[
        "Access and administrative event stream across all Sharpnr apps",
        "Filter by actor, resource, action and time range",
        "Permission and credential change history",
        "Exportable trails for compliance evidence",
        "Retention policy and tamper-evident storage",
      ]}
    />
  );
}

export default AuditLogsIndexPage;
