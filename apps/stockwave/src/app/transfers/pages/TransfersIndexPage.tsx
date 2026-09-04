import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { ArrowLeftRight } from "lucide-react";

function TransfersIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ArrowLeftRight}
      title="Transfers"
      description="Stock moving between your own locations, tracked while it is in transit rather than vanishing from one site before arriving at the next."
      capabilities={[
        "Transfer orders between warehouses and bins",
        "In-transit stock visible to both locations",
        "Partial dispatch and partial receipt",
        "Discrepancy handling on arrival",
        "Transfer history and audit trail",
      ]}
    />
  );
}

export default TransfersIndexPage;
