import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";
import { Background } from "../components/SetUpWizBackgroud";
import { fadeUp, InfoPanel } from "../components/InfoPanel";
import { useAppForm } from "@/components/forms";
import type { SetupSuperAdminDetailsReqDTO } from "../api/types";
import { Route } from "@/routes/setup_wizard/$stepID/userinfo";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void; // fixed: was () => void
  onBlur?: () => void; // fixed: was missing entirely
  hint?: string;
  suffix?: React.ReactNode;
}

// ─── Field Component ──────────────────────────────────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  onBlur,
  hint,
  suffix,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Floating label */}
      <motion.label
        animate={{
          y: active ? -22 : 0,
          fontSize: active ? "0.58rem" : "0.72rem",
          color: active
            ? focused
              ? "#63d6ff"
              : "rgba(255,255,255,0.35)"
            : "rgba(255,255,255,0.28)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "2.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.06em",
          pointerEvents: "none",
          zIndex: 2,
          transformOrigin: "left center",
          textTransform: "uppercase",
        }}
      >
        {label}
      </motion.label>

      {/* Icon */}
      <div
        style={{
          position: "absolute",
          left: "0.85rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: focused ? "#63d6ff" : "rgba(255,255,255,0.2)",
          transition: "color 0.2s",
          display: "flex",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {icon}
      </div>

      {/* Input */}
      <input
        type={type}
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => onChange(e.target.value)} // fixed: unwrap the event
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.(); // fixed: call field's onBlur
        }}
        style={{
          width: "100%",
          padding: "1rem 2.6rem 0.6rem 2.5rem",
          paddingRight: suffix ? "3rem" : "1rem",
          background: focused
            ? "rgba(99,214,255,0.04)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(99,214,255,0.4)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "8px",
          color: "#ffffff",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.82rem",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(99,214,255,0.07)" : "none",
          boxSizing: "border-box",
        }}
      />

      {/* Suffix */}
      {suffix && (
        <div
          style={{
            position: "absolute",
            right: "0.85rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          {suffix}
        </div>
      )}

      {/* Bottom glow line */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #63d6ff, transparent)",
          transformOrigin: "center",
          borderRadius: "1px",
        }}
      />

      {hint && (
        <p
          style={{
            margin: "0.3rem 0 0 0.25rem",
            fontSize: "0.58rem",
            fontFamily: "'IBM Plex Mono', monospace",
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.04em",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

// ─── Form Panel ───────────────────────────────────────────────────────────────
function FormPanel() {
  const { stepID } = Route.useParams();

  const defaultSuperAdmin: SetupSuperAdminDetailsReqDTO = {
    first_name: "",
    last_name: "",
    secondary_email: "",
    step_id: stepID,
    employee_id: "",
  };

  const form = useAppForm({
    defaultValues: defaultSuperAdmin,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <motion.div
        initial="hidden"
        animate="show"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          padding: "3rem 3rem 3rem 2.5rem",
          position: "relative",
          zIndex: 1,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: "2rem" }}
        >
          <p
            style={{
              margin: "0 0 0.4rem",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(99,214,255,0.6)",
            }}
          >
            Complete Your Profile
          </p>
          <h2
            style={{
              margin: 0,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.02em",
            }}
          >
            Tell us about yourself
          </h2>
        </motion.div>

        {/* Fields */}
        <motion.div
          custom={2}
          variants={fadeUp}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            marginBottom: "1.75rem",
          }}
        >
          <form.Field
            name="first_name"
            children={(f) => (
              <Field
                label="First Name"
                placeholder="Jane"
                icon={<User size={14} />}
                value={f.state.value}
                onChange={f.handleChange} // fixed
                onBlur={f.handleBlur} // fixed
              />
            )}
          />

          <form.Field
            name="last_name"
            children={(f) => (
              <Field
                label="Last Name"
                placeholder="Doe"
                icon={<User size={14} />}
                value={f.state.value}
                onChange={f.handleChange} // fixed
                onBlur={f.handleBlur} // fixed
              />
            )}
          />

          <form.Field
            name="secondary_email"
            children={(f) => (
              <Field
                label="Secondary Email Address"
                type="email"
                placeholder="jane.personal@gmail.com"
                icon={<Mail size={14} />}
                value={f.state.value}
                onChange={f.handleChange} // fixed
                onBlur={f.handleBlur} // fixed
              />
            )}
          />

          <form.Field
            name="employee_id"
            children={(f) => (
              <Field
                label="Employee ID"
                placeholder="YOURORG123"
                icon={<Mail size={14} />}
                value={f.state.value ?? ""} // ← coerce undefined to empty string
                onChange={f.handleChange} // fixed
                onBlur={f.handleBlur} // fixed
                hint="Your organisation-assigned employee identifier"
              />
            )}
          />
        </motion.div>

        {/* CTA */}
        <motion.div custom={4} variants={fadeUp} style={{ width: "100%" }}>
          <form.AppForm>
            <form.SubmitButton>Continue</form.SubmitButton>
          </form.AppForm>
        </motion.div>

        {/* Footnote */}
        <motion.p
          custom={5}
          variants={fadeUp}
          style={{
            margin: "1.2rem 0 0",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          Step 2 of 4 &nbsp;·&nbsp; You can edit this later in Settings
        </motion.p>
      </motion.div>
    </form>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export function UserinfoSetUpPage() {
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
        <FormPanel />
        <InfoPanel step_name="Super Admin Profile" step_number="01" />
      </div>
    </div>
  );
}
