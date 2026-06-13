# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev        # Start dev server (Vite + TanStack Start with HMR)
bun run build      # Production build
bun run preview    # Preview production build locally
bun run lint       # ESLint check
bun run format     # Prettier format (100 char width, semicolons, trailing commas)
```

No test suite is configured.

## Architecture

**TanStack Start** (full-stack React framework) with SSR via **Nitro**. Uses file-based routing from TanStack Router — `src/routes/` maps directly to URL paths. `src/routeTree.gen.ts` is auto-generated; never edit it manually.

### Key files

| File | Purpose |
|---|---|
| `src/routes/__root.tsx` | Root shell — wraps app in `QueryClientProvider` |
| `src/routes/index.tsx` | Main landing page (the entire site, ~675 lines) |
| `src/router.tsx` | Router + QueryClient instantiation |
| `src/start.ts` | TanStack Start entry point |
| `src/server.ts` | SSR server entry (wraps Nitro) |
| `src/lib/analytics.ts` | GA4 event helpers |
| `src/lib/analytics.config.ts` | GA measurement ID (`G-VTEJRWVMY0`) |
| `src/lib/utils.ts` | `cn()` — Tailwind class merging via `clsx` + `tailwind-merge` |

### Styling

Tailwind **v4** — configured via CSS custom properties directly in `src/styles.css`, not a `tailwind.config.js`. Theme tokens (gold `#d4af37`, onyx `#0a0a0a`) and custom animations (shimmer, fade-up, marquee) live there. shadcn/ui components (New York style) are in `src/components/ui/`.

### UI components

47 shadcn/ui components are pre-installed in `src/components/ui/`. Add new ones with `bunx shadcn@latest add <component>`. The `cn()` utility must be used for conditional class merging.

### Forms

React Hook Form + Zod for all form state and validation. Use `@hookform/resolvers/zod` to connect them.

### Analytics

`AnalyticsTracker` component (mounted in `__root.tsx`) auto-initializes GA4 and tracks route changes. Use the typed helpers in `src/lib/analytics.ts` for custom events rather than calling `gtag` directly.

### Route conventions (TanStack Router)

- `$param` — dynamic segment
- `{-$param}` — optional segment  
- `$.tsx` — splat/catch-all
- `__root.tsx` — layout wrapping all routes
