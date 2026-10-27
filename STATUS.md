# Platform status (website, hosting, identity, placeholders)            updated 2026-10-27 by Desk · Platform

Scope: the marketing website `sohum.cc` (this repo), hosting across Google Cloud (`sohum-509918`), Cloudflare, Supabase (`sohum`), Render and Vercel, SoHum identity (`sohum-id-web`), and the Bhakti, Spiritual and Vachini placeholders. All facts below were read on 2026-10-27, read-only; nothing was changed. "Not verified" means exactly that.

## Now

- Desk · Platform set-up: this ledger. No build in flight.

## Next

1. Fix the website's contact form on Cloud Run once the owner supplies a Resend key (see Waiting on the owner). Move the key into a Cloud Run secret, not a plain variable.
2. Cut-over rest for `spjrsd-backend` is Desk · Temple's, but the Render suspension below changes what is left on Render; Platform proposes the Render clean-up (Waiting on the owner).
3. Placeholders: decide whether the Bhakti, Spiritual and Vachini backends move off Render (their web front ends are already on Cloud Run).
4. Replace the boilerplate `README.md` of this repo (still the create-next-app text) and add a deploy note (Cloud Build trigger `website-main` on `^main$`, Dockerfile, `ENGINE_URL`).
5. Delete the three merged remote branches (`privacy-page`, `sohum-account-section`, `sohum-mark`) when the owner agrees.
6. SoHum ID portal (`sohum-id-web`): not started; begins when the owner schedules ID-1 (needs the contract and design system first).

## Blocked

- **Contact form cannot send mail.** The Cloud Run service `website` (revision `website-00004-58z`, ready since 2026-10-15) has **no environment variables at all**, so `RESEND_API_KEY` is unset and `POST /api/contact` would answer 500 "not configured". Valid-input behaviour was not tested by sending (that would email `info@sohum.cc`); an empty body correctly returns 400. The older session's finding (stale key on Vercel) is moot: Vercel no longer serves the site. The same missing variables mean the `/dashboard` ops page (`DASHBOARD_PASSWORD`, `DASHBOARD_SESSION_SECRET`, tokens for Vercel, Supabase, MongoDB) is not configured on Cloud Run either; whether it is used was not verified.
- **Render has suspended every service for billing since 2026-10-24** (see Live). Anything still pointing at a `*.onrender.com` address is down, including the Bhakti, Spiritual and Vachini manifests that the Vāni gateway saw answering 503 on 2026-10-25 (cause: suspension).

## Waiting on the owner

