import { usePropertyDetails } from "../api/queries";
import { ArrowLeft, Building2, Settings } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

/* ── easing ─────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

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

  const location = [property?.city, property?.state, property?.country]
    .filter(Boolean)
    .join(", ");

  const rows = [
    { label: "Code", value: property?.code },
    { label: "Address", value: property?.address_line },
    { label: "City", value: property?.city },
    { label: "State", value: property?.state },
    { label: "Country", value: property?.country },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="mx-auto max-w-3xl px-4 py-6 sm:px-6"
    >
      {/* ── Back nav ───────────────────────────────── */}
      <button
        onClick={() => nav({ to: "/property" })}
        className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Properties
      </button>

      {/* ── Header ─────────────────────────────────── */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted">
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold leading-tight tracking-tight text-foreground">
              {property?.name ?? "—"}
            </h1>
            {location && (
              <p className="truncate text-xs text-muted-foreground">
                {location}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handlePropertySettingPage}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <Settings className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>

      {/* ── Details ────────────────────────────────── */}
      <dl className="overflow-hidden rounded-xl border bg-card text-sm shadow-sm">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex items-center justify-between gap-4 px-4 py-3 ${
              i !== 0 ? "border-t" : ""
            }`}
          >
            <dt className="shrink-0 text-muted-foreground">{label}</dt>
            <dd className="truncate text-right font-medium text-foreground">
              {value || "—"}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
