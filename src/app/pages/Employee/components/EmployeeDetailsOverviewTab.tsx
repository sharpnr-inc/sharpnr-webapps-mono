import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Building2,
  Users,
  Clock,
  TrendingUp,
  Umbrella,
  UserCheck,
  ChevronRight,
  Cake,
  CreditCard,
  Network,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface EmployeeDetailsOverviewTabProps {
  employeeId: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Mock data — replace with real API call using employeeId ──────────────────
const MOCK = {
  personal: {
    email: "sarah.johnson@acme.com",
    phone: "+91 98765 43210",
    dob: "12 Mar 1992",
    gender: "Female",
    address: "Sector 18, Noida, UP 201301",
    emergencyContact: "Raj Johnson · +91 91234 56789",
  },
  work: {
    designation: "Senior Product Designer",
    department: "Design & UX",
    employmentType: "Full-time",
    joinDate: "04 Aug 2021",
    location: "Noida HQ",
    probationEnd: "04 Feb 2022",
    panNumber: "ABCDE1234F",
    bankAccount: "·· ·· 4821",
  },
  manager: {
    name: "Arjun Mehta",
    designation: "VP of Product",
    initials: "AM",
  },
  stats: {
    tenureMonths: 32,
    attendancePct: 94,
    leavesLeft: 12,
    teamSize: 8,
  },
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({
  to,
  suffix = "",
  duration = 1.2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration,
      ease: CUBIC,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Attendance Ring ──────────────────────────────────────────────────────────
function AttendanceRing({ pct }: { pct: number }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg width="64" height="64" className="-rotate-90">
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="5"
          className="stroke-muted"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={inView ? { strokeDashoffset: circ - dash } : {}}
          transition={{ duration: 1.2, ease: CUBIC, delay: 0.2 }}
        />
      </svg>
      <span className="absolute text-xs font-bold tabular-nums">{pct}%</span>
    </div>
  );
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────
interface StatTileProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent: string;
  delay?: number;
}

function StatTile({ label, icon, children, accent, delay = 0 }: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: CUBIC }}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
    >
      <Card className="relative overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-muted/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="flex items-center gap-4 p-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/70 ${accent}`}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-0.5 text-2xl font-bold tabular-nums leading-none">
              {children}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          {label}
        </span>
        <span
          className={`truncate text-sm font-medium ${mono ? "font-mono" : ""}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({
  title,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: CUBIC }}
    >
      <Card className="border-border/60 shadow-sm h-full">
        <CardHeader className="flex flex-row items-center gap-2 pb-3 pt-4 px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </CardHeader>

        <Separator className="mb-1 opacity-50" />

        <CardContent className="px-5 pb-4 divide-y divide-border/40">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Manager Card ─────────────────────────────────────────────────────────────
function ManagerCard({ delay = 0 }: { delay?: number }) {
  const { name, designation, initials } = MOCK.manager;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: CUBIC }}
    >
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 pb-3 pt-4 px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Network className="h-3.5 w-3.5" />
          </div>
          <CardTitle className="text-sm font-semibold">
            Reporting Manager
          </CardTitle>
        </CardHeader>

        <Separator className="mb-1 opacity-50" />

        <CardContent className="px-5 pb-4 pt-3">
          <motion.div
            whileHover={{ x: 3, transition: { duration: 0.18 } }}
            className="flex items-center gap-3 group cursor-default"
          >
            {/* avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/15 text-sm font-bold text-primary">
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {designation}
              </p>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Employment Type Badge ────────────────────────────────────────────────────
function TypeBadge({ type }: { type: string }) {
  return (
    <Badge
      variant="secondary"
      className="rounded-md px-1.5 py-0 text-[10px] font-semibold h-5"
    >
      {type}
    </Badge>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployeeDetailsOverviewTab({
  employeeId: _employeeId,
}: EmployeeDetailsOverviewTabProps) {
  const { stats, personal, work, manager: _manager } = MOCK;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          label="Tenure"
          icon={<Clock className="h-5 w-5" />}
          accent="text-primary"
          delay={0}
        >
          <Counter to={stats.tenureMonths} suffix=" mo" />
        </StatTile>

        <StatTile
          label="Attendance"
          icon={<AttendanceRing pct={stats.attendancePct} />}
          accent=""
          delay={0.06}
        >
          <Counter to={stats.attendancePct} suffix="%" />
        </StatTile>

        <StatTile
          label="Leaves Left"
          icon={<Umbrella className="h-5 w-5" />}
          accent="text-amber-500"
          delay={0.12}
        >
          <Counter to={stats.leavesLeft} suffix=" days" />
        </StatTile>

        <StatTile
          label="Team Size"
          icon={<Users className="h-5 w-5" />}
          accent="text-sky-500"
          delay={0.18}
        >
          <Counter to={stats.teamSize} suffix=" people" />
        </StatTile>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Personal Info */}
        <SectionCard
          title="Personal Information"
          icon={<UserCheck className="h-3.5 w-3.5" />}
          delay={0.1}
        >
          <InfoRow
            icon={<Mail className="h-3.5 w-3.5" />}
            label="Email"
            value={personal.email}
          />
          <InfoRow
            icon={<Phone className="h-3.5 w-3.5" />}
            label="Phone"
            value={personal.phone}
          />
          <InfoRow
            icon={<Cake className="h-3.5 w-3.5" />}
            label="Date of Birth"
            value={personal.dob}
          />
          <InfoRow
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Address"
            value={personal.address}
          />
          <InfoRow
            icon={<Phone className="h-3.5 w-3.5" />}
            label="Emergency Contact"
            value={personal.emergencyContact}
          />
        </SectionCard>

        {/* Work Info */}
        <SectionCard
          title="Work Information"
          icon={<Briefcase className="h-3.5 w-3.5" />}
          delay={0.16}
        >
          <InfoRow
            icon={<TrendingUp className="h-3.5 w-3.5" />}
            label="Designation"
            value={work.designation}
          />
          <InfoRow
            icon={<Building2 className="h-3.5 w-3.5" />}
            label="Department"
            value={work.department}
          />
          <InfoRow
            icon={<Calendar className="h-3.5 w-3.5" />}
            label="Joining Date"
            value={work.joinDate}
          />
          <InfoRow
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Work Location"
            value={work.location}
          />
          <div className="flex items-start gap-3 py-2.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                  Employment Type
                </span>
                <TypeBadge type={work.employmentType} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Right column: Manager + Payroll */}
        <div className="flex flex-col gap-4">
          <ManagerCard delay={0.22} />

          <SectionCard
            title="Payroll & Identity"
            icon={<CreditCard className="h-3.5 w-3.5" />}
            delay={0.28}
          >
            <InfoRow
              icon={<CreditCard className="h-3.5 w-3.5" />}
              label="PAN Number"
              value={work.panNumber}
              mono
            />
            <InfoRow
              icon={<CreditCard className="h-3.5 w-3.5" />}
              label="Bank Account"
              value={work.bankAccount}
              mono
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
