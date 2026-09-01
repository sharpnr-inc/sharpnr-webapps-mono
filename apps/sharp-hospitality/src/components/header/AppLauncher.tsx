import { useNavigate, useRouterState } from "@tanstack/react-router";
import { SharpnrLauncher } from "@sharpnr/ui";
import { HOSPITALITY_SECTIONS } from "./launcher.sections";

/**
 * Picks the workspace the user is currently in by matching the URL against the
 * sections' `to` paths -- longest match first, so `/workspace/infra/kitchen`
 * beats a hypothetical `/workspace/infra`.
 */
function currentWorkspaceId(pathname: string) {
  return HOSPITALITY_SECTIONS.flatMap((section) => section.items)
    .filter((item) => item.to && pathname.startsWith(item.to))
    .sort((a, b) => (b.to?.length ?? 0) - (a.to?.length ?? 0))
    .at(0)?.id;
}

/** Shared launcher bound to this app's routes and workspace sections. */
export default function AppLauncher() {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SharpnrLauncher
      sections={HOSPITALITY_SECTIONS}
      currentApp={currentWorkspaceId(pathname)}
      onNavigate={(to) => navigate({ to })}
    />
  );
}
