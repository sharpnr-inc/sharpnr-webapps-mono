import { createFileRoute } from "@tanstack/react-router";
import { CircleDot } from "lucide-react";
import { useAppUserStore, selectUser } from "@/store/userStore";

export const Route = createFileRoute("/_user/home/")({
  component: HomePage,
});

function HomePage() {
  const user = useAppUserStore(selectUser);

  return (
    <div className="flex h-full flex-col items-center justify-center p-10">
      <div className="w-full max-w-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-bright/30 bg-signal/15 px-2.5 py-1 text-[11px] font-medium text-signal-bright">
          <CircleDot className="h-3 w-3" />
          Service active
        </span>

        <h1 className="mt-5 text-2xl font-semibold text-paper">
          {user?.firstName ? `Welcome, ${user.firstName}` : "Welcome to Cables"}
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-paper-dim">
          Cables is running for{" "}
          <span className="text-paper">
            {user?.org_data?.org_name ?? "your organisation"}
          </span>
          . This is where your org's chat, channels, calls, and meetings will
          live.
        </p>

        <p className="mt-6 border-t border-ink-line pt-5 text-xs text-paper-muted">
          Nothing to show yet — the workspace is being built out.
        </p>
      </div>
    </div>
  );
}
