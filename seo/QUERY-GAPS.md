# Query Gap Matrix — Jack of All Blades Landscaping

**What people ask AI/search to find a business like this vs. what the site actually answers.**

Business: Jack of All Blades Landscaping (owner Mike Hazzard) · East Grand Rapids, MI + West Michigan
Domain audited: https://jackofallbladeslandscaping.com
Method: read the site's crawlable text (homepage, /about, 6 service‑area pages, /contact, /portfolio, /testimonials) and matched it against the prompts below.
Date: 2026‑07‑09

---

## How to read this

For each prompt, a passage counts as **HAS** only if it meets ALL four of the client's criteria:
1. Directly answers the question,
2. In crawlable text (not an image/video),
3. Under ~100 words,
4. **Names the business AND the service area inside that same passage.**

- **HAS** — a self‑contained passage meets all four.
- **PARTIAL** — the topic is touched, but the answer is generic, buried in a badge/meta tag, missing the business name or the city in‑passage, or only covers some of the intent.
- **MISSING** — no crawlable passage addresses it at all.

The 4‑part bar is deliberately strict because that's what AI answer engines (ChatGPT, Perplexity, Google AI Overviews) reward: one tight, self‑contained, entity‑anchored passage they can lift verbatim. A fact split across a service card, a schema tag, and a footer does **not** clear it.

Pages available to answer from: `/`, `/about`, `/contact`, `/portfolio`, `/testimonials`, and 6 city pages (`/service-areas/{east-grand-rapids, grand-rapids, kentwood, wyoming-mi, ada, cascade}`). **There is no FAQ page, no pricing page, and no article/blog content anywhere on the site.**

---

## The matrix

### A. Direct service + city ("who does X in Y")

| # | Prompt | Status | Where / verbatim evidence |
|---|--------|--------|---------------------------|
| 1 | "Who does landscaping in East Grand Rapids, MI?" | **HAS** | `/service-areas/east-grand-rapids` H1 "Landscaping Services in East Grand Rapids" + "We're proud to serve homeowners and businesses throughout East Grand Rapids with professional landscaping…" Business name is in the page title/logo, not the paragraph. |
| 2 | "Landscaper near me in Grand Rapids MI" | **HAS** | `/service-areas/grand-rapids`: "We serve residential and commercial clients throughout Grand Rapids with comprehensive lawn care, hardscaping, snow removal, and tree services." |
| 3 | "Paver patio / hardscaping installer in East Grand Rapids" | **PARTIAL** | `/` Hardscaping card: "We build custom patios, walkways, retaining walls, and stone features… built to withstand Michigan's seasons." Describes the service but names **no city and no business** in the passage; no hardscaping‑specific city page. |
| 4 | "Lawn care service in Kentwood MI" | **HAS** | `/service-areas/kentwood`: "We serve homeowners and businesses throughout Kentwood with expert lawn care, seasonal cleanups, hardscape installation, and tree trimming." |
| 5 | "Snow removal company in Grand Rapids" | **PARTIAL** | Snow appears in the Grand Rapids page service list and the `/` Snow Removal card ("Plowing, salting, ice management…"), but no passage pairs *snow removal* + a named city + the business in one place. |
| 6 | "Tree trimming / tree removal in Ada MI" | **PARTIAL** | `/service-areas/ada` names Ada + "tree services" generally; the detailed tree copy ("full tree removal, and stump grinding. Licensed and insured…") is on `/` with no city. Intent is split across two pages. |
| 7 | "Landscaper in Wyoming MI" | **HAS** | `/service-areas/wyoming-mi`: "we're honored to serve its diverse residential and commercial properties. From routine lawn maintenance to complete landscape renovations…" |
| 8 | "Do you serve Rockford / Hudsonville / Byron Center / Grandville / Walker?" | **PARTIAL** | These 10 towns appear only in a bare service‑area **list** (name only, no page, no passage). Only 6 of 16 advertised towns have a real answerable page. |

### B. Cost ("how much does X cost in Y")

| # | Prompt | Status | Where / verbatim evidence |
|---|--------|--------|---------------------------|
| 9 | "How much does a paver patio cost in Grand Rapids?" | **MISSING** | No pricing text anywhere. Schema says `priceRange: "$$"` — not an answer. |
| 10 | "How much is weekly lawn mowing in East Grand Rapids?" | **MISSING** | — |
| 11 | "Cost of a retaining wall in West Michigan?" | **MISSING** | — |
| 12 | "How much does tree removal cost in Grand Rapids?" | **MISSING** | — |
| 13 | "Seasonal snow‑removal contract price in Kentwood?" | **MISSING** | Copy says "Contract‑based" but gives no figure or range. |
| 14 | "How much does fall/spring cleanup cost?" | **MISSING** | — |

### C. Timing ("how long does X take / when should I")

