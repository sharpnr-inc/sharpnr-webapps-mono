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

## License

Copyright (C) 2025-2026 Kashif Nawaz and Ujjawal Singh Nirwan

sharpnr-webapps-mono is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free Software
Foundation, version 3 only (`SPDX-License-Identifier: AGPL-3.0-only`).

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the [GNU Affero General Public License](LICENSE) for more
details.

If you modify these apps and let users interact with them over a network, the AGPL
requires you to offer those users the complete source code of your modified version.

### Trademarks

"Sharpnr", the names of Sharpnr products and apps, and the associated logos are
trademarks of Kashif Nawaz and Ujjawal Singh Nirwan. The AGPL-3.0 license covers the
source code only. It grants no rights to use these names or logos (as permitted by
section 7(e) of the license).

You may use the names to truthfully describe where your work comes from, for example
"based on Sharpnr". If you distribute or publicly host a modified version, give it a
different name, replace the Sharpnr logos and branding, and do not present it as the
official product or as endorsed by the trademark holders.
