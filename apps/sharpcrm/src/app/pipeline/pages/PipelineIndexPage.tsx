import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Funnel } from "lucide-react";

function PipelineIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Funnel}
      title="Pipeline"
      description="Every deal in flight — what stage it is at, what it is worth, and what has to happen next. Board and table are two views of the same records."
      capabilities={[
        "Board and table views with a single switch",
        "Multiple pipelines with their own stages",
        "Drag to advance, with rules on what a stage requires",
        "Weighted value, deal age and time-in-stage",
        "Win and loss reasons captured on close",
      ]}
    />
  );
}

export default PipelineIndexPage;
