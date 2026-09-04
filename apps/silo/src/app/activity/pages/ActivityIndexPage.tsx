import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Activity } from "lucide-react";

function ActivityIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Activity}
      title="Activity"
      description="What is happening across your data right now: uploads, queries, ingests, provisioning, and every credential that was used."
      capabilities={[
        "Live event stream across storage, databases and the data platform",
        "Filter by service, resource, actor and time range",
        "Throughput, latency and error rates per service",
        "Long-running query and job visibility",
        "Drill-through from any event to the resource it touched",
      ]}
    />
  );
}

export default ActivityIndexPage;
