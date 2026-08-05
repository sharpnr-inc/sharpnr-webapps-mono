import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Skeleton } from "@sharpnr/ui";
import { Switch } from "@sharpnr/ui";
import {
  Briefcase,
  Download,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useProfileDetails } from "../api/queries";
import { useAppUserStore } from "@/store/AppUserStore";

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

const ProfilePage: React.FC = () => {
  const { data, isLoading, isError, refetch } = useProfileDetails();
  const storeUser = useAppUserStore((state) => state.user);

  const profile = data?.data;

  if (isLoading) return <ProfileSkeleton />;

  if (isError || !profile) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm">
        <p className="font-medium">Unable to load your profile</p>
        <p className="mt-1 text-muted-foreground">
          {data?.error?.message ?? data?.message ?? "Something went wrong."}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  const fullName =
    `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() || "—";
  const initials =
    (profile.firstName?.[0] ?? "") + (profile.lastName?.[0] ?? "") || "U";

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      {/* ── Identity ── */}
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-4 lg:flex-col lg:text-center">
            <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
              {profile.email ? (
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.email)}`}
                  alt={fullName}
                />
              ) : null}
              <AvatarFallback className="text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h2 className="truncate font-semibold">{fullName}</h2>
              <p className="truncate text-xs text-muted-foreground">
                {profile.email || "—"}
              </p>
              {storeUser?.role ? (
                <Badge
                  variant="secondary"
                  className="mt-2 h-5 px-1.5 text-[10px] font-medium"
                >
                  {storeUser.role}
                </Badge>
              ) : null}
            </div>
          </div>

          <Button size="sm" variant="outline" className="mt-5 w-full">
            <Pencil className="mr-2 h-3.5 w-3.5" />
            Edit profile
          </Button>

          <div className="mt-5 space-y-3 border-t pt-4">
            <ContactRow icon={Phone} value={null} />
            <ContactRow icon={MapPin} value={profile.address} />
            <ContactRow icon={Briefcase} value={null} />
          </div>
        </div>
      </aside>

      {/* ── Details ── */}
      <div className="space-y-4">
        <Panel title="Personal information">
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
            <Field label="First name" value={profile.firstName} />
            <Field label="Last name" value={profile.lastName} />
            <Field label="Email" value={profile.email} />
            <Field label="Date of birth" value={formatDate(profile.dob)} />
            <Field label="Gender" value={profile.gender} />
            <Field label="Phone" value={null} />
            <Field
              label="Address"
              value={profile.address}
              className="sm:col-span-2 xl:col-span-3"
            />
          </div>
        </Panel>

        <Panel title="Employment">
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
            <Field label="Employee ID" value={null} />
            <Field label="Designation" value={null} />
            <Field label="Department" value={null} />
            <Field label="Reporting manager" value={null} />
            <Field label="Date of joining" value={null} />
            <Field label="Employment type" value={null} />
          </div>
        </Panel>

        <div className="grid gap-4 xl:grid-cols-2">
          <Panel title="Documents">
            <ul className="-my-1 divide-y">
              {documents.map((doc) => (
                <li
                  key={doc}
                  className="flex items-center justify-between gap-3 py-2"
                >
                  <span className="flex min-w-0 items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{doc}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 shrink-0 text-xs"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Preferences">
            <ul className="-my-1 divide-y">
              <Toggle
                icon={ShieldCheck}
                label="Two-factor authentication"
                hint="Extra security at sign-in"
              />
              <Toggle
                icon={Mail}
                label="Email notifications"
                hint="Payslips and leave updates"
                defaultChecked
              />
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*        Static placeholders — replace once the API response is extended      */
/* -------------------------------------------------------------------------- */

const documents = ["Offer letter", "Employment contract", "National ID"];

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

type IconType = React.ComponentType<{ className?: string }>;

function formatDate(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 text-sm font-medium">{title}</h3>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-0.5 truncate text-sm ${value ? "" : "text-muted-foreground"}`}
      >
        {value || "—"}
      </p>
    </div>
  );
}

function ContactRow({ icon: Icon, value }: { icon: IconType; value?: string | null }) {
  return (
    <div className="flex items-center gap-2.5 text-xs">
      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <span className={`truncate ${value ? "" : "text-muted-foreground"}`}>
        {value || "—"}
      </span>
    </div>
  );
}

function Toggle({
  icon: Icon,
  label,
  hint,
  defaultChecked,
}: {
  icon: IconType;
  label: string;
  hint: string;
  defaultChecked?: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <span className="flex min-w-0 items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0">
          <span className="block truncate text-sm">{label}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {hint}
          </span>
        </span>
      </span>
      <Switch defaultChecked={defaultChecked} />
    </li>
  );
}

function ProfileSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      <Skeleton className="h-64 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-52 rounded-xl" />
        <Skeleton className="h-44 rounded-xl" />
      </div>
    </div>
  );
}

export default ProfilePage;
