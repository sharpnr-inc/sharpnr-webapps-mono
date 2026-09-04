import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Database } from "lucide-react";

function PostgresIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Database}
      title="PostgreSQL"
      description="Managed PostgreSQL provisioned as a resource — you get a database and credentials, not a server to look after."
      capabilities={[
        "Provision a database in one call",
        "Organization-scoped roles with least-privilege grants",
        "Generated credentials and connection strings",
        "Connection pooling and read replicas",
        "Point-in-time recovery and automated maintenance",
      ]}
    />
  );
}

export default PostgresIndexPage;
