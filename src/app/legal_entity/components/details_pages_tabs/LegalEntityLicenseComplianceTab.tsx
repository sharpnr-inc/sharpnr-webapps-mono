import type { LegalEntityComplianceResponseDto } from "../../api/types";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@sharpnr/ui";
import {
  ShieldCheck,
  FileText,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";

interface LegalEntityLicenseComplianceTabProps {
  legalEntityID: string;
  data: LegalEntityComplianceResponseDto[] | undefined;
}

export function LegalEntityLicenseComplianceTab({
  legalEntityID,
  data,
}: LegalEntityLicenseComplianceTabProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 text-center">
          <ShieldCheck className="h-10 w-10 text-muted-foreground" />

          <div>
            <h3 className="font-medium">No compliance records found</h3>

            <p className="text-sm text-muted-foreground">
              No licenses or compliance documents have been added.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.map((item) => {
        const expired = item.valid_to && new Date(item.valid_to) < new Date();

        return (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />

                    <CardTitle className="text-base">
                      {item.type.replaceAll("_", " ")}
                    </CardTitle>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {item.license_number}
                  </p>
                </div>

                <Badge variant={item.is_active ? "default" : "secondary"}>
                  {item.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-2 text-sm">
                {item.issuing_authority && (
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Authority</span>

                    <span className="text-right">{item.issuing_authority}</span>
                  </div>
                )}

                {item.module && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Module</span>

                    <Badge variant="outline">{item.module}</Badge>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />

                  <span>
                    Valid from {new Date(item.valid_from).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />

                  <span className={expired ? "text-red-500 font-medium" : ""}>
                    Valid until{" "}
                    {item.valid_to
                      ? new Date(item.valid_to).toLocaleDateString()
                      : "No expiry"}
                  </span>
                </div>

                <div className="text-muted-foreground">
                  Renewal reminder: {item.renewal_reminder_days} days before
                </div>
              </div>

              <Separator />

              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property</span>

                  <span>{item.property_id ?? "Not linked"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID</span>

                  <span className="truncate text-right">{item.id}</span>
                </div>
              </div>

              {item.document_url && (
                <>
                  <Separator />

                  <Button asChild className="w-full" variant="outline">
                    <a
                      href={item.document_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Document
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
