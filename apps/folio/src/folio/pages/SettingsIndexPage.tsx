import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Settings } from "lucide-react";

function SettingsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Settings}
      title="Settings"
      description="How Folio is configured for your organization — sharing, retention and defaults."
      capabilities={[
        "Default sharing scope for new files",
        "External sharing rules and link expiry",
        "Version history retention",
        "Workspace creation permissions",
        "Storage location and quotas on Silo",
      ]}
    />
  );
}

export default SettingsIndexPage;
