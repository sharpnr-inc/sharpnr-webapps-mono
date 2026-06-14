/*
* PropertyIndexPage.tsx
* About: This component is Property index page it show the All the properties available to the organization
* Features
- Displays All Property in cards
- Also user can add new property in the organization

*/

import { useNavigate } from "@tanstack/react-router";
import { Button, ScrollArea } from "@sharpnr/ui";
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
import { useQueryClient } from "@tanstack/react-query";
import { useProperties } from "../api/queries";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Property } from "../api/types";
import { PropoertyIndexSidePanel } from "../components/PropertyIndexSidePanel";
import { useModal } from "@/hooks/useModal";

/* ── easing ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
  const qc = useQueryClient();
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
    // ── Outer: locked height, two independent scroll columns ──
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5.5rem)]">
      {/* ── Main: own scroll column ────────────────────────── */}
      <ScrollArea className="flex-1 lg:w-9/12">
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Properties
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLoading
                  ? "Loading your properties…"
                  : `${propertyArray.length} propert${propertyArray.length === 1 ? "y" : "ies"} in your organization`}
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleAddProperty}
                className="gap-2 shadow-sm w-full sm:w-auto"
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
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {propertyArray.map((p: Property) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </ScrollArea>

      {/* ── Side panel: own scroll column ──────────────────── */}
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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-5 pl-6 text-left shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* accent stripe */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-primary/60 transition-colors group-hover:bg-primary" />

      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">
              {property.name}
            </h3>
            {property.code && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Hash className="h-3 w-3" />
                {property.code}
              </p>
            )}
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      {/* body */}
      <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {property.address_line && (
          <p className="line-clamp-1">{property.address_line}</p>
        )}
        {location && (
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
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
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-24 text-center">
      {/* Animated icon */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />
        <motion.span
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0, 0.1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="absolute inset-2 rounded-full bg-primary/15"
        />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
      </div>

      <h3 className="mb-1 text-lg font-semibold text-foreground">
        No properties yet
      </h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">
        Get started by adding your first property to the organization.
      </p>

      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        <Button onClick={onAdd} className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          Add Your First Property
        </Button>
      </motion.div>
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
      className="relative overflow-hidden rounded-2xl border bg-card p-5 pl-6 shadow-sm"
    >
      {/* stripe */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-muted" />

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <ShimmerBar className="h-4 w-32" />
            <ShimmerBar className="h-3 w-20" />
          </div>
          <ShimmerBar className="h-5 w-16 rounded-full" />
        </div>
        <ShimmerBar className="h-3 w-28" />
        <ShimmerBar className="h-5 w-24 rounded-full" />
        <ShimmerBar className="h-10 w-full rounded-xl" />
      </div>
    </motion.div>
  );
}

function ShimmerBar({ className }: { className?: string }) {
  return (
    <div
      className={["animate-pulse rounded-md bg-muted", className].join(" ")}
    />
  );
}
