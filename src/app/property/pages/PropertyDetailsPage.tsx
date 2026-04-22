import { usePropertyDetails } from "../api/queries";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  ChevronRight,
  Cpu,
  Globe,
  HardDrive,
  Hotel,
  Info,
  MapPin,
  Plus,
  Settings,
  UtensilsCrossed,
  Wifi,
  Zap,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useFormsModal } from "@/hooks/useFormModal";
import AddModulesInProperty from "../components/AddModulesInProperty";
import { AddInfraInProperty } from "../components/AddInfrasInProperty";
import type { PropertyModule } from "../api/service";
import { motion, type Variants } from "framer-motion";

/* ── easing ─────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── variants ───────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: EASE },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
};

/* ── module icon map ─────────────────────────────────── */
const MODULE_ICON: Record<string, React.ReactNode> = {
  HOTEL: <Hotel className="h-5 w-5" />,
  RESTAURANT: <UtensilsCrossed className="h-5 w-5" />,
};

const INFRA_ICON: Record<string, React.ReactNode> = {
  KITCHEN: <Zap className="h-5 w-5" />,
  NETWORK: <Wifi className="h-5 w-5" />,
  SERVER: <HardDrive className="h-5 w-5" />,
};

function getModuleIcon(type?: string) {
  return type ? (
    (MODULE_ICON[type] ?? <Cpu className="h-5 w-5" />)
  ) : (
    <Cpu className="h-5 w-5" />
  );
}

