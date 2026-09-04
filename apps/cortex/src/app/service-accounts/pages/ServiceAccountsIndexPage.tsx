import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Bot } from "lucide-react";

function ServiceAccountsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Bot}
      title="Service Accounts"
      description="Identities for machine-to-machine access — the integrations and automations that act on the platform without a human behind them."
      capabilities={[
        "Service account identities with scoped roles",
        "Credential rotation without downtime",
        "Ownership assigned to a team, never a person who may leave",
        "Activity attribution per account",
        "Dormant-account detection and cleanup",
      ]}
    />
  );
}

export default ServiceAccountsIndexPage;
