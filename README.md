# SmartSakuu frontend

Frontend foundation for SmartSakuu, built with Next.js, React, TypeScript,
Tailwind CSS, and `next-intl`, with a standalone landing page in `index.html`.

## Landing page

Edit the root `index.html` for the landing page's structure, styles, and
interactions. It can be opened directly as a file, or served at
`http://localhost:3000/index.html` after `pnpm dev`. Development and build
commands generate `public/index.html` automatically with the asset paths
adjusted for Next.js. Run `pnpm landing:sync` after editing during an existing
development session, then refresh the browser. Do not edit the generated copy.

This English landing-page artifact is separate from the locale routes below;
it does not redirect or replace the multilingual App Router foundation.
Local images and their credits are in `public/assets/smartsakuu/`.

The page includes keyboard-operable role/story tabs, an interactive comparison
of a score and connected record, a mobile menu, and a demo-request dialog that
prepares an email. No submission backend is connected. Stories are explicitly
illustrative; approved headteacher interviews, names and quotes must be
supplied before publishing real testimonials.

The three school-story players stream illustrative footage from Pexels and
require a network connection. Their source links and credits appear below the
stories on the page. Replace these clips with approved SmartSakuu interviews
before describing them as real school testimonials. The Responsible AI card
motion is implemented in CSS and JavaScript; the supplied short video was used
only as a visual reference and is not shipped with the site. Motion respects
the user's reduced-motion setting.

The supplied references inform the section order: hero, school overview,
problem, learning context, how it works, AI by role, school stories,
institutional memory, responsible AI, Ghana, headteacher stories, and contact.
The production build uses webpack, as configured in the original foundation.

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
│   └── ui/             # Reusable UI primitives
├── constants/          # Shared constants
├── features/           # Feature-owned modules (when features are introduced)
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
- Add only copy needed by implemented functionality. The current strings are
  intentionally minimal verification content.

### RTL considerations

The locale root layout sets `lang` dynamically and uses `dir="rtl"` for Arabic;
all other configured locales use `dir="ltr"`. Direction is resolved centrally
by `getLocaleDirection`.

Prefer CSS logical properties and direction-neutral utilities: use inline/block
start and end concepts instead of hardcoded left/right spacing, positioning,
alignment, or borders. Validate future UI in both `/en` and `/ar`; mirroring
icons or media should be decided case by case rather than applied globally.