| # | Prompt | Status | Where / verbatim evidence |
|---|--------|--------|---------------------------|
| 15 | "How long does a paver patio installation take?" | **MISSING** | — |
| 16 | "How long until new sod is established?" | **MISSING** | Sod appears only as a portfolio/gallery label, no explanatory text. |
| 17 | "When should I schedule fall cleanup in West Michigan?" | **MISSING** | Seasonal service is described, but no timing guidance. |

### D. Comparison ("X vs Z — which do I need")

| # | Prompt | Status | Where / verbatim evidence |
|---|--------|--------|---------------------------|
| 18 | "Sod vs seed for a new lawn in Michigan?" | **MISSING** | — |
| 19 | "Pavers vs concrete patio — which should I get?" | **MISSING** | — |
| 20 | "Retaining wall vs raised garden‑bed border?" | **MISSING** | — |

### E. Qualification / "do I need"

| # | Prompt | Status | Where / verbatim evidence |
|---|--------|--------|---------------------------|
| 21 | "Do I need a permit for a retaining wall in Grand Rapids?" | **MISSING** | — |
| 22 | "Should I mow weekly or biweekly?" | **PARTIAL** | `/` Lawn Care: "weekly mowing… We maintain consistent schedules" — implies weekly but doesn't answer the choice or name a city. |
| 23 | "Do you handle commercial properties, not just homes?" | **PARTIAL** | Stated inside service/area copy ("residential and commercial clients throughout Grand Rapids"), but no dedicated commercial passage; easy to miss. |

### F. Logistics ("do they come to me / how far out / hours")

| # | Prompt | Status | Where / verbatim evidence |
|---|--------|--------|---------------------------|
| 24 | "Do you come to my property for a free estimate?" | **MISSING** | "Free Estimate" CTAs exist everywhere, but **no passage states the estimate is on‑site / that they come to you.** |
| 25 | "How do I get a quote?" | **HAS** | `/contact` "Get Your Free Quote" form + sitewide "Get a Free Estimate" CTA. Answers the mechanism clearly. |
| 26 | "What areas do you serve?" | **HAS** | `/about`: "Based in East Grand Rapids, we serve Grand Rapids, Kentwood, Wyoming, Ada, Cascade, and communities across West Michigan." Business + areas, one passage, <100 words. |
| 27 | "How far out are you booked / do you have availability this season?" | **MISSING** | — |
| 28 | "What are your hours? Are you open Saturdays?" | **PARTIAL ⚠️** | `/contact` shows "Mon – Fri: 8:00 AM – 5:00 PM / Sat – Sun: Closed" — but the site's own structured data says `Mo-Sa 07:00-19:00`. **These contradict each other** (see Data‑integrity flags). |

### G. Trust ("is X licensed / insured / bonded / experienced / reviewed")

| # | Prompt | Status | Where / verbatim evidence |
|---|--------|--------|---------------------------|
| 29 | "Is Jack of All Blades licensed and insured?" | **PARTIAL** | Only the Tree card says "Licensed and insured for safe, efficient work." Reads as tree‑service‑only; no company‑wide licensed/insured statement. |
| 30 | "Is the company bonded?" | **PARTIAL** | "Fully Bonded" appears as a 2‑word badge (`/`, `/about`) and in meta text "Fully bonded with 8+ years experience." No sentence answer that names business + area. |
| 31 | "How long has Jack of All Blades been in business?" | **HAS** | `/about`: "I started the business when I was 16…" + "8+" Years Experience stat + meta "…for 8+ years." Business named in passage. |
| 32 | "Who owns Jack of All Blades? Are they local?" | **HAS** | `/about`: "My name is Mike Hazzard and I am the founder of Jack of All Blades Landscaping. Based in East Grand Rapids…" |
| 33 | "Are there reviews for Jack of All Blades?" | **HAS** | `/testimonials` (dedicated page) + homepage testimonial ("Jack of All Blades is an outstanding company… I have 0 complaints."). |
| 34 | "Do you offer free estimates?" | **HAS** | Sitewide "Get a Free Estimate" + `/` meta "Free estimates. Call 616‑250‑8044." |

**Tally:** HAS 10 · PARTIAL 9 · MISSING 15 (of 34).

---

## Ranked gap list — what to fix first

Ranked by how likely a real customer is to ask (high‑intent, near‑purchase questions first). **The top rows are the FAQ shortlist for Phase 3.** Write each answer against this business's real facts (Mike Hazzard, East GR base, the 16 towns, bonded, tree service licensed/insured, contract snow, free estimates) — not from a generic trade template.

