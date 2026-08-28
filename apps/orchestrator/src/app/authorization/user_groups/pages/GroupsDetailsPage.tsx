import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CalendarClock,
  Hash,
  ScrollText,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Separator,
  Skeleton,
} from "@sharpnr/ui";
import { formatDateTimePretty } from "@sharpnr/utils";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_appuser/authorization/user_groups/$groupID";
import { useSentinelGroupDetail } from "../api/queries";
import type {
  GroupPolicesResponseDto,
  GroupUserResponseDto,
} from "../api/types";

/* A bordered key/value row for the summary panel. */
function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Hash;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{children}</span>
    </div>
  );
}

/* Empty / error placeholder shared by both list sections. */
function Placeholder({
  icon: Icon,
  children,
}: {
  icon: typeof Hash;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-10 text-center">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

/** First letters of the first two words, e.g. "Ada Lovelace" -> "AL". */
function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberRow({ member }: { member: GroupUserResponseDto }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-primary/40">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="text-xs">
          {initials(member.name) || <UserRound className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {member.name}
        </p>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {member.id}
        </p>
      </div>
    </li>
  );
}

function PolicyRow({ policy }: { policy: GroupPolicesResponseDto }) {
  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border p-3.5 transition-colors hover:border-primary/40">
      <div className="min-w-0 space-y-0.5">
        <p className="truncate text-sm font-medium text-foreground">
          {policy.name}
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {policy.description}
        </p>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatDateTimePretty(policy.createdAt)}
      </span>
    </li>
  );
}

const GroupsDetailsPage = () => {
  const { groupID } = Route.useParams();
  const { data, isLoading, isError } = useSentinelGroupDetail(groupID);
  console.log(data);
  const nav = useNavigate();

  const group = data?.data;
  const members = group?.user ?? [];
  const policies = group?.polices ?? [];

  const backToGroups = (
    <button
      type="button"
      onClick={() => nav({ to: "/authorization/user_groups" })}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to groups
    </button>
  );

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
        {backToGroups}
        <Skeleton className="h-44 w-full rounded-2xl" />
        <div className="grid gap-5 md:grid-cols-2">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !group) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
        {backToGroups}
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-12 text-center">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <p className="text-sm text-muted-foreground">
            Couldn't load this group. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      {backToGroups}

      {/* ---- Header + summary ---- */}
      <section className="flex flex-col rounded-2xl border">
        <div className="flex flex-wrap items-start justify-between gap-3 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted text-primary">
              <UsersRound className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-foreground">
                {group.name}
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                {group.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{members.length} members</Badge>
            <Badge variant="secondary">{policies.length} policies</Badge>
          </div>
        </div>

        <Separator />

        <div className="grid divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
          <div className="divide-y">
            <DetailRow icon={Hash} label="Group ID">
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                {group.id}
              </code>
            </DetailRow>
            <DetailRow icon={Users} label="Members">
              {members.length} people
            </DetailRow>
          </div>
          <div className="divide-y">
            <DetailRow icon={Calendar} label="Created">
              {formatDateTimePretty(group.createdAt) || "—"}
            </DetailRow>
            <DetailRow icon={CalendarClock} label="Last updated">
              {formatDateTimePretty(group.updatedAt) || "—"}
            </DetailRow>
          </div>
        </div>
      </section>

      {/* ---- Members + policies ---- */}
      <div className="grid gap-5 md:grid-cols-2">
        <section className="space-y-3 rounded-2xl border p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h2 className="inline-flex items-center gap-2 text-base font-semibold text-foreground">
                <Users className="h-4 w-4 text-primary" />
                Members
              </h2>
              <p className="text-sm text-muted-foreground">
                People who belong to this group.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>

          <Separator />

          {members.length === 0 ? (
            <Placeholder icon={Users}>
              No one has been added to this group yet.
            </Placeholder>
          ) : (
            <ul className="space-y-2">
              {members.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-3 rounded-2xl border p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h2 className="inline-flex items-center gap-2 text-base font-semibold text-foreground">
                <ScrollText className="h-4 w-4 text-primary" />
                Policies
              </h2>
              <p className="text-sm text-muted-foreground">
                Rules that decide what this group can do.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>

          <Separator />

          {policies.length === 0 ? (
            <Placeholder icon={ScrollText}>
              No policies attached to this group yet.
            </Placeholder>
          ) : (
            <ul className="space-y-2">
              {policies.map((policy) => (
                <PolicyRow key={policy.id} policy={policy} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default GroupsDetailsPage;