1. **Resend key for the contact form.** Create a Sending-access key for `send.sohum.cc` in Resend, then give it to a session to store as a Cloud Run secret (or set it yourself). Never paste it in chat or a repo.
2. **Render account.** Every service is suspended for billing (2026-10-24). All are on the `free` plan, so no recurring cost is visible in the API; the billing hold is on the account. Decide: (a) clear the billing hold and keep the temple static site only, or (b) retire the rollback copies. Proposed retirement list, once the owner agrees and each owner desk confirms nothing calls them: `darshan-gateway`, `sohum-shop`, `vani-gateway`, `vani-alexa` (Cloud Run copies are live), `spjrsd-backend` (Cloud Run copy live since 2026-10-25), `sohum-bhakti`, `sohum-spiritual`, `sohum-vachini` (only if their backends move to Cloud Run), `peetham-auth-backend` (unrelated to the suite; owner to say). Keep `cheruvugattu-web` (static site, not suspended; serves `cheruvugattu.online`). Monthly saving: not visible; the Render API reports free plans.
3. **Paused `chanttracker` Supabase project** (`neqnfukluaxwgtjjgrfu`, status INACTIVE, created 2026-05-30). ChantTracker now lives in the `sohum` project. Propose: leave paused for now; delete only after Desk · ChantTracker confirms nothing was left behind (a restore is possible only for a limited time after pausing; check the Supabase dashboard).
4. **Supabase advisories** on the `sohum` project (SECURITY DEFINER functions callable by `anon`, leaked-password protection off): master document section 10 says review with the owner before any change. Not re-run today.
5. **Gemini credits.** Section 10 lists "Vāni cannot understand any question" (Gemini 402, prepayment credits depleted, found 2026-10-17). Not re-tested today (that is Desk · SoHum App & Vāni's check); the top-up is the owner's.
6. **Delete the merged remote branches** `privacy-page`, `sohum-account-section`, `sohum-mark` in this repo (all merged by PRs #3 to #5).
7. **Five old README fixes** (owner's GitHub account, not SoHum repos; owner to say whether to fix them or archive the repos): `spjrs-devastanam` ("Here are your Instructions"), `peetham-web` (create-react-app boilerplate), `gativani-core` (quick start says `cd node-core`; no such folder), `chanttracker` (README lists a `cloudflare/` directory; none at the repo root; it is the repo the Desk · ChantTracker owns), `gativani-app` (describes "NewsAudio"; the repo has only `lib` and loose docs). Re-checked today for the first four; `gativani-app` checked by listing only.

## Open pull requests

None open on `SoHum-Digital-Services/website` apart from the one carrying this file (`status/ledger`). Merged so far: #1 proxy the engine, #2 Cloud Run, #3 privacy policy, #4 SoHum Account section, #5 SoHum mark.

Placeholder repos (`sohum-bhakti`, `-web`, `sohum-spiritual`, `-web`, `sohum-vachini`, `-web`) and `sohum-id-web`: no open pull requests, only `main`, no other branches. The three `*-web` clones are one commit behind `origin`; each has an untracked `.DS_Store` only. Nothing uncommitted of value. This clone of `website` was 6 commits behind `origin/main` when checked; this branch starts from `origin/main`.

## Live

| Thing | Where it runs | Checked |
|---|---|---|
| `sohum.cc`, `www.sohum.cc` | Cloudflare in front of Cloud Run service `website` (asia-south1), Next.js standalone; rewrites `/panchangam`, `/v1`, `/static`, `/openapi.json` to the Cloud Run engine `panchangam`. Cloud Build trigger `website-main` deploys on push to `main`, so **merging deploys**. | HTTP 200 with Cloud Run trace header |
| Vercel | Paused since 2026-10-12 (plan CPU limit). The old engine origin `panchangam-eight.vercel.app` answers 402; the website no longer uses it. | 402 on that host |
| `darshan.`, `shop.`, `vani.sohum.cc` | Cloud Run behind Cloudflare, HTTP 200 | |
| `chanttracker.sohum.cc` | Cloud Run (`chanttracker-web`), redirects to sign-in | |
| `gativani.sohum.cc` | Cloudflare Worker, HTTP 200 | origin not verified |
| `console.sohum.cloud` | Cloudflare Worker, redirects to `/signin`; apex `sohum.cloud` 301 to the console | |
| `cheruvugattu.online` | Render static site `cheruvugattu-web` (not suspended) behind Cloudflare | |
| `id.`, `bhakti.`, `spiritual.`, `vachini.sohum.cc` | No DNS records exist. The placeholders' web front ends exist only as Cloud Run services `sohum-bhakti-web`, `sohum-spiritual-web`, `sohum-vachini-web` (each with a `*-main` Cloud Build trigger). | no DNS answer |
| Cloud Run services in `sohum-509918` | chanttracker-web, darshan-gateway, darshan-web, panchangam, purohit-api, purohit-web, sohum-bhakti-web, sohum-console-api, sohum-console-web, sohum-shop, sohum-shop-web, sohum-spiritual-web, sohum-vachini-web, spjrsd-backend, vani-alexa, vani-gateway, vani-web, website (18) | listed |
| Render | **All 10 services suspended for billing (2026-10-24)** except the static site `cheruvugattu-web`. Rollback copies: darshan-gateway, sohum-shop, vani-gateway, vani-alexa (not running: suspended). Others: spjrsd-backend, sohum-bhakti, sohum-spiritual, sohum-vachini, peetham-auth-backend. The master document still says the rollback copies "run, unused"; they are suspended. | Render API |
| Supabase | `sohum` (ap-northeast-2) ACTIVE_HEALTHY; `gativani` (ap-south-1) ACTIVE_HEALTHY at project level (its storage quota problem is Desk · GatiVani's); `chanttracker` INACTIVE (paused). | Supabase API |
| SoHum ID portal (`sohum-id-web`) | **Not built.** Repo holds README, AGENTS, DECISIONS only; the `id-api` service does not exist. Confirms the older open item. | repo contents |
| Placeholders | Repos `sohum-bhakti`, `-spiritual`, `-vachini` (FastAPI manifest) and `-web` each: single `main`, last commit 2026-09-27 (backends) or 2026-10-01; backends on suspended Render, front ends on Cloud Run. | |

Master-document rows to correct (Platform will ask HQ to route a contracts PR; this repo does not edit that document): section 4.4 says Render rollback copies still run (they are suspended); section 10 Render suspension row (2026-10-24) is now wider than `spjrsd-backend`.
