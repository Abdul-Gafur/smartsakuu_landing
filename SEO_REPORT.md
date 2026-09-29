# SEO report: SmartSakuu frontend

Audit and fixes made on 29 September 2026 against Next.js 16.3.6 (App Router,
`next-intl`, webpack build). Canonical origin: `https://www.smartsakuu.com`.

The site started from a strong base: Metadata API with `metadataBase` and a
title template, canonical and hreflang tags, a sitemap with language
alternates and images, JSON-LD for the organization and product, `next/font`,
`next/image` with `sizes` and alt text everywhere, and statically generated
pages. The work below fixes the gaps found in the audit. Nothing visible
changed except the new 404 page and the careers page title.

## What changed

Each area is its own commit (`git log ad4aa14..HEAD`). The first commit,
`added careers pages`, is the careers work handed over before this pass,
committed unchanged so the SEO commits can be reviewed on their own.

### Canonical origin and non-production indexing

- `src/lib/seo.ts`: `getSiteUrl()` defaults to `https://www.smartsakuu.com`
  in every build (localhost only in `next dev`). Before, a build without
  `NEXT_PUBLIC_SITE_URL` put `http://localhost:3000` (or the Vercel project
  URL) into every canonical, hreflang, Open Graph, sitemap and JSON-LD URL.
  New `isIndexableDeployment()` returns `false` when `VERCEL_ENV` is not
  `production`.
- `src/app/[locale]/layout.tsx`: pages are `noindex` on preview and
  development deployments.
- `src/app/robots.ts`: preview deployments leave the sitemap out of
  `robots.txt`. Crawling stays allowed so search engines can see the
  `noindex`.
- `next.config.ts`: `smartsakuu.com/*` redirects permanently (308) to
  `https://www.smartsakuu.com/*`. Trailing slashes were already redirected
  by default.
- `README.md`, `.env.example`: documented the new defaults.

### Metadata

- `src/app/[locale]/layout.tsx`, `src/features/landing/lib/structured-data.ts`:
  `/pt` (untranslated, `noindex`) now uses a self-referencing canonical. Before,
  it combined `noindex` with a canonical to `/en`, which sends conflicting
  signals.
- `src/features/careers/lib/metadata.ts`: Open Graph and Twitter titles now
  include the brand (`Careers: EdTech Jobs in Ghana | SmartSakuu`). A new
  `contentLocale` option handles job postings, which exist in one language
  only. For those pages:
  - `/fr` and `/ar` point their canonical at the posting's own language.
  - They drop the hreflang tags, instead of acting as three near-duplicate
    URLs.
- `src/app/[locale]/careers/[slug]/page.tsx`: `JobPosting` structured data
  appears only on the canonical copy, so Google for Jobs sees each role once.
- `src/messages/{en,fr,ar}.json`: the careers title went from "Careers" (20
  characters with the brand) to "Careers: EdTech Jobs in Ghana" and its
  French and Arabic equivalents. The French description was cut from 211 to
  161 characters.

### Sitemap

- `src/app/sitemap.ts`: each job posting is listed once, at its canonical
  language URL, without hreflang. Job pages and the careers listing carry
  `lastModified` from the role's opening date. The home page has no reliable
  modification date, so it has none.

### Structured data (JSON-LD)

- `src/features/careers/lib/structured-data.ts`:
  - New `getCareersBreadcrumbs()` returns a `BreadcrumbList` (Home › Careers
    › Role), rendered on `/careers` and every job page.
  - `JobPosting` gains the recommended `identifier`.
  - `validThrough` was already emitted from `closesAt`.
