# SmartSakuu frontend

The SmartSakuu marketing site, built with Next.js (App Router), React,
TypeScript, CSS Modules, Tailwind CSS, and `next-intl`.

## Landing page

The landing page is served at `/[locale]` (for example `/en`). It is composed
in `src/features/landing/components/landing-page.tsx` from one component per
section: hero, school overview, problem, why it matters, how it works, AI by
role, school stories, institutional memory, responsible AI, Ghana, headteacher
stories and contact.

- **Server components by default.** Sections render on the server and read
  their copy with `next-intl`. Only interactive parts are client components:
  the mobile menu, the score/record comparison, the role tabs (which pin and
  step through on scroll on tall wide screens), the School AI demo, the story
  slider, the headteacher carousel, the scroll-aligned principle cards and the
  demo-request dialog.
- **Copy** lives in `src/messages/en.json` under the `Landing` namespace.
  Identifiers, asset paths, video sources and credit links live in
  `src/features/landing/constants.ts`.
- **Styles.** `src/styles/globals.css` holds the design tokens, element
  defaults and a few shared primitives (`wrap`, `section`, `button`, …) in
  cascade layers. Each component has a co-located CSS Module, which always
  takes precedence over the layered global rules.
- **Assets.** Local images and their credits are in `public/assets/smartsakuu/`
  and are served through `next/image`. Plus Jakarta Sans is self-hosted with
  `next/font`.

The demo-request dialog prepares an email to `hello@smartsakuu.com`; no
submission backend is connected. The School AI demo answers from sample data
in the browser. Stories are explicitly illustrative; approved headteacher
interviews, names and quotes must be supplied before publishing real
testimonials.

The school-story and headteacher videos stream illustrative footage from Pexels
and require a network connection. Their source links and credits appear below
the stories on the page. Replace these clips with approved SmartSakuu
interviews before describing them as real school testimonials. All motion
respects the user's reduced-motion setting. The production build uses webpack,
as configured in the original foundation.

## Prerequisites

- Node.js 20.9 or newer
- pnpm 9 or newer

The repository pins its expected package manager in `package.json`.

## Installation

```bash
pnpm install
cp .env.example .env.local
```

Update `.env.local` for the environment where the application will run. Local
development works with the values copied from `.env.example`.

## Development commands

```bash
pnpm dev           # Start the local development server
pnpm lint          # Run ESLint with zero warnings allowed
pnpm typecheck     # Run the TypeScript compiler without emitting files
pnpm format        # Format supported files
pnpm format:check  # Check formatting without changing files
```

The initial routes are:

- `http://localhost:3000/en`
- `http://localhost:3000/fr`
- `http://localhost:3000/ar`
- `http://localhost:3000/pt`

Visiting `/` selects a locale through `next-intl`, falling back to English.
The selected locale is persisted in the `NEXT_LOCALE` cookie. Every public
application route should remain under `src/app/[locale]`.

## Production build

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
pnpm start
```

Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin before building a
deployment so canonical and alternate metadata URLs resolve correctly.

## Project structure

```text
src/
├── app/
│   └── [locale]/       # Locale-aware App Router root layout and routes
├── components/
│   ├── shared/         # Shared application components
│   └── ui/             # Reusable UI primitives (e.g. Icon)
├── constants/          # Shared constants
├── features/
│   └── landing/        # Landing page sections, constants and helpers
├── hooks/              # Reusable React hooks
├── i18n/
│   ├── navigation.ts   # Locale-aware Link/router wrappers
│   ├── request.ts      # Per-request message loading
│   └── routing.ts      # Locales, default locale, cookies, and text direction
├── lib/                 # Framework and library integrations
├── messages/           # One translation catalog per locale
├── services/           # Future service boundaries
├── styles/             # Global styles and design tokens
├── types/              # Shared and next-intl type declarations
├── utils/               # Framework-independent utilities
└── proxy.ts             # Locale detection, redirects, and persistence
```

Directories reserved for later work contain `.gitkeep` files only. Do not add
feature abstractions until a concrete product requirement needs them.

## Environment variables

- Commit only documented placeholders to `.env.example`.
- Keep local values in `.env.local`; all `.env*` files except `.env.example`
  are ignored by Git.
- Variables prefixed with `NEXT_PUBLIC_` are bundled into browser code and must
  never contain secrets.
- Server-only secrets must not use the `NEXT_PUBLIC_` prefix.
- Document every new variable in `.env.example` and in this section.

Current variable:

| Name                   | Required                  | Purpose                                          |
| ---------------------- | ------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Canonical public origin used by the metadata API |

## Internationalization

The centralized locale configuration is in `src/i18n/routing.ts`. English
(`en`) is the default locale; French (`fr`), Arabic (`ar`), and Portuguese
(`pt`) are also enabled. URL prefixes are always visible.

Use the exports from `src/i18n/navigation.ts` instead of importing navigation
helpers directly from Next.js when links or route changes should preserve or
change the locale. A future language control can call the exported router with
the current pathname and a target `locale`; no final switcher UI is included.

### Adding a new language

1. Add its locale code to `locales` in `src/i18n/routing.ts`.
2. Add a matching JSON catalog in `src/messages/<locale>.json`.
3. Copy every key from `en.json` and translate only the values.
4. If the language is right-to-left, update `getLocaleDirection`.
5. Run linting, type-checking, and a production build.
6. Verify direct navigation and refresh behavior for the new locale route.

### Translation conventions

- English is the source catalog and defines the required key structure.
- Keep the same namespaces and keys in every locale file.
- Group messages by page or reusable feature namespace.
- Use descriptive keys such as `Checkout.emptyStateTitle`, not rendered text as
  keys.
- Keep content out of components; use `next-intl` on the server by default.
- Add only copy needed by implemented functionality.
- Keys missing from a locale fall back to English (see `src/i18n/request.ts`).
  The `fr`, `ar` and `pt` catalogs are currently empty, so those routes render
  the English landing copy until translations are added.

### RTL considerations

The locale root layout sets `lang` dynamically and uses `dir="rtl"` for Arabic;
all other configured locales use `dir="ltr"`. Direction is resolved centrally
by `getLocaleDirection`.

Prefer CSS logical properties and direction-neutral utilities: use inline/block
start and end concepts instead of hardcoded left/right spacing, positioning,
alignment, or borders. Validate future UI in both `/en` and `/ar`; mirroring
icons or media should be decided case by case rather than applied globally.
