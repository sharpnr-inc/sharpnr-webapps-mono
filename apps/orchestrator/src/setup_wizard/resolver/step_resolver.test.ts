import { describe, expect, it } from "vitest";
import type {
  SetupProgressResponseDTO,
  SetupStepProgressResponseDTO,
} from "../api/types";
import { resolveSetupWizardRedirect } from "./step_resolver";

const step = (
  id: string,
  type: SetupStepProgressResponseDTO["step"],
  status: SetupStepProgressResponseDTO["status"],
): SetupStepProgressResponseDTO => ({
  id,
  step: type,
  status,
  version: 1,
  started_at: "2026-01-01T00:00:00Z",
});

const progress = (
  overrides: Partial<SetupProgressResponseDTO>,
): SetupProgressResponseDTO => ({
  overall_status: "IN_PROGRESS",
  is_completed: false,
  steps: [],
  ...overrides,
});

describe("resolveSetupWizardRedirect", () => {
  it("keeps a fresh wizard on the welcome page, pointing at step one", () => {
    const resolved = resolveSetupWizardRedirect(
      progress({
        overall_status: "NOT_STARTED",
        steps: [step("s1", "SUPER_ADMIN_PROFILE", "IN_PROGRESS")],
      }),
    );

    expect(resolved).toEqual({
      type: "NOT_STARTED",
      target: {
        to: "/setup_wizard/$stepID/userinfo",
        params: { stepID: "s1" },
      },
    });
  });

  it("resumes at the step that is in progress, past completed ones", () => {
    const resolved = resolveSetupWizardRedirect(
      progress({
        steps: [
          step("s1", "SUPER_ADMIN_PROFILE", "COMPLETED"),
          step("s2", "ORGANIZATION_DETAILS_UPDATES", "IN_PROGRESS"),
        ],
      }),
    );

    expect(resolved).toEqual({
      type: "IN_PROGRESS",
      target: {
        to: "/setup_wizard/$stepID/org_update",
        params: { stepID: "s2" },
      },
    });
  });

  it("treats a skipped step as done rather than sending the user back to it", () => {
    const resolved = resolveSetupWizardRedirect(
      progress({
        steps: [
          step("s1", "SUPER_ADMIN_PROFILE", "SKIPPED"),
          step("s2", "ORGANIZATION_DETAILS_UPDATES", "IN_PROGRESS"),
        ],
      }),
    );

    expect(resolved.type).toBe("IN_PROGRESS");
    expect(
      resolved.type === "IN_PROGRESS" && resolved.target.params.stepID,
    ).toBe("s2");
  });

  it("reports a finished wizard as completed", () => {
    const resolved = resolveSetupWizardRedirect(
      progress({ overall_status: "COMPLETED", is_completed: true }),
    );

    expect(resolved).toEqual({ type: "COMPLETED" });
  });

  it("is unresolvable when no step is in progress", () => {
    expect(resolveSetupWizardRedirect(undefined)).toEqual({
      type: "UNRESOLVABLE",
    });
    expect(
      resolveSetupWizardRedirect(
        progress({ steps: [step("s1", "SUPER_ADMIN_PROFILE", "COMPLETED")] }),
      ),
    ).toEqual({ type: "UNRESOLVABLE" });
  });
});
