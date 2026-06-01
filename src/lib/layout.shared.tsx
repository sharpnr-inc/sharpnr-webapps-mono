import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt="Sharpnr"
            className="h-10 w-10"
          />
          <span className="font-bold">Sharpnr Docs</span>
          <span className="rounded-md border px-2 py-0.5 text-xs">v0.0.1</span>
        </div>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
