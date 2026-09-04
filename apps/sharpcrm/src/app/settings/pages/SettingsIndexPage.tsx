import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Settings } from "lucide-react";

function SettingsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Settings}
      title="Settings"
      description="How SharpCRM is configured for your organization — the records, the rules and who can see what."
      capabilities={[
        "Pipelines, stages and deal rules",
        "Custom fields and record layouts",
        "Teams, roles and record-level permissions",
        "Templates, branding and sending domains",
        "Data import, export and retention policy",
      ]}
    />
  );
}

export default SettingsIndexPage;
