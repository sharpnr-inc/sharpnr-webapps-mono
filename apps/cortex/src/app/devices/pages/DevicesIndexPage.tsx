import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Laptop } from "lucide-react";

function DevicesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Laptop}
      title="Devices"
      description="The hardware your organization issues — enrolled, configured, and tied to the person responsible for it."
      capabilities={[
        "Device enrollment and issue-to-employee assignment",
        "Hardware, OS and configuration inventory",
        "Compliance state: encryption, patch level, screen lock",
        "Remote lock and wipe for lost or stolen devices",
        "Return and reassignment on offboarding",
      ]}
    />
  );
}

export default DevicesIndexPage;
