import { Mail, BadgeCheck, Building2, CalendarDays } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@sharpnr/ui";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { OrgUser, UserStatus } from "../data/users.mock";

interface UserCardProps {
  user: OrgUser;
}

/** Initials fallback when the photo fails to load, e.g. "Amelia Carter" -> "AC". */
const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const STATUS_STYLES: Record<UserStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/15 text-emerald-600" },
  invited: { label: "Invited", className: "bg-amber-500/15 text-amber-600" },
  suspended: { label: "Suspended", className: "bg-red-500/15 text-red-600" },
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/** A vertical ID-badge style card for an org member. */
export function UserCard({ user }: UserCardProps) {
  const nav = useNavigate();
  const status = STATUS_STYLES[user.status];

  return (
    <button
      type="button"
      onClick={() =>
        nav({
          to: "/authorization/users/$userID/details",
          params: { userID: user.id },
        })
      }
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-2xl border bg-card text-left",
        "shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      {/* ---- Lanyard header band ---- */}
      <div className="relative h-16 bg-gradient-to-br from-primary to-primary/60">
        {/* Lanyard hole */}
        <span className="absolute left-1/2 top-2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/25" />
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm",
            status.className,
          )}
        >
          {status.label}
        </span>
      </div>

      {/* ---- Photo ---- */}
      <div className="-mt-10 flex flex-col items-center px-5">
        <Avatar className="h-20 w-20 border-4 border-card shadow-md">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-lg font-semibold">
            {initials(user.name)}
          </AvatarFallback>
        </Avatar>

        <h3 className="mt-3 flex items-center gap-1 text-base font-semibold text-foreground">
          {user.name}
          {user.status === "active" && (
            <BadgeCheck className="h-4 w-4 text-primary" />
          )}
        </h3>
        <p className="text-sm text-muted-foreground">{user.title}</p>

        {/* Role chip */}
        <span className="mt-2 rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-foreground">
          {user.role}
        </span>
      </div>

      {/* ---- Details ---- */}
      <div className="mt-4 space-y-2 px-5 pb-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{user.department}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span>Joined {fmtDate(user.joinedAt)}</span>
        </div>
      </div>

      {/* ---- Footer: employee id (badge strip) ---- */}
      <div className="mt-auto flex items-center justify-between border-t bg-muted/30 px-5 py-2.5">
        <span className="font-mono text-xs tracking-wider text-muted-foreground">
          {user.employeeId}
        </span>
        <div className="flex gap-px" aria-hidden="true">
          {/* Decorative barcode for ID-card flavor */}
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-4 bg-foreground/70",
                i % 3 === 0 ? "w-0.5" : "w-px",
              )}
            />
          ))}
        </div>
      </div>
    </button>
  );
}
