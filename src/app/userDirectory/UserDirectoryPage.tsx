"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
type Role = "owner" | "admin" | "engineer" | "viewer" | "billing";
type Status = "active" | "idle" | "offline";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  products: string[];
  joined: string;
  lastSeen: string;
  initials: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const USERS: User[] = [
  {
    id: "u1",
    name: "Arjun Mehta",
    email: "arjun@sharpnr.io",
    role: "owner",
    status: "active",
    products: ["Alpha", "Relay", "Vault", "Grid", "Router", "Console"],
    joined: "Jan 2023",
    lastSeen: "now",
    initials: "AM",
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "priya@sharpnr.io",
    role: "admin",
    status: "active",
    products: ["Alpha", "Relay", "Vault", "Router"],
    joined: "Mar 2023",
    lastSeen: "2m ago",
    initials: "PS",
  },
  {
    id: "u3",
    name: "Leon Fischer",
    email: "leon@sharpnr.io",
    role: "engineer",
    status: "active",
    products: ["Grid", "Console", "Relay"],
    joined: "Jun 2023",
    lastSeen: "14m ago",
    initials: "LF",
  },
  {
    id: "u4",
    name: "Soo-Yeon Park",
    email: "sooyeon@sharpnr.io",
    role: "engineer",
    status: "idle",
    products: ["Alpha", "Console"],
    joined: "Aug 2023",
    lastSeen: "1h ago",
    initials: "SP",
  },
  {
    id: "u5",
    name: "Marcus Webb",
    email: "marcus@sharpnr.io",
    role: "admin",
    status: "active",
    products: ["Vault", "Router", "Grid"],
    joined: "Feb 2023",
    lastSeen: "5m ago",
    initials: "MW",
  },
  {
    id: "u6",
    name: "Divya Iyer",
    email: "divya@sharpnr.io",
    role: "engineer",
    status: "offline",
    products: ["Relay"],
    joined: "Oct 2023",
    lastSeen: "3d ago",
    initials: "DI",
  },
  {
    id: "u7",
    name: "Tom Nakamura",
    email: "tom@sharpnr.io",
    role: "viewer",
    status: "offline",
    products: ["Alpha", "Router"],
    joined: "Nov 2023",
    lastSeen: "1w ago",
    initials: "TN",
  },
  {
    id: "u8",
    name: "Amara Okonkwo",
    email: "amara@sharpnr.io",
    role: "engineer",
    status: "active",
    products: ["Grid", "Console", "Vault", "Router"],
    joined: "Sep 2023",
    lastSeen: "just now",
    initials: "AO",
  },
  {
    id: "u9",
    name: "Rafael Torres",
    email: "rafael@sharpnr.io",
    role: "billing",
    status: "idle",
    products: ["Alpha"],
    joined: "Jan 2024",
    lastSeen: "2h ago",
    initials: "RT",
  },
  {
    id: "u10",
    name: "Elena Voronova",
    email: "elena@sharpnr.io",
    role: "engineer",
    status: "active",
    products: ["Console", "Relay", "Alpha"],
    joined: "Dec 2023",
    lastSeen: "8m ago",
    initials: "EV",
  },
  {
    id: "u11",
    name: "James Oduya",
    email: "james@sharpnr.io",
    role: "viewer",
    status: "idle",
    products: ["Router", "Grid"],
    joined: "Feb 2024",
    lastSeen: "4h ago",
    initials: "JO",
  },
  {
    id: "u12",
    name: "Mei-Lin Zhao",
    email: "meilin@sharpnr.io",
    role: "engineer",
    status: "active",
    products: ["Alpha", "Vault", "Console"],
    joined: "Mar 2024",
    lastSeen: "1m ago",
    initials: "MZ",
  },
];

const ALL_ROLES: Role[] = ["owner", "admin", "engineer", "viewer", "billing"];
const ALL_PRODUCTS = ["Alpha", "Relay", "Vault", "Grid", "Router", "Console"];

