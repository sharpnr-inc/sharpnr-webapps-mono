import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Workflow } from "lucide-react";

function PipelinesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Workflow}
      title="Pipelines"
      description="How data gets in and moves along: ingestion, transformation and the schedules that keep it current."
      capabilities={[
        "Batch and streaming ingestion",
        "ETL and ELT transformations",
        "Scheduling with dependency ordering",
        "Retry, backfill and failure alerting",
        "Run history with row counts and durations",
      ]}
    />
  );
}

export default PipelinesIndexPage;
