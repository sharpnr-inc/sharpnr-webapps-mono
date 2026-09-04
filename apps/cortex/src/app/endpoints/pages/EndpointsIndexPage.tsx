import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { MonitorSmartphone } from "lucide-react";

function EndpointsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={MonitorSmartphone}
      title="Endpoint Security"
      description="Protection for the endpoints that reach the platform, extending Cortex's controls from the cloud down to the device itself."
      capabilities={[
        "Endpoint protection status per device",
        "Conditional access based on device compliance",
        "Threat and vulnerability alerts",
        "Baseline security configuration enforcement",
        "Quarantine of non-compliant devices",
      ]}
    />
  );
}

export default EndpointsIndexPage;
