/*
* PropertyIndexPage.tsx
* About: This component is Property index page it show the All the properties available to the organization
* Features
- Displays All Property in cards
- Also user can add new property in the organization

*/

import { useNavigate } from "@tanstack/react-router";
import { Button, ScrollArea, Skeleton, useModal } from "@sharpnr/ui";
import {
  ArrowUpRight,
  Building2,
  Hash,
  Layers,
  MapPin,
  MoveLeftIcon,
  Plus,
} from "lucide-react";
import AddPropertyForm from "../components/AddPropertyForm";
import { useProperties } from "../api/queries";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Property } from "../api/types";
import { PropoertyIndexSidePanel } from "../components/PropertyIndexSidePanel";

/* ── easing ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/* ─────────────────────────────────────────────────────── */

export function PropertyIndexPage() {
  const { data: properties, isLoading } = useProperties();
  const propertyArray: Property[] = properties?.data?.properties ?? [];
  const navigate = useNavigate();
  const { showModal, closeModal } = useModal();

  const handleAddProperty = () => {
    showModal(
      "Add Property",
      "create Property in the organization",
      <AddPropertyForm closeModal={closeModal} />,
    );
  };

  return (
    // ── Outer: dual independent scroll columns on desktop, natural flow on mobile/tablet ──
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-5.5rem)]">
      {/* ── Main: own scroll column on desktop ────────────────────────── */}
      <ScrollArea className="flex-1 lg:w-9/12 lg:h-[calc(100vh-5.5rem)]">
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <Button
                  onClick={() =>
                    navigate({
                      to: "/home",
                    })
                  }
                  variant={"secondary"}
                  size={"icon-sm"}
                >
                  <MoveLeftIcon />
                </Button>
                <Layers className="h-3 w-3" />
                Organization
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Properties
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLoading
                  ? "Loading your properties…"
                  : `${propertyArray.length} propert${propertyArray.length === 1 ? "y" : "ies"} in your organization`}
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAddProperty}
                className="w-full gap-2 shadow-sm sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Property</span>
                <span className="sm:hidden">Add New</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {/* Loading */}
            {isLoading && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} index={i} />
                ))}
              </motion.div>
            )}

            {/* Empty */}
            {!isLoading && propertyArray.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <EmptyPropertySection onAdd={handleAddProperty} />
              </motion.div>
            )}

            {!isLoading && propertyArray.length > 0 && (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
              >
                {propertyArray.map((p: Property) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </ScrollArea>

      {/* ── Side panel: inline on mobile/tablet, own scroll column on desktop ── */}
      <PropoertyIndexSidePanel />
    </div>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  Property card
 * ─────────────────────────────────────────────────────── */
function PropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate();

  const location = [property.city, property.state, property.country]
    .filter(Boolean)
    .join(", ");

  const goToDetails = () =>
    navigate({
      to: "/property/$propertyId/details",
      params: { propertyId: property.id },
    });

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={goToDetails}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      className="group flex h-full flex-col rounded-xl border bg-card p-5 text-left shadow-sm transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted">
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold leading-tight text-foreground">
              {property.name}
            </h3>
            {property.code && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Hash className="h-3 w-3 shrink-0" />
                <span className="truncate">{property.code}</span>
              </p>
            )}
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* body */}
      <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {property.address_line && (
          <p className="line-clamp-1">{property.address_line}</p>
        )}
        {location && (
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{location}</span>
          </p>
        )}
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  Empty state
 * ─────────────────────────────────────────────────────── */
function EmptyPropertySection({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center sm:py-24">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border bg-muted">
        <Building2 className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="mb-1 text-lg font-semibold text-foreground">
        No properties yet
      </h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">
        Get started by adding your first property to the organization.
      </p>

      <Button onClick={onAdd} className="gap-2 shadow-sm">
        <Plus className="h-4 w-4" />
        Add Your First Property
      </Button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  Skeleton
 * ─────────────────────────────────────────────────────── */
function PropertyCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-xl border bg-card p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </motion.div>
  );
}
