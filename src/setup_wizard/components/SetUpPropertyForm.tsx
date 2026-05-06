"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Hash,
  MapPin,
  Map,
  Globe,
  Mail,
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
  | "name"
  | "code"
  | "addressLine"
  | "city"
  | "state"
  | "country"
  | "pincode";

type FormState = Record<FormFields, FieldState>;

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

// ─── Field Component ──────────────────────────────────────────────────────────
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
  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;
  const active = focused || value.length > 0;

  const borderColor = hasError
    ? "rgba(248,113,113,0.5)"
    : isValid
      ? "rgba(74,222,128,0.35)"
      : focused
        ? "rgba(167,139,250,0.45)"
        : "rgba(255,255,255,0.07)";

  const bgColor = hasError
    ? "rgba(248,113,113,0.04)"
    : focused
      ? "rgba(167,139,250,0.04)"
      : "rgba(255,255,255,0.02)";

  const iconColor = hasError
    ? "rgba(248,113,113,0.6)"
    : isValid
      ? "rgba(74,222,128,0.6)"
      : focused
        ? "rgba(167,139,250,0.7)"
        : "rgba(255,255,255,0.2)";

  const labelColor = hasError
    ? "rgba(248,113,113,0.7)"
    : active
      ? focused
        ? "rgba(167,139,250,0.8)"
        : "rgba(255,255,255,0.3)"
      : "rgba(255,255,255,0.25)";

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Floating label */}
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

      {/* Left icon */}
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

      {/* Input */}
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
          background: bgColor,
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          color: "#ffffff",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.8rem",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          boxShadow: focused
            ? `0 0 0 3px ${
                hasError ? "rgba(248,113,113,0.06)" : "rgba(167,139,250,0.06)"
              }`
            : "none",
        }}
      />

      {/* Right status icon */}
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

      {/* Bottom accent line */}
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
            : "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)",
          transformOrigin: "center",
          borderRadius: "1px",
          pointerEvents: "none",
        }}
      />

      {/* Hint / Error */}
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

// ─── Validation ───────────────────────────────────────────────────────────────
const VALIDATORS: Record<FormFields, (v: string) => string> = {
  name: (v) => (v.trim().length < 2 ? "Property name is too short" : ""),
  code: (v) =>
    v.trim().length < 2
      ? "Code must be at least 2 characters"
      : !/^[A-Z0-9-]+$/.test(v)
        ? "Only uppercase letters, numbers and hyphens"
        : "",
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

// ─── Initial state ────────────────────────────────────────────────────────────
const INITIAL: FormState = {
  name: { value: "", error: "", touched: false },
  code: { value: "", error: "", touched: false },
  addressLine: { value: "", error: "", touched: false },
  city: { value: "", error: "", touched: false },
  state: { value: "", error: "", touched: false },
  country: { value: "", error: "", touched: false },
  pincode: { value: "", error: "", touched: false },
};

// ─── Form ─────────────────────────────────────────────────────────────────────
export function SetupPropertyForm() {
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
    // Touch all fields to trigger validation
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
    // Simulate async submission
    setTimeout(() => setStatus("success"), 1400);
  }

  const isSuccess = status === "success";

  return (
    <motion.div initial="hidden" animate="show" style={{}}>
      {/* Form header */}
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
            color: "rgba(167,139,250,0.65)",
          }}
        >
          New Property
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
          Where does your operation run?
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
          A property is any physical venue your business operates from — a
          hotel, resort, office, or facility.
        </p>
      </motion.div>

      {/* Section — Identity */}
      <motion.div custom={1} variants={fadeUp} style={{ marginBottom: "1rem" }}>
        <SectionLabel label="Identity" index={1} />
      </motion.div>

      <motion.div
        custom={2}
        variants={fadeUp}
        style={{ display: "flex", gap: "0.85rem", marginBottom: "0.85rem" }}
      >
        {/* Name — wider */}
        <div style={{ flex: 2 }}>
          <Field
            label="Property Name"
            placeholder="Grand Hyatt Mumbai"
            icon={<Building2 size={13} />}
            value={fields.name.value}
            error={fields.name.error}
            touched={fields.name.touched}
            onChange={(v) => update("name", v)}
            onBlur={() => touch("name")}
          />
        </div>

        {/* Code — narrower */}
        <div style={{ flex: 1 }}>
          <Field
            label="Code"
            placeholder="GHM-01"
            icon={<Hash size={13} />}
            value={fields.code.value}
            error={fields.code.error}
            touched={fields.code.touched}
            hint="Unique short identifier"
            onChange={(v) => update("code", v.toUpperCase())}
            onBlur={() => touch("code")}
            transform={(v) => v.toUpperCase()}
          />
        </div>
      </motion.div>

      {/* Section — Location */}
      <motion.div
        custom={3}
        variants={fadeUp}
        style={{ margin: "1.25rem 0 1rem" }}
      >
        <SectionLabel label="Location" index={2} />
      </motion.div>

      <motion.div
        custom={4}
        variants={fadeUp}
        style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
      >
        <Field
          label="Address Line"
          placeholder="123 Marine Drive, Floor 4"
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
              placeholder="Mumbai"
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
              placeholder="400001"
              icon={<Mail size={13} />}
              type="text"
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

      {/* Success message */}
      <AnimatePresence>
        {isSuccess && (
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
              Property created — moving to the next step.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ label, index }: { label: string; index: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.55rem",
          color: "rgba(167,139,250,0.45)",
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
            "linear-gradient(90deg, rgba(167,139,250,0.25), transparent)",
        }}
      />
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.56rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(167,139,250,0.5)",
        }}
      >
        {label}
      </span>
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
              ? "rgba(167,139,250,0.45)"
              : "rgba(255,255,255,0.09)"
        }`,
        background: isSuccess
          ? "rgba(74,222,128,0.07)"
          : hovered
            ? "rgba(167,139,250,0.08)"
            : "rgba(255,255,255,0.03)",
        color: isSuccess
          ? "rgba(74,222,128,0.85)"
          : hovered
            ? "rgba(167,139,250,0.9)"
            : "rgba(255,255,255,0.6)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: isLoading || isSuccess ? "default" : "pointer",
        outline: "none",
        transition: "all 0.25s ease",
        boxShadow:
          hovered && !isSuccess ? "0 0 20px rgba(167,139,250,0.07)" : "none",
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
            Creating Property…
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
            Property Created
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            Create Property
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
