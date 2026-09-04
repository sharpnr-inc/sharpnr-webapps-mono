import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Megaphone } from "lucide-react";

function CampaignsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Megaphone}
      title="Campaigns"
      description="Outbound sends across every channel your customers use. A campaign picks its channel, its audience and its content here."
      capabilities={[
        "Email, SMS, WhatsApp and social sends from one screen",
        "Audience drawn from segments",
        "Reusable templates and content blocks",
        "Scheduling, throttling and send-time optimization",
        "Per-campaign delivery, engagement and revenue results",
      ]}
    />
  );
}

export default CampaignsIndexPage;