- `TODO(seo)` markers: see [Needs your input](#needs-your-input).

### Content structure and accessibility

- `src/features/careers/components/job-card.tsx`, `job-list.tsx`,
  `open-roles-section.tsx`: on `/careers` the role titles came straight after
  the `h1` as `h3`s, skipping a level. That was the only Lighthouse
  accessibility failure. They are now `h2`s there, and stay `h3`s under the
  "other open roles" `h2` on job pages. Styling is unchanged, because the
  card's module class sets every property that differs between the two
  levels.

### 404 handling

- `src/app/[locale]/not-found.tsx`, `src/app/[locale]/[...rest]/page.tsx`,
  `src/features/landing/components/not-found-section.tsx` (+ CSS module), and
  a `NotFound` namespace in the translation catalogs:
  - Unknown URLs under a locale, and `notFound()` calls such as a removed
    role, now show a translated 404 page with the site header and footer.
    It links to the homepage and open roles.
  - Before, visitors saw the unstyled English framework page, with no `lang`
    attribute and no way back into the site. The status code is still `404`.
- `src/features/careers/components/careers-shell.tsx` moved to
  `src/features/landing/components/site-shell.tsx` (`SiteShell`), so careers
  and the 404 page share it.

### Performance and rendering

- `src/app/[locale]/opengraph-image.tsx`: Open Graph images were generated on
  every request and downloaded fonts from Google each time; a failed download
  broke link previews. They are now prerendered at build time for each locale
  (`generateStaticParams`). The fonts are read from `assets/fonts/`: the two
  Plus Jakarta Sans weights, under the SIL Open Font License. That avoids a
  build-time download, which timed out once during this work and failed the
  build. The rendered images are pixel-identical to before.
- JavaScript was left unchanged on purpose. The home page ships about 188 KB
  of gzipped JavaScript, but Lighthouse's "unused JavaScript" points only at
  the React/Next framework chunks. Total Blocking Time is 20–30 ms and layout
  shift is 0, so lazy-loading app components would not pay off.
- Static asset caching was left unchanged. Page images are served through
  `/_next/image`, which is cached. Files in `public/assets` aren't
  content-hashed, so long cache lifetimes on them would serve stale images
  after a replacement.

### Site assets

- `src/app/manifest.ts`: web app manifest (name, description, theme colour,
  icons). The favicon, icon and Apple touch icon were already in place.

## Verification

- `pnpm build` passes with no errors or warnings. Every page and every Open
  Graph image is statically generated. The only on-demand route is the
  `[...rest]` catch-all, which always returns 404.
- Rendered HTML checked on `/en`, `/ar`, `/pt`, `/en/careers`, and the job
  page in `/en` and `/fr`:
  - one `h1` per page, with a clean heading order;
  - correct title, description, canonical, hreflang, Open Graph (including
    image) and robots tags;
  - JSON-LD graphs as described above.
- `/sitemap.xml` lists 7 URLs (3 home, 3 careers, 1 job) with production
  URLs. `robots.txt` allows crawling and points to the sitemap.
- Status codes:
  - unknown paths return `404`;
  - a trailing slash returns `308`;
  - `Host: smartsakuu.com` returns `308` to `www`;
  - a preview build (`VERCEL_ENV=preview`) serves `noindex` on every page
    and a `robots.txt` without the sitemap.

### Lighthouse (mobile, local production build)

Both runs used the same build method and a fresh server per page. On an
unchanged page, performance scores varied by up to ±4 between runs, so treat
small performance differences as noise.

| Page          | Performance | Accessibility | Best practices | SEO       |
| ------------- | ----------- | ------------- | -------------- | --------- |
| `/en`         | 97 → 97     | 100 → 100     | 100 → 100      | 100 → 100 |
| `/en/careers` | 99 → 99     | 98 → **100**  | 100 → 100      | 100 → 100 |
| Job page      | 97 → 99     | 100 → 100     | 100 → 100      | 100 → 100 |

Lighthouse's SEO category doesn't cover most of what changed here: canonical
correctness, duplicate job URLs, structured data, and production URLs.
Validate those with the Rich Results Test and Search Console (see below).

## Needs your input

| Where                                         | What                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/features/landing/lib/structured-data.ts` | `TODO(seo)`: add `legalName` and `sameAs` (official LinkedIn, Facebook, X and similar profile URLs) to the `Organization`. None were found in the codebase.                                                                                                                                                                             |
| `src/features/careers/lib/structured-data.ts` | `TODO(seo)`: add `baseSalary` once a pay range can be published. Google recommends it for job postings and shows it in results.                                                                                                                                                                                                         |
| `src/features/careers/data/jobs.ts`           | **Launch blocker (not SEO):** the application link is still `https://forms.gle/REPLACE_WITH_FORM_ID`.                                                                                                                                                                                                                                   |
| `src/features/careers/data/jobs.ts`           | Someone changed the job slug to `sales-marketing` while this work was in progress. The change isn't committed, and I didn't include it. Its old URL will return 404, which is fine before launch.                                                                                                                                       |
| Hosting                                       | The preview `noindex` relies on Vercel's `VERCEL_ENV`. If you deploy previews somewhere else, tell me what that host sets and I'll extend `isIndexableDeployment()`.                                                                                                                                                                    |
| Job lifecycle                                 | Jobs aren't filtered by closing date, and pages and the sitemap are generated at build time. After a role closes, remove it from `data/jobs.ts` and redeploy. The page then returns 404, which is what Google for Jobs expects. When a careers backend is connected, add revalidation so new roles reach the sitemap without a rebuild. |

### Known limitation

When a page under `[locale]` returns 404, Next 16 sends an HTML shell and the
translated 404 content renders in the browser. This happens because the
locale layout is the root layout; the baseline build had the same behaviour
with the default 404. The status code is correct and 404 pages aren't
indexed, so search results aren't affected. The 404 page also carries two
`<title>` elements; browsers use the first, the translated "Page not found".

### Repository housekeeping (outside this work)

`pnpm lint` reports 7 warnings about unused imports and variables, left over
from the removed stories and headteacher sections (`landing-page.tsx`,
`headteachers-section.tsx`, `record-section.tsx` and `value-section.tsx`).
`pnpm format:check` flags `concept_note.md`. Both were already there and I
left them alone.

## Things to do outside the codebase

1. **DNS and hosting.** Point `smartsakuu.com` at the deployment so the
   bare-domain redirect can work, and set `www.smartsakuu.com` as the primary
   domain. On Vercel, also add the bare → www redirect in the project's
   domain settings.
2. **Google Search Console.** Add a Domain property for `smartsakuu.com`
   (verified through a DNS TXT record) and submit
   `https://www.smartsakuu.com/sitemap.xml`. Then:
   - inspect `/en`, `/fr`, `/ar` and the job page;
   - watch the Page indexing report for `/pt` (expected: excluded by
     `noindex`);
   - watch the Core Web Vitals report once there is traffic.
3. **Bing Webmaster Tools.** Import the site from Search Console and submit
   the sitemap.
4. **Rich Results Test.** Test the job page (JobPosting and BreadcrumbList)
   and `/en/careers` (BreadcrumbList). Fix any warnings it raises, starting
   with `baseSalary`.
5. **Google Business Profile.** Worth setting up if SmartSakuu has, or can
   list, a place of business in Wa, or as a service-area business covering
   Ghana. It needs a verifiable address; the site only states "Wa, Upper
   West Region".
6. **Backlinks and mentions.**
   - Ask the Wa Municipal branch of GNAPS, mentioned on the site as a
     partner, and partner schools to link to the site.
   - List SmartSakuu in Ghanaian EdTech and startup directories, and in
     education-sector publications.
   - Create a LinkedIn company page and link it back to the site. Its URL
     also fills the `sameAs` TODO.
7. **Sharing previews.** After launch, check a shared link with the LinkedIn
   Post Inspector and the Facebook Sharing Debugger.

## Content recommendations

Suggestions only; I haven't written any content.

- **One page carries every product keyword.** The home page is the site's
  only product page, so "school management system", attendance, fees,
  learner records, AI lesson planning and BECE/WASSCE preparation all
  compete for one URL. Dedicated pages for the main features would each give
  search engines a clear topic. Good candidates:
  - fees and payments;
  - attendance;
  - learner records;
  - AI for teachers;
  - exam preparation.
- **The `h1` doesn't name the category.** "Run the school. Understand every
  learner. Improve learning." never says what SmartSakuu is. The `<title>`
  does ("AI-Powered School Management System for Ghana"). A supporting line
  that names the category would strengthen the page, if it fits the design.
- **Regional targeting is inconsistent.** The English and French titles say
  Ghana; the Arabic title says "for schools in Africa". Decide which market
  each language targets and align the titles and descriptions.
- **Trust pages are missing.** There's no About, Contact, Privacy Policy or
  Terms page. For a product that handles learner data, a privacy policy is
  expected by schools and by search quality raters, and it gives the footer
  more to link to.
- **Evidence content.** The README notes that stories and testimonials are
  illustrative, and those sections have been removed. Once you have approved
  case studies from partner schools, publish them as their own pages. They
  are the strongest content for queries like "school management software
  Ghana".
- **Portuguese.** `/pt` is set up but untranslated and kept out of the
  index. Translate it, or remove the locale if Lusophone markets aren't a
  near-term target.
- **Internal linking.** The home page links to careers only from the footer,
  and the header's section links are same-page anchors. As new pages are
  added, link them from the relevant home page sections, not just the
  navigation.
- **Resources.** Short guides on topics schools already search for, such as
  preparing for BECE, GES/NaCCA curriculum planning, and running attendance
  and fees digitally, would build topical authority. They would also give
  other sites a reason to link to you.
