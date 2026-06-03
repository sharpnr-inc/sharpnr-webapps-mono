// src/docs/layout.tsx
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
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
import Footer from "@/components/footer/Footer";
import { TableOfContents } from "./TableOfContents";

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
  const { location } = useRouterState();
  const currentPath = location.pathname.replace(/\/$/, "");

  useEffect(() => {
    if (!sidebarRef.current) return;

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

    const labels = sidebarRef.current.querySelectorAll(".section-label");
    gsap.fromTo(
      labels,
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    );

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

  const isActive = (href: string) => {
    const normalised = href.replace(/\/$/, "");
    if (normalised === "/docs") return currentPath === "/docs";
    return (
      currentPath === normalised || currentPath.startsWith(normalised + "/")
    );
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      {/* ── Left sidebar ── */}
      <aside
        ref={sidebarRef}
        className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/[0.06] sticky top-0 h-screen overflow-y-auto relative"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="px-4 py-5 border-b border-white/[0.06] relative z-10">
          <span className="text-[9px] font-bold text-white/30 tracking-[0.15em] uppercase font-mono">
            Documentation
          </span>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-6 relative z-10">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="section-label px-2 mb-2 text-[9px] font-bold text-white/25 tracking-[0.14em] uppercase font-mono">
                {section.title}
              </div>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={[
                        "nav-item group relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg",
                        "no-underline text-[13px] font-medium transition-all duration-150",
                        active
                          ? "bg-violet-500/10 text-violet-300"
                          : "text-white/70 hover:text-white hover:bg-white/[0.05]",
                      ].join(" ")}
                    >
                      {active && (
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-l-full bg-violet-400/70" />
                      )}
                      <item.icon
                        className={[
                          "w-3.5 h-3.5 shrink-0 transition-opacity duration-150",
                          active
                            ? "opacity-100 text-violet-400"
                            : "opacity-50 group-hover:opacity-80",
                        ].join(" ")}
                      />
                      <span className="flex-1 leading-none">{item.label}</span>
                      <ChevronRight
                        className={[
                          "w-3 h-3 transition-all duration-200",
                          active
                            ? "opacity-40 text-violet-400"
                            : "opacity-0 group-hover:opacity-30 -translate-x-1.5 group-hover:translate-x-0",
                        ].join(" ")}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-[9px] text-white/20 font-mono tracking-wide">
            SharpNR Docs v1.0
          </span>
        </div>
      </aside>

      {/* ── Right column: content + footer ── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* ── Content row: main + TOC panel ── */}
        <div className="flex flex-1">
          {/* Main scrollable content */}
          <main className="flex-1 min-w-0">
            <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10">
              <Outlet />
            </div>
          </main>

          {/* ── Right TOC panel — sticky, same as left sidebar ── */}
          <div className="hidden xl:block border-l border-white/[0.04]">
            <TableOfContents />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
