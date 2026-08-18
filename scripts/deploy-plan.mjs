#!/usr/bin/env node
// Prints which apps need deploying for a given base commit, one per line:
//
//   <pkgName> \t <workspacePath> \t <deployDir> \t <runtime> \t <service>
//
// runtime is "static" (copy dist/ to the web root -- the default) or "node"
// (copy Next's standalone bundle and restart <service>). Apps declare it with
// `deploy.runtime` / `deploy.service` in their package.json.
//
// "Affected" = packages changed since <base>, PLUS everything that depends on
// them. So a change in packages/ui fans out to every app that consumes it,
// while a change in one app touches only that app.
//
// packages/ui itself is filtered out -- it gets built (apps need it), but it is
// a library and is never copied to the web root. Same for anything without a
// `deploy.dir` in its package.json.
//
// Usage: node scripts/deploy-plan.mjs <base-sha>
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const base = process.argv[2];
if (!base) {
  console.error("usage: deploy-plan.mjs <base-sha>");
  process.exit(2);
}

const run = (cmd) => execSync(cmd, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const affected = new Set();
try {
  const out = run(`pnpm turbo build --filter='...[${base}]' --dry-run=json`);
  const json = JSON.parse(out.slice(out.indexOf("{")));
  for (const t of json.tasks ?? []) affected.add(t.package);
} catch (err) {
  console.error("turbo dry-run failed:", err.message);
  process.exit(1);
}

const workspaces = JSON.parse(run("pnpm list -r --depth -1 --json"));

for (const ws of workspaces) {
  if (!affected.has(ws.name)) continue;
  const pjPath = path.join(ws.path, "package.json");
  if (!fs.existsSync(pjPath)) continue;
  const pj = JSON.parse(fs.readFileSync(pjPath, "utf8"));

  if (!pj.deploy?.dir || pj.deploy.skip) continue;

  const runtime = pj.deploy.runtime ?? "static";
  const service = pj.deploy.service ?? "";

  if (runtime === "node" && !service) {
    console.error(`${ws.name}: deploy.runtime "node" requires deploy.service`);
    process.exit(1);
  }

  console.log(
    [ws.name, path.relative(process.cwd(), ws.path), pj.deploy.dir, runtime, service].join("\t"),
  );
}
