import type { LegalEntityAddressResponseDto } from "../api/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
} from "@sharpnr/ui";
import { MapPin, Building2 } from "lucide-react";

interface LegalEntityAddressesTabProps {
  data: LegalEntityAddressResponseDto[] | undefined;
}

export function LegalEntityAddressesTab({
  data,
}: LegalEntityAddressesTabProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 text-center">
          <MapPin className="h-10 w-10 text-muted-foreground" />

          <div>
            <h3 className="font-medium">No addresses found</h3>
            <p className="text-sm text-muted-foreground">
              No legal entity addresses have been added yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.map((address) => (
        <Card key={address.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />

                <CardTitle className="text-base">
                  {address.type.replaceAll("_", " ")}
                </CardTitle>
              </div>

              <div className="flex gap-2">
                {address.is_primary && <Badge>Primary</Badge>}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1 text-sm">
              <div>{address.address_line1}</div>

              {address.address_line2 && <div>{address.address_line2}</div>}

              {address.landmark && (
                <div className="text-muted-foreground">
                  Near {address.landmark}
                </div>
              )}

              <div>
                {address.city}, {address.state}
              </div>

              <div>
                {address.country} — {address.pincode}
              </div>
            </div>

            <Separator />

            <div className="grid gap-2 text-sm">
              {address.gst_state_code && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST State Code</span>

                  <span>{address.gst_state_code}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Property ID</span>

                <span>{address.property_id ?? "Not linked"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Address ID</span>

                <span className="truncate text-right">{address.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
