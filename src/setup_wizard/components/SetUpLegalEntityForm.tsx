"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  MapPin,
  Map,
  Globe,
  Hash,
  ChevronDown,
  MoveRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FieldState {
  value: string;
  error: string;
  touched: boolean;
}

type FormFields =
  | "legalName"
  | "type"
  | "addressLine"
  | "city"
  | "state"
  | "country"
  | "pincode";

type FormState = Record<FormFields, FieldState>;

// ─── Entity types ─────────────────────────────────────────────────────────────
const ENTITY_TYPES = [
  { value: "Private Limited", label: "Private Limited", abbr: "Pvt. Ltd." },
  { value: "Public Limited", label: "Public Limited", abbr: "Ltd." },
  { value: "LLC", label: "Limited Liability Company", abbr: "LLC" },
  { value: "LLP", label: "Limited Liability Partnership", abbr: "LLP" },
  { value: "Partnership", label: "Partnership Firm", abbr: "Partnership" },
  {
    value: "Sole Proprietorship",
    label: "Sole Proprietorship",
    abbr: "Sole Prop.",
  },
  { value: "OPC", label: "One Person Company", abbr: "OPC" },
  { value: "NGO", label: "Non-Governmental Organisation", abbr: "NGO" },
  { value: "Trust", label: "Trust", abbr: "Trust" },
];

// ─── Shared fade-up variant ───────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// ─── Validation ───────────────────────────────────────────────────────────────
const VALIDATORS: Record<FormFields, (v: string) => string> = {
  legalName: (v) =>
    v.trim().length < 3 ? "Legal name must be at least 3 characters" : "",
  type: (v) => (!v ? "Please select an entity type" : ""),
  addressLine: (v) => (v.trim().length < 5 ? "Enter a valid address" : ""),
  city: (v) => (v.trim().length < 2 ? "City is required" : ""),
  state: (v) => (v.trim().length < 2 ? "State is required" : ""),
  country: (v) => (v.trim().length < 2 ? "Country is required" : ""),
  pincode: (v) =>
    v.trim().length === 0
      ? "Pincode is required"
      : !/^\d{4,10}$/.test(v)
        ? "Enter a valid pincode"
        : "",
};

