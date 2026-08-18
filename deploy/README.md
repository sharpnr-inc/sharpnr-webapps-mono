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

**Nothing uses this today.** `sharpnr-docs` is `skip: true` and deploys
out-of-band; `administration` was removed from this repo. Kept because the
static path is untouched by it and the next Next.js app would need it — but it
has never run in production, so treat its first use as unproven.

## Ports

| App | Port | Notes |
| --- | --- | --- |
| `sharpnr-docs` | 6956 | separate out-of-band deploy, not in this pipeline |

Local dev ports are unrelated and live in [`setup/apps.json`](../setup/apps.json).
