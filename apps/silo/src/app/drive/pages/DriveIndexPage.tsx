import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { FolderOpen } from "lucide-react";

function DriveIndexPage() {
  return (
    <FeaturePlaceholder
      icon={FolderOpen}
      title="Drive"
      description="The human side of storage: folders, previews and sharing for the people in your organization, on the same storage as everything else."
      capabilities={[
        "Folder tree with drag-and-drop upload",
        "In-browser preview for documents, images and video",
        "Sharing by link or by person, with expiry",
        "Version history and restore of deleted files",
        "Desktop sync and per-user storage quotas",
      ]}
    />
  );
}

export default DriveIndexPage;
