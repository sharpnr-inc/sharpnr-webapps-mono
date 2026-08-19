import { useNavigate } from "@tanstack/react-router";
import { SharpnrLauncher } from "@sharpnr/ui";
import { HOSPITALITY_SECTIONS } from "./launcher.sections";

/** Shared launcher bound to this app's routes and workspace sections. */
export default function AppLauncher() {
  const navigate = useNavigate();

  return (
    <SharpnrLauncher
      sections={HOSPITALITY_SECTIONS}
      onNavigate={(to) => navigate({ to })}
    />
  );
}
