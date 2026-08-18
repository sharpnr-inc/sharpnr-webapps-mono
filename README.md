# sharpnr-webapps-mono

Sharpnr's monorepo of all the webapps of sharpnr, including all the service apps
and all business operation apps.

```bash
pnpm install     # from the repo root
pnpm dev         # run every app
pnpm build       # build every app
pnpm affected    # show what a change would rebuild/deploy
```

- **Adding dependencies, components or a new app → [CONTRIBUTING.md](CONTRIBUTING.md)**
- Local hosts and ports: [`setup/apps.json`](setup/apps.json)
- Shared dependency versions: the `catalog:` block in [`pnpm-workspace.yaml`](pnpm-workspace.yaml)

## Layout

| Path | |
| --- | --- |
| `apps/*` | the individual web apps, each deployed to its own domain |
| `packages/ui` | shadcn components + hooks + the shared design theme |
| `packages/utils` | `cn`, cookies, API envelope types, date helpers |
| `packages/env` | validated config from the root `.env` |
| `packages/http` | shared axios client (CSRF + auth redirect) |

All four `packages/*` are consumed as TypeScript source — they have no build step.
