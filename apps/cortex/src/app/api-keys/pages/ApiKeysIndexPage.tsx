import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { KeyRound } from "lucide-react";

function ApiKeysIndexPage() {
  return (
    <FeaturePlaceholder
      icon={KeyRound}
      title="API Keys"
      description="Credentials for programmatic access to the platform, issued and revoked centrally so IT always knows what keys exist and what they can reach."
      capabilities={[
        "Key issuance scoped to specific resources",
        "Expiry, rotation and immediate revocation",
        "Last-used and call-volume visibility per key",
        "Environment separation between test and live keys",
        "Issuance and revocation recorded in audit logs",
      ]}
    />
  );
}

export default ApiKeysIndexPage;
