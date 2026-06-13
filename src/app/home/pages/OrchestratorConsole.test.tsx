import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrchestratorConsoleIndex } from "./OrchestratorConsole";

describe("OrchestratorConsoleIndex", () => {
  it("renders all admin section cards", () => {
    render(<OrchestratorConsoleIndex />);

    const expectedTitles = [
      "Dashboard",
      "Users",
      "Devices",
      "Apps",
      "Billing",
      "Reports",
      "Security",
      "Domains",
      "Groups",
    ];

    for (const title of expectedTitles) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it("renders a description for each section", () => {
    render(<OrchestratorConsoleIndex />);

    expect(
      screen.getByText("Overview of your organization."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Manage users, groups, and organizational units."),
    ).toBeInTheDocument();
  });
});