const INITIAL: FormState = {
  legalName: { value: "", error: "", touched: false },
  type: { value: "", error: "", touched: false },
  addressLine: { value: "", error: "", touched: false },
  city: { value: "", error: "", touched: false },
  state: { value: "", error: "", touched: false },
  country: { value: "", error: "", touched: false },
  pincode: { value: "", error: "", touched: false },
};

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ label, index }: { label: string; index: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.55rem",
          color: "rgba(99,214,255,0.45)",
          letterSpacing: "0.06em",
        }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, rgba(99,214,255,0.25), transparent)",
        }}
      />
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.56rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(99,214,255,0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Text Field ───────────────────────────────────────────────────────────────
function Field({
  label,
  placeholder,
  icon,
  value,
  error,
  touched,
  type = "text",
  hint,
  onChange,
  onBlur,
  transform,
}: {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  error: string;
  touched: boolean;
  type?: string;
  hint?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  transform?: (v: string) => string;
}) {
  const [focused, setFocused] = useState(false);
  const hasError = touched && !!error;
  const isValid = touched && !error && value.length > 0;
  const active = focused || value.length > 0;

  const accent = "99,214,255";
  const borderColor = hasError
    ? "rgba(248,113,113,0.5)"
    : isValid
      ? "rgba(74,222,128,0.35)"
      : focused
        ? `rgba(${accent},0.4)`
        : "rgba(255,255,255,0.07)";

  const iconColor = hasError
    ? "rgba(248,113,113,0.6)"
    : isValid
      ? "rgba(74,222,128,0.6)"
      : focused
        ? `rgba(${accent},0.7)`
        : "rgba(255,255,255,0.2)";

  const labelColor = hasError
    ? "rgba(248,113,113,0.7)"
    : active
      ? focused
        ? `rgba(${accent},0.8)`
        : "rgba(255,255,255,0.3)"
      : "rgba(255,255,255,0.25)";

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <motion.label
        animate={{
          y: active ? -21 : 0,
          fontSize: active ? "0.56rem" : "0.7rem",
          color: labelColor,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "2.4rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.08em",
          pointerEvents: "none",
          zIndex: 2,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </motion.label>

      <div
        style={{
          position: "absolute",
          left: "0.8rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: iconColor,
          display: "flex",
          zIndex: 2,
          pointerEvents: "none",
          transition: "color 0.2s",
        }}
      >
        {icon}
      </div>

      <input
        type={type}
        value={value}
        placeholder={focused ? placeholder : ""}
        onChange={(e) => {
          const v = transform ? transform(e.target.value) : e.target.value;
          onChange(v);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur();
        }}
        style={{
          width: "100%",
          padding: "1rem 2.4rem 0.55rem 2.4rem",
          background: hasError
            ? "rgba(248,113,113,0.04)"
            : focused
              ? `rgba(${accent},0.04)`
              : "rgba(255,255,255,0.02)",
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          color: "#ffffff",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.8rem",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          boxShadow: focused
            ? `0 0 0 3px ${hasError ? "rgba(248,113,113,0.06)" : `rgba(${accent},0.06)`}`
            : "none",
        }}
      />

      <AnimatePresence>
        {(isValid || hasError) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              right: "0.8rem",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              zIndex: 2,
            }}
          >
            {isValid ? (
              <CheckCircle2
                size={13}
                style={{ color: "rgba(74,222,128,0.7)" }}
              />
            ) : (
              <AlertCircle
                size={13}
                style={{ color: "rgba(248,113,113,0.7)" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: hasError
            ? "linear-gradient(90deg, transparent, rgba(248,113,113,0.6), transparent)"
            : `linear-gradient(90deg, transparent, rgba(${accent},0.6), transparent)`,
          transformOrigin: "center",
          borderRadius: "1px",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence>
        {(hasError || hint) && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{
              margin: "0.3rem 0 0 0.25rem",
              fontSize: "0.57rem",
              fontFamily: "'IBM Plex Mono', monospace",
              color: hasError
                ? "rgba(248,113,113,0.7)"
                : "rgba(255,255,255,0.2)",
              letterSpacing: "0.04em",
              lineHeight: 1.4,
            }}
          >
            {hasError ? error : hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Entity Type Selector ─────────────────────────────────────────────────────
function TypeSelector({
  value,
  error,
  touched,
  onChange,
  onBlur,
}: {
  value: string;
  error: string;
  touched: boolean;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasError = touched && !!error;
  const isValid = touched && !error && !!value;
  const accent = "99,214,255";

  const selected = ENTITY_TYPES.find((e) => e.value === value);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      {/* Trigger */}
      <motion.button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
        }}
        whileTap={{ scale: 0.99 }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0 2.4rem 0 2.4rem",
          height: "52px",
          background: hasError
            ? "rgba(248,113,113,0.04)"
            : open
              ? `rgba(${accent},0.04)`
              : "rgba(255,255,255,0.02)",
          border: `1px solid ${
            hasError
              ? "rgba(248,113,113,0.5)"
              : isValid
                ? "rgba(74,222,128,0.35)"
                : open
                  ? `rgba(${accent},0.4)`
                  : "rgba(255,255,255,0.07)"
          }`,
          borderRadius: open ? "8px 8px 0 0" : "8px",
          color: value ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.25)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.8rem",
          cursor: "pointer",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s, border-radius 0.15s",
          boxShadow: open ? `0 0 0 3px rgba(${accent},0.06)` : "none",
          textAlign: "left",
          position: "relative",
        }}
      >
        {/* Icon */}
        <div
          style={{
            position: "absolute",
            left: "0.8rem",
            color: hasError
              ? "rgba(248,113,113,0.6)"
              : isValid
                ? "rgba(74,222,128,0.6)"
                : open
                  ? `rgba(${accent},0.7)`
                  : "rgba(255,255,255,0.2)",
            display: "flex",
            transition: "color 0.2s",
          }}
        >
          <Landmark size={13} />
        </div>

        {/* Floating label */}
        <motion.span
          animate={{
            y: value ? -10 : 0,
            fontSize: value ? "0.56rem" : "0.7rem",
            color: value
              ? open
                ? `rgba(${accent},0.8)`
                : "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.25)",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: "2.4rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          Entity Type
        </motion.span>

        {/* Selected value */}
        {selected && (
          <span style={{ marginTop: "10px", lineHeight: 1 }}>
            {selected.label}
            <span
              style={{
                marginLeft: "0.5rem",
                fontSize: "0.6rem",
                color: `rgba(${accent},0.5)`,
                letterSpacing: "0.06em",
              }}
            >
              ({selected.abbr})
            </span>
          </span>
        )}

        {/* Right icons */}
        <div
          style={{
            position: "absolute",
            right: "0.8rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <AnimatePresence>
            {isValid && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                style={{ display: "flex", color: "rgba(74,222,128,0.7)" }}
              >
                <CheckCircle2 size={13} />
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ display: "flex", color: `rgba(${accent},0.4)` }}
          >
            <ChevronDown size={14} />
          </motion.span>
        </div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.94 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#0d1014",
              border: `1px solid rgba(${accent},0.25)`,
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              overflow: "hidden",
              zIndex: 50,
              boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(${accent},0.08)`,
              transformOrigin: "top",
            }}
          >
            {ENTITY_TYPES.map((entity, i) => {
              const isSelected = entity.value === value;
              return (
                <motion.button
                  key={entity.value}
                  type="button"
                  onClick={() => {
                    onChange(entity.value);
                    setOpen(false);
                  }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035, duration: 0.2 }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.65rem 1rem",
                    background: isSelected
                      ? `rgba(${accent},0.07)`
                      : "transparent",
                    border: "none",
                    borderBottom:
                      i < ENTITY_TYPES.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    color: isSelected
                      ? `rgba(${accent},0.9)`
                      : "rgba(255,255,255,0.55)",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.8)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.55)";
                    }
                  }}
                >
                  <span>{entity.label}</span>
                  <span
                    style={{
                      fontSize: "0.58rem",
                      color: isSelected
                        ? `rgba(${accent},0.5)`
                        : "rgba(255,255,255,0.2)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {entity.abbr}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              margin: "0.3rem 0 0 0.25rem",
              fontSize: "0.57rem",
              fontFamily: "'IBM Plex Mono', monospace",
              color: "rgba(248,113,113,0.7)",
              letterSpacing: "0.04em",
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Submit Button ────────────────────────────────────────────────────────────
function SubmitButton({
  status,
  onClick,
}: {
  status: "idle" | "loading" | "success";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const accent = "99,214,255";

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || isSuccess}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.55rem",
        padding: "0.9rem 2rem",
        borderRadius: "8px",
        border: `1px solid ${
          isSuccess
            ? "rgba(74,222,128,0.4)"
            : hovered
              ? `rgba(${accent},0.45)`
              : "rgba(255,255,255,0.09)"
        }`,
        background: isSuccess
          ? "rgba(74,222,128,0.07)"
          : hovered
            ? `rgba(${accent},0.06)`
            : "rgba(255,255,255,0.03)",
        color: isSuccess
          ? "rgba(74,222,128,0.85)"
          : hovered
            ? `rgba(${accent},0.9)`
            : "rgba(255,255,255,0.6)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: isLoading || isSuccess ? "default" : "pointer",
        outline: "none",
        transition: "all 0.25s ease",
        boxShadow:
          hovered && !isSuccess ? `0 0 20px rgba(${accent},0.07)` : "none",
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex" }}
            >
              <Loader2 size={13} />
            </motion.span>
            Registering Entity…
          </motion.span>
        ) : isSuccess ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <CheckCircle2 size={13} />
            Entity Registered
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            Register Legal Entity
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex" }}
            >
              <MoveRight size={13} />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Root Form ────────────────────────────────────────────────────────────────
export function SetupLegalEntityForm() {
  const [fields, setFields] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function update(key: FormFields, value: string) {
    setFields((prev) => ({
      ...prev,
      [key]: {
        value,
        touched: prev[key].touched,
        error: prev[key].touched ? VALIDATORS[key](value) : "",
      },
    }));
  }

  function touch(key: FormFields) {
    setFields((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        touched: true,
        error: VALIDATORS[key](prev[key].value),
      },
    }));
  }

  function handleSubmit() {
    const next = { ...fields };
    (Object.keys(next) as FormFields[]).forEach((k) => {
      next[k] = {
        ...next[k],
        touched: true,
        error: VALIDATORS[k](next[k].value),
      };
    });
    setFields(next);
    const hasErrors = (Object.keys(next) as FormFields[]).some(
      (k) => next[k].error,
    );
    if (hasErrors) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1400);
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      style={{ alignItems: "center" }}
    >
      {/* Header */}
      <motion.div
        custom={0}
        variants={fadeUp}
        style={{ marginBottom: "1.75rem" }}
      >
        <p
          style={{
            margin: "0 0 0.3rem",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(99,214,255,0.65)",
          }}
        >
          New Legal Entity
        </p>
        <h2
          style={{
            margin: 0,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "clamp(1rem, 2vw, 1.3rem)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "-0.02em",
          }}
        >
          Register your organisation
        </h2>
        <p
          style={{
            margin: "0.45rem 0 0",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.67rem",
            color: "rgba(255,255,255,0.25)",
            lineHeight: 1.65,
          }}
        >
          A Legal Entity is your officially registered company. It unlocks
          payroll, accounting, and compliance features across Sharp-HR and
          Sharp-Accounting.
        </p>
      </motion.div>

      {/* Section 01 — Registration */}
      <motion.div custom={1} variants={fadeUp} style={{ marginBottom: "1rem" }}>
        <SectionLabel label="Registration" index={1} />
      </motion.div>

      <motion.div
        custom={2}
        variants={fadeUp}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          marginBottom: "0.85rem",
        }}
      >
        <Field
          label="Legal Name"
          placeholder="Acme Technologies Private Limited"
          icon={<Landmark size={13} />}
          value={fields.legalName.value}
          error={fields.legalName.error}
          touched={fields.legalName.touched}
          hint="Exactly as registered with the government"
          onChange={(v) => update("legalName", v)}
          onBlur={() => touch("legalName")}
        />

        <TypeSelector
          value={fields.type.value}
          error={fields.type.error}
          touched={fields.type.touched}
          onChange={(v) => update("type", v)}
          onBlur={() => touch("type")}
        />
      </motion.div>

      {/* Section 02 — Registered Address */}
      <motion.div
        custom={3}
        variants={fadeUp}
        style={{ margin: "1.25rem 0 1rem" }}
      >
        <SectionLabel label="Registered Address" index={2} />
      </motion.div>

      <motion.div
        custom={4}
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
      >
        <Field
          label="Address Line"
          placeholder="Plot 12, MIDC Industrial Area"
          icon={<MapPin size={13} />}
          value={fields.addressLine.value}
          error={fields.addressLine.error}
          touched={fields.addressLine.touched}
          onChange={(v) => update("addressLine", v)}
          onBlur={() => touch("addressLine")}
        />

        <div style={{ display: "flex", gap: "0.85rem" }}>
          <div style={{ flex: 1 }}>
            <Field
              label="City"
              placeholder="Pune"
              icon={<Map size={13} />}
              value={fields.city.value}
              error={fields.city.error}
              touched={fields.city.touched}
              onChange={(v) => update("city", v)}
              onBlur={() => touch("city")}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Field
              label="State"
              placeholder="Maharashtra"
              icon={<Map size={13} />}
              value={fields.state.value}
              error={fields.state.error}
              touched={fields.state.touched}
              onChange={(v) => update("state", v)}
              onBlur={() => touch("state")}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.85rem" }}>
          <div style={{ flex: 1 }}>
            <Field
              label="Country"
              placeholder="India"
              icon={<Globe size={13} />}
              value={fields.country.value}
              error={fields.country.error}
              touched={fields.country.touched}
              onChange={(v) => update("country", v)}
              onBlur={() => touch("country")}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Field
              label="Pincode"
              placeholder="411028"
              icon={<Hash size={13} />}
              value={fields.pincode.value}
              error={fields.pincode.error}
              touched={fields.pincode.touched}
              onChange={(v) => update("pincode", v.replace(/\D/g, ""))}
              onBlur={() => touch("pincode")}
              transform={(v) => v.replace(/\D/g, "")}
            />
          </div>
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div custom={5} variants={fadeUp} style={{ marginTop: "2rem" }}>
        <SubmitButton status={status} onClick={handleSubmit} />
      </motion.div>

      {/* Success banner */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <CheckCircle2
              size={13}
              style={{ color: "rgba(74,222,128,0.8)", flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(74,222,128,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              Legal entity registered — moving to the next step.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
