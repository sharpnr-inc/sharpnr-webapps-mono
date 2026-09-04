import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Plug } from "lucide-react";

function IntegrationsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Plug}
      title="Integrations"
      description="What SharpCRM is connected to — the rest of the Sharpnr suite, and everything outside it."
      capabilities={[
        "Sharpnr apps: Accounting, Cables, Folio, Stockwave and Marketplace",
        "Third-party connectors for mail, calendar and telephony",
        "API keys and webhooks issued through Cortex",
        "Field mapping between systems",
        "Sync status, history and failure logs",
      ]}
    />
  );
}

export default IntegrationsIndexPage;
