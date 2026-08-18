# Server-side deploy artifacts

Config that lives on the web server (`optimus`) rather than in an app. Kept in
git so it is reviewable and reproducible — nothing here is applied automatically.

## Static apps

Every app in this monorepo is a Vite SPA. The pipeline copies `dist/` to
`/var/www/<deploy.dir>/dist`, and nginx serves it from a `server` block in
`/etc/nginx/sites-available/frontends`:

```nginx
server {
    listen 80;
    server_name <app>.sharpnr.com;
    root /var/www/<app>/dist;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```

The `try_files` line is required — these are client-routed SPAs, and without it
any refresh on a sub-route returns nginx's 404.

Create the web root with the same ownership as its siblings, so the `jenkins`
user (a member of `webdeploy`) can replace `dist/` on deploy:

```bash
sudo install -d -m 2775 -o sharpnrllp -g webdeploy /var/www/<app>
sudo nginx -t && sudo systemctl reload nginx
```

Then add the DNS record, and the app's URL to the `sharpnr-frontend-env` Jenkins
credential if other apps need to link to it.

## Node-runtime apps

The pipeline also supports apps that need a live node process instead of a
static copy — an app declares them like this:

```jsonc
"deploy": { "dir": "<dir>", "runtime": "node", "service": "<systemd-unit>" }
```

It then copies Next's `standalone` bundle to `/var/www/<dir>` (including
`.next/static`, which standalone omits by design) and restarts `<service>`.
The unit must set `HOSTNAME=127.0.0.1` so the app is reachable only through
nginx, and `jenkins` needs a sudoers rule for the restart.

`sharpnr-docs` is the one app that needs this. It has route handlers that must
run per-request — `/api/search`, the OG image generator, `llms.txt` — so it can
never be a static copy.

### Cutting docs over from the old out-of-band deploy

Docs is currently built on the server (`rsync` → `npm ci` → `next build` →
`systemctl restart sharpnr-docs`) into
`/media/sharpnrllpDrive/frontends/sharpnr-docs`. The pipeline replaces all of
that. Order matters:

```bash
# 1. web root
sudo install -d -m 2775 -o sharpnrllp -g webdeploy /var/www/docs

# 2. let jenkins restart the service (visudo)
#    jenkins ALL=(root) NOPASSWD: /usr/bin/systemctl restart sharpnr-docs

# 3. replace the unit -- keep a copy of the old one first
sudo systemctl cat sharpnr-docs > ~/sharpnr-docs.service.bak
sudo cp deploy/docs/sharpnr-docs.service /etc/systemd/system/
sudo systemctl daemon-reload
```

Then drop `"skip": true` from `apps/docs/package.json` and push. nginx needs no
change: `sites-available/sharpnr-docs-app` already proxies to `127.0.0.1:6956`,
and the unit sets `PORT=6956` to match.

**Do not remove `skip` before replacing the unit.** The pipeline would copy a
fresh bundle to `/var/www/docs`, restart the *old* unit — which still points at
`/media/...` — and report success while the site keeps serving the previous
build. A silent stale deploy is worse than a red pipeline.

Once it is live, `/media/sharpnrllpDrive/frontends/sharpnr-docs` is dead weight
and can go. Note that `/media/sharpnrllpDrive/frontends` is also `BACKUP_BASE`,
so the pipeline will start writing `docs/<timestamp>/` backups alongside it.

## Ports

| App | Port | Notes |
| --- | --- | --- |
| `sharpnr-docs` | 6956 | set by the systemd unit; the package.json `start` script is unused under standalone |

Local dev ports are unrelated and live in [`setup/apps.json`](../setup/apps.json).
