import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { Background } from "../components/SetUpWizBackgroud";
import { ContinueButton } from "../components/SetUpWizButton";
import { fadeUp, InfoPanel } from "../components/InfoPanel";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  suffix?: React.ReactNode;
}

// ─── Avatar Upload ────────────────────────────────────────────────────────────
function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.5rem",
      }}
    >
      <motion.div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "88px",
          height: "88px",
          borderRadius: "50%",
          border: `1px dashed ${dragging ? "#63d6ff" : "rgba(99,214,255,0.3)"}`,
          background: dragging
            ? "rgba(99,214,255,0.08)"
            : "rgba(255,255,255,0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          transition: "border-color 0.2s, background 0.2s",
          boxShadow: dragging ? "0 0 20px rgba(99,214,255,0.15)" : "none",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ textAlign: "center", color: "rgba(99,214,255,0.5)" }}>
            <Upload size={18} />
          </div>
        )}
      </motion.div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <p
        style={{
          margin: 0,
          fontSize: "0.6rem",
          fontFamily: "'IBM Plex Mono', monospace",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Photo (optional)
      </p>
    </div>
  );
}

// ─── Field Component ─────────────────────────────────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
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
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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

      {/* Suffix (e.g. show/hide password) */}
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

// ─── Right Form Panel ─────────────────────────────────────────────────────────
function FormPanel() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const passwordMatch =
    form.password.length > 0 && form.password === form.confirmPassword;

  function set(key: keyof typeof form) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  return (
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
      <motion.div custom={0} variants={fadeUp} style={{ marginBottom: "2rem" }}>
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

      {/* Avatar */}
      <motion.div custom={1} variants={fadeUp}>
        <AvatarUpload />
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
        <Field
          label="Full Name"
          placeholder="Jane Doe"
          icon={<User size={14} />}
          value={form.fullName}
          onChange={set("fullName")}
        />
        <Field
          label="Email Address"
          type="email"
          placeholder="jane@acme.com"
          icon={<Mail size={14} />}
          value={form.email}
          onChange={set("email")}
        />
        <Field
          label="Username"
          placeholder="janedoe"
          icon={
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.8rem",
                color: "inherit",
                lineHeight: 1,
              }}
            >
              @
            </span>
          }
          value={form.username}
          onChange={set("username")}
          hint="Used to identify you across the platform"
        />

        {/* Password row */}
        <Field
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="Min. 8 characters"
          icon={<Lock size={14} />}
          value={form.password}
          onChange={set("password")}
          suffix={
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.3)",
                display: "flex",
                padding: 0,
              }}
            >
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          }
        />

        {/* Confirm Password */}
        <div style={{ position: "relative" }}>
          <Field
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            placeholder="Repeat password"
            icon={<Lock size={14} />}
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            suffix={
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {form.confirmPassword.length > 0 && (
                  <AnimatePresence>
                    {passwordMatch ? (
                      <motion.span
                        key="match"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ color: "#4ade80", display: "flex" }}
                      >
                        <CheckCircle2 size={13} />
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.3)",
                    display: "flex",
                    padding: 0,
                  }}
                >
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            }
          />
        </div>
      </motion.div>

      {/* Security badge */}
      <motion.div
        custom={3}
        variants={fadeUp}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.6rem 0.85rem",
          borderRadius: "6px",
          background: "rgba(99,214,255,0.04)",
          border: "1px solid rgba(99,214,255,0.1)",
          marginBottom: "1.75rem",
        }}
      >
        <ShieldCheck
          size={13}
          style={{ color: "rgba(99,214,255,0.6)", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.04em",
            lineHeight: 1.5,
          }}
        >
          Credentials are encrypted and never stored in plain text.
        </span>
      </motion.div>

      {/* CTA */}
      <motion.div custom={4} variants={fadeUp}>
        <ContinueButton
          onClick={() => setSubmitted(true)}
          submitted={submitted}
        />
      </motion.div>

      {/* Step footnote */}
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
        {/* Left — Info */}

        {/* Right — Form */}
        <FormPanel />
        <InfoPanel step_name="Super Admin Profile" step_number="01" />
      </div>
    </div>
  );
}
