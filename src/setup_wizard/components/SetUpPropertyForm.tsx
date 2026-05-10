import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAppForm } from "@/components/forms";
import type { SetupOrgPropertyReqDTO } from "../api/types";
import { Route } from "@/routes/setup_wizard/$stepID/base_setup";

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
// onChange receives a plain string — callers must NOT pass the event object.
// error / touched come from TanStack field meta (f.state.meta).
function Field({
  label,
  placeholder,
  icon,
  value,
  error, // f.state.meta.errors[0] ?? ""
  touched, // f.state.meta.isTouched
  type = "text",
  hint,
  onChange, // (v: string) => void  — pass f.handleChange directly
  onBlur, // () => void           — pass f.handleBlur directly
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
          // Unwrap event → apply optional transform → pass plain string to TanStack
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

// ─── Form ─────────────────────────────────────────────────────────────────────
export function SetupPropertyForm() {
  const { stepID } = Route.useParams();

  const defaultProperty: SetupOrgPropertyReqDTO = {
    step_id: stepID,
    accuracy_m: 0.0,
    address_line: "",
    city: "",
    country: "",
    latitude: 0.0,
    longitude: 0.0,
    name: "",
    pincode: "",
    state: "",
  };

  const form = useAppForm({
    defaultValues: defaultProperty,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <motion.div initial="hidden" animate="show">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
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
        <motion.div
          custom={1}
          variants={fadeUp}
          style={{ marginBottom: "1rem" }}
        >
          <SectionLabel label="Identity" index={1} />
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUp}
          style={{ marginBottom: "0.85rem" }}
        >
          <form.Field
            name="name"
            children={(f) => (
              <Field
                label="Property Name"
                placeholder="Grand Hyatt Mumbai"
                icon={<Building2 size={13} />}
                value={f.state.value ?? ""}
                error={f.state.meta.errors[0] ?? ""}
                touched={f.state.meta.isTouched}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
              />
            )}
          />
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
          {/* Address line */}
          <form.Field
            name="address_line"
            children={(f) => (
              <Field
                label="Address Line"
                placeholder="123 Marine Drive, Floor 4"
                icon={<MapPin size={13} />}
                value={f.state.value ?? ""}
                error={f.state.meta.errors[0] ?? ""}
                touched={f.state.meta.isTouched}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
              />
            )}
          />

          <form.AppField
            name="country"
            children={(f) => {
              return <f.CountrySelect />;
            }}
          />

          <form.AppField
            name="state"
            children={(f) => {
              return <f.StateSelect />;
            }}
          />

          <form.AppField
            name="city"
            children={(f) => {
              return <f.CitySelect />;
            }}
          />

          {/* Country / Pincode */}

          <form.Field
            name="pincode"
            children={(f) => (
              <div style={{ flex: 1 }}>
                <Field
                  label="Pincode"
                  placeholder="400001"
                  icon={<Mail size={13} />}
                  type="text"
                  value={f.state.value ?? ""}
                  error={f.state.meta.errors[0] ?? ""}
                  touched={f.state.meta.isTouched}
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  transform={(v) => v.replace(/\D/g, "")}
                />
              </div>
            )}
          />
        </motion.div>

        {/* Submit */}
        <motion.div custom={5} variants={fadeUp} style={{ marginTop: "2rem" }}>
          <form.AppForm>
            <form.SubmitButton>Continue & Save Property</form.SubmitButton>
          </form.AppForm>
        </motion.div>
      </form>
    </motion.div>
  );
}
