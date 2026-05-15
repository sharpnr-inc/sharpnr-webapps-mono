/*
 * LegalEntityIndexPage
 * Displays all legal entities for an organization.
 * Uses shadcn/ui CSS variable color tokens throughout.
 * Dummy data — will be replaced with real API calls.
 */

import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Landmark,
  GitBranch,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EntityType = "PVT_LTD" | "LLP" | "OPC";
type RelationshipRole = "HOLDING" | "SUBSIDIARY" | "BRANCH";
type CompletionStatus = "complete" | "partial" | "incomplete";

interface LegalEntitySummary {
  id: string;
  legalName: string;
  displayName: string;
  entityType: EntityType;
  incorporationYear: number;
  isActive: boolean;
  completionStatus: CompletionStatus;
  completionPercent: number;
  relationshipRole?: RelationshipRole;
  parentName?: string;
  ownershipPercent?: number;
  depth: number; // 0 = root, 1 = child, 2 = grandchild
  stats: {
    gstins: number;
    licenses: number;
    bankAccounts: number;
    contacts: number;
  };
  identifiers: {
    pan?: string;
    cin?: string;
    gstinCount?: number;
    missingFields: string[];
  };
}

// ─── Dummy data ───────────────────────────────────────────────────────────────

const DUMMY_ENTITIES: LegalEntitySummary[] = [
  {
    id: "1",
    legalName: "Preeti Foods Private Limited",
    displayName: "Preeti Foods Pvt Ltd",
    entityType: "PVT_LTD",
    incorporationYear: 2019,
    isActive: true,
    completionStatus: "partial",
    completionPercent: 82,
    relationshipRole: "HOLDING",
    depth: 0,
    stats: { gstins: 2, licenses: 3, bankAccounts: 1, contacts: 4 },
    identifiers: {
      pan: "AABCP1234F",
      cin: "U15549RJ2019PTC034891",
      gstinCount: 2,
      missingFields: ["TAN"],
    },
  },
  {
    id: "2",
    legalName: "Preeti Food Services Private Limited",
    displayName: "Preeti Food Services Pvt Ltd",
    entityType: "LLP",
    incorporationYear: 2022,
    isActive: true,
    completionStatus: "incomplete",
    completionPercent: 18,
    relationshipRole: "SUBSIDIARY",
    parentName: "Preeti Foods Pvt Ltd",
    ownershipPercent: 100,
    depth: 1,
    stats: { gstins: 0, licenses: 0, bankAccounts: 0, contacts: 1 },
    identifiers: {
      missingFields: ["PAN", "CIN", "GSTIN", "TAN", "Bank Account"],
    },
  },
  {
    id: "3",
    legalName: "Preeti Foods Mumbai Branch",
    displayName: "Preeti Foods Mumbai",
    entityType: "PVT_LTD",
    incorporationYear: 2023,
    isActive: true,
    completionStatus: "partial",
    completionPercent: 65,
    relationshipRole: "BRANCH",
    parentName: "Preeti Foods Pvt Ltd",
    depth: 1,
    stats: { gstins: 1, licenses: 1, bankAccounts: 1, contacts: 2 },
    identifiers: {
      pan: "AABCP1234F",
      gstinCount: 1,
      missingFields: ["Trade License"],
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ENTITY_TYPE_LABEL: Record<EntityType, string> = {
  PVT_LTD: "Pvt Ltd",
  LLP: "LLP",
  OPC: "OPC",
};

const RELATIONSHIP_LABEL: Record<RelationshipRole, string> = {
  HOLDING: "Holding",
  SUBSIDIARY: "Subsidiary",
  BRANCH: "Branch",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function EntityAvatar({ name, depth }: { name: string; depth: number }) {
  const initials = name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const colorClass =
    depth === 0
      ? "bg-primary/10 text-primary"
      : depth === 1
        ? "bg-muted text-muted-foreground"
        : "bg-secondary text-secondary-foreground";

  return (
    <div
      className={`h-9 w-9 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0 ${colorClass}`}
    >
      {initials || "LE"}
    </div>
  );
}

function EntityTypeBadge({ type }: { type: EntityType }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground border border-border">
      {ENTITY_TYPE_LABEL[type]}
    </span>
  );
}

function RelationshipBadge({ role }: { role: RelationshipRole }) {
  const styles: Record<RelationshipRole, string> = {
    HOLDING: "bg-primary/10 text-primary border-primary/20",
    SUBSIDIARY: "bg-muted text-muted-foreground border-border",
    BRANCH: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${styles[role]}`}
    >
      {RELATIONSHIP_LABEL[role]}
    </span>
  );
}

function StatusBadge({ status }: { status: CompletionStatus }) {
  const map: Record<
    CompletionStatus,
    { label: string; icon: React.ReactNode; cls: string }
  > = {
    complete: {
      label: "Active",
      icon: <CheckCircle2 className="h-3 w-3" />,
      cls: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-900",
    },
    partial: {
      label: "Partial",
      icon: <Clock className="h-3 w-3" />,
      cls: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900",
    },
    incomplete: {
      label: "Incomplete",
      icon: <AlertTriangle className="h-3 w-3" />,
      cls: "text-destructive bg-destructive/10 border-destructive/20",
    },
  };
  const { label, icon, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${cls}`}
    >
      {icon}
      {label}
    </span>
  );
}

function CompletenessBar({
  percent,
  status,
}: {
  percent: number;
  status: CompletionStatus;
}) {
  const fillColor =
    status === "complete"
      ? "bg-green-500"
      : status === "partial"
        ? "bg-yellow-400"
        : "bg-destructive";

  return (
    <div className="h-1 w-full rounded-full bg-muted overflow-hidden mt-3">
      <motion.div
        className={`h-full rounded-full ${fillColor}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

function IdentifierPill({
  label,
  value,
  missing,
}: {
  label: string;
  value?: string;
  missing?: boolean;
}) {
  if (missing) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-dashed border-border text-[10px] text-muted-foreground">
        <AlertTriangle className="h-2.5 w-2.5 text-yellow-500" />
        {label} missing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-muted/50 text-[10px] text-muted-foreground">
      <CheckCircle2 className="h-2.5 w-2.5 text-green-500" />
      {label}
      {value && (
        <span className="text-foreground font-mono ml-0.5">{value}</span>
      )}
    </span>
  );
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-muted/40 rounded-lg px-3 py-2 min-w-[60px]">
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-[9px] uppercase tracking-wide text-muted-foreground mt-0.5">
        {label}
      </span>
    </div>
  );
}

// ─── Entity Card ──────────────────────────────────────────────────────────────

function EntityCard({
  entity,
  index,
}: {
  entity: LegalEntitySummary;
  index: number;
}) {
  const isChild = entity.depth > 0;
  const nav = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className={isChild ? "ml-6 relative" : ""}
      onClick={() =>
        nav({
          to: "/legal_entity/$leID/details",
          params: {
            leID: entity.id,
          },
        })
      }
    >
      {/* tree line for children */}
      {isChild && (
        <div className="absolute -left-3 top-0 bottom-1/2 w-px bg-border" />
      )}
      {isChild && (
        <div className="absolute -left-3 top-1/2 w-3 h-px bg-border" />
      )}

      <div
        className={`
          group relative rounded-xl border bg-card text-card-foreground
          hover:border-primary/30 hover:shadow-sm transition-all duration-150 cursor-pointer
          ${entity.depth === 0 ? "border-border" : "border-border/60"}
          ${entity.depth > 0 ? "border-l-2" : ""}
          ${entity.relationshipRole === "SUBSIDIARY" ? "border-l-muted-foreground/30" : ""}
          ${entity.relationshipRole === "BRANCH" ? "border-l-primary/30" : ""}
        `}
      >
        <div className="p-4">
          {/* Row 1: avatar + name + badges + actions */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3 min-w-0">
              <EntityAvatar name={entity.displayName} depth={entity.depth} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground truncate">
                    {entity.displayName}
                  </span>
                  {entity.relationshipRole && (
                    <RelationshipBadge role={entity.relationshipRole} />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <EntityTypeBadge type={entity.entityType} />
                  <span className="text-[11px] text-muted-foreground">
                    Est. {entity.incorporationYear}
                  </span>
                  {entity.parentName && (
                    <>
                      <span className="text-muted-foreground/40">·</span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <GitBranch className="h-3 w-3" />
                        {entity.parentName}
                        {entity.ownershipPercent != null &&
                          ` · ${entity.ownershipPercent}%`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <StatusBadge status={entity.completionStatus} />
              <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground border border-border rounded-md px-2 py-1">
                Details
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Row 2: identifier pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {entity.identifiers.pan && (
              <IdentifierPill label="PAN" value={entity.identifiers.pan} />
            )}
            {entity.identifiers.cin && (
              <IdentifierPill label="CIN" value={entity.identifiers.cin} />
            )}
            {entity.identifiers.gstinCount != null && (
              <IdentifierPill
                label={`GSTIN · ${entity.identifiers.gstinCount} state${entity.identifiers.gstinCount > 1 ? "s" : ""}`}
              />
            )}
            {entity.identifiers.missingFields.map((f) => (
              <IdentifierPill key={f} label={f} missing />
            ))}
          </div>

          {/* Row 3: stats */}
          <div className="flex items-center gap-2">
            <StatBox value={entity.stats.gstins} label="GSTINs" />
            <StatBox value={entity.stats.licenses} label="Licenses" />
            <StatBox value={entity.stats.bankAccounts} label="Banks" />
            <StatBox value={entity.stats.contacts} label="Contacts" />
          </div>

          {/* Row 4: completeness bar */}
          <CompletenessBar
            percent={entity.completionPercent}
            status={entity.completionStatus}
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">
              {entity.completionPercent}% complete
            </span>
            {entity.identifiers.missingFields.length > 0 && (
              <span className="text-[10px] text-yellow-600 dark:text-yellow-400">
                {entity.identifiers.missingFields.length} field
                {entity.identifiers.missingFields.length > 1 ? "s" : ""} missing
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Landmark className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium text-foreground mb-1">
        No legal entities yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        Add your first legal entity — company, LLP, or branch — to enable GST
        filings, compliance tracking, and accounting.
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add legal entity
      </button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function LegalEntityIndexPage() {
  // TODO: replace with real data from API
  const entities = DUMMY_ENTITIES;
  const isEmpty = entities.length === 0;

  const activeCount = entities.filter((e) => e.isActive).length;
  const holdingCount = entities.filter(
    (e) => e.relationshipRole === "HOLDING",
  ).length;

  return (
    <div className=" bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-start justify-between mb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Building2 className="h-3.5 w-3.5" />
              <span>Organization</span>
              <span className="text-border">/</span>
              <span className="text-foreground">Legal entities</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Legal entities
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeCount} active ·{" "}
              {holdingCount === 1
                ? "1 group structure"
                : `${holdingCount} group structures`}
            </p>
          </div>

          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0">
            <Plus className="h-4 w-4" />
            Add legal entity
          </button>
        </motion.div>

        {/* ── Search + filters ── */}
        {!isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="flex items-center gap-2 mb-5"
          >
            <div className="flex-1 flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by name, PAN, CIN…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            {(["All", "PVT LTD", "LLP", "Active"] as const).map((filter, i) => (
              <button
                key={filter}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                  i === 0
                    ? "bg-primary/10 text-primary border-primary/25"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Entity list ── */}
        {isEmpty ? (
          <EmptyState onAdd={() => {}} />
        ) : (
          <div className="flex flex-col gap-3">
            {entities.map((entity, i) => (
              <EntityCard key={entity.id} entity={entity} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
