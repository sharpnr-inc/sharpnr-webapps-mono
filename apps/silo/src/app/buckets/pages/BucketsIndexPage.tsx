import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Boxes } from "lucide-react";

function BucketsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Boxes}
      title="Buckets"
      description="S3-compatible object storage for files, media and backups — the raw storage layer everything else is built on."
      capabilities={[
        "Buckets with per-bucket policy and region placement",
        "S3-compatible API for existing tooling",
        "Versioning, lifecycle rules and object locking",
        "Streaming multipart upload for very large objects",
        "Checksums, server-side encryption and integrity verification",
      ]}
    />
  );
}

export default BucketsIndexPage;
