import type { LauncherPayload, NavSection } from "./launcher.types";
import { DOMAIN_REGISTRY, DEFAULT_SECTIONS } from "./launcher.config";

export function buildLauncherSections(payload: LauncherPayload): NavSection[] {
  const dynamicSections: NavSection[] = [];

  // 🚨 Domains is ARRAY now
  payload.Domains.forEach((domainEntry) => {
    const [domainName, config] = Object.entries(domainEntry)[0];

    const registry =
      DOMAIN_REGISTRY[domainName as keyof typeof DOMAIN_REGISTRY];

    if (!registry) return;

    /* ---------- MODULES ---------- */

    const modules = config.Modules.map(
      (m) => registry.modules[m as keyof typeof registry.modules],
    ).filter(Boolean);

    if (modules.length) {
      dynamicSections.push({
        id: `domain_${domainName.toLowerCase()}`,
        title: registry.title,
        items: modules,
      });
    }

    /* ---------- INFRAS ---------- */

    const infras = config.Infras?.map(
      (i) => registry?.infras[i as keyof typeof registry.infras],
    ).filter(Boolean);

    if (infras?.length) {
      dynamicSections.push({
        id: `${domainName.toLowerCase()}_infra`,
        title: "Infra",
        isSubSection: true,
        items: infras,
      });
    }
  });

  // Always append static sections
  return [...dynamicSections, ...DEFAULT_SECTIONS];
}
