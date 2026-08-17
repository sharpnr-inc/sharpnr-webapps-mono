#!/usr/bin/env bash
#
# One-off fix: docs.sharpnr.test proxies to 6956, which is stockwave's port.
# Both server blocks contain the identical line
#
#     proxy_pass http://127.0.0.1:6956;
#
# so a plain sed would "fix" stockwave too and break it. This edits only the
# line inside the docs server block.
#
# Backs up, verifies with `nginx -t`, and rolls back rather than reloading a
# config that does not parse.
#
# Usage:  sudo ./setup/fix-docs-port.sh
#
set -euo pipefail

CONF=/etc/nginx/nginx.conf
OLD_PORT=6956
NEW_PORT=6954

[ "$(id -u)" -eq 0 ] || { echo "run with sudo"; exit 1; }

# Find the docs server block and the proxy_pass line within it.
LINE=$(awk -v old="$OLD_PORT" '
  /server_name[[:space:]]+docs\.sharpnr\.test;/ { in_docs=1 }
  in_docs && $0 ~ ("proxy_pass.*:" old ";") { print NR; exit }
  in_docs && /^[[:space:]]*}[[:space:]]*$/ && seen_loc { in_docs=0 }
  in_docs && /location/ { seen_loc=1 }
' "$CONF")

if [ -z "${LINE:-}" ]; then
  echo "Could not find a proxy_pass to :$OLD_PORT inside the docs block."
  echo "Already fixed, or the config changed. Current state:"
  grep -n -A14 "server_name docs.sharpnr.test" "$CONF" | grep proxy_pass
  exit 0
fi

echo "docs block proxy_pass is at line $LINE:"
sed -n "${LINE}p" "$CONF"

BACKUP="$CONF.bak.$(date +%Y%m%d_%H%M%S)"
cp "$CONF" "$BACKUP"
echo "backed up -> $BACKUP"

sed -i "${LINE}s/:${OLD_PORT};/:${NEW_PORT};/" "$CONF"

# The comment header above this block says "PORT 6957 / CORTEX", which was
# wrong for docs on both counts. Correct it if it is still there.
sed -i "$((LINE-9)),$((LINE-1))s/# PORT 6957/# PORT ${NEW_PORT}/; $((LINE-9)),$((LINE-1))s/# CORTEX/# DOCS/" "$CONF" 2>/dev/null || true

echo "changed to:"
sed -n "${LINE}p" "$CONF"

if nginx -t 2>&1 | tail -2; then
  systemctl reload nginx
  echo
  echo "nginx reloaded."
  echo "  docs.sharpnr.test      -> :$NEW_PORT"
  echo "  stockwave.sharpnr.test -> :$OLD_PORT  (unchanged)"
else
  echo "nginx -t FAILED -- restoring backup, not reloading"
  cp "$BACKUP" "$CONF"
  exit 1
fi
