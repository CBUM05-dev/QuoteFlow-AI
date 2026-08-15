# QuoteFlow AI

A polished, click-through prototype of an AI-assisted RFQ-to-quote workflow for
freight forwarders, freight brokers, and trucking companies. Built for sales
demos and Loom walkthroughs — not for production use.

**The one message every screen reinforces:** AI does the repetitive extraction
and drafting; a human approves before anything is sent. This is not a
fully-automated pricing engine, and it does not claim to know real-time
freight rates.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to
`/dashboard`. Everything runs locally against mock JSON data — no external
APIs, no database, no real email sending. It works fully offline.

## Demo flow (~90 seconds)

Use the **Demo Mode** menu in the top bar to jump straight into any of four
preset scenarios, or click through manually:

1. **Dashboard** — today's RFQ volume, pending count, and the response-time
   opportunity.
2. **RFQ Inbox** — a Gmail-style queue of incoming requests across ocean and
   trucking lanes.
3. Open an RFQ and click **Process RFQ** — a short animated sequence reads the
   email, extracts shipment fields, detects missing information, matches
   rates, and prepares a quote.
4. Review the **AI Extraction** panel — every field is editable, detected
   fields are checked, and ambiguous fields (e.g. an unspecified container
   size) are flagged with **Ask customer / Continue with assumption / Edit**.
5. Review the **Quote Builder** — editable line items, a customer total, and
   a clear "Demo rates — connected to your rate database in production" label.
6. **Approve & Send** — reveals a generated, editable customer email.
   Approval is always a manual click; nothing sends automatically.
7. **ROI** — an illustrative before/after time comparison between manual and
   AI-assisted quoting.

Toggle **Freight Forwarding / Trucking** at the top of the RFQ detail screen
to switch between the two flagship demo scenarios.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Local mock data (`src/lib/mock-data.ts`) held in React context
  (`src/lib/app-state.tsx`) — no backend, no persistence between reloads

## What's mocked

Rate data, RFQ emails, extraction results, quotes, customers, and dashboard
analytics are all static or derived client-side. Settings, integrations
("Connect email inbox", "Connect TMS"), and rate editing are visually real
but don't persist or connect to anything.

## Production architecture

This prototype hardcodes what a real deployment would wire up as a pipeline,
with a human approval gate before anything reaches a customer:

```
Email inbox (Microsoft 365 / Gmail)
        │  RFQ ingestion (webhook / polling)
        ▼
RFQ ingestion service
        │  parses attachments, threads, forwarded messages
        ▼
LLM extraction (structured shipment fields)
        │
        ▼
Validation
        │  flags missing / ambiguous fields — never guesses silently
        ▼
Rate DB / carrier APIs           Pricing rules engine
        │                                │
        └───────────────┬────────────────┘
                         ▼
                 Quote generation
                         │
                         ▼
              Human approval (required)
                         │  edit, save draft, or approve & send
                         ▼
              Email / TMS integration
                         │
                         ▼
                     Customer
```

Every quote a customer receives passes through the human-approval step —
that boundary is the product's core guarantee, not an implementation detail.

## Deploying

```bash
git init && git add . && git commit -m "QuoteFlow AI demo"
```

Push to a GitHub repo, then import it at [vercel.com](https://vercel.com)
(New Project → import repo → Deploy). No environment variables or config
needed — it deploys as-is.
