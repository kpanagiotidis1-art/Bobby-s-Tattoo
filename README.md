# Bobby's Tattoo Studio — Website

Commercial marketing site + inquiry system for a new tattoo studio. Domain: bobbystattoo.com.

## Stack

- **React 19 + Vite** — SPA, client-rendered. SEO risk (see Architecture Notes below) is mitigated with `react-helmet-async` for per-page metadata rather than switching to an SSR framework, given the small page count and the launch timeline.
- **React Router 7** — client-side routing.
- **TanStack Query** — server state (Supabase reads/writes), caching, loading/error states.
- **React Hook Form + Zod** — forms (inquiry form, consent form) with schema-based validation.
- **Tailwind CSS v4 + shadcn/ui** — utility styling + accessible, unstyled-by-default component primitives we fully own (not a black-box UI kit).
- **Supabase** — Postgres, Auth (for the future admin/CMS), Storage (consent form uploads).

## Project structure

```
src/
  app/            Router config, layouts, providers — the app shell.
  pages/          Route-level components (one per URL).
  features/       Self-contained feature modules (inquiry form, consent form, etc.),
                   each owning its own components/api/schema/hooks.
  components/ui/  shadcn/ui primitives (button, input, dialog, ...).
  lib/            Cross-cutting singletons: Supabase client, TanStack Query client, utils.
  hooks/          Shared hooks used by more than one feature.
  constants/      Site-wide constants (nav links, site metadata).
supabase/         Migrations / edge functions once we introduce the Supabase CLI.
```

Why feature-based instead of grouping everything by type (all components together, all hooks together): the site is going to grow (artist pages, CMS-driven content, consent workflow) and feature folders keep each concern's UI, data-fetching, and validation next to each other instead of scattered across three parallel trees.

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project's URL and anon key (Project Settings → API). `.env` is gitignored — never commit real keys.

## Getting started

```bash
npm install
npm run dev
```

## Architecture notes / open decisions

- **SPA + SEO**: FAQ and Blog exist for SEO. A pure client-rendered SPA is not the strongest SEO story, but given the page count is small and the timeline is tight, we're mitigating with per-page `<title>`/meta via `react-helmet-async`, a sitemap, and LocalBusiness structured data — instead of adopting an SSR framework (Next.js/Astro) that neither of us has used before, isn't in the requested tech stack, and isn't necessary for this content volume. Revisit if organic search traffic underperforms post-launch.
- **Consent form (`/consent`)**: not linked in navigation, reached only via the in-studio QR code. It's a standalone route with no shared nav/footer — see `src/app/routes.jsx`. It will handle ID uploads, which is sensitive PII: this needs a private (non-public) Supabase Storage bucket, RLS policies restricting read access to studio staff, and a data retention decision from the client before we build it.
- **CMS**: V1 ships without an admin UI. FAQ/Aftercare/Blog content lives in Supabase tables from day one (so there's no painful migration later), but content edits go through the developer via Supabase Studio until a minimal authenticated `/admin` is built as a fast-follow.
- **Instagram feed**: recommend a curated grid (studio-selected photos stored like any other content) over the live Instagram Graph API for V1 — avoids OAuth/token-refresh maintenance and gives more control over which photos represent a premium brand.
- **Google Reviews**: the studio is brand new and may launch with zero reviews. Recommend a "Read our reviews on Google" link/button instead of embedded review cards until there's real review volume.
- **Fresha**: confirmed back-of-house only (bookings/POS) — clients are never sent there to book, per the client's explicit "we need to go through inquiry first" requirement. Reviews section links to it secondarily, below the primary Google CTA.
- **Preferred artist field**: the inquiry form has a free-text "preferred artist" input now, ahead of artist pages existing, per the client's explicit request. Once artist pages ship (V2), this becomes a real picker and can pre-fill from `?artist=` on the "Book with Artist" link.
- **Design direction**: client-provided references (markdtattoo.com.au, thirteenfeettattoo.com) both lean premium-minimal — large whitespace, restrained sans-serif type, photography doing the visual work, one accent color at most. Recommend the lighter/high-contrast end of that spectrum (closer to Thirteen Feet) over Markd's dark theme, matching the brief's explicit "not dark" direction. shadcn already ships both light/dark tokens, so this is easy to flip later if the client prefers dark.