// ─── Role config ─────────────────────────────────────────────────────────────
const ROLE_META: Record<Role, { label: string; color: string }> = {
  owner: { label: "Owner", color: "hsl(var(--primary))" },
  admin: { label: "Admin", color: "hsl(var(--foreground))" },
  engineer: { label: "Engineer", color: "hsl(var(--muted-foreground))" },
  viewer: { label: "Viewer", color: "hsl(var(--muted-foreground))" },
  billing: { label: "Billing", color: "hsl(var(--muted-foreground))" },
};

const STATUS_META: Record<Status, { color: string; label: string }> = {
  active: { color: "hsl(142 71% 45%)", label: "Active" },
  idle: { color: "hsl(var(--muted-foreground))", label: "Idle" },
  offline: { color: "hsl(var(--border))", label: "Offline" },
};

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icons = {
  search: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  ),
  filter: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
    >
      <path d="M22 3H2l8 9.46V19l4 2v-8.54Z" strokeLinejoin="round" />
    </svg>
  ),
  grid: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  list: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
    >
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        strokeLinecap="round"
      />
    </svg>
  ),
  plus: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  ),
  chevron: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-3 h-3"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  x: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-3 h-3"
    >
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  ),
  dots: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
    >
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-3 h-3"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function PulseDot({ status }: { status: Status }) {
  const { color } = STATUS_META[status];
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {status === "active" && (
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      )}
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

function Avatar({
  user,
  size = "md",
}: {
  user: User;
  size?: "sm" | "md" | "lg";
}) {
  const sz = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-xs",
    lg: "w-12 h-12 text-sm",
  }[size];
  return (
    <div
      className={`${sz} rounded-none border border-border bg-muted flex items-center justify-center font-mono font-semibold text-foreground shrink-0 relative overflow-hidden`}
    >
      <span>{user.initials}</span>
    </div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const { label, color } = ROLE_META[role];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 border border-border"
      style={{ color }}
    >
      {role === "owner" && <span className="w-2.5 h-2.5">{Icons.shield}</span>}
      {label}
    </span>
  );
}

function ProductPip({ name }: { name: string }) {
  return (
    <span className="text-xs font-mono px-1.5 py-0.5 bg-muted text-muted-foreground border border-border/60">
      {name}
    </span>
  );
}

