# QuoteFlow AI — Claude Code Build Brief

Copy-paste this into Claude Code, step by step, in this order. Don't skip the skills/reference step — that's what separates a demo that looks like a $500 template from one that looks credible in front of a logistics owner.

---

## Step 1 — Load the design skills (do this first, once)

In your terminal:
```
npm install -g @anthropic-ai/claude-code
claude
```

Then inside Claude Code, paste:
```
install github.com/anthropics/skills/tree/main/skills/frontend-design
install github.com/nextlevelbuilder/ui-ux-pro-max-skill
```

Restart Claude Code and confirm with "what skills do you have" — both should show.

---

## Step 2 — Steal a visual direction (20 min)

Go to Awwwards / Dribbble, search **"SaaS dashboard"** or **"logistics dashboard"** or **"B2B analytics"**. Pick 3 sites, not more. Screenshot hero + one content section + a data table/card view from each. Save as `ref-1.png`, `ref-2.png`, `ref-3.png` in your project folder.

Drag them into Claude Code and keep this line ready for the build prompt below — it's non-negotiable:
> "Match the typography scale, spacing rhythm, and motion of these references. Do not copy the layouts."

---

## Step 3 — The build prompt

Paste everything below as **one message** to Claude Code, with `ref-1.png` / `ref-2.png` / `ref-3.png` attached.

```
You are a senior full-stack engineer and product designer.

Build a polished functional prototype called "QuoteFlow AI" — an AI-assisted
RFQ-to-Quote workflow for freight forwarders, freight brokers, and trucking
companies.

AUDIENCE: This is for owners/operations managers at small-to-mid-sized freight
forwarding and trucking companies (11-50 employees). They will see this in a
live sales meeting or Loom demo, not use it in production.

THE 1 ACTION: Every screen should reinforce one message — "AI does the
repetitive extraction and drafting, a human approves before anything is sent."
This is not a fully-automated pricing engine. Never claim AI knows real-time
freight rates.

REFERENCES: Use ref-1.png, ref-2.png, ref-3.png as the quality bar for
typography scale, spacing rhythm, and motion. Do not copy their layouts —
this is a logistics SaaS dashboard, not a marketing site.

STACK: Next.js, TypeScript, Tailwind CSS. Next.js API routes for backend.
Local mock JSON for data (no external APIs, no real database needed for
this prototype). Must run locally with zero external dependencies.

BAN LIST: No purple gradients, no cartoon AI icons, no flashy AI graphics,
no futuristic sci-fi interfaces, no emoji as icons, no Inter as the display
font, no generic stock-photo placeholders. This must look like a real,
boring, credible B2B SaaS product — think Linear, Ramp, or a modern TMS
dashboard, not an "AI startup" landing page.

===== PRODUCT SPEC =====

CORE VALUE PROP (shown inside the product):
Main: "Turn incoming RFQs into quote-ready responses faster."
Secondary: "Automate the repetitive work. Keep pricing decisions under
human control."
Never position as replacing the TMS, the pricing team, or human approval.

APP STRUCTURE
Sidebar: Dashboard, RFQ Inbox, Quotes, Customers, Rates, Settings
Top bar: "QuoteFlow AI — AI-assisted quoting workflow"

DASHBOARD (mock data)
RFQs received today: 18 | Pending: 5 | Quotes prepared: 11
Average response time: 18 min | Potential response-time reduction: 65%

RFQ INBOX — Gmail-style list
RFQ #10482 — ABC Imports — Shenzhen → Los Angeles — Ocean — 4 min ago — New
RFQ #10481 — Dallas Manufacturing — Chicago → Dallas — Dry Van — 12 min ago — Processing
RFQ #10480 — Global Retail — Shanghai → Long Beach — Ocean — 31 min ago — Quoted

MAIN DEMO SCREEN — 3-column layout
LEFT: original RFQ email (raw text)
MIDDLE: AI Extraction — structured shipment fields (origin, destination,
mode, equipment, cargo, weight, pallets, incoterm, ready date), each
editable, with checkmarks for detected fields and a warning icon for
anything ambiguous (e.g. "⚠ Container size not explicitly specified")
RIGHT: Quote Builder — line items (ocean freight, origin charges, doc fees,
destination charges, handling, margin) summing to a customer total, transit
estimate, validity window. Label clearly: "Demo rates — connected to your
rate database in production."

PROCESSING ANIMATION — when user clicks "Process RFQ", show a short
(1-2 sec) sequence: Reading RFQ → Extracting shipment info → Detecting
missing info → Matching to rate database → Preparing quote → Generating
response → "RFQ processed in 8 seconds"

MISSING INFO HANDLING — flag ambiguous fields with buttons: [Ask customer]
[Continue with assumption] [Edit]. This must be visually obvious — it's
proof the system doesn't blindly guess.

RATES SECTION — simple editable mock rate table (route, mode, container,
base rate, valid-until, carrier, additional charges).

QUOTE REVIEW — "QUOTE READY FOR REVIEW" panel with [Edit Quote]
[Approve & Send] [Save Draft]. Approve & Send must be the only way a quote
leaves the system — never automatic.

CUSTOMER EMAIL GENERATION — "Generate Response" produces a draft email
(editable, copyable), with a "Send" button that shows "Quote sent
successfully" (no real send).

HUMAN-IN-THE-LOOP — make this visually central, not a footnote: "AI
prepared the quote. Human approval required."

ROI SCREEN — Before/After panel:
Manual: read (5min) + extract (7min) + find rates (8min) + prepare (7min)
+ format (3min) = 30 min/RFQ
AI-assisted: extraction (seconds) + missing-info (automatic) + rate match
(automatic) + quote prep (automatic) + human review (3-5min) = 5-8 min/RFQ
Label clearly: "Illustrative example — actual savings depend on workflow."
Then: 30 RFQs/week → Manual 15 hrs/week vs AI-assisted ~4 hrs/week →
~11 hrs/week recovered. Label: "Illustrative estimate."

DASHBOARD ANALYTICS (mock): RFQs processed 128, Quotes prepared 96, Avg
processing time 7 min, Avg manual time 28 min, Time saved 44 hrs, Pending 7.
Add small "Demo environment" label.

TRUCKING MODE — toggle [FREIGHT FORWARDING] / [TRUCKING] at the top of
the demo screen. Trucking demo RFQ: Chicago, IL → Dallas, TX, 53' Dry Van,
38,000 lbs, 24 pallets, consumer goods, pickup Sep 5 2026. Mock rates:
linehaul $2,150, fuel $420, accessorials $125, margin $305, customer
quote $3,000.

DEMO MODE — a button offering 4 preset scenarios: (1) Ocean Freight RFQ,
(2) Trucking RFQ, (3) Incomplete RFQ (missing container size), (4) Multiple
RFQs queued. Must work with zero setup, zero external APIs.

Ocean freight demo RFQ (use exactly this):
Subject: "RFQ — Shenzhen, China → Los Angeles, CA — 2 pallets"
Origin: Shenzhen, China | Destination: Los Angeles, CA
Cargo: Electronic components | Quantity: 2 pallets | Weight: 850 kg
Dimensions: 120x100x140cm/pallet | Incoterm: FOB | Mode: Ocean
Ready date: Sep 10, 2026

DO NOT BUILD: real TMS integrations, real carrier APIs, real email
sending, payments, production auth, real-time pricing, or actual RAG.
Everything is mocked but must look and behave like it's real.

README: add a short "Production architecture" section showing how this
would connect to Email (M365/Gmail) → RFQ ingestion → LLM extraction →
Validation → Rate DB/carrier APIs → Pricing rules → Quote generation →
Human approval → Email/TMS → Customer.

Acceptance: full click-through demo (open RFQ → process → review
extraction → see missing-info flag → review quote → generate email →
approve & send → see dashboard update) must complete in under 2 minutes,
work fully offline, and look production-quality on both desktop and
375px mobile width.

Build the prototype now. Prioritize a polished, working, click-through
demo over backend complexity.
```

