import { UsersRound, Users, ScrollText, Pencil, Plus } from "lucide-react";
import type { UserGroup } from "../data/dummyGroups";
import PixelCard from "./PixelCard";

type PixelVariant = "default" | "blue" | "yellow" | "pink";

interface GroupCardProps {
  group: UserGroup;
  /** Pixel-shimmer color variant for the hover effect. */
  variant?: PixelVariant;
  onClick: () => void;
}

function StatChip({
  icon: Icon,
  children,
}: {
  icon: typeof Users;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

export function GroupCard({
  group,
  variant = "default",
  onClick,
}: GroupCardProps) {
  return (
    <PixelCard
      variant={variant}
      gap={12}
      className="group min-h-57.5 w-full rounded-2xl border border-white/10 bg-[radial-gradient(130%_120%_at_0%_0%,#1c1c22_0%,#111116_55%,#0b0b0f_100%)] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_26px_55px_-20px_rgba(0,0,0,0.85)]"
    >
      {/* Content sits above the pixel canvas */}
      <div
        className="relative z-10 flex h-full flex-col gap-3 p-5"
        onClick={onClick}
      >
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <UsersRound className="h-5 w-5" />
          </div>
          <span className="text-base font-semibold tracking-[0.01em]">
            {group.name}
          </span>
        </div>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-white/60">
          {group.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <StatChip icon={Users}>
            {group.memberCount} {group.memberCount === 1 ? "person" : "people"}
          </StatChip>
          <StatChip icon={ScrollText}>
            {group.policyCount}{" "}
            {group.policyCount === 1 ? "policy" : "policies"}
          </StatChip>
        </div>

        {/* Actions */}
        <div className="mt-1 flex items-center gap-2 border-t border-white/10 pt-3">
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/15 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/25"
          >
            <Plus className="h-3.5 w-3.5" /> Add Policies
          </button>
        </div>
      </div>
    </PixelCard>
  );
}
