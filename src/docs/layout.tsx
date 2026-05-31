// src/docs/layout.tsx
import { Link, Outlet } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  BookOpen,
  Rocket,
  Settings,
  Users,
  AppWindow,
  Plug,
  Server,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    items: [
      { label: "Introduction", href: "/docs", icon: BookOpen },
      { label: "Getting Started", href: "/docs/getting-started", icon: Rocket },
    ],
  },
  {
    title: "Setup",
    items: [
      { label: "Installation", href: "/docs/installation", icon: Settings },
      { label: "Configuration", href: "/docs/configuration", icon: Settings },
      { label: "User Management", href: "/docs/user-management", icon: Users },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Applications", href: "/docs/applications", icon: AppWindow },
      { label: "API Integration", href: "/docs/api", icon: Plug },
      { label: "Deployment", href: "/docs/deployment", icon: Server },
      {
        label: "Troubleshooting",
        href: "/docs/troubleshooting",
        icon: HelpCircle,
      },
    ],
  },
];

export function DocsLayout() {
  const sidebarRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sidebarRef.current) return;

    // Stagger-animate all nav items on mount
    const items = sidebarRef.current.querySelectorAll(".nav-item");
    gsap.fromTo(
      items,
      { x: -12, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.out",
        delay: 0.1,
      },
    );

    // Section labels fade up
    const labels = sidebarRef.current.querySelectorAll(".section-label");
    gsap.fromTo(
      labels,
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    );

    // Ambient glow pulse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    // ── THE FIX: h-screen + overflow-hidden on the root container ──
    // This gives the sidebar a bounded parent to stick inside.
    // The sidebar and main scroll independently within this fixed frame.
    <div className=" overflow-hidden bg-[#0a0a0f] flex">
      {/* ── Sidebar ── */}
      <aside
        ref={sidebarRef}
        className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/[0.06] h-full overflow-y-auto relative"
      >
        {/* Ambient violet glow — purely decorative */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="px-4 py-5 border-b border-white/[0.06] relative z-10">
          <span className="text-[9px] font-bold text-white/25 tracking-[0.15em] uppercase font-mono">
            Documentation
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-6 relative z-10">
          {navSections.map((section) => (
            <div key={section.title}>
              {/* Section label */}
              <div className="section-label px-2 mb-2 text-[9px] font-bold text-white/20 tracking-[0.14em] uppercase font-mono">
                {section.title}
              </div>

              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="nav-item group relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-white/45 hover:text-white hover:bg-white/[0.05] transition-all duration-150 no-underline text-[13px] font-medium"
                    activeProps={{
                      className:
                        "nav-item group relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 no-underline text-[13px] font-medium bg-violet-500/10 text-violet-400 hover:bg-violet-500/[0.14] hover:text-violet-300",
                    }}
                  >
                    {/* Active left-border accent */}
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-l-full bg-violet-500/0 group-[.active]:bg-violet-500/70 transition-all duration-200" />

                    <item.icon className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-150" />
                    <span className="flex-1 leading-none">{item.label}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-35 -translate-x-1.5 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-[9px] text-white/18 font-mono tracking-wide">
            SharpNR Docs v1.0
          </span>
        </div>
      </aside>

      {/* ── Main content — scrolls independently ── */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
