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
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  MapPin,
  Plus,
  Settings,
  Tag,
} from "lucide-react";
import { useState } from "react";
import AddPropertyForm from "../components/AddPropertyForm";
import PropertyDomainSelection from "../components/PropertyDomainSelection";
import { useAddPropertyDomainMutation } from "../api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useProperties } from "../api/queries";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Property } from "../api/types";
import { PropoertyIndexSidePanel } from "../components/PropertyIndexSidePanel";
import { useModal } from "@/hooks/useModal";

/* ── easing ──────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── variants ────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: properties, isLoading } = useProperties();
  const adddomain = useAddPropertyDomainMutation();
  const qc = useQueryClient();
  const propertyArray: Property[] = properties?.data?.properties ?? [];
  const { showModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleAddProperty = () => {
    showModal(
      "Add Property",
      "create Property in the organization",
      <AddPropertyForm closeModal={closeModal} />,
    );
  };

  const handlePropertyNavigation = (p: Property) => {
    if (!p.is_configured && p.domain != null) {
      navigate({
        to: "/property/$propertyId/property-configuration",
        search: { p_domain: p.domain, p_name: p.name },
        params: { propertyId: p.id },
      });
    } else {
      navigate({
        to: "/property/$propertyId/details",
        params: { propertyId: p.id },
      });
    }
  };

  return (
    // ── Outer: locked height, two independent scroll columns ──
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
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

            {/* Grid */}
            {!isLoading && propertyArray.length > 0 && (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {propertyArray.map((p: Property) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    onNavigate={handlePropertyNavigation}
                    onDomainConfirm={async (domainId) => {
                      try {
                        await adddomain.mutateAsync({
                          domain: domainId,
                          propertyID: p.id,
                        });
                        await qc.invalidateQueries({
                          queryKey: ["ORGANIZATION", "PROPERTIES", "ALL"],
                        });
                      } catch (err) {
                        console.error("Failed to add domain:", err);
                      }
                    }}
                  />
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
 *  Property Card
 * ─────────────────────────────────────────────────────── */
interface PropertyCardProps {
  property: Property;
  isDialogOpen: boolean;
  setIsDialogOpen: (v: boolean) => void;
  onNavigate: (p: Property) => void;
  onDomainConfirm: (domainId: string) => Promise<void>;
}

function PropertyCard({
  property: p,
  isDialogOpen,
  setIsDialogOpen,
  onNavigate,
  onDomainConfirm,
}: PropertyCardProps) {
  const configured = p.is_configured;
  const hasDomain = p.domain && p.domain !== "";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Status stripe */}
      <div
        className={[
          "absolute left-0 top-0 h-full w-1 rounded-l-2xl transition-colors",
          configured ? "bg-emerald-500" : "bg-amber-400",
        ].join(" ")}
      />

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5 pl-6">
        {/* Top row: title + domain badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-0.5">
            <h2 className="truncate text-base font-semibold text-foreground">
              {p.name}
            </h2>
            <p className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <Tag className="h-3 w-3 shrink-0" />
              {p.code}
            </p>
          </div>

          {hasDomain ? (
            <span className="inline-flex shrink-0 items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              {p.domain}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center rounded-full border border-dashed border-muted-foreground/30 bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              No domain
            </span>
          )}
        </div>

        {/* Location */}
        {(p.city || p.state) && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {[p.city, p.state].filter(Boolean).join(", ")}
          </p>
        )}

        {/* Status pill */}
        <div className="flex items-center gap-2">
          {configured ? (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
              <CheckCircle2 className="h-3 w-3" />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-600">
              <Clock className="h-3 w-3" />
              Pending Setup
            </span>
          )}
        </div>

        {/* ── Footer action area ───────── */}
        <div className="mt-auto pt-1">
          {configured ? (
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(p)}
              className="flex w-full items-center justify-between rounded-xl border bg-muted/40 px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                View Dashboard
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          ) : hasDomain ? (
            /* Domain exists but not yet configured */
            <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-900/30 dark:bg-amber-950/20">
              <p className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                Setup is incomplete for this property.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate(p)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
              >
                <Settings className="h-3.5 w-3.5" />
                Configure Now
              </motion.button>
            </div>
          ) : (
            /* No domain yet */
            <div className="space-y-2 rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 p-3">
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                Domain configuration pending.
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsDialogOpen(true)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Select Domain
                </motion.button>
              </div>
              <PropertyDomainSelection
                onConfirm={onDomainConfirm}
                property={p}
                onOpenChange={setIsDialogOpen}
                open={isDialogOpen}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
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
