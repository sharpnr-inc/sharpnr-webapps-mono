/*
 * Section 3 of PropertyDetailsPage: "Resources".
 * Resources are reusable assets that can be SHARED between infra and business
 * modules — e.g. a Menu (Hospitality) shared between a Kitchen, a Restaurant and
 * a Hotel, so the user doesn't have to create two different menus.
 *
 * Like the other two sections, resources come in three categories:
 *   • General     → general_resources
 *   • Hospitality → hospitality_resources
 *   • Healthcare  → healthcare_resources
 *
 * NOTE: there is no API for resources yet. The shape below (DummyResourcesResponse)
 * mirrors fetchInfraModulesResponse so it can be swapped for a real query later;
 * the "Add Property Resources" button opens a (dummy) ResourceCatalog.
 */

import type { ElementType } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Building2,
  FlaskConical,
  Library,
  Percent,
  Pill,
  Stethoscope,
  Tag,
  UtensilsCrossed,
  Utensils,
} from "lucide-react";
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useModal } from "@/hooks/useModal";
import ResourceCatalog from "@/business_operation/shared/ResourceCatalog";
import { DetailRow, PropertySection, SubGroup } from "./PropertyModulesLayout";

/* ── shape (placeholder until the API exists) ────────── */
interface PropertyResource {
  id: string;
  name: string;
  /** Human-readable resource kind, e.g. "Menu", "Price List". */
  resource_type: string;
  /** Modules this resource is currently shared with. */
  shared_with: string[];
}

/** Mirrors fetchInfraModulesResponse so a real query can drop in unchanged. */
interface DummyResourcesResponse {
  general_resources: PropertyResource[];
  hospitality_resources: PropertyResource[];
  healthcare_resources: PropertyResource[];
}

/* ── dummy data (no API yet) ─────────────────────────── */
const DUMMY_RESOURCES: DummyResourcesResponse = {
  general_resources: [
    {
      id: "res-tax",
      name: "Standard Tax Profile",
      resource_type: "Tax Profile",
      shared_with: ["Billing Counter"],
    },
    {
      id: "res-price",
      name: "Beverage Price List",
      resource_type: "Price List",
      shared_with: ["Bar", "Restaurant"],
    },
  ],
  hospitality_resources: [
    {
      id: "res-menu",
      name: "House Menu",
      resource_type: "Menu",
      shared_with: ["Kitchen", "Restaurant", "Hotel"],
    },
    {
      id: "res-recipe",
      name: "Signature Recipe Book",
      resource_type: "Recipe Book",
      shared_with: ["Kitchen"],
    },
    {
      id: "res-ingredients",
      name: "Master Ingredient Catalog",
      resource_type: "Ingredient Catalog",
      shared_with: ["Kitchen", "Inventory Store"],
    },
  ],
  healthcare_resources: [],
};

/** Icon per resource kind. */
const RESOURCE_ICONS: Record<string, ElementType> = {
  Menu: BookOpen,
  "Recipe Book": Utensils,
  "Ingredient Catalog": Boxes,
  "Tax Profile": Percent,
  "Price List": Tag,
  "Medicine Catalog": Pill,
  "Test Panel": FlaskConical,
};

/* ── single resource tile ────────────────────────────── */
function ResourceCard({ resource }: { resource: PropertyResource }) {
  const Icon = RESOURCE_ICONS[resource.resource_type] ?? Library;

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <Card className="group relative cursor-default overflow-hidden border-border/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
          <CardHeader className="flex-row items-start gap-3 space-y-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-transform group-hover:scale-105">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex min-w-0 items-center gap-2">
                <CardTitle className="truncate text-base">
                  {resource.name}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="shrink-0 text-[10px] font-medium uppercase tracking-wide"
                >
                  {resource.resource_type}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                Shared with {resource.shared_with.join(", ")}
              </CardDescription>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </CardHeader>
        </Card>
      </HoverCardTrigger>

      <HoverCardContent align="start" className="w-72">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {resource.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {resource.resource_type}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 border-t pt-2">
            <DetailRow label="Shared with">
              {resource.shared_with.length}{" "}
              {resource.shared_with.length === 1 ? "module" : "modules"}
            </DetailRow>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {resource.shared_with.map((m) => (
              <Badge
                key={m}
                variant="secondary"
                className="px-1.5 py-0 text-[10px] font-medium"
              >
                {m}
              </Badge>
            ))}
          </div>

          <p className="border-t pt-2 text-[11px] text-muted-foreground">
            Reusable asset — define it once and share it across these modules.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

/* ─────────────────────────────────────────────────────── */
interface PropertyDetailsResourcesSectionProps {
  propertyID: string;
}

export const PropertyDetailsResourcesSection = ({
  propertyID,
}: PropertyDetailsResourcesSectionProps) => {
  const { openModal, closeModal } = useModal();

  // Dummy data stands in until the resources API is ready.
  const data = DUMMY_RESOURCES;
  const generalResources = data.general_resources;
  const hospitalityResources = data.hospitality_resources;
  const healthcareResources = data.healthcare_resources;
  const total =
    generalResources.length +
    hospitalityResources.length +
    healthcareResources.length;

  const handleAddResource = () => {
    openModal({
      content: (
        <ResourceCatalog closeModal={closeModal} propertyID={propertyID} />
      ),
      title: "Resources",
      description:
        "Reusable assets shared across infra and business modules (e.g. a Menu).",
      size: "xl",
    });
  };

  return (
    <PropertySection
      icon={Library}
      title="Resources"
      description="Reusable assets shared across infra and business modules"
      count={total}
      accent="resource"
      addLabel="Add Property Resources"
      onAdd={handleAddResource}
      emptyHint="No resources yet. Use “Add Property Resources” to get started."
    >
      <SubGroup
        icon={Building2}
        title="General"
        description="Shared assets every property can reuse"
        count={generalResources.length}
      >
        {generalResources.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </SubGroup>

      <SubGroup
        icon={UtensilsCrossed}
        title="Hospitality"
        description="Menus, recipes and food & beverage assets"
        count={hospitalityResources.length}
      >
        {hospitalityResources.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </SubGroup>

      <SubGroup
        icon={Stethoscope}
        title="Healthcare"
        description="Formularies and clinical reference assets"
        count={healthcareResources.length}
      >
        {healthcareResources.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </SubGroup>
    </PropertySection>
  );
};
