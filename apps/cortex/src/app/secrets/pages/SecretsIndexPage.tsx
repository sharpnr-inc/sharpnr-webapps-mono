import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Lock } from "lucide-react";

function SecretsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Lock}
      title="Secrets"
      description="One governed place for sensitive values, instead of secrets scattered across apps, scripts and configuration files."
      capabilities={[
        "Encrypted secret storage with versioning",
        "Access scoped by role and by consuming service",
        "Rotation schedules and expiry reminders",
        "Read access recorded in the audit trail",
        "Injection into services without exposing the value",
      ]}
    />
  );
}

export default SecretsIndexPage;
