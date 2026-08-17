import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Timer,
  CalendarDays,
  LogIn,
  LogOut,
  Minus,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface EmployeeDetailsAttendanceTabProps {
  employeeId: string;
}

type DayStatus =
  | "present"
  | "absent"
  | "late"
  | "half-day"
  | "holiday"
  | "weekend"
  | "future";

interface DayRecord {
  date: number;
  status: DayStatus;
  checkIn?: string;
  checkOut?: string;
  hoursWorked?: number;
}

interface MonthData {
  label: string; // "April 2025"
  year: number;
  month: number; // 0-indexed
  days: DayRecord[];
  stats: {
    present: number;
    absent: number;
    late: number;
    halfDay: number;
    avgCheckIn: string;
    avgHours: number;
    overtime: number;
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Mock data generator ──────────────────────────────────────────────────────
function generateMonth(year: number, month: number): MonthData {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  const statusPool: DayStatus[] = [
    "present",
    "present",
    "present",
    "present",
    "present",
    "present",
    "present",
    "present",
    "present",
    "late",
    "late",
    "absent",
    "half-day",
  ];

  const checkInTimes = [
    "09:02",
    "09:11",
    "09:28",
    "08:55",
    "09:45",
    "10:02",
    "09:03",
    "09:17",
  ];
  const checkOutTimes = [
    "18:05",
    "18:22",
    "17:58",
    "19:10",
    "17:30",
    "18:45",
    "18:00",
    "19:30",
  ];

  const days: DayRecord[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay(); // 0=Sun,6=Sat
    const isWeekend = dow === 0 || dow === 6;
    const isFuture = isCurrentMonth && d > today.getDate();

    let status: DayStatus = "future";
    if (isFuture) {
      status = "future";
    } else if (isWeekend) {
      status = "weekend";
    } else if (d === 15) {
      status = "holiday"; // mock holiday
    } else {
      status = statusPool[Math.floor(Math.random() * statusPool.length)];
    }

    const ciIdx = Math.floor(Math.random() * checkInTimes.length);
    const coIdx = Math.floor(Math.random() * checkOutTimes.length);

    days.push({
      date: d,
      status,
      checkIn:
        status === "present" || status === "late" || status === "half-day"
          ? checkInTimes[ciIdx]
          : undefined,
      checkOut:
        status === "present" || status === "late"
          ? checkOutTimes[coIdx]
          : undefined,
      hoursWorked:
        status === "present"
          ? 7 + Math.random() * 2.5
          : status === "late"
            ? 6 + Math.random() * 1.5
            : status === "half-day"
              ? 4
              : undefined,
    });
  }

  const workDays = days.filter(
    (d) =>
      d.status !== "weekend" && d.status !== "holiday" && d.status !== "future",
  );
  const present = workDays.filter((d) => d.status === "present").length;
  const absent = workDays.filter((d) => d.status === "absent").length;
  const late = workDays.filter((d) => d.status === "late").length;
  const halfDay = workDays.filter((d) => d.status === "half-day").length;
  const totalHrs = days.reduce((s, d) => s + (d.hoursWorked ?? 0), 0);
  const avgHours = present + late > 0 ? totalHrs / (present + late) : 0;
  const overtime = Math.max(0, totalHrs - (present + late) * 8);

  return {
    label: `${monthNames[month]} ${year}`,
    year,
    month,
    days,
    stats: {
      present,
      absent,
      late,
      halfDay,
      avgCheckIn: "09:14",
      avgHours: parseFloat(avgHours.toFixed(1)),
      overtime: parseFloat(overtime.toFixed(1)),
    },
  };
}

// ─── Day status config ────────────────────────────────────────────────────────
const STATUS_CFG = {
  present: {
    bg: "bg-emerald-500/90",
    ring: "ring-emerald-400/40",
    text: "text-white",
    label: "Present",
  },
  absent: {
    bg: "bg-rose-500/90",
    ring: "ring-rose-400/40",
    text: "text-white",
    label: "Absent",
  },
  late: {
    bg: "bg-amber-400/90",
    ring: "ring-amber-300/40",
    text: "text-amber-950",
    label: "Late",
  },
  "half-day": {
    bg: "bg-sky-400/90",
    ring: "ring-sky-300/40",
    text: "text-white",
    label: "Half Day",
  },
  holiday: {
    bg: "bg-violet-400/80",
    ring: "ring-violet-300/40",
    text: "text-white",
    label: "Holiday",
  },
  weekend: {
    bg: "bg-muted",
    ring: "",
    text: "text-muted-foreground",
    label: "Weekend",
  },
  future: {
    bg: "bg-transparent",
    ring: "",
    text: "text-muted-foreground/30",
    label: "—",
  },
} satisfies Record<
  DayStatus,
  { bg: string; ring: string; text: string; label: string }
>;

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, {
      duration: 1,
      ease: CUBIC,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────
function StatTile({
  label,
  value,
  suffix = "",
  icon,
  accent,
  delay = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: CUBIC }}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
    >
      <Card className="relative overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-muted/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="flex items-center gap-3 p-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/70 ${accent}`}
          >
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-0.5 text-2xl font-bold tabular-nums leading-none">
              <Counter to={value} suffix={suffix} />
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Calendar Cell ────────────────────────────────────────────────────────────
function CalCell({ day, index }: { day: DayRecord; index: number }) {
  const cfg = STATUS_CFG[day.status];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: index * 0.012, ease: CUBIC }}
      className="relative flex flex-col items-center gap-0.5"
    >
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex h-9 w-full items-center justify-center rounded-lg text-xs font-semibold
          transition-all duration-150 select-none
          ${cfg.bg} ${cfg.text}
          ${cfg.ring ? `ring-2 ${cfg.ring}` : ""}
          ${day.status === "future" ? "cursor-default" : "cursor-pointer hover:brightness-110 hover:scale-105"}
        `}
      >
        {day.date}

        {/* tooltip */}
        <AnimatePresence>
          {hovered && day.status !== "future" && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-2.5 py-1.5 shadow-lg text-[10px] text-popover-foreground"
            >
              <p className="font-semibold">{cfg.label}</p>
              {day.checkIn && (
                <p className="text-muted-foreground">In: {day.checkIn}</p>
              )}
              {day.checkOut && (
                <p className="text-muted-foreground">Out: {day.checkOut}</p>
              )}
              {day.hoursWorked && (
                <p className="text-muted-foreground">
                  {day.hoursWorked.toFixed(1)}h worked
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

// ─── Calendar Grid ────────────────────────────────────────────────────────────
function CalendarGrid({ data }: { data: MonthData }) {
  // offset: first day of month (Mon=0 … Sun=6)
  const firstDow = new Date(data.year, data.month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1; // convert Sun=0 → Mon=0

  const cells: (DayRecord | null)[] = [
    ...Array(offset).fill(null),
    ...data.days,
  ];
  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col gap-1.5">
      {/* day labels */}
      <div className="grid grid-cols-7 gap-1.5">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className={`text-center text-[10px] font-semibold uppercase tracking-wider
            ${d === "Sat" || d === "Sun" ? "text-muted-foreground/40" : "text-muted-foreground/70"}`}
          >
            {d}
          </div>
        ))}
      </div>
      {/* cells */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) =>
          day ? (
            <CalCell key={day.date} day={day} index={i} />
          ) : (
            <div key={`empty-${i}`} />
          ),
        )}
      </div>
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function Legend() {
  const items: DayStatus[] = [
    "present",
    "late",
    "absent",
    "half-day",
    "holiday",
    "weekend",
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((s) => {
        const cfg = STATUS_CFG[s];
        return (
          <div key={s} className="flex items-center gap-1.5">
            <div
              className={`h-3 w-3 rounded-sm ${cfg.bg} ${cfg.ring ? `ring-1 ${cfg.ring}` : ""}`}
            />
            <span className="text-[10px] text-muted-foreground">
              {cfg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Log Table ────────────────────────────────────────────────────────────────
function LogTable({ data }: { data: MonthData }) {
  const workLogs = data.days
    .filter(
      (d) =>
        d.status !== "weekend" &&
        d.status !== "holiday" &&
        d.status !== "future",
    )
    .slice()
    .reverse();

  if (!workLogs.length) return null;

  const monthStr = data.label;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: CUBIC }}
    >
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-2 pb-3 pt-4 px-5 border-b border-border/50 bg-muted/20">
          <CalendarDays className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">
            Daily Logs — {monthStr}
          </CardTitle>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/10">
                {[
                  "Date",
                  "Status",
                  "Check In",
                  "Check Out",
                  "Hours",
                  "Overtime",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workLogs.map((log, i) => {
                const cfg = STATUS_CFG[log.status];
                const overtime =
                  log.hoursWorked && log.hoursWorked > 8
                    ? `+${(log.hoursWorked - 8).toFixed(1)}h`
                    : null;
                return (
                  <motion.tr
                    key={log.date}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: i * 0.025,
                      ease: CUBIC,
                    }}
                    className="border-b border-border/30 hover:bg-muted/20 transition-colors duration-100"
                  >
                    <td className="px-4 py-2.5 font-medium tabular-nums">
                      {String(log.date).padStart(2, "0")}{" "}
                      {monthStr.split(" ")[0].slice(0, 3)}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset
                        ${
                          log.status === "present"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30"
                            : log.status === "late"
                              ? "bg-amber-50  text-amber-700  ring-amber-600/20  dark:bg-amber-950/40  dark:text-amber-400  dark:ring-amber-500/30"
                              : log.status === "absent"
                                ? "bg-rose-50   text-rose-700   ring-rose-600/20   dark:bg-rose-950/40   dark:text-rose-400   dark:ring-rose-500/30"
                                : log.status === "half-day"
                                  ? "bg-sky-50    text-sky-700    ring-sky-600/20    dark:bg-sky-950/40    dark:text-sky-400    dark:ring-sky-500/30"
                                  : "bg-muted text-muted-foreground ring-border"
                        }`}
                      >
                        {log.status === "present" && (
                          <CheckCircle2 className="h-2.5 w-2.5" />
                        )}
                        {log.status === "absent" && (
                          <XCircle className="h-2.5 w-2.5" />
                        )}
                        {log.status === "late" && (
                          <AlertCircle className="h-2.5 w-2.5" />
                        )}
                        {log.status === "half-day" && (
                          <Minus className="h-2.5 w-2.5" />
                        )}
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      {log.checkIn ? (
                        <span className="flex items-center gap-1 font-mono text-xs tabular-nums text-emerald-600 dark:text-emerald-400">
                          <LogIn className="h-3 w-3" />
                          {log.checkIn}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {log.checkOut ? (
                        <span className="flex items-center gap-1 font-mono text-xs tabular-nums text-rose-500 dark:text-rose-400">
                          <LogOut className="h-3 w-3" />
                          {log.checkOut}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs tabular-nums">
                      {log.hoursWorked ? (
                        `${log.hoursWorked.toFixed(1)}h`
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {overtime ? (
                        <span className="font-mono text-xs font-semibold text-primary">
                          {overtime}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployeeDetailsAttendanceTab({
  employeeId: _employeeId,
}: EmployeeDetailsAttendanceTabProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const data = generateMonth(year, month);

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const next = () => {
    const isCurrentMonth =
      year === today.getFullYear() && month === today.getMonth();
    if (isCurrentMonth) return;
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();
  const pct =
    data.stats.present + data.stats.late > 0
      ? Math.round(
          ((data.stats.present + data.stats.late) /
            (data.stats.present +
              data.stats.absent +
              data.stats.late +
              data.stats.halfDay)) *
            100,
        )
      : 0;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile
          label="Present"
          value={data.stats.present}
          icon={<CheckCircle2 className="h-4 w-4" />}
          accent="text-emerald-500"
          delay={0}
        />
        <StatTile
          label="Absent"
          value={data.stats.absent}
          icon={<XCircle className="h-4 w-4" />}
          accent="text-rose-500"
          delay={0.05}
        />
        <StatTile
          label="Late"
          value={data.stats.late}
          icon={<AlertCircle className="h-4 w-4" />}
          accent="text-amber-500"
          delay={0.1}
        />
        <StatTile
          label="Half Days"
          value={data.stats.halfDay}
          icon={<Minus className="h-4 w-4" />}
          accent="text-sky-500"
          delay={0.15}
        />
        <StatTile
          label="Avg Hours"
          value={data.stats.avgHours}
          suffix="h"
          icon={<Timer className="h-4 w-4" />}
          accent="text-primary"
          delay={0.2}
        />
        <StatTile
          label="Attendance"
          value={pct}
          suffix="%"
          icon={<TrendingUp className="h-4 w-4" />}
          accent="text-violet-500"
          delay={0.25}
        />
      </div>

      {/* ── Calendar card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: CUBIC }}
      >
        <Card className="border-border/60 shadow-sm">
          {/* Month navigator */}
          <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 border-b border-border/50 bg-muted/20">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">
                {data.label}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={prev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={next}
                disabled={isCurrentMonth}
              >
                <ChevronRight
                  className={`h-4 w-4 ${isCurrentMonth ? "opacity-30" : ""}`}
                />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-5 flex flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${year}-${month}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: CUBIC }}
              >
                <CalendarGrid data={data} />
              </motion.div>
            </AnimatePresence>

            <Separator className="opacity-50" />
            <Legend />
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Daily log table ── */}
      <LogTable data={data} />
    </div>
  );
}
