import { usePropertyDetails } from "../api/queries";
import {
  ArrowLeft,
  Building2,
  Hash,
  MapPin,
  Navigation,
  Settings,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Badge, Button } from "@sharpnr/ui";
import PropertyDetailsBusinessModulesSection from "../components/PropertyDetailsBusinessModulesSection";
import PropertyInfraModulesSection from "../components/PropertyInfraModulesSection";
import { PropertyDetailsResourcesSection } from "../components/PropertyDetailsResourcesSection";

interface PropertyDetailsPageProps {
  propertyId: string;
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const { data } = usePropertyDetails(propertyId);
  const property = data?.data;

  const nav = useNavigate();

  const handlePropertySettingPage = () =>
    nav({
      to: "/property/$propertyId/settings",
      params: { propertyId },
    });

  const shortLocation = [property?.city, property?.state, property?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      {/* ── Back nav ───────────────────────────────── */}
      <button
        onClick={() => nav({ to: "/property" })}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Properties
      </button>

      {/* ── Hero + overview ────────────────────────── */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-xl font-bold tracking-tight text-foreground">
                  {property?.name ?? "—"}
                </h1>
                {property?.code && (
                  <Badge variant="secondary" className="font-mono">
                    {property.code}
                  </Badge>
                )}
              </div>
              {/* compact inline metadata */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {shortLocation && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {shortLocation}
                  </span>
                )}
                {property?.address_line && (
                  <span className="flex items-center gap-1.5">
                    <Navigation className="h-3.5 w-3.5 shrink-0" />
                    {property.address_line}
                  </span>
                )}
                {property?.code && (
                  <span className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5 shrink-0" />
                    {property.code}
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

      {/* ── Business operation modules ──────────────── */}
      <PropertyDetailsBusinessModulesSection propertyID={propertyId} />

      <div className="border-t border-dashed" />

      {/* ── Infrastructure modules ──────────────────── */}
      <PropertyInfraModulesSection propertyID={propertyId} />

      <div className="border-t border-dashed" />

      {/* ── Resources (shared across infra + business modules) ── */}
      <PropertyDetailsResourcesSection propertyID={propertyId} />
    </div>
  );
}
