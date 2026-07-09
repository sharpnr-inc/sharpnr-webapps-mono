import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { config } from "@/configs/env";

/**
 * WebMCP (navigator.modelContext) is an experimental browser API that lets
 * a page expose tools to AI agents running in the browser.
 * Spec: https://webmachinelearning.github.io/webmcp/
 *
 * The API only exists in browsers with WebMCP enabled — everything here is
 * feature-detected and is a no-op for normal visitors.
 */

interface WebMCPToolResult {
  content: Array<{ type: "text"; text: string }>;
}

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<WebMCPToolResult>;
}

interface ModelContext {
  registerTool?: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => void;
  provideContext?: (context: { tools: WebMCPTool[] }) => void;
}

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const textResult = (text: string): WebMCPToolResult => ({
  content: [{ type: "text", text }],
});

const SITE_PAGES = ["/", "/products", "/services", "/industries", "/about"];

export function useWebMCP() {
  const navigate = useNavigate();

  useEffect(() => {
    const modelContext = navigator.modelContext;
    if (!modelContext) return;

    const apps: Record<string, string> = {
      "Sharp-Accounting (finance & accounting)": config.accountingAppUrl,
      "Sharp-HR (HRMS & payroll)": config.hrAppUrl,
      "Sharp-Marketing / Sharp-CRM (CRM & marketing)": config.marketingAppUrl,
      "Cables (messaging & communications)": config.cablesAppUrl,
      "Silo (storage & data platform)": config.siloAppUrl,
      "Folio (documents & productivity)": config.folioAppUrl,
      "Cortex (IT controls & access management)": config.cortexAppUrl,
      "SharpIAM (employee portal)": config.iamAppUrl,
      "Orchestrator (platform command center)": config.orchestratorAppUrl,
      "Sharp-Hospitality (hotels, restaurants, POS)": config.hospitalityAppUrl,
      "Sharp-Marketplace (B2B org-to-org marketplace)": config.marketplaceAppUrl,
    };

    const tools: WebMCPTool[] = [
      {
        name: "get-platform-overview",
        description:
          "Get a factual overview of the Sharpnr platform: what it is, its 4-layer architecture, and its current status.",
        inputSchema: { type: "object", properties: {} },
        execute: async () =>
          textResult(
            "Sharpnr is a cloud-based SaaS ecosystem for managing business operations across industries, currently in Alpha and free during the early access period. " +
              "It has a 4-layer architecture: (1) Business Operation apps such as Sharp-Hospitality (live) and Lifco for healthcare (coming soon); " +
              "(2) the Organization Control Layer powered by Orchestrator; " +
              "(3) Core Services — accounting, HR, CRM, messaging, storage, documents, and IT controls; " +
              "(4) the Sharp-Marketplace B2B organization-to-organization network. " +
              "It is multi-tenant, multi-company, and multi-branch, supports multiple legal entities with separate or consolidated accounting, and is modular — organizations enable only the apps they need. " +
              "The complete machine-readable reference is at https://sharpnr.com/llms.txt",
          ),
      },
      {
        name: "list-sharpnr-apps",
        description:
          "List every application in the Sharpnr ecosystem with its live URL.",
        inputSchema: { type: "object", properties: {} },
        execute: async () =>
          textResult(
            Object.entries(apps)
              .map(([name, url]) => `${name}: ${url}`)
              .join("\n"),
          ),
      },
      {
        name: "navigate-to-page",
        description:
          "Navigate this website to one of its pages: / (home), /products, /services, /industries, or /about.",
        inputSchema: {
          type: "object",
          properties: {
            page: {
              type: "string",
              enum: SITE_PAGES,
              description: "The page path to navigate to.",
            },
          },
          required: ["page"],
        },
        execute: async (args) => {
          const page = String(args.page ?? "");
          if (!SITE_PAGES.includes(page)) {
            return textResult(
              `Unknown page "${page}". Valid pages: ${SITE_PAGES.join(", ")}`,
            );
          }
          navigate({ to: page });
          return textResult(`Navigated to ${page}`);
        },
      },
      {
        name: "get-started-with-sharpnr",
        description:
          "Get the signup link for creating a Sharpnr organization account (free during early access).",
        inputSchema: { type: "object", properties: {} },
        execute: async () =>
          textResult(
            `Create an organization account at ${config.authAppUrl}/signup — free during the early access period. Existing organizations sign in at ${config.authAppUrl}.`,
          ),
      },
    ];

    const controller = new AbortController();
    try {
      if (typeof modelContext.registerTool === "function") {
        for (const tool of tools) {
          modelContext.registerTool(tool, { signal: controller.signal });
        }
      } else if (typeof modelContext.provideContext === "function") {
        modelContext.provideContext({ tools });
      }
    } catch {
      // Experimental API — never let discovery break the site.
    }

    return () => controller.abort();
  }, [navigate]);
}