| Rank | Prompt / gap | Status | Why it's high‑value | Answer must contain (business + area, <100 words) |
|------|--------------|--------|---------------------|---------------------------------------------------|
| 1 | Paver patio / hardscaping **cost** in Grand Rapids | MISSING | Highest‑ticket service; cost is the #1 blocker question buyers ask AI before calling. | A real starting range or "what drives the price" for JOAB hardscaping in the GR area. |
| 2 | "Do you come to me for a **free, on‑site estimate**?" | MISSING | Every lead wants this confirmed before submitting the form; you offer it but never say it. | One line: JOAB provides free on‑site estimates across East GR + West Michigan. |
| 3 | Weekly **lawn mowing cost** in East Grand Rapids | MISSING | Highest‑volume recurring service; price‑shopped constantly. | A per‑visit/seasonal range or the factors, named to East GR. |
| 4 | **Licensed & insured?** (company‑wide) | PARTIAL | Trust gate; currently reads as tree‑only. Cheap to fix, big credibility lift. | Clear company‑wide bonded + insured statement naming JOAB. |
| 5 | **Retaining wall cost** in West Michigan | MISSING | High‑ticket hardscape; frequent AI cost query. | Range/drivers, named to service area. |
| 6 | **Tree removal cost** in Grand Rapids | MISSING | High‑intent, high‑ticket, urgent. | Range/drivers + "licensed and insured," named to GR. |
| 7 | **Snow‑removal contract cost** for the season (Kentwood/GR) | MISSING | Seasonal, contract‑based = you *want* these leads early. | Contract model + rough pricing basis, named. |
| 8 | "**Do you serve [Rockford / Hudsonville / Byron Center / Grandville / Walker / …]**?" | PARTIAL | 10 of 16 advertised towns have no answerable page — AI can't confirm coverage. | Either short city passages or an explicit "we serve all of West Michigan including…" answer. |
| 9 | **How long** does a paver patio / sod job take? | MISSING | Sets expectations; common pre‑booking question. | Typical timeline for JOAB projects in West MI. |
| 10 | **Pavers vs concrete** patio — which do I need? | MISSING | Comparison queries win AI Overviews and pull undecided buyers. | Honest comparison ending in a JOAB recommendation. |
| 11 | **Sod vs seed** for a new Michigan lawn | MISSING | Same comparison‑capture value; Michigan‑specific angle. | Michigan‑climate answer + JOAB sod service. |
| 12 | **Hours / open Saturdays** | PARTIAL ⚠️ | Answer exists but **contradicts your own schema** — fix before adding FAQs. | One correct, consistent hours statement (reconcile the two sources). |
| 13 | **Booking / availability** this season | MISSING | Urgency driver ("how soon can you come out"). | Current turnaround / "call for availability," named. |
| 14 | **Commercial** work (not just residential)? | PARTIAL | Doubles the addressable market; currently buried. | Explicit residential + commercial statement. |
| 15 | **Fall/spring cleanup timing & cost** | MISSING | Seasonal spike traffic. | When to book + price basis, named to West MI. |
| 16 | **Permit for a retaining wall** in Grand Rapids? | MISSING | Informational‑but‑local; strong AI‑Overview bait, positions JOAB as the expert. | Local permit reality + "we handle it," named. |

Lower‑priority (comparison/qualification tail): retaining wall vs raised bed (#20), weekly vs biweekly mowing (#22) — good blog/FAQ fodder once the top 16 are covered.

---

## Data‑integrity flags found during the audit (fix before/with Phase 3)

1. **Conflicting business hours.** `/contact` (visible text) says **Mon–Fri 8:00 AM–5:00 PM, Sat–Sun Closed**; the homepage JSON‑LD (`openingHours`) says **Mo‑Sa 07:00‑19:00**. AI engines read both and may surface the wrong one, or distrust the entity. Pick the truth and make them match.
2. **"6 Core Services" stat vs 8 listed services.** The hero badge says "6 Core Services"; the site actually lists 8 (Lawn Care, Landscaping, Hardscaping, Snow Removal, Seasonal Cleanup, Storm Clean Up, Hedge & Bush Trimming, Tree Trimming/Removal). Reconcile the count.
3. **16 towns advertised, 6 answerable.** `ALL_SERVICE_AREAS` lists 16; only 6 have real pages. Either build the missing city passages or make the coverage claim answerable in one place.
4. **Trust claims are badges, not sentences.** "Fully Bonded" / "Licensed and insured" exist only as chips or inside one service card — AI can't quote a clean company‑wide trust sentence. This is the cheapest high‑impact fix.

---

## What this means for Phase 3

Rows ranked **1–16** above are the FAQ/content backlog, in priority order. The four **MISSING** clusters — **cost, on‑site estimate, project timing, and comparisons** — are where this site is invisible to AI answer engines today, and they map exactly to the questions a homeowner asks right before they hire. Write those FAQs (and any city passages) with the business name + specific town **inside each answer, under 100 words**, so an answer engine can lift them whole.
