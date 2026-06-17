import { usePropertyDetails } from "../api/queries";
import {
  ArrowLeft,
  Building2,
  Hash,
  Landmark,
  MapPin,
  Map as MapIcon,
  Navigation,
  Settings,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";

/* ── field tile ──────────────────────────────────────── */
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 space-y-0.5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="wrap-break-word text-sm font-medium text-foreground">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */

interface PropertyDetailsPageProps {
  propertyId: string;
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const { data } = usePropertyDetails(propertyId);
  const property = data?.data;
  const nav = useNavigate();

  const handlePropertySettingPage = () =>
    nav({
      to: "/property/$propertyId/property_settings",
      params: { propertyId },
    });

  const fullAddress = [
    property?.address_line,
    property?.city,
    property?.state,
    property?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const shortLocation = [property?.city, property?.state, property?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      {/* ── Back nav ───────────────────────────────── */}
      <button
        onClick={() => nav({ to: "/property" })}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Properties
      </button>

      {/* ── Hero ───────────────────────────────────── */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-muted">
              <Building2 className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
                  {property?.name ?? "—"}
                </h1>
                {property?.code && (
                  <Badge variant="secondary" className="font-mono">
                    {property.code}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {shortLocation && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {shortLocation}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handlePropertySettingPage}
            className="w-full shrink-0 gap-2 sm:w-auto"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* ── Info grid ──────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <InfoItem
                icon={Hash}
                label="Property Code"
                value={property?.code}
              />

              <InfoItem icon={Building2} label="City" value={property?.city} />
              <InfoItem
                icon={Landmark}
                label="State / Province"
                value={property?.state}
              />
              <InfoItem
                icon={Navigation}
                label="Country"
                value={property?.country}
              />
              <InfoItem
                icon={MapPin}
                label="Address"
                value={property?.address_line}
              />
            </dl>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/40 text-muted-foreground">
              <MapIcon className="h-8 w-8" />
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="wrap-break-word text-foreground">
                {fullAddress || "No address provided"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
