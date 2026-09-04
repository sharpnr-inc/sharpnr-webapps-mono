/**
 * Post-build prerender.
 *
 * The site ships as a client-rendered SPA, so `dist/index.html` would otherwise
 * contain an empty `<div id="root">`. Googlebot renders JavaScript, but most AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot …) do not — they would index
 * a blank page. This renders the landing page to static HTML at build time and
 * injects it into the shipped document.
 *
 * The client still boots normally: `createRoot().render()` clears the container
 * and mounts the interactive tree over the top, so there is no hydration
 * contract to keep in sync and no mismatch warning to manage.
 *
 * It also emits FAQPage JSON-LD from the same `faqs` array the page renders,
 * and stamps the sitemap with the build date.
 */

import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distHtml = resolve(root, "dist/index.html");
const distSitemap = resolve(root, "dist/sitemap.xml");

/** Escape a string for safe embedding inside a <script> element. */
const jsonForScript = (value) =>
  JSON.stringify(value, null, 2).replace(/</g, "\\u003c");

const vite = await createServer({
  root,
  // Skip vite.config.ts on purpose: the TanStack router plugin regenerates
  // routeTree.gen.ts on server start, which this step has no business doing.
  configFile: false,
  logLevel: "warn",
  server: { middlewareMode: true },
  appType: "custom",
  plugins: [react()],
  // The website components do not use the `@/` alias, but the dep scanner
  // still crawls index.html into the app routes, which do. Without the alias
  // it reports every one of them as unresolved -- warnings only, but they
  // bury the actual output of this script.
  resolve: { alias: { "@": resolve(root, "src") } },
});

try {
  const { LandingPage } = await vite.ssrLoadModule(
    "/src/website/landingpage.tsx",
  );
  const { faqs } = await vite.ssrLoadModule("/src/website/faq-data.ts");

  const appHtml = renderToString(createElement(LandingPage));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://silo.sharpnr.com/#faq",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  let html = await readFile(distHtml, "utf8");

  const rootDiv = '<div id="root"></div>';
  if (!html.includes(rootDiv)) {
    throw new Error(
      `Could not find ${rootDiv} in dist/index.html — the prerender target moved.`,
    );
  }
  html = html.replace(rootDiv, `<div id="root">${appHtml}</div>`);

  html = html.replace(
    "</head>",
    `  <script type="application/ld+json">\n${jsonForScript(faqSchema)}\n    </script>\n  </head>`,
  );

  await writeFile(distHtml, html, "utf8");

  // Keep <lastmod> honest without anyone having to remember to edit it.
  const buildDate = new Date().toISOString().slice(0, 10);
  const sitemap = await readFile(distSitemap, "utf8");
  await writeFile(
    distSitemap,
    sitemap.replace(
      /<lastmod>[^<]*<\/lastmod>/,
      `<lastmod>${buildDate}</lastmod>`,
    ),
    "utf8",
  );

  const kb = (Buffer.byteLength(appHtml, "utf8") / 1024).toFixed(1);
  console.log(
    `prerender: injected ${kb} kB of static HTML, ${faqs.length} FAQ entries, sitemap lastmod ${buildDate}`,
  );
} finally {
  await vite.close();
}