First version lands in a few minutes. It will be ~70% there — expected.

---

## Step 4 — Polish passes (run these as 3 separate messages, in order)

Don't bundle these. Claude does one dimension well per message, three dimensions badly if you ask for all at once.

**Pass 1 — typography only:**
> "Review every heading and body size. Establish a strict type scale. Fix line-height and letter-spacing. Touch nothing else."

**Pass 2 — spacing only:**
> "Audit vertical rhythm section by section. Double the whitespace where sections feel cramped. Touch nothing else."

**Pass 3 — motion only:**
> "Add scroll-reveal and hover states. Subtle. 200–300ms. Nothing bounces."

**Mobile check:**
> "Show me every page at 375px width and fix what breaks."

---

## Step 5 — Ship it for the meeting

You want a shareable link, not just localhost, so you can screen-share or send it ahead of a call.

```
git init && git add . && git commit -m "QuoteFlow AI demo"
```
Push to a new GitHub repo, then on [vercel.com](https://vercel.com): New Project → import the repo → Deploy. Next.js deploys with zero config there. Free, live in ~2 minutes, and you get a clean `.vercel.app` link to drop in your outreach follow-up.

---

## For the actual meeting — 90-second flow

Match this to your Loom/live-demo script:
1. Dashboard → "The bottleneck for most freight teams isn't another TMS, it's the repetitive work around incoming RFQs."
2. Open RFQ Inbox → "Here's one that just came in."
3. Click Process RFQ → show extraction → "It reads the email and pulls structured shipment data automatically."
4. Point at the missing-info flag → "It also flags what's missing instead of guessing."
5. Show quote builder → "Matches against your existing rate data, prepares the quote — but nothing goes out without a human clicking approve."
6. Generate Response → show email draft.
7. ROI screen → "The point isn't replacing your pricing team. It's letting the same team handle more RFQs without hiring."
