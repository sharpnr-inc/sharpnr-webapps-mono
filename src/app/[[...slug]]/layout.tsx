import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      links={[]}
      {...baseOptions()}
      sidebar={{
        collapsible: true,
        defaultOpenLevel: 1,
      }}
      tabs={{
        transform(option, node) {
          return option;
        },
      }}
      nav={{
        transparentMode: "top",
      }}
    >
      {children}
    </DocsLayout>
  );
}
