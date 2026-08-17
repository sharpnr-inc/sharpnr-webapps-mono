/*
Property Settings Page

Features:
- Property Info Editor (name, slug, description, contact)
- Location details
- Visibility & access toggles
- Module Access Requests (dummy)
- Danger Zone (Delete Property)

NOTE: UI is wired to local state only — values are dummy placeholders for now.
*/

import { Route } from "@/routes/_appuser/property/$propertyId/settings";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Textarea,
} from "@sharpnr/ui";
import {
  ArrowLeft,
  CircleHelp,
  Eye,
  EyeOff,
  Info,
  KeyRound,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

/* ── small building blocks ───────────────────────────── */

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-medium">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

/* ── info side panel ─────────────────────────────────── */

function SettingsInfoPanel({
  propertyId,
  isPublic,
  allowRequests,
}: {
  propertyId: string;
  isPublic: boolean;
  allowRequests: boolean;
}) {
  const tips = [
    "Use a short, lowercase slug — it becomes part of public URLs.",
    "Keep the contact email monitored; access requests are sent there.",
    "Make a property public only when you're ready to receive requests.",
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="space-y-4 lg:sticky lg:top-6">
        {/* About */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">About these settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
            <p>
              These settings control how your property is identified, where it
              operates, and who can discover it across the organization.
            </p>
            <p>
              Changes apply only after you select{" "}
              <span className="font-medium text-foreground">Save Changes</span>.
            </p>
          </CardContent>
        </Card>

        {/* Current status */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Current status</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                {isPublic ? (
                  <Eye className="h-3.5 w-3.5" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" />
                )}
                Visibility
              </span>
              <Badge variant={isPublic ? "default" : "secondary"}>
                {isPublic ? "Public" : "Private"}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5" />
                Module Requests
              </span>
              <Badge variant={allowRequests ? "default" : "secondary"}>
                {allowRequests ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 leading-6">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Meta / help */}
        <Card>
          <CardContent className="space-y-3 pt-6 text-sm">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Property ID
              </p>
              <p className="wrap-break-word font-mono text-xs text-foreground">
                {propertyId}
              </p>
            </div>
            <div className="border-t pt-3">
              <button className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <CircleHelp className="h-3.5 w-3.5" />
                Need help with property settings?
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────── */

const PropertySettingPage: React.FC = () => {
  const { propertyId } = Route.useParams();
  const nav = useNavigate();

  const [propertyName, setPropertyName] = useState("");
  const [propertySlug, setPropertySlug] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [isPublic, setIsPublic] = useState(false);
  const [allowRequests, setAllowRequests] = useState(true);

  const handleSave = () => {
    console.log({
      propertyId,
      propertyName,
      propertySlug,
      description,
      contactEmail,
      phone,
      addressLine,
      city,
      state,
      country,
      postalCode,
      isPublic,
      allowRequests,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* ── Back nav ───────────────────────────────── */}
      <button
        onClick={() =>
          nav({ to: "/property/$propertyId/details", params: { propertyId } })
        }
        className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Property
      </button>

      {/* ── Header ─────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Property Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage configuration and access controls.
          </p>
        </div>
        <Button onClick={handleSave} className="w-full sm:w-auto">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── Settings column ──────────────────────── */}
        <div className="space-y-4 lg:col-span-2">
          {/* ── General ──────────────────────────────── */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">General</CardTitle>
              <CardDescription>
                Basic information about this property.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Property Name" htmlFor="name">
                  <Input
                    id="name"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="My Property"
                  />
                </Field>
                <Field label="Slug" htmlFor="slug" hint="Used in URLs.">
                  <Input
                    id="slug"
                    value={propertySlug}
                    onChange={(e) => setPropertySlug(e.target.value)}
                    placeholder="my-property"
                  />
                </Field>
              </div>

              <Field label="Description" htmlFor="desc">
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of this property…"
                  rows={3}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Contact Email" htmlFor="email">
                  <Input
                    id="email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contact@example.com"
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 000 0000"
                  />
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* ── Location ─────────────────────────────── */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Location</CardTitle>
              <CardDescription>Where this property operates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Address" htmlFor="address">
                <Input
                  id="address"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="123 Main Street"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" htmlFor="city">
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </Field>
                <Field label="State / Province" htmlFor="state">
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                  />
                </Field>
                <Field label="Country" htmlFor="country">
                  <Input
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                  />
                </Field>
                <Field label="Postal Code" htmlFor="postal">
                  <Input
                    id="postal"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="00000"
                  />
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* ── Visibility & Access ──────────────────── */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Visibility & Access</CardTitle>
              <CardDescription>
                Control who can discover this property.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleRow
                title="Public Property"
                description="Allow others to discover this property."
                checked={isPublic}
                onChange={setIsPublic}
              />
              <div className="border-t" />
              <ToggleRow
                title="Allow Module Requests"
                description="Let external users request module access."
                checked={allowRequests}
                onChange={setAllowRequests}
              />
            </CardContent>
          </Card>

          {/* ── Module Access Requests ───────────────── */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">
                  Module Access Requests
                </CardTitle>
                <Badge variant="secondary">0 pending</Badge>
              </div>
              <CardDescription>
                Requests for module access appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center rounded-lg border border-dashed py-8 text-sm text-muted-foreground">
                No pending requests
              </div>
            </CardContent>
          </Card>

          {/* ── Danger Zone ──────────────────────────── */}
          <Card className="border-destructive/40">
            <CardHeader className="pb-4">
              <CardTitle className="text-base text-destructive">
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 rounded-lg border border-destructive/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-foreground">
                    Delete Property
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This action cannot be undone.
                  </p>
                </div>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Delete Property
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Info side panel ──────────────────────── */}
        <SettingsInfoPanel
          propertyId={propertyId}
          isPublic={isPublic}
          allowRequests={allowRequests}
        />
      </div>
    </div>
  );
};

export default PropertySettingPage;
