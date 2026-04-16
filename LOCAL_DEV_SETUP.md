# 🔐 Local Development Setup with NGINX + mkcert

This guide explains how to configure **local HTTPS subdomains** for the Sharpnr suite using **NGINX** and **mkcert** so authentication cookies work across multiple frontend apps.

Example local domains:

```
https://app.sharpnr.test
https://orchestrator.sharpnr.test
https://api.sharpnr.test
```

This mirrors production-style SaaS architecture and enables **shared secure cookies across subdomains**.

---

# 📦 Prerequisites

Ensure the following are installed:

| Tool             | Purpose                  |
| ---------------- | ------------------------ |
| Node.js v22.17.0 | Frontend runtime         |
| npm 10.9.2       | Package manager          |
| Go               | Backend runtime          |
| nginx            | Reverse proxy            |
| mkcert           | Local HTTPS certificates |

Check versions:

```bash
node -v
npm -v
nginx -v
```

---

# 🧰 Step 1 — Install nginx (Arch Linux)

```bash
sudo pacman -S nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Verify:

```bash
systemctl status nginx
```

Expected:

```
Active: active (running)
```

---

# 🧰 Step 2 — Install mkcert

```bash
sudo pacman -S mkcert
mkcert -install
```

This installs a trusted local Certificate Authority.

---

# 🧰 Step 3 — Configure local domains

Edit hosts file:

```bash
sudo nano /etc/hosts
```

Add:

```
127.0.0.1 app.sharpnr.test
127.0.0.1 api.sharpnr.test
127.0.0.1 orchestrator.sharpnr.test
```

Save and exit.

---

# 🧰 Step 4 — Generate HTTPS certificate

Run:

```bash
mkcert "*.sharpnr.test"
```

Move generated files:

```bash
sudo mkdir -p /etc/nginx/certs
sudo mv _wildcard.sharpnr.test.pem /etc/nginx/certs/
sudo mv _wildcard.sharpnr.test-key.pem /etc/nginx/certs/
```

---

# 🧰 Step 5 — Configure nginx reverse proxy

Edit nginx config:

```bash
sudo nano /etc/nginx/nginx.conf
```

Example configuration:

```nginx
events {}

http {

    server {
        listen 443 ssl;
        server_name app.sharpnr.test;

        ssl_certificate /etc/nginx/certs/_wildcard.sharpnr.test.pem;
        ssl_certificate_key /etc/nginx/certs/_wildcard.sharpnr.test-key.pem;

        location / {
            proxy_pass http://localhost:5173;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
        }
    }


    server {
        listen 443 ssl;
        server_name orchestrator.sharpnr.test;

        ssl_certificate /etc/nginx/certs/_wildcard.sharpnr.test.pem;
        ssl_certificate_key /etc/nginx/certs/_wildcard.sharpnr.test-key.pem;

        location / {
            proxy_pass http://localhost:6969;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
        }
    }


    server {
        listen 443 ssl;
        server_name api.sharpnr.test;

        ssl_certificate /etc/nginx/certs/_wildcard.sharpnr.test.pem;
        ssl_certificate_key /etc/nginx/certs/_wildcard.sharpnr.test-key.pem;

        location / {
            proxy_pass http://localhost:8080;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto https;
        }
    }
}
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

---

# 🧰 Step 6 — Update frontend environment variables

Example:

```
VITE_API_URL=https://api.sharpnr.test/api/v1
```

Restart frontend dev server afterward.

---

# 🧰 Step 7 — Configure backend cookies

Development cookie configuration should be:

```go
Domain: ".sharpnr.test"
Secure: true
SameSite: http.SameSiteNoneMode
```

This allows authentication sharing across:

```
app.sharpnr.test
orchestrator.sharpnr.test
api.sharpnr.test
```

---

# 🧰 Step 8 — Configure backend CORS

Example:

```go
AllowOrigins: []string{
    "https://app.sharpnr.test",
    "https://orchestrator.sharpnr.test",
}
```

---

# 🧪 Step 9 — Verify setup

Start services:

```
Frontend (app):           localhost:5173
Frontend (orchestrator):  localhost:6969
Backend API:              localhost:8080
```

Open browser:

```
https://app.sharpnr.test
https://orchestrator.sharpnr.test
https://api.sharpnr.test
```

Expected:

✅ HTTPS lock icon visible

✅ No certificate warnings

✅ Login cookie shared across subdomains

---

# 🚀 Result

Your local environment now mirrors production architecture:

```
Browser
   ↓
NGINX (HTTPS)
   ↓
Frontend apps
   ↓
Backend API
```

With shared authentication cookies across subdomains.

This enables realistic multi-app SaaS development locally.
