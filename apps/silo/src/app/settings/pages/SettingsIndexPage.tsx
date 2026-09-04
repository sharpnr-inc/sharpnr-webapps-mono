import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Settings } from "lucide-react";

function SettingsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Settings}
      title="Settings"
      description="How Silo is configured for your organization — regions, defaults, retention, and who administers it."
      capabilities={[
        "Default region and storage class",
        "Encryption keys and rotation policy",
        "Retention and lifecycle defaults",
        "Administrator assignment and delegation",
        "Notification routing for capacity and failure events",
      ]}
    />
  );
}

export default SettingsIndexPage;
