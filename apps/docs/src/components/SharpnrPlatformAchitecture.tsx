"use client";

import { useEffect, useRef } from "react";

// ─── types ────────────────────────────────────────────────────────────────────

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
  dash: number[];
  packetColor: string;
}

interface Packet {
  conn: Connection;
  t: number;
  speed: number;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function quadBezier(t: number, p0: number, p1: number, p2: number): number {
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

function getCenter(el: Element, wrap: Element) {
  const r = el.getBoundingClientRect();
  const w = wrap.getBoundingClientRect();
  return { x: r.left - w.left + r.width / 2, y: r.top - w.top + r.height / 2 };
}
function getBottom(el: Element, wrap: Element) {
  const r = el.getBoundingClientRect();
  const w = wrap.getBoundingClientRect();
  return r.bottom - w.top;
}
function getTop(el: Element, wrap: Element) {
  const r = el.getBoundingClientRect();
  const w = wrap.getBoundingClientRect();
  return r.top - w.top;
}

function packetAlpha(t: number) {
  if (t < 0.1) return t / 0.1;
  if (t > 0.9) return (1 - t) / 0.1;
  return 1;
}

// ─── sub-components ───────────────────────────────────────────────────────────

function LayerLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-8 mb-3">
      <span className="font-mono text-[10px] tracking-widest uppercase text-[#4a5068] border border-white/[0.08] rounded-full px-3 py-1 bg-[#141720]/60 backdrop-blur-sm whitespace-nowrap">
        {index} · {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
    </div>
  );
}

function AppCard({
  id,
  title,
  subtitle,
  tags,
  dotColor,
  glowColor,
}: {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  dotColor: string;
  glowColor: string;
}) {
  return (
    <div
      id={id}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#141720] p-4 flex flex-col gap-2 overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
    >
      {/* inner glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 100%, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="flex items-center gap-2 relative z-10">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
        />
        <span className="text-[13px] font-semibold text-[#e8eaf0]">
          {title}
        </span>
      </div>
      <div className="font-mono text-[11px] text-[#7a8099] relative z-10">
        {subtitle}
      </div>
      <div className="flex flex-wrap gap-1 relative z-10">
        {tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] text-[#4a5068] border border-white/[0.08] rounded px-1.5 py-0.5 bg-white/[0.02]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceChip({
  id,
  icon,
  name,
  desc,
}: {
  id: string;
  icon: string;
  name: string;
  desc: string;
}) {
  return (
    <div
      id={id}
      className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#141720] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5b7fff]/40"
    >
      <div className="w-9 h-9 rounded-[9px] bg-[#1a1f2e] border border-white/[0.08] flex items-center justify-center text-base">
        {icon}
      </div>
      <div className="text-[11px] font-semibold text-[#e8eaf0] text-center leading-tight">
        {name}
      </div>
      <div className="font-mono text-[10px] text-[#7a8099] text-center">
        {desc}
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export function SharpnrPlatformArchitecture() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const packetsRef = useRef<Packet[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas!.width = wrap!.offsetWidth;
      canvas!.height = wrap!.offsetHeight;
    }

    function buildConnections(): Connection[] {
      const ids = {
        hosp: "arch-hosp",
        retail: "arch-retail",
        health: "arch-health",
        org: "arch-org",
        core: "arch-core",
        accounting: "arch-svc-accounting",
        hrms: "arch-svc-hrms",
        iam: "arch-svc-iam",
        silo: "arch-svc-silo",
        cable: "arch-svc-cable",
        orch: "arch-svc-orch",
      };

      const el = (id: string) => document.getElementById(id);

      const hosp = el(ids.hosp);
      const retail = el(ids.retail);
      const health = el(ids.health);
      const org = el(ids.org);
      const core = el(ids.core);
      const svcIds = [
        ids.accounting,
        ids.hrms,
        ids.iam,
        ids.silo,
        ids.cable,
        ids.orch,
      ];

      if (!hosp || !retail || !health || !org || !core) return [];

      const conns: Connection[] = [];

      // Apps → Org
      const appColors = ["#3ecfaa", "#5b7fff", "#e05dff"];
      [hosp, retail, health].forEach((card, i) => {
        conns.push({
          x1: getCenter(card, wrap!).x,
          y1: getBottom(card, wrap!),
          x2: getCenter(org!, wrap!).x,
          y2: getTop(org!, wrap!),
          color: appColors[i],
          width: 1.2,
          dash: [],
          packetColor: appColors[i],
        });
      });

      // Org → Core
      conns.push({
        x1: getCenter(org!, wrap!).x,
        y1: getBottom(org!, wrap!),
        x2: getCenter(core!, wrap!).x,
        y2: getTop(core!, wrap!) - 16,
        color: "#5b7fff",
        width: 1.5,
        dash: [],
        packetColor: "#5b7fff",
      });

      // Core → Services
      const svcColors = [
        "#f5a623",
        "#3ecfaa",
        "#5b7fff",
        "#e05dff",
        "#3ecfaa",
        "#f5a623",
      ];
      svcIds.forEach((svcId, i) => {
        const svc = el(svcId);
        if (!svc) return;
        conns.push({
          x1: getCenter(core!, wrap!).x,
          y1: getBottom(core!, wrap!) + 16,
          x2: getCenter(svc, wrap!).x,
          y2: getTop(svc, wrap!),
          color: svcColors[i],
          width: 1,
          dash: [4, 4],
          packetColor: svcColors[i],
        });
      });

      return conns;
    }

    function buildPackets(conns: Connection[]): Packet[] {
      return conns.flatMap((conn, _) => {
        const count = conn.dash.length ? 1 : 2;
        return Array.from({ length: count }, (_, i) => ({
          conn,
          t: i / count,
          speed: 0.003 + Math.random() * 0.003,
        }));
      });
    }

    function drawCurve(c: Connection) {
      const mx = (c.x1 + c.x2) / 2;
      const my = (c.y1 + c.y2) / 2 - 20;
      ctx.beginPath();
      ctx.moveTo(c.x1, c.y1);
      ctx.quadraticCurveTo(mx, my, c.x2, c.y2);
      ctx.strokeStyle = c.color;
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = c.width;
      ctx.setLineDash(c.dash);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
    }

    function drawPacket(p: Packet) {
      const c = p.conn;
      const mx = (c.x1 + c.x2) / 2;
      const my = (c.y1 + c.y2) / 2 - 20;
      const x = quadBezier(p.t, c.x1, mx, c.x2);
      const y = quadBezier(p.t, c.y1, my, c.y2);
      const alpha = packetAlpha(p.t);

      // glow ring
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = c.packetColor;
      ctx.globalAlpha = alpha * 0.25;
      ctx.fill();

      // core dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = c.packetColor;
      ctx.globalAlpha = alpha;
      ctx.fill();

      ctx.globalAlpha = 1;
    }

    function tick() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      const conns = connectionsRef.current;
      const packets = packetsRef.current;

      conns.forEach(drawCurve);
      packets.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        drawPacket(p);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    function init() {
      resize();
      connectionsRef.current = buildConnections();
      packetsRef.current = buildPackets(connectionsRef.current);
    }

    // Give DOM a frame to paint before measuring
    const timer = setTimeout(() => {
      init();
      tick();
    }, 250);

    const handleResize = () => {
      resize();
      connectionsRef.current = buildConnections();
      packetsRef.current = buildPackets(connectionsRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0e13]"
      style={{ minHeight: 820 }}
    >
      {/* dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91,127,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91,127,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* animated connection canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
      />

      {/* content */}
      <div className="relative z-10 flex flex-col gap-0 py-8">
        {/* ── Header ───────────────────────────────── */}
        <div className="flex items-center justify-between px-8 mb-8">
          <div>
            <h1 className="text-lg font-semibold text-[#e8eaf0] tracking-tight">
              Sharpnr Suite
            </h1>
            <p className="font-mono text-[11px] text-[#7a8099] mt-0.5">
              Platform Architecture · v2.0
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#3ecfaa]"
              style={{
                boxShadow: "0 0 6px #3ecfaa",
                animation: "sharpnr-blink 2s ease-in-out infinite",
              }}
            />
            <span className="font-mono text-[11px] text-[#3ecfaa]">
              All systems operational
            </span>
          </div>
        </div>

        {/* ── Layer 01: Business Operations ────────── */}
        <LayerLabel index="01" label="Business Operations" />

        <div className="grid grid-cols-3 gap-3 px-8 mb-8">
          <AppCard
            id="arch-hosp"
            title="Sharp Hospitality"
            subtitle="Restaurants · Hotels · Bars"
            tags={["table mgmt", "reservations", "kitchen ops"]}
            dotColor="#3ecfaa"
            glowColor="rgba(62,207,170,0.15)"
          />
          <AppCard
            id="arch-retail"
            title="Sharp Retail"
            subtitle="POS · Inventory · Commerce"
            tags={["point of sale", "stock tracking", "reporting"]}
            dotColor="#5b7fff"
            glowColor="rgba(91,127,255,0.18)"
          />
          <AppCard
            id="arch-health"
            title="Sharp Healthcare"
            subtitle="Clinics · Hospitals"
            tags={["appointments", "patient records", "billing"]}
            dotColor="#e05dff"
            glowColor="rgba(224,93,255,0.12)"
          />
        </div>

        {/* divider */}
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── Layer 02: Your Organisation ──────────── */}
        <LayerLabel index="02" label="Your Organisation" />

        <div className="px-8 mb-8">
          <div
            id="arch-org"
            className="relative rounded-2xl border border-white/[0.08] bg-[#141720] p-6 overflow-hidden"
          >
            {/* top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(91,127,255,0.5), transparent)",
              }}
            />
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-[#e8eaf0] mb-1.5">
                  Your Business
                </div>
                <div className="text-[12px] text-[#7a8099] leading-relaxed max-w-xl">
                  The central entity that owns and operates day-to-day
                  activities. Industry apps serve this layer; shared services
                  support it.
                </div>
              </div>
              <div className="flex items-center gap-5 flex-shrink-0">
                <Stat value="3" label="industry apps" />
                <div className="w-px h-8 bg-white/[0.08]" />
                <Stat value="6" label="shared services" />
                <div className="w-px h-8 bg-white/[0.08]" />
                <Stat value="100%" label="uptime target" color="#3ecfaa" />
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── Layer 03: Core ───────────────────────── */}
        <LayerLabel index="03" label="Sharpnr Platform Core" />

        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-2">
            {/* orb */}
            <div
              ref={orbRef}
              id="arch-core"
              className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#5b7fff]/35 bg-[#1a1f2e] text-[13px] font-semibold text-[#e8eaf0] tracking-wide"
              style={{ animation: "sharpnr-bob 3s ease-in-out infinite" }}
            >
              {/* pulse rings */}
              <span
                className="absolute inset-[-10px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(91,127,255,0.12), transparent 70%)",
                  animation: "sharpnr-pulse 3s ease-in-out infinite",
                }}
              />
              <span
                className="absolute inset-[-22px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(91,127,255,0.06), transparent 70%)",
                  animation: "sharpnr-pulse 3s ease-in-out infinite 0.5s",
                }}
              />
              Sharpnr
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── Layer 04: Shared Services ─────────────── */}
        <LayerLabel index="04" label="Shared Services" />

        <div className="grid grid-cols-6 gap-2.5 px-8">
          <ServiceChip
            id="arch-svc-accounting"
            icon="🧾"
            name="Accounting"
            desc="Financials"
          />
          <ServiceChip
            id="arch-svc-hrms"
            icon="👥"
            name="HRMS"
            desc="Payroll & HR"
          />
          <ServiceChip
            id="arch-svc-iam"
            icon="🔐"
            name="IAM"
            desc="Auth & roles"
          />
          <ServiceChip
            id="arch-svc-silo"
            icon="🗄️"
            name="Silo"
            desc="Storage"
          />
          <ServiceChip
            id="arch-svc-cable"
            icon="🔗"
            name="Cable"
            desc="Integrations"
          />
          <ServiceChip
            id="arch-svc-orch"
            icon="⚙️"
            name="Orchestrator"
            desc="Workflows"
          />
        </div>
      </div>

      {/* global keyframes injected once */}
      <style>{`
        @keyframes sharpnr-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes sharpnr-bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes sharpnr-pulse {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.12); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// ─── tiny helper ──────────────────────────────────────────────────────────────

function Stat({
  value,
  label,
  color = "#e8eaf0",
}: {
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <div className="text-center">
      <div className="text-lg font-semibold" style={{ color }}>
        {value}
      </div>
      <div className="font-mono text-[10px] text-[#7a8099] mt-0.5">{label}</div>
    </div>
  );
}
