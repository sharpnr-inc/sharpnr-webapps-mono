import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Gauge } from "lucide-react";

function UsageIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Gauge}
      title="Usage & Quotas"
      description="What you are consuming and what you are allowed to consume, per organization and per team."
      capabilities={[
        "Storage, transfer and compute consumption",
        "Quotas per organization, team and user",
        "Growth trends and projected exhaustion",
        "Threshold alerts before a limit is hit",
        "Cost attribution by resource and owner",
      ]}
    />
  );
}

export default UsageIndexPage;
