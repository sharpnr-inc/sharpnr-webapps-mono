# Adding packages

How to add dependencies, shared code and components in this monorepo.

- **Package manager:** `pnpm@11.22.0` (pinned in `package.json` → `packageManager`)
- **Node:** `>=20.19`
- **Always run install from the repo root**, never from inside an app folder.

---

## Rule 1 — never use `npm` or `yarn`

This is a pnpm workspace. `npm install` will write a competing `package-lock.json`,
fail on the `workspace:*` and `catalog:` protocols, and leave `node_modules` in a
state the rest of the tooling cannot use.

```bash
pnpm install        # yes, from the repo root
npm install         # NO
yarn                # NO
cd apps/cables && pnpm install   # NO — always install from the root
```

---

## Rule 2 — check the catalog first

`pnpm-workspace.yaml` has a `catalog:` block that is the **single source of truth
for shared dependency versions**. 34 packages live there, including:

> react, react-dom, typescript, vite, tailwindcss, @tanstack/react-router,
> @tanstack/react-query, zod, zustand, axios, radix-ui, lucide-react, framer-motion …

Apps write `"catalog:"` instead of a literal version, so one edit moves every app
at once. This is what stops the drift that once had `@sharpnr/ui` on three
different versions across the suite.

### Adding a dependency that IS already in the catalog

**Hand-edit the app's `package.json`, then install from the root.**

```jsonc
// apps/cortex/package.json
"dependencies": {
  "@tanstack/react-router": "catalog:",
  "@tanstack/react-query": "catalog:"
}
```
```bash
pnpm install
```

> **Why not `pnpm add`?** It works, and it correctly writes `catalog:` — but it
> also **silently bumps the catalog entry to the latest version**, which moves
> that dependency for *every* app using it. Adding one dep to one app should not
> upgrade twelve others. Hand-editing avoids that entirely.

### Adding a dependency that is NOT in the catalog

Either form is fine:

```bash
# app-specific dependency — a literal version is correct
pnpm add ogl --filter sharp-auth

# something several apps will share — put it in the catalog at the same time
pnpm add some-pkg --filter sharp-auth --save-catalog
```

Use `--filter <package-name>` (the `name` field in the app's `package.json`, not
its folder name — e.g. `sharp-cables`, not `cables`).

### Upgrading a shared dependency everywhere

Edit the version in `pnpm-workspace.yaml`, then:

```bash
pnpm install
pnpm build      # confirm the whole suite still compiles
```

---

## Rule 3 — depending on a shared package

The four internal packages are referenced with the workspace protocol:

```jsonc
"dependencies": {
  "@sharpnr/ui":    "workspace:*",
  "@sharpnr/utils": "workspace:*",
  "@sharpnr/env":   "workspace:*",
  "@sharpnr/http":  "workspace:*"
}
```

| Package | What it is |
| --- | --- |
| `@sharpnr/ui` | shadcn components (full registry) + custom hooks + the design theme |
| `@sharpnr/utils` | `cn`, `getCookie`, `APIResponse` types, date helpers |
| `@sharpnr/env` | validated `config` built from the root `.env` |
| `@sharpnr/http` | the shared axios client (CSRF + 401/403 redirect) |

**All four are shipped as TypeScript source — there is no build step.** Their
`exports` point straight at `src/index.ts`, and each consuming app compiles them.
Two consequences:

- **Vite apps** need nothing extra.
- **Next.js apps** must list them in `transpilePackages` in `next.config.ts`,
  along with any shared package they pull in transitively.

---

## Rule 4 — UI components go in `packages/ui`, never in an app

Do **not** run `shadcn add` inside an app. Components belong in the shared
library so every app gets the same one:

```bash
pnpm --filter @sharpnr/ui exec shadcn add <component>
```

Then export it from `packages/ui/src/index.ts` — a component that is not exported
there is invisible to apps.

Inside `packages/ui`, import with **relative paths**, not the `@/` alias. The
package is compiled by each consuming app, so `@/` would resolve against the
*app's* paths, not the library's.

```ts
import { cn } from "../../lib/utils";   // yes
import { cn } from "@/lib/utils";       // NO — breaks when compiled by an app
```

---

## Rule 5 — an app using `@sharpnr/ui` needs two CSS lines

Tailwind v4 only generates classes for files it scans, and it does not scan
`node_modules`. Without these the components compile fine and render **completely
unstyled**:

```css
/* apps/<app>/src/index.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "@fontsource-variable/outfit";
@import "@sharpnr/ui/theme.css";        /* the shared design tokens */
@source "../../../packages/ui/src";     /* let Tailwind scan the components */
```

`@sharpnr/ui/theme.css` is the one definition of the suite's design tokens — do
not copy the `:root` / `.dark` / `@theme inline` blocks into an app. It sets
`--font-sans: 'Outfit Variable'`, so the app must also depend on
`@fontsource-variable/outfit` and import it.

Every `@fontsource-*` package an app's CSS imports must be declared in that app's
`package.json`. Relying on another package hoisting it works by accident and
breaks unpredictably.

---

## Adding a whole new app

1. Copy the closest existing app — `apps/sharp-marketplace` is the smallest
   complete example (TanStack Router + Tailwind + shared theme + `@sharpnr/ui`).
2. Set a unique `name` in `package.json` and a unique dev-server port in
   `vite.config.ts` (`strictPort: true`), then register both in `setup/apps.json`.
3. Keep `envDir: path.resolve(__dirname, "../..")` in `vite.config.ts` — every app
   reads the single root `.env`.
4. Add a `deploy` block. This is what the CI pipeline reads:
   ```jsonc
   "deploy": { "dir": "cortex" }                       // → /var/www/cortex
   "deploy": { "skip": true, "note": "why it is skipped" }   // Next.js apps
   ```
5. `pnpm install` from the root, then `pnpm build`.

---

## Before you push

```bash
pnpm install --frozen-lockfile   # exactly what CI runs — must pass
pnpm build                       # all workspaces
```

**Always commit `pnpm-lock.yaml`.** CI installs with `--frozen-lockfile` and fails
if the lockfile does not match the manifests.

CI builds only the apps affected by your change, plus everything that depends on
them — so a change in `apps/cables` deploys cables alone, while a change in
`packages/ui` redeploys every app that consumes it. To see the blast radius of a
change before pushing:

```bash
pnpm affected
```
