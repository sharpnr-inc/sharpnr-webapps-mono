import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Settings } from "lucide-react";

function SettingsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Settings}
      title="Settings"
      description="How Cortex itself is configured for your organization — administrators, defaults, and the boundaries of the control plane."
      capabilities={[
        "Administrator assignment and delegation",
        "Default roles and access expiry policy",
        "Authentication and session requirements",
        "Notification routing for access and security events",
        "Multi-organization administration scope",
      ]}
    />
  );
}

export default SettingsIndexPage;
