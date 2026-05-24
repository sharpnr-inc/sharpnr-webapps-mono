import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { InfoPanel } from "../components/InfoPanel";
import { Background } from "../components/SetUpWizBackgroud";
import { SetupPropertyForm } from "../components/SetUpPropertyForm";
import { SetupLegalEntityForm } from "../components/SetUpLegalEntityForm";

// ─── Types ────────────────────────────────────────────────────────────────────
type Selection = "legal_entity" | "property" | null;

// ─── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
  // {
  //   id: "legal_entity" as const,
  //   icon: Landmark,
  //   accent: "#63d6ff",
  //   accentRgb: "99,214,255",
  //   tag: "Sharp-HR · Sharp-Accounting",
  //   title: "Legal Entity",
  //   subtitle: "Your registered company",
  //   description:
  //     "A Legal Entity represents your legally registered organisation. Required to unlock payroll, accounting, and compliance modules across the platform.",
  //   perks: [
  //     "Activate Sharp-HR for workforce management",
  //     "Unlock Sharp-Accounting for financials",
  //     "Basis for all compliance & tax reporting",
  //     "Supports multi-entity structures",
  //   ],
  //   required: "Required for HR & Accounting",
  // },
  {
    id: "property" as const,
    icon: Building2,
    accent: "#a78bfa",
    accentRgb: "167,139,250",
    tag: "Sharp-Hospitality",
    title: "Property",
    subtitle: "A physical location you operate",
    description:
      "A Property is any physical location your business runs from — a hotel, resort, office, or venue. Required to activate Sharp-Hospitality and operations management.",
    perks: [
      "Enable Sharp-Hospitality for your venue",
      "Manage rooms, bookings & housekeeping",
      "Track operations per physical location",
      "Add multiple properties as you grow",
    ],
    required: "Required for Hospitality",
  },
];

// ─── Selection Card ───────────────────────────────────────────────────────────
function SelectionCard({
  card,
  index,
  onSelect,
}: {
  card: (typeof CARDS)[number];
  index: number;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      style={{
        position: "relative",
        padding: "1.75rem",
        borderRadius: "12px",
        border: `1px solid ${
          hovered ? `rgba(${card.accentRgb},0.45)` : "rgba(255,255,255,0.07)"
        }`,
        background: hovered
          ? `rgba(${card.accentRgb},0.05)`
          : "rgba(255,255,255,0.02)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
        boxShadow: hovered
          ? `0 0 32px rgba(${card.accentRgb},0.07), inset 0 1px 0 rgba(${card.accentRgb},0.08)`
          : "none",
      }}
    >
      {/* Corner glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background: `radial-gradient(circle at top right, rgba(${card.accentRgb},0.12), transparent 70%)`,
          pointerEvents: "none",
          borderRadius: "12px",
        }}
      />

      {/* Tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.22rem 0.6rem",
          borderRadius: "99px",
          border: `1px solid rgba(${card.accentRgb},0.2)`,
          background: `rgba(${card.accentRgb},0.06)`,
          marginBottom: "1.1rem",
        }}
      >
        <Sparkles size={9} style={{ color: card.accent, opacity: 0.8 }} />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: card.accent,
            opacity: 0.75,
          }}
        >
          {card.tag}
        </span>
      </div>

      {/* Icon + Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "0.2rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: `rgba(${card.accentRgb},0.1)`,
                border: `1px solid rgba(${card.accentRgb},0.2)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={15} style={{ color: card.accent }} />
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "1rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "-0.02em",
              }}
            >
              {card.title}
            </h3>
          </div>
          <p
            style={{
              margin: "0 0 0 2.8rem",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.62rem",
              color: `rgba(${card.accentRgb},0.6)`,
              letterSpacing: "0.04em",
            }}
          >
            {card.subtitle}
          </p>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.2 }}
          style={{ color: card.accent, marginTop: "4px", flexShrink: 0 }}
        >
          <ArrowRight size={16} />
        </motion.div>
      </div>

      {/* Description */}
      <p
        style={{
          margin: "0 0 1.1rem",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.7rem",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.32)",
        }}
      >
        {card.description}
      </p>

      {/* Perks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {card.perks.map((perk, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}
          >
            <CheckCircle2
              size={11}
              style={{
                color: card.accent,
                opacity: 0.55,
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.64rem",
                color: "rgba(255,255,255,0.28)",
                lineHeight: 1.5,
              }}
            >
              {perk}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom required badge */}
      <div
        style={{
          marginTop: "1.25rem",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <Layers size={10} style={{ color: `rgba(${card.accentRgb},0.5)` }} />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            color: `rgba(${card.accentRgb},0.45)`,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {card.required}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Card Selection View ──────────────────────────────────────────────────────
function CardSelectionView({ onSelect }: { onSelect: (s: Selection) => void }) {
  return (
    <motion.div
      key="cards"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.35, ease: "easeOut" },
        },
        exit: {
          opacity: 0,
          x: -40,
          transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
        },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "3rem 3rem 3rem 2.5rem",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "1.75rem" }}
      >
        <p
          style={{
            margin: "0 0 0.35rem",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(99,214,255,0.6)",
          }}
        >
          Choose one to begin
        </p>
        <h2
          style={{
            margin: 0,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "-0.02em",
          }}
        >
          What does your operation need?
        </h2>
        <p
          style={{
            margin: "0.5rem 0 0",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.28)",
            lineHeight: 1.6,
          }}
        >
          You must create at least one. You can always add both after setup.
        </p>
      </motion.div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {CARDS.map((card, i) => (
          <SelectionCard
            key={card.id}
            card={card}
            index={i}
            onSelect={() => onSelect(card.id)}
          />
        ))}
      </div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          margin: "1.5rem 0 0",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.58rem",
          color: "rgba(255,255,255,0.16)",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        Step 3 of 4 &nbsp;·&nbsp; You can add more entities after setup is
        complete
      </motion.p>
    </motion.div>
  );
}

