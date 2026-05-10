import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, CheckCircle2, AlertCircle } from "lucide-react";
import { Background } from "../components/SetUpWizBackgroud";
import { fadeUp, InfoPanel } from "../components/InfoPanel";
import { useAppForm } from "@/components/forms";
import { Route } from "@/routes/setup_wizard/$stepID/org_update";
import { gsap } from "gsap";
import type { SetupWizUpdateOrgNameRequestDto } from "../api/types";
import { useSetupWizUpdateOrgNameMutation } from "../api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

// ─── Single Field ─────────────────────────────────────────────────────────────
function OrgNameField({
  value,
  onChange,
  onBlur,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const active = focused || value.length > 0;

  function handleFocus() {
    if (disabled) return;
    setFocused(true);
    gsap.to(glowRef.current, {
      opacity: 1,
      scaleX: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }

  function handleBlur() {
    setFocused(false);
    onBlur();
    gsap.to(glowRef.current, {
      opacity: 0,
      scaleX: 0,
      duration: 0.25,
      ease: "power2.in",
    });
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        opacity: disabled ? 0.5 : 1,
        transition: "opacity 0.3s",
      }}
    >
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
          left: "2.85rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.08em",
          pointerEvents: "none",
          zIndex: 2,
          textTransform: "uppercase",
        }}
      >
        Organisation Name
      </motion.label>

      {/* Icon */}
      <motion.div
        animate={{ color: focused ? "#63d6ff" : "rgba(255,255,255,0.2)" }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <Building2 size={15} />
      </motion.div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={focused ? "Acme Technologies" : ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: "100%",
          padding: "1.1rem 1.25rem 0.65rem 2.85rem",
          background: focused
            ? "rgba(99,214,255,0.04)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${
            focused ? "rgba(99,214,255,0.4)" : "rgba(255,255,255,0.08)"
          }`,
          borderRadius: "10px",
          color: "#ffffff",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "1rem",
          letterSpacing: "0.02em",
          outline: "none",
          cursor: disabled ? "not-allowed" : "text",
          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(99,214,255,0.07)" : "none",
          boxSizing: "border-box",
        }}
      />

      {/* GSAP glow line */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #63d6ff, transparent)",
          transformOrigin: "center",
          borderRadius: "1px",
          opacity: 0,
          transform: "scaleX(0)",
          pointerEvents: "none",
        }}
      />

      {/* Live preview */}
      <motion.p
        animate={{ opacity: value.length > 0 ? 0.28 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          margin: "0.5rem 0 0 0.25rem",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.6rem",
          color: "#63d6ff",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value || "—"}
      </motion.p>
    </div>
  );
}

// ─── Mutation Status Banner ───────────────────────────────────────────────────
function StatusBanner({
  isPending,
  isSuccess,
  isError,
}: {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}) {
  const visible = isPending || isSuccess || isError;

  const config = isPending
    ? {
        color: "rgba(99,214,255,0.75)",
        border: "rgba(99,214,255,0.2)",
        bg: "rgba(99,214,255,0.05)",
        icon: (
          // Spinning dots indicator
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{
              display: "block",
              width: 11,
              height: 11,
              borderRadius: "50%",
              border: "1.5px solid rgba(99,214,255,0.25)",
              borderTopColor: "rgba(99,214,255,0.85)",
              flexShrink: 0,
            }}
          />
        ),
        text: "Saving your organisation name…",
      }
    : isSuccess
      ? {
          color: "rgba(74,222,128,0.8)",
          border: "rgba(74,222,128,0.2)",
          bg: "rgba(74,222,128,0.05)",
          icon: <CheckCircle2 size={12} style={{ flexShrink: 0 }} />,
          text: "Organisation name saved. Moving to the next step.",
        }
      : {
          color: "rgba(248,113,113,0.8)",
          border: "rgba(248,113,113,0.2)",
          bg: "rgba(248,113,113,0.05)",
          icon: <AlertCircle size={12} style={{ flexShrink: 0 }} />,
          text: "Something went wrong. Please try again.",
        };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={isPending ? "pending" : isSuccess ? "success" : "error"}
          initial={{ opacity: 0, y: 6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "1rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.65rem 0.9rem",
              borderRadius: "8px",
              border: `1px solid ${config.border}`,
              background: config.bg,
              color: config.color,
            }}
          >
            {config.icon}
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.04em",
                lineHeight: 1.4,
              }}
            >
              {config.text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
function FormPanel() {
  const { stepID } = Route.useParams();
  const { mutateAsync, isPending, isSuccess, isError } =
    useSetupWizUpdateOrgNameMutation();
  const q = useQueryClient();
  const nav = useNavigate();

  const defaultOrgName: SetupWizUpdateOrgNameRequestDto = {
    org_name: "",
    step_id: stepID,
  };

  const form = useAppForm({
    defaultValues: defaultOrgName,
    onSubmit: async ({ value }) => {
      mutateAsync(
        { payload: value },
        {
          onSuccess: ({ message, success }) => {
            q.invalidateQueries({
              queryKey: ["setup-progress", "SETUP_WIZARD"],
            });
            if (success) {
              toast.success(message);
            } else {
              toast.error(message);
            }

            nav({
              to: "/setup_wizard",
            });
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
      style={{ height: "100%" }}
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
        }}
      >
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          style={{ marginBottom: "2.5rem" }}
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
            Almost there
          </p>
          <h2
            style={{
              margin: "0 0 0.65rem",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
            }}
          >
            What's your
            <br />
            organisation called?
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.25)",
              lineHeight: 1.7,
              maxWidth: "360px",
            }}
          >
            This will be displayed across the platform as your organisation's
            identity. You can update it anytime from Settings.
          </p>
        </motion.div>

        {/* Field — disabled while request is in-flight or succeeded */}
        <motion.div
          custom={1}
          variants={fadeUp}
          style={{ marginBottom: "2rem" }}
        >
          <form.Field
            name="org_name"
            children={(f) => (
              <OrgNameField
                value={f.state.value ?? ""}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                disabled={isPending || isSuccess}
              />
            )}
          />
        </motion.div>

        {/* Submit */}
        <motion.div custom={2} variants={fadeUp}>
          <form.AppForm>
            <form.SubmitButton>Confirm & Continue</form.SubmitButton>
          </form.AppForm>
        </motion.div>

        {/* Mutation status banner — replaces generic footnote when active */}
        <StatusBanner
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
        />

        {/* Footnote — hidden while mutation is active */}
        <AnimatePresence>
          {!isPending && !isSuccess && !isError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              custom={3}
              variants={fadeUp}
              style={{
                margin: "1.25rem 0 0",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.15)",
                letterSpacing: "0.05em",
                textAlign: "center",
              }}
            >
              Step 1 of 4 &nbsp;·&nbsp; You can rename this later in Settings
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export function OrgNameSetupPage() {
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
        <InfoPanel step_name="Organisation Name" step_number="02" />
        <FormPanel />
      </div>
    </div>
  );
}
