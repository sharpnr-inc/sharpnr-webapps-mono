import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Database } from "lucide-react";

function DatabasesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Database}
      title="Databases"
      description="Access to the Silo databases behind your applications, granted at Read, Write or Admin — scoped precisely rather than all-or-nothing."
      capabilities={[
        "Read, Write and Admin grants per database",
        "Analyst read access to operational data",
        "Application write access scoped to its own stores",
        "Schema and settings administration rights",
        "Grant history and expiry surfaced in audit logs",
      ]}
    />
  );
}

export default DatabasesIndexPage;