function getInfraIcon(type?: string) {
  return type ? (
    (INFRA_ICON[type] ?? <HardDrive className="h-5 w-5" />)
  ) : (
    <HardDrive className="h-5 w-5" />
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
  const { showModal, closeModal } = useFormsModal();

  const handleModuleNav = (module: PropertyModule) => {
    if (module.is_configured && module.module_type === "HOTEL") {
      nav({
        to: "/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId",
        params: { hotelId: module.id, propertyId },
      });
    } else if (module.module_type === "RESTAURANT") {
      nav({
        to: "/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID",
        params: { propertyId, restaurantID: module.id },
      });
    }
  };

  const handleInfraNav = (id: string) =>
    nav({
      to: "/property/$propertyId/domain_hospitality/infra_d/$InfraID",
      params: { InfraID: id, propertyId },
    });

  const handlePropertySettingPage = () =>
    nav({
      to: "/property/$propertyId/property_settings",
      params: { propertyId },
    });

  const handleAddModules = (domain?: string) => {
    if (domain) {
      showModal(
        "Add Modules",
        "Choose Modules",
        <AddModulesInProperty
          domain={domain}
          propertyID={propertyId}
          closeModal={closeModal}
        />,
      );
    }
  };

  const handleAddInfra = () =>
    showModal(
      "Add Infra",
      "Choose Infra",
      <AddInfraInProperty propertyID={propertyId} closeModal={closeModal} />,
    );

  const modules = property?.__modules__data__ ?? [];
  const infras = property?.infra ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 space-y-5">
        {/* ── Back nav ───────────────────────────────── */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          whileHover={{ x: -2 }}
          onClick={() => nav({ to: "/property" })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Properties
        </motion.button>

        {/* ── Property hero card ─────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative overflow-hidden rounded-2xl border bg-card shadow-sm"
        >
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 90% at 0% 50%, hsl(var(--primary)/0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between">
            {/* Left */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Building2 className="h-6 w-6 text-primary" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {property?.name ?? "—"}
                </h1>

                {/* Domain tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" /> Domain
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary ring-1 ring-primary/20">
                    Hospitality
                  </span>
                </div>

                {/* Address */}
                {[
                  property?.address_line,
                  property?.city,
                  property?.state,
                  property?.country,
                ].some(Boolean) && (
                  <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground/60" />
                    {[
                      property?.address_line,
                      property?.city,
                      property?.state,
                      property?.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* Right */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0"
            >
              <button
                onClick={handlePropertySettingPage}
                className="flex items-center gap-2 rounded-xl border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Modules section ────────────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="space-y-3"
        >
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-semibold text-foreground">
                Modules
              </h2>
              <p className="text-xs text-muted-foreground">
                {modules.length} module{modules.length !== 1 ? "s" : ""} in this
                property
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAddModules(property?.domain)}
              className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <Plus className="h-3.5 w-3.5 text-primary" />
              Add Module
            </motion.button>
          </div>

          {/* Module cards */}
          {modules.length === 0 ? (
            <EmptySection
              icon={<Cpu className="h-7 w-7 text-primary" />}
              title="No modules yet"
              description="Add your first module to start configuring this property."
              action="Add Module"
              onAction={() => handleAddModules(property?.domain)}
            />
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onNavigate={handleModuleNav}
                />
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* ── Infrastructure section ─────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="space-y-3"
        >
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-semibold text-foreground">
                Infrastructure
              </h2>
              <p className="text-xs text-muted-foreground">
                Defines how modules are ordered and operations are processed.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddInfra}
              className="flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <Plus className="h-3.5 w-3.5 text-primary" />
              Add Infra
            </motion.button>
          </div>

          {/* Learn more hint */}
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground/70 transition-colors hover:text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            Learn more about property infrastructure
          </button>

          {/* Infra cards */}
          {infras.length === 0 ? (
            <EmptySection
              icon={<HardDrive className="h-7 w-7 text-primary" />}
              title="No infrastructure added"
              description='Click "Add Infra" to add infrastructure to this property.'
              action="Add Infra"
              onAction={handleAddInfra}
            />
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {infras.map((inf) => (
                <InfraCard
                  key={inf.id}
                  infra={inf}
                  onNavigate={handleInfraNav}
                />
              ))}
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  Module Card
 * ─────────────────────────────────────────────────────── */
function ModuleCard({
  module,
  onNavigate,
}: {
  module: PropertyModule;
  onNavigate: (m: PropertyModule) => void;
}) {
  const configured = module.is_configured;
  const active = module.status;

  return (
    <motion.div
      variants={cardIn}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      {/* top accent stripe */}
      <div
        className={["h-1 w-full", active ? "bg-emerald-500" : "bg-muted"].join(
          " ",
        )}
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Icon + type badge */}
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            {getModuleIcon(module.module_type)}
          </div>
          {module.module_type && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {module.module_type}
            </span>
          )}
        </div>

        {/* Name + status */}
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground">{module.name}</h3>
          <div className="flex items-center gap-1.5">
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                active ? "bg-emerald-500" : "bg-muted-foreground/40",
              ].join(" ")}
            />
            <span className="text-[11px] text-muted-foreground">
              {active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Warning banner */}
        {!configured && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 p-2.5 dark:border-amber-900/30 dark:bg-amber-950/20">
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-[11px] leading-snug text-amber-700 dark:text-amber-400">
              Module not configured. Click below to set it up.
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(module)}
          className="mt-auto flex items-center justify-between rounded-xl border bg-muted/40 px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <span>{configured ? "Go to Module" : "Configure"}</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  Infra Card
 * ─────────────────────────────────────────────────────── */
function InfraCard({
  infra,
  onNavigate,
}: {
  infra: { id: string; name: string; infra_type?: string };
  onNavigate: (id: string) => void;
}) {
  return (
    <motion.div
      variants={cardIn}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className="group flex items-center gap-4 overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
        {getInfraIcon(infra.infra_type)}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="truncate font-semibold text-foreground">{infra.name}</p>
        {infra.infra_type && (
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {infra.infra_type}
          </p>
        )}
      </div>

      {/* Arrow */}
      <motion.button
        whileHover={{ x: 2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate(infra.id)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-muted/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────── *
 *  Empty section
 * ─────────────────────────────────────────────────────── */
function EmptySection({
  icon,
  title,
  description,
  action,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-12 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="max-w-xs text-xs text-muted-foreground">{description}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAction}
        className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
      >
        <Plus className="h-3.5 w-3.5" />
        {action}
      </motion.button>
    </motion.div>
  );
}
