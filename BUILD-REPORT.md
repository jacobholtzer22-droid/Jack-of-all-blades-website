# Build report: site_update, jack-of-all-blades-landscaping

Run type: `site_update` (CI). Scope came from `INSTRUCTIONS.md`: stop targeting Rockford, MI.

## 1. What changed
- `data/serviceAreas.ts`: deleted the Rockford service-area entry (slug `rockford`). Removed "Rockford" from `ALL_SERVICE_AREAS` and `rockford` from `SERVICE_AREA_SLUGS`. Deleted the `rockford` key from `NEARBY_AREAS`. Removed `rockford` from the `ada`, `comstock-park` and `forest-hills` neighbor arrays. Changed the code comment "(all 16 now have one)" to "(every listed area has one)" because there are now 15.
- `data/services.ts`: removed "Rockford" from the `areas` array (line 330).
- `app/page.tsx`: removed the Rockford `City` entry from the `areaServed` JSON-LD. No other JSON-LD changed.
- `next.config.mjs`: added `redirects()` with a permanent redirect from `/service-areas/rockford` to `/service-areas`. Next.js emits it as a 308.

No other town, content, design, Google tag, analytics or ads code was touched.

## 2. Grep results
I grepped the repo case-insensitively for `rockford`, `cedar springs` and `cedar-springs`, leaving out `node_modules`, `.next` and `seo/`.
- Before the change, Rockford appeared only in the three files named in the instructions. There were no hits in a footer, an `llms.txt` (the repo has none) or a hand-written sitemap.
- "Cedar Springs" had **zero hits** anywhere, so there was nothing to remove for it.
- After the change, the only `rockford` left is the redirect source in `next.config.mjs`. That one is intended.
- The sitemap (`app/sitemap.ts`) is built from `SERVICE_AREA_SLUGS`, so removing the slug removes the URL.

## 3. Build and verification
- `npm run build`: passed (types, lint, 38 static pages).
- `/service-areas/[slug]` now prerenders 15 cities. There is no Rockford page in the output.
- `sitemap.xml` output contains 0 occurrences of "Rockford". No prerendered HTML contains "Rockford".
- `routes-manifest.json` has `/service-areas/rockford` → `/service-areas` with status 308 (permanent).
- This repo is hand-built and has no `scripts/verify.ts` or `npm run verify`, so there is no template gate to run. `npm run build` is the gate here.

## 4. Self-check (Phase 5 in CI)
This run changed data and config only: no components, theme or copy. So it cannot have added any templated-looking visual pattern. The three risks I checked by reading the code:
1. Nearby-area chips on Ada, Comstock Park and Forest Hills might link to a page that no longer exists. Fixed: `rockford` is removed from all three arrays. Each still has 3 to 4 neighbors.
2. Copy might still claim "16" areas. I grepped and found no customer-facing "16 areas/cities" text; the only stale mention was a code comment, now updated.
3. The JSON-LD `areaServed` list might drift from the page list. Fixed: Rockford is gone from both, and the remaining cities are unchanged.

## 5. Photos
None added, moved or removed.

## 6. Stock
Not applicable.

## 7. Facts from outside the brief
None.

## 8. Notes for the human
- The CI section of AGENT.md forbids editing `next.config.mjs`, because in the template that file holds `output: 'export'`, which the template gate depends on. This repo is hand-built (the instructions say so), has no `output: 'export'` and no template gate. `INSTRUCTIONS.md` explicitly asked for the redirect in next.config. I added only a `redirects()` block and left everything else in that file as it was. The instructions said to follow "the existing redirects pattern", but the file had no redirects, so this block is the first one. It uses the standard Next.js `permanent: true` form.
- The redirect needs a server-side host that honors `next.config` redirects (for example Vercel, which `@vercel/analytics` suggests this site uses). It would not apply on a pure static export.
- Off-site: if Rockford is listed as a service area in the Google Business Profile or in ad location targeting, it should be removed there too. This run did not touch either.
