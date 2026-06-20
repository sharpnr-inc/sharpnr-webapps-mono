/*
 * This component is used in ./pages/PropertyDetailsPage.tsx for displaying the resources.
 * It lists all the Resource modules of a property.
 * Resources can be of three types:
 **  1. General
 **  2. Hospitality
 **  3. HealthCare
 * Resources are simply assets that can be SHARED between infra and Business Modules.
 * For example, a Menu (Hospitality) can be shared between a Kitchen, a Restaurant and a
 * Hotel, so the user doesn't have to create two different menus.
 *
 * NOTE: there is no API for resources yet, so this section renders DUMMY data and the
 * "Add Property Resources" button opens a (dummy) ResourceCatalog. Wire both to the real
 * endpoints once they exist — mirror PropertyInfraModulesSection + InfraCatalog.
 */

import type { ElementType } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Library,
  Percent,
  Plus,
  Tag,
  Utensils,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { useModal } from "@/hooks/useModal";
import ResourceCatalog from "@/business_operation/shared/ResourceCatalog";

/* ── dummy data (no API yet) ─────────────────────────── */
type ResourceCategory = "General" | "Hospitality" | "Healthcare";

interface PropertyResource {
  id: string;
  name: string;
  /** Human-readable resource kind, e.g. "Menu", "Price List". */
  resourceType: string;
  category: ResourceCategory;
  icon: ElementType;
  /** Modules this resource is currently shared with. */
  sharedWith: string[];
}

const DUMMY_RESOURCES: PropertyResource[] = [
  {
    id: "res-1",
    name: "House Menu",
    resourceType: "Menu",
    category: "Hospitality",
    icon: BookOpen,
    sharedWith: ["Kitchen", "Restaurant", "Hotel"],
  },
  {
    id: "res-2",
    name: "Signature Recipe Book",
    resourceType: "Recipe Book",
    category: "Hospitality",
    icon: Utensils,
    sharedWith: ["Kitchen"],
  },
  {
    id: "res-3",
    name: "Standard Tax Profile",
    resourceType: "Tax Profile",
    category: "General",
    icon: Percent,
    sharedWith: ["Billing Counter"],
  },
  {
    id: "res-4",
    name: "Beverage Price List",
    resourceType: "Price List",
    category: "General",
    icon: Tag,
    sharedWith: ["Bar", "Restaurant"],
  },
  {
    id: "res-5",
    name: "Master Ingredient Catalog",
    resourceType: "Ingredient Catalog",
    category: "Hospitality",
    icon: Boxes,
    sharedWith: ["Kitchen", "Inventory Store"],
  },
];

/* ── single resource tile ────────────────────────────── */
function ResourceCard({ resource }: { resource: PropertyResource }) {
  const Icon = resource.icon;

  return (
    <Card className="group relative overflow-hidden border-border/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="flex-row items-start gap-3 space-y-0">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-transform group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <CardTitle className="truncate text-base">
                {resource.name}
              </CardTitle>
              <Badge
                variant="outline"
                className="shrink-0 text-[10px] font-medium uppercase tracking-wide"
              >
                {resource.resourceType}
              </Badge>
            </div>
            <Badge
              variant="secondary"
              className="shrink-0 text-[10px] font-medium"
            >
              {resource.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            Shared with {resource.sharedWith.join(", ")}
          </CardDescription>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </CardHeader>
    </Card>
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
  const resources = DUMMY_RESOURCES;

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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
          <Library className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Resources
          </h2>
          <p className="text-xs text-muted-foreground">
            Reusable assets shared across infra and business modules
          </p>
        </div>
        <Badge variant="outline" className="ml-auto font-mono text-[10px]">
          {resources.length}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddResource}
          className="shrink-0 gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Property Resources
        </Button>
      </div>

      {resources.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No resources yet. Use “Add Property Resources” to get started.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};
