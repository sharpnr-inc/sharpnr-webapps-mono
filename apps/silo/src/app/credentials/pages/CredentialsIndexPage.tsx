import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { KeyRound } from "lucide-react";

function CredentialsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={KeyRound}
      title="Credentials"
      description="The keys and connection details that let applications reach your data — issued, scoped and revocable."
      capabilities={[
        "Access keys scoped to a bucket, database or dataset",
        "Database connection strings with generated roles",
        "Expiry and rotation without downtime",
        "Last-used visibility per credential",
        "Immediate revocation with propagation",
      ]}
    />
  );
}

export default CredentialsIndexPage;
