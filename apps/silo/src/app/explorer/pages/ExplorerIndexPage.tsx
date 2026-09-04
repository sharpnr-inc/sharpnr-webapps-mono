import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Table2 } from "lucide-react";

function ExplorerIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Table2}
      title="Explorer"
      description="A read-oriented window into your databases: schemas, tables, indexes and rows, without handing out a superuser password."
      capabilities={[
        "Browse schemas, tables, views and functions",
        "Inspect columns, constraints and indexes",
        "Run scoped read queries with result limits",
        "Row preview with sensitive-column masking",
        "Every query attributed in the audit log",
      ]}
    />
  );
}

export default ExplorerIndexPage;
