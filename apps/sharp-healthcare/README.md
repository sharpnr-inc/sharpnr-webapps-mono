# sharp-healthcare

Clinical and administrative operations app for the Sharpnr suite.

- Dev server: `https://healthcare.sharpnr.test` (port `6970`)
- Deploys to `/var/www/healthcare`

```bash
pnpm install                        # from the repo root
pnpm dev --filter sharp-healthcare
```

Ports and hosts are registered in `setup/apps.json`; run
`./setup/local-dev.sh all --apply` after adding a host so nginx and
`/etc/hosts` pick it up.
