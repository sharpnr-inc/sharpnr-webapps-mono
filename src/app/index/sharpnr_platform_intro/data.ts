export interface FeatureItem {
  id: string;
  label: string; // small eyebrow label
  heading: string; // bold explainer title
  description: string; // supporting text
  cardBg: string; // tailwind bg color for placeholder card
}

export const FEATURES: FeatureItem[] = [
  {
    id: "feature-1",
    label: "01 — Discovery",
    heading: "Find what matters instantly",
    description:
      "Sharpnr surfaces the most relevant signals across your workflow so nothing slips through the cracks.",
    cardBg: "bg-blue-950",
  },
  {
    id: "feature-2",
    label: "02 — Collaboration",
    heading: "Your whole team, in sync",
    description:
      "Real-time presence, threaded context, and shared views keep every contributor aligned without extra meetings.",
    cardBg: "bg-violet-950",
  },
  {
    id: "feature-3",
    label: "03 — Automation",
    heading: "Let the platform do the heavy lifting",
    description:
      "Set rules once and watch Sharpnr handle the repetitive parts — routing, reminders, and status updates.",
    cardBg: "bg-emerald-950",
  },
  {
    id: "feature-4",
    label: "04 — Insights",
    heading: "Data you can actually act on",
    description:
      "Dashboards that speak plain language, not spreadsheets. Know what's working before your next standup.",
    cardBg: "bg-rose-950",
  },
];
