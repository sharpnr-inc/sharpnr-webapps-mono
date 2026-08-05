"use client";

import { useState } from "react";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { CheckCircle2, Loader2 } from "lucide-react";

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

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({
  id,
  label,
  placeholder,
  state,
  description,
  onChange,
  onBlur,
}: {
  id: FormFields;
  label: string;
  placeholder: string;
  state: FieldState;
  description?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const error = state.touched ? state.error : "";

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        value={state.value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
      />

      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
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

  const typeError = fields.type.touched ? fields.type.error : "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            New Legal Entity
          </p>
          <CardTitle className="text-xl">Register your organisation</CardTitle>
          <CardDescription>
            A Legal Entity is your officially registered company. It unlocks
            payroll, accounting, and compliance features across Sharp-HR and
            Sharp-Accounting.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <section className="space-y-3">
            <h3 className="text-sm font-medium">Registration</h3>

            <Field
              id="legalName"
              label="Legal Name"
              placeholder="Acme Technologies Private Limited"
              description="Exactly as registered with the government"
              state={fields.legalName}
              onChange={(v) => update("legalName", v)}
              onBlur={() => touch("legalName")}
            />

            <div className="space-y-2">
              <Label htmlFor="type">Entity Type</Label>

              <Select
                value={fields.type.value || undefined}
                onValueChange={(v) => {
                  update("type", v);
                  touch("type");
                }}
              >
                <SelectTrigger
                  id="type"
                  className="w-full"
                  aria-invalid={!!typeError}
                >
                  <SelectValue placeholder="Select an entity type" />
                </SelectTrigger>

                <SelectContent>
                  {ENTITY_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label} · {t.abbr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {typeError && (
                <p className="text-xs text-destructive">{typeError}</p>
              )}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-medium">Registered Address</h3>

            <Field
              id="addressLine"
              label="Address Line"
              placeholder="Plot 12, MIDC Industrial Area"
              state={fields.addressLine}
              onChange={(v) => update("addressLine", v)}
              onBlur={() => touch("addressLine")}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                id="city"
                label="City"
                placeholder="Pune"
                state={fields.city}
                onChange={(v) => update("city", v)}
                onBlur={() => touch("city")}
              />

              <Field
                id="state"
                label="State"
                placeholder="Maharashtra"
                state={fields.state}
                onChange={(v) => update("state", v)}
                onBlur={() => touch("state")}
              />

              <Field
                id="country"
                label="Country"
                placeholder="India"
                state={fields.country}
                onChange={(v) => update("country", v)}
                onBlur={() => touch("country")}
              />

              <Field
                id="pincode"
                label="Pincode"
                placeholder="411028"
                state={fields.pincode}
                onChange={(v) => update("pincode", v.replace(/\D/g, ""))}
                onBlur={() => touch("pincode")}
              />
            </div>
          </section>

          {status === "success" && (
            <Alert>
              <CheckCircle2 />
              <AlertDescription>
                Legal entity registered — moving to the next step.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={status !== "idle"}>
            {status === "loading" && <Loader2 className="animate-spin" />}
            {status === "success" && <CheckCircle2 />}
            {status === "loading"
              ? "Registering…"
              : status === "success"
                ? "Entity Registered"
                : "Register Legal Entity"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