// ─── User Card (grid view) ────────────────────────────────────────────────────
function UserCard({
  user,
  index,
  onClick,
}: {
  user: User;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative border border-border bg-card/60 backdrop-blur-sm p-5 cursor-pointer overflow-hidden group"
      style={{
        boxShadow: hovered ? "0 0 0 1px hsl(var(--primary)/0.35)" : "none",
      }}
    >
      {/* hover glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.05), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* sweep line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner brackets */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((cls) => (
        <span
          key={cls}
          className={`absolute w-2.5 h-2.5 border-border ${cls}`}
        />
      ))}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar user={user} size="md" />
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">
              {user.name}
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 pt-0.5">
          <PulseDot status={user.status} />
          <span className="text-xs font-mono text-muted-foreground">
            {STATUS_META[user.status].label}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <RoleBadge role={user.role} />
        <span className="text-xs font-mono text-muted-foreground">
          {user.lastSeen}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {user.products.slice(0, 4).map((p) => (
          <ProductPip key={p} name={p} />
        ))}
        {user.products.length > 4 && (
          <span className="text-xs font-mono px-1.5 py-0.5 text-muted-foreground">
            +{user.products.length - 4}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── User Row (list view) ────────────────────────────────────────────────────
function UserRow({
  user,
  index,
  onClick,
}: {
  user: User;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="border-b border-border/60 cursor-pointer group"
      style={{ background: hovered ? "hsl(var(--muted)/0.4)" : "transparent" }}
    >
      <td className="py-3 pl-5 pr-3">
        <div className="flex items-center gap-3">
          <Avatar user={user} size="sm" />
          <div>
            <p className="text-sm font-medium text-foreground leading-none">
              {user.name}
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">
              {user.email}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
        <RoleBadge role={user.role} />
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-1.5">
          <PulseDot status={user.status} />
          <span className="text-xs font-mono text-muted-foreground">
            {STATUS_META[user.status].label}
          </span>
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex flex-wrap gap-1">
          {user.products.slice(0, 3).map((p) => (
            <ProductPip key={p} name={p} />
          ))}
          {user.products.length > 3 && (
            <span className="text-xs font-mono text-muted-foreground px-1">
              +{user.products.length - 3}
            </span>
          )}
        </div>
      </td>
      <td className="py-3 px-3">
        <span className="text-xs font-mono text-muted-foreground">
          {user.joined}
        </span>
      </td>
      <td className="py-3 pl-3 pr-5 text-right">
        <span className="text-xs font-mono text-muted-foreground">
          {user.lastSeen}
        </span>
      </td>
    </motion.tr>
  );
}

// ─── User Detail Drawer ───────────────────────────────────────────────────────
function UserDrawer({
  user,
  onClose,
}: {
  user: User | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {user && (
        <>
          <motion.div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                  User Profile
                </p>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground p-1 border border-border hover:bg-muted transition-colors"
                >
                  {Icons.x}
                </button>
              </div>

              {/* Avatar + identity */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 border border-border bg-muted flex items-center justify-center font-mono font-bold text-lg text-foreground">
                  {user.initials}
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{user.name}</h2>
                  <p className="text-xs font-mono text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Status row */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-muted/30 border border-border/60">
                <PulseDot status={user.status} />
                <span className="text-xs font-mono text-foreground">
                  {STATUS_META[user.status].label}
                </span>
                <span className="text-border">·</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {user.lastSeen}
                </span>
              </div>

              {/* Meta rows */}
              <div className="space-y-0 border border-border mb-6">
                {[
                  { label: "Role", value: <RoleBadge role={user.role} /> },
                  {
                    label: "Joined",
                    value: (
                      <span className="text-xs font-mono">{user.joined}</span>
                    ),
                  },
                  {
                    label: "ID",
                    value: (
                      <span className="text-xs font-mono text-muted-foreground">
                        {user.id}
                      </span>
                    ),
                  },
                ].map(({ label, value }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 border-b border-border/60 last:border-b-0"
                  >
                    <span className="text-xs font-mono text-muted-foreground">
                      {label}
                    </span>
                    {value}
                  </div>
                ))}
              </div>

              {/* Products */}
              <div className="mb-6">
                <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-3">
                  Product Access
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_PRODUCTS.map((p) => {
                    const has = user.products.includes(p);
                    return (
                      <span
                        key={p}
                        className={`text-xs font-mono px-2 py-1 border ${has ? "border-primary/40 text-foreground bg-primary/5" : "border-border/40 text-muted-foreground/40"}`}
                      >
                        {p}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 border-t border-border pt-6">
                <button className="w-full text-xs font-mono border border-border px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-left">
                  Edit Permissions →
                </button>
                <button className="w-full text-xs font-mono border border-border px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-left">
                  Manage Product Access →
                </button>
                <button className="w-full text-xs font-mono border border-destructive/40 px-4 py-2.5 text-destructive hover:bg-destructive/5 transition-colors text-left">
                  Revoke Access
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function UserDirectoryPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [productFilter, setProductFilter] = useState<string | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<User | null>(null);

  const filtered = useMemo(() => {
    return USERS.filter((u) => {
      const q = search.toLowerCase();
      const matchQ =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchR = roleFilter === "all" || u.role === roleFilter;
      const matchS = statusFilter === "all" || u.status === statusFilter;
      const matchP =
        productFilter === "all" || u.products.includes(productFilter);
      return matchQ && matchR && matchS && matchP;
    });
  }, [search, roleFilter, statusFilter, productFilter]);

  const stats = useMemo(
    () => ({
      total: USERS.length,
      active: USERS.filter((u) => u.status === "active").length,
      admins: USERS.filter((u) => u.role === "owner" || u.role === "admin")
        .length,
    }),
    [],
  );

  const activeFilters = [
    roleFilter !== "all" && {
      label: ROLE_META[roleFilter].label,
      clear: () => setRoleFilter("all"),
    },
    statusFilter !== "all" && {
      label: STATUS_META[statusFilter].label,
      clear: () => setStatusFilter("all"),
    },
    productFilter !== "all" && {
      label: productFilter,
      clear: () => setProductFilter("all"),
    },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className=" bg-background text-foreground font-sans antialiased">
      {/* Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');`}</style>

      {/* ── Page header ── */}
      <div className="border-b border-border">
        <div className=" mx-auto px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
              Sharpnr Orchestrator / Organization
            </p>
            <div className="flex items-end justify-between gap-4">
              <h1
                className="text-3xl md:text-4xl font-bold text-foreground"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                User Directory
              </h1>
              <motion.button
                className="flex items-center gap-2 text-xs font-mono border border-primary/50 bg-primary/5 text-primary px-4 py-2.5 hover:bg-primary/10 transition-colors shrink-0"
                whileTap={{ scale: 0.97 }}
              >
                {Icons.plus}
                <span>Invite Member</span>
              </motion.button>
            </div>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            className="flex items-center gap-6 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: "Total Members", value: stats.total },
              { label: "Active Now", value: stats.active },
              { label: "Admins & Owners", value: stats.admins },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <span className="w-px h-6 bg-border" />}
                <div>
                  <p className="text-xl font-bold text-foreground font-mono">
                    {s.value}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="border-b border-border bg-muted/20 sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {Icons.search}
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members…"
              className="w-full bg-background border border-border pl-8 pr-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Role */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as Role | "all")}
                className="appearance-none bg-background border border-border text-xs font-mono text-foreground px-3 py-2 pr-6 outline-none focus:border-primary/60 transition-colors cursor-pointer"
              >
                <option value="all">All Roles</option>
                {ALL_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_META[r].label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                {Icons.chevron}
              </span>
            </div>

            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
                className="appearance-none bg-background border border-border text-xs font-mono text-foreground px-3 py-2 pr-6 outline-none focus:border-primary/60 transition-colors cursor-pointer"
              >
                <option value="all">All Status</option>
                {(["active", "idle", "offline"] as Status[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s].label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                {Icons.chevron}
              </span>
            </div>

            {/* Product */}
            <div className="relative">
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="appearance-none bg-background border border-border text-xs font-mono text-foreground px-3 py-2 pr-6 outline-none focus:border-primary/60 transition-colors cursor-pointer"
              >
                <option value="all">All Products</option>
                {ALL_PRODUCTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                {Icons.chevron}
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Results count */}
          <span className="text-xs font-mono text-muted-foreground">
            {filtered.length} / {USERS.length}
          </span>

          {/* View toggle */}
          <div className="flex border border-border">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`p-2 transition-colors ${view === v ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {v === "grid" ? Icons.grid : Icons.list}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter chips */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border/60 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">
                  {Icons.filter}
                </span>
                {activeFilters.map((f, i) => (
                  <button
                    key={i}
                    onClick={f.clear}
                    className="flex items-center gap-1.5 text-xs font-mono border border-primary/40 text-primary px-2 py-0.5 hover:bg-primary/5 transition-colors"
                  >
                    {f.label}
                    <span>{Icons.x}</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setRoleFilter("all");
                    setStatusFilter("all");
                    setProductFilter("all");
                  }}
                  className="text-xs font-mono text-muted-foreground hover:text-foreground ml-1 underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <p className="text-3xl mb-3 opacity-20">⌀</p>
              <p className="text-sm font-mono text-muted-foreground">
                No users match your filters
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                  setProductFilter("all");
                }}
                className="mt-4 text-xs font-mono text-primary underline underline-offset-2"
              >
                Clear filters
              </button>
            </motion.div>
          ) : view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            >
              <AnimatePresence>
                {filtered.map((u, i) => (
                  <UserCard
                    key={u.id}
                    user={u}
                    index={i}
                    onClick={() => setSelected(u)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border border-border overflow-hidden"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {[
                      "Member",
                      "Role",
                      "Status",
                      "Products",
                      "Joined",
                      "Last Seen",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-mono text-muted-foreground tracking-widest uppercase px-3 first:pl-5 last:pr-5 last:text-right py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((u, i) => (
                      <UserRow
                        key={u.id}
                        user={u}
                        index={i}
                        onClick={() => setSelected(u)}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Drawer ── */}
      <UserDrawer user={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
