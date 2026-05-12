# PTR Niger Agency — VPS deployment runbook

This is the deployment surface for `agency.ptrniger.com`. Story 5.8 (VPS deploy)
plus Story 5.5 (Umami self-hosted) plus Story 5.9 (legacy redirect map). You
run all of this yourself — Mounkaila keeps the credentials.

## 1. Prerequisites on the VPS

- Ubuntu 22.04+ with sudo
- Node 20.x (`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`)
- PM2 (`sudo npm i -g pm2`)
- Nginx (`sudo apt-get install -y nginx`)
- certbot (`sudo apt-get install -y certbot python3-certbot-nginx`)
- Docker + docker-compose (for Umami, Story 5.5)

Run `pm2 startup` and follow its instructions so PM2 survives reboot.

## 2. DNS & TLS

- Point `agency.ptrniger.com` (apex) at the VPS public IP, A record.
- Point `www.agency.ptrniger.com` CNAME to apex (Nginx will 301 it).
- Issue cert: `sudo certbot --nginx -d agency.ptrniger.com -d www.agency.ptrniger.com`
- Confirm HSTS in `nginx/agency.conf` once cert renewal is verified.

## 3. App deploy

```bash
cd /var/www/agency.ptrniger.com
git pull
npm ci
npm run build
pm2 reload ecosystem.config.cjs --update-env
```

Required env vars in `/var/www/agency.ptrniger.com/.env.production`:

```
NEXT_PUBLIC_SITE_URL=https://agency.ptrniger.com
NODE_ENV=production
PORT=3000
HOSTNAME=127.0.0.1

# Story 4.5 — JSONL persists outside the deploy tree so git pull doesn't wipe
# submissions. Create the dir once (sudo mkdir -p /srv/ptr/data) and chown it
# to the PM2 user.
PTR_DATA_DIR=/srv/ptr/data

# Optional
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

PM2 ecosystem (`ecosystem.config.cjs` at repo root):

```js
module.exports = {
  apps: [
    {
      name: 'ptr-agency',
      script: '.next/standalone/server.js',
      cwd: '/var/www/agency.ptrniger.com',
      env_file: '.env.production',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
    },
  ],
};
```

After `npm run build`, the standalone bundle does not include `public/` or
`.next/static/`. The Nginx config below serves them directly. If you prefer the
Node server to handle them, copy:

```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r messages .next/standalone/messages
```

…before the PM2 reload.

## 4. Nginx

`/etc/nginx/sites-available/agency.ptrniger.com.conf` — see `nginx/agency.conf`
in this repo. Enable:

```bash
sudo ln -s /etc/nginx/sites-available/agency.ptrniger.com.conf \
            /etc/nginx/sites-enabled/agency.ptrniger.com.conf
sudo nginx -t && sudo systemctl reload nginx
```

## 5. Umami (self-hosted analytics, Story 5.5)

```bash
cd /opt/umami
docker compose up -d
```

Compose file at `nginx/docker-compose.umami.yml`. Reverse-proxy `/umami/`
under same origin via Nginx (see config). Generate a tracker site in the
Umami UI; copy the website ID into `app/[locale]/layout.tsx` (see
`<UmamiScript>` slot — pending Story 5.6 UTM capture extension).

## 6. Legacy domain redirects (Story 5.9)

Keep `portfolio.nigerdev.com` resolving (don't drop the DNS). On its origin
Nginx host, install `nginx/portfolio-legacy.conf`. It 301s every legacy URL
to its `agency.ptrniger.com` equivalent. Keep alive ≥12 months post-launch
(LD-10).

## 7. Soft-launch checklist (Story 5.11)

- [ ] DNS, TLS, HSTS verified
- [ ] PM2 reload returns 200 from `/en` and `/fr`
- [ ] sitemap.xml + robots.txt accessible
- [ ] `/api/contact` accepts a real submission and the JSONL grows
- [ ] Optional: Telegram message arrives
- [ ] Umami records the page view
- [ ] Legacy `portfolio.nigerdev.com/<any>` 301s to agency
- [ ] Lighthouse mobile ≥ 90 on /, /work, /services, the four case studies
- [ ] Calendly (when added) opens from header CTA
- [ ] Cookie banner displays once and persists ack across reload
- [ ] Submit ≥ 20 outbound prospect messages (LD-5)
- [ ] Open the J+90 review window in the calendar