// ─── Form View ────────────────────────────────────────────────────────────────
function FormView({
  selection,
  onBack,
}: {
  selection: NonNullable<Selection>;
  onBack: () => void;
}) {
  const card = CARDS.find((c) => c.id === selection)!;
  const Icon = card.icon;

  return (
    <motion.div
      key="form"
      variants={{
        initial: {
          opacity: 0,
          x: 50,
        },
        animate: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          opacity: 0,
          x: 50,
          transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
        },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* Sticky form header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: "1.5rem 3rem 1.25rem 2.5rem",
          background: "linear-gradient(to bottom, #060809 80%, rgba(6,8,9,0))",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Back button */}
        <motion.button
          onClick={onBack}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.75rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
            cursor: "pointer",
            outline: "none",
            transition: "color 0.2s, border-color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.75)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.45)";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.08)";
          }}
        >
          <ArrowLeft size={12} />
          Back
        </motion.button>

        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "5px",
              background: `rgba(${card.accentRgb},0.12)`,
              border: `1px solid rgba(${card.accentRgb},0.25)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={11} style={{ color: card.accent }} />
          </div>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Create{" "}
            <span style={{ color: card.accent, opacity: 0.85 }}>
              {card.title}
            </span>
          </span>
        </div>
      </div>

      {/* The actual form */}
      <div
        style={{
          padding: "0 3rem 3rem 2.5rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // ← this
        }}
      >
        {selection === "legal_entity" ? (
          <SetupLegalEntityForm />
        ) : (
          <SetupPropertyForm />
        )}
      </div>
    </motion.div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export function OperationSetUpPage() {
  const [selection, setSelection] = useState<Selection>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060809",
        color: "#ffffff",
        fontFamily: "'IBM Plex Mono', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Background />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* Left — Info panel (updates label when a form is open) */}
        <InfoPanel
          step_name={
            selection === "legal_entity"
              ? "Legal Entity"
              : selection === "property"
                ? "Property"
                : "Setup Operations"
          }
          step_number="03"
        />

        {/* Right — Cards or Form */}
        <AnimatePresence mode="wait">
          {selection === null ? (
            <CardSelectionView key="cards" onSelect={setSelection} />
          ) : (
            <FormView
              key={selection}
              selection={selection}
              onBack={() => setSelection(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
