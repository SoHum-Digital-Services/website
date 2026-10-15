This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy (Google Cloud Run)

Vercel paused this site on 12 Oct 2026 (the Hobby plan's CPU allowance ran out), so it runs on Google Cloud Run from the `Dockerfile` (Next.js `output: "standalone"`, `node server.js` on `$PORT`, non-root).

| Setting | Value |
|---|---|
| Project, region | `sohum-509918`, `asia-south1` (Mumbai) |
| Service name | `sohum-website` |
| Build | Dockerfile in the repository root, from branch `main` (continuous deployment: a merge is a deploy) |
| Access | Allow public access |
| CPU, memory | 1 vCPU, 512 MiB |
| Instances | minimum 0, **maximum 2** |
| Concurrency, timeout | 80, 60 s |

**Environment variables** (Cloud Run → Edit and deploy new revision → Variables & Secrets; copy the values from the Vercel project, never into this repository): `RESEND_API_KEY`, `DASHBOARD_PASSWORD`, `DASHBOARD_SESSION_SECRET`, `VERCEL_API_TOKEN`, `SUPABASE_ACCESS_TOKEN`, `MONGODB_URI` (see `.env.example`). They are read at run time, so a change needs only a new revision, not a rebuild.

**The panchangam engine** is proxied under `/panchangam`, `/static`, `/v1` and `/openapi.json` (`next.config.ts`). Its address is fixed at build time; set `ENGINE_URL` as a build variable only if it moves.

Build and run locally: `docker build -t website . && docker run -e PORT=8080 -p 8080:8080 website`.
