import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Plug } from "lucide-react";

function IntegrationsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Plug}
      title="Integrations"
      description="What Stockwave is connected to — the rest of the Sharpnr suite, and the channels you sell through."
      capabilities={[
        "Sharp-Accounting for valuation, COGS and credit notes",
        "SharpCRM and Marketplace for incoming demand",
        "Barcode scanners and label printers",
        "Carrier and courier services",
        "API keys and webhooks issued through Cortex",
      ]}
    />
  );
}

export default IntegrationsIndexPage;
