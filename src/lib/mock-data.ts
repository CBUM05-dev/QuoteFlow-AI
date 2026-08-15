import type { Customer, RateRow, Rfq } from "./types";

export const RFQS: Rfq[] = [
  {
    id: "10482",
    rfqNumber: "RFQ #10482",
    customer: "ABC Imports",
    origin: "Shenzhen, China",
    destination: "Los Angeles, CA",
    mode: "Ocean",
    equipment: "LCL — 2 pallets",
    receivedLabel: "4 min ago",
    receivedMinutesAgo: 4,
    status: "new",
    demoLabel: "Ocean Freight RFQ",
    emailFrom: "procurement@abcimports.com",
    emailSubject: "RFQ — Shenzhen, China → Los Angeles, CA — 2 pallets",
    emailBody: `Hi team,

We have a shipment ready to move and would like a quote.

Origin: Shenzhen, China
Destination: Los Angeles, CA
Cargo: Electronic components
Quantity: 2 pallets
Weight: 850 kg total
Dimensions: 120 x 100 x 140 cm per pallet
Incoterm: FOB Shenzhen
Mode: Ocean freight preferred
Ready date: on or around September 10, 2026

Please send over your best rate and estimated transit time. This is a
recurring lane for us so a fast turnaround is appreciated.

Thanks,
Priya Nair
Procurement, ABC Imports`,
    extraction: [
      { key: "origin", label: "Origin", value: "Shenzhen, China", status: "detected" },
      { key: "destination", label: "Destination", value: "Los Angeles, CA", status: "detected" },
      { key: "mode", label: "Mode", value: "Ocean — LCL", status: "detected" },
      { key: "equipment", label: "Equipment", value: "Palletized, 2 units", status: "detected" },
      { key: "cargo", label: "Cargo", value: "Electronic components", status: "detected" },
      { key: "weight", label: "Weight", value: "850 kg total", status: "detected" },
      { key: "dimensions", label: "Dimensions", value: "120 × 100 × 140 cm / pallet", status: "detected" },
      { key: "incoterm", label: "Incoterm", value: "FOB Shenzhen", status: "detected" },
      { key: "readyDate", label: "Ready date", value: "Sep 10, 2026", status: "detected" },
    ],
    hasMissingInfo: false,
    quote: {
      lineItems: [
        { label: "Ocean freight (LCL)", amount: 640 },
        { label: "Origin charges", amount: 180 },
        { label: "Documentation fee", amount: 75 },
        { label: "Destination charges", amount: 220 },
        { label: "Handling", amount: 95 },
        { label: "Margin", amount: 140 },
      ],
      total: 1350,
      transitEstimate: "18–22 days, port-to-port",
      validityWindow: "Valid 7 days from quote date",
    },
    emailDraft: `Subject: Re: RFQ — Shenzhen, China → Los Angeles, CA — 2 pallets

Hi Priya,

Thanks for sending this over — here's our quote for the shipment below.

Origin: Shenzhen, China
Destination: Los Angeles, CA
Mode: Ocean (LCL), 2 pallets / 850 kg
Incoterm: FOB Shenzhen
Ready date: Sep 10, 2026

Quoted total: $1,350 USD
Estimated transit: 18–22 days, port-to-port
Quote valid for 7 days from today

Let me know if you'd like to lock this in or if anything about the
shipment changes, and we'll get it booked.

Best,
QuoteFlow AI — on behalf of your ops team`,
  },
  {
    id: "10481",
    rfqNumber: "RFQ #10481",
    customer: "Dallas Manufacturing",
    origin: "Chicago, IL",
    destination: "Dallas, TX",
    mode: "Trucking",
    equipment: "53' Dry Van",
    receivedLabel: "12 min ago",
    receivedMinutesAgo: 12,
    status: "processing",
    demoLabel: "Trucking RFQ",
    emailFrom: "logistics@dallasmfg.com",
    emailSubject: "Quote needed — Chicago to Dallas, full truckload",
    emailBody: `Hello,

Need a rate for a full truckload move:

Origin: Chicago, IL
Destination: Dallas, TX
Equipment: 53' Dry Van
Weight: 38,000 lbs
Pallets: 24
Commodity: Consumer goods
Pickup date: September 5, 2026

Please advise linehaul, fuel, and any accessorials. Straightforward
dock-to-dock, no special handling.

Thanks,
Marcus Reyes
Logistics Coordinator, Dallas Manufacturing`,
    extraction: [
      { key: "origin", label: "Origin", value: "Chicago, IL", status: "detected" },
      { key: "destination", label: "Destination", value: "Dallas, TX", status: "detected" },
      { key: "mode", label: "Mode", value: "Trucking — FTL", status: "detected" },
      { key: "equipment", label: "Equipment", value: "53' Dry Van", status: "detected" },
      { key: "cargo", label: "Cargo", value: "Consumer goods", status: "detected" },
      { key: "weight", label: "Weight", value: "38,000 lbs", status: "detected" },
      { key: "pallets", label: "Pallets", value: "24", status: "detected" },
      { key: "readyDate", label: "Pickup date", value: "Sep 5, 2026", status: "detected" },
    ],
    hasMissingInfo: false,
    quote: {
      lineItems: [
        { label: "Linehaul", amount: 2150 },
        { label: "Fuel surcharge", amount: 420 },
        { label: "Accessorials", amount: 125 },
        { label: "Margin", amount: 305 },
      ],
      total: 3000,
      transitEstimate: "1–2 days, dock-to-dock",
      validityWindow: "Valid 5 days from quote date",
    },
    emailDraft: `Subject: Re: Quote needed — Chicago to Dallas, full truckload

Hi Marcus,

Here's our quote for the load below.

Origin: Chicago, IL
Destination: Dallas, TX
Equipment: 53' Dry Van, 38,000 lbs / 24 pallets
Pickup: Sep 5, 2026

Quoted total: $3,000 USD (linehaul, fuel, and accessorials included)
Estimated transit: 1–2 days
Quote valid for 5 days from today

Happy to get this on the board — just confirm and we'll dispatch.

Best,
QuoteFlow AI — on behalf of your ops team`,
  },
  {
    id: "10483",
    rfqNumber: "RFQ #10483",
    customer: "Pacific Trading Co.",
    origin: "Shenzhen, China",
    destination: "Long Beach, CA",
    mode: "Ocean",
    equipment: "FCL — size unconfirmed",
    receivedLabel: "2 min ago",
    receivedMinutesAgo: 2,
    status: "new",
    demoLabel: "Incomplete RFQ",
    emailFrom: "ops@pacifictradingco.com",
    emailSubject: "RFQ — Shenzhen to Long Beach, furniture container",
    emailBody: `Hi,

Looking for a quote on a container of furniture moving from Shenzhen
to Long Beach. Cargo is ready now, flexible on carrier.

Origin: Shenzhen, China
Destination: Long Beach, CA
Cargo: Household furniture
Incoterm: FOB Shenzhen
Ready date: as soon as possible

Let me know what you need from us to get a rate together.

Thanks,
Devon Marsh
Pacific Trading Co.`,
    extraction: [
      { key: "origin", label: "Origin", value: "Shenzhen, China", status: "detected" },
      { key: "destination", label: "Destination", value: "Long Beach, CA", status: "detected" },
      { key: "mode", label: "Mode", value: "Ocean — FCL", status: "detected" },
      {
        key: "equipment",
        label: "Container size",
        value: "Not specified",
        status: "ambiguous",
        note: "Container size not explicitly specified — assumed 40' HC based on cargo type",
      },
      { key: "cargo", label: "Cargo", value: "Household furniture", status: "detected" },
      { key: "incoterm", label: "Incoterm", value: "FOB Shenzhen", status: "detected" },
      {
        key: "readyDate",
        label: "Ready date",
        value: "Not specified",
        status: "ambiguous",
        note: "Customer said \"as soon as possible\" — no firm date given",
      },
    ],
    hasMissingInfo: true,
    quote: {
      lineItems: [
        { label: "Ocean freight (FCL, 40' HC — assumed)", amount: 2200 },
        { label: "Origin charges", amount: 350 },
        { label: "Documentation fee", amount: 75 },
        { label: "Destination charges", amount: 400 },
        { label: "Handling", amount: 150 },
        { label: "Margin", amount: 325 },
      ],
      total: 3500,
      transitEstimate: "19–23 days, port-to-port",
      validityWindow: "Valid 5 days from quote date",
    },
    emailDraft: `Subject: Re: RFQ — Shenzhen to Long Beach, furniture container

Hi Devon,

Thanks for reaching out. Before we finalize pricing, can you confirm
the container size you need — we've assumed a 40' HC based on the
cargo type, but want to make sure before this goes final. Also, a
firm ready date would help us lock in transit timing.

In the meantime, here's a working estimate:

Quoted total: $3,500 USD (based on 40' HC, FOB Shenzhen)
Estimated transit: 19–23 days, port-to-port
Quote valid for 5 days from today

Send those two details over and we'll confirm the final number.

Best,
QuoteFlow AI — on behalf of your ops team`,
  },
  {
    id: "10480",
    rfqNumber: "RFQ #10480",
    customer: "Global Retail",
    origin: "Shanghai, China",
    destination: "Long Beach, CA",
    mode: "Ocean",
    equipment: "FCL — 40' Standard",
    receivedLabel: "31 min ago",
    receivedMinutesAgo: 31,
    status: "quoted",
    emailFrom: "sourcing@globalretail.com",
    emailSubject: "RFQ — Shanghai to Long Beach, general merchandise",
    emailBody: `Hi team,

Please quote the following:

Origin: Shanghai, China
Destination: Long Beach, CA
Cargo: General merchandise
Equipment: 1x 40' Standard container
Incoterm: FOB Shanghai
Ready date: September 8, 2026

Thanks,
Lena Ortiz
Global Retail`,
    extraction: [
      { key: "origin", label: "Origin", value: "Shanghai, China", status: "detected" },
      { key: "destination", label: "Destination", value: "Long Beach, CA", status: "detected" },
      { key: "mode", label: "Mode", value: "Ocean — FCL", status: "detected" },
      { key: "equipment", label: "Equipment", value: "1x 40' Standard", status: "detected" },
      { key: "cargo", label: "Cargo", value: "General merchandise", status: "detected" },
      { key: "incoterm", label: "Incoterm", value: "FOB Shanghai", status: "detected" },
      { key: "readyDate", label: "Ready date", value: "Sep 8, 2026", status: "detected" },
    ],
    hasMissingInfo: false,
    quote: {
      lineItems: [
        { label: "Ocean freight (FCL, 40' Standard)", amount: 2650 },
        { label: "Origin charges", amount: 300 },
        { label: "Documentation fee", amount: 75 },
        { label: "Destination charges", amount: 380 },
        { label: "Handling", amount: 130 },
        { label: "Margin", amount: 315 },
      ],
      total: 3850,
      transitEstimate: "17–21 days, port-to-port",
      validityWindow: "Valid 7 days from quote date",
    },
    emailDraft: `Subject: Re: RFQ — Shanghai to Long Beach, general merchandise

Hi Lena,

Quote for the shipment below:

Quoted total: $3,850 USD
Estimated transit: 17–21 days, port-to-port
Quote valid for 7 days from today

Let us know if you'd like to move forward.

Best,
QuoteFlow AI — on behalf of your ops team`,
  },
  {
    id: "10479",
    rfqNumber: "RFQ #10479",
    customer: "Midwest Foods",
    origin: "Memphis, TN",
    destination: "Atlanta, GA",
    mode: "Trucking",
    equipment: "53' Reefer",
    receivedLabel: "44 min ago",
    receivedMinutesAgo: 44,
    status: "new",
    emailFrom: "shipping@midwestfoods.com",
    emailSubject: "Reefer quote — Memphis to Atlanta",
    emailBody: `Hi,

Need a temp-controlled truckload rate:

Origin: Memphis, TN
Destination: Atlanta, GA
Equipment: 53' Reefer, set at 36°F
Weight: 41,500 lbs
Commodity: Refrigerated food product
Pickup date: September 6, 2026

Appreciate a quick turnaround on this one.

Thanks,
Angela Cho
Midwest Foods`,
    extraction: [
      { key: "origin", label: "Origin", value: "Memphis, TN", status: "detected" },
      { key: "destination", label: "Destination", value: "Atlanta, GA", status: "detected" },
      { key: "mode", label: "Mode", value: "Trucking — FTL", status: "detected" },
      { key: "equipment", label: "Equipment", value: "53' Reefer, 36°F", status: "detected" },
      { key: "cargo", label: "Cargo", value: "Refrigerated food product", status: "detected" },
      { key: "weight", label: "Weight", value: "41,500 lbs", status: "detected" },
      { key: "readyDate", label: "Pickup date", value: "Sep 6, 2026", status: "detected" },
    ],
    hasMissingInfo: false,
    quote: {
      lineItems: [
        { label: "Linehaul", amount: 1180 },
        { label: "Fuel surcharge", amount: 240 },
        { label: "Reefer surcharge", amount: 175 },
        { label: "Margin", amount: 205 },
      ],
      total: 1800,
      transitEstimate: "Same day, dock-to-dock",
      validityWindow: "Valid 3 days from quote date",
    },
    emailDraft: `Subject: Re: Reefer quote — Memphis to Atlanta

Hi Angela,

Quote for the load below.

Quoted total: $1,800 USD
Estimated transit: same day, dock-to-dock
Quote valid for 3 days from today

Let us know if you'd like to book.

Best,
QuoteFlow AI — on behalf of your ops team`,
  },
  {
    id: "10478",
    rfqNumber: "RFQ #10478",
    customer: "Sunrise Apparel",
    origin: "Ningbo, China",
    destination: "Oakland, CA",
    mode: "Ocean",
    equipment: "LCL — 6 pallets",
    receivedLabel: "1 hr ago",
    receivedMinutesAgo: 60,
    status: "new",
    emailFrom: "imports@sunriseapparel.com",
    emailSubject: "RFQ — Ningbo to Oakland, apparel",
    emailBody: `Hello,

Requesting a quote for:

Origin: Ningbo, China
Destination: Oakland, CA
Cargo: Apparel, boxed
Quantity: 6 pallets
Weight: 2,100 kg total
Incoterm: FOB Ningbo
Ready date: September 14, 2026

Thanks,
Tomas Reyes
Sunrise Apparel`,
    extraction: [
      { key: "origin", label: "Origin", value: "Ningbo, China", status: "detected" },
      { key: "destination", label: "Destination", value: "Oakland, CA", status: "detected" },
      { key: "mode", label: "Mode", value: "Ocean — LCL", status: "detected" },
      { key: "equipment", label: "Equipment", value: "Palletized, 6 units", status: "detected" },
      { key: "cargo", label: "Cargo", value: "Apparel, boxed", status: "detected" },
      { key: "weight", label: "Weight", value: "2,100 kg total", status: "detected" },
      { key: "incoterm", label: "Incoterm", value: "FOB Ningbo", status: "detected" },
      { key: "readyDate", label: "Ready date", value: "Sep 14, 2026", status: "detected" },
    ],
    hasMissingInfo: false,
    quote: {
      lineItems: [
        { label: "Ocean freight (LCL)", amount: 980 },
        { label: "Origin charges", amount: 210 },
        { label: "Documentation fee", amount: 75 },
        { label: "Destination charges", amount: 260 },
        { label: "Handling", amount: 110 },
        { label: "Margin", amount: 165 },
      ],
      total: 1800,
      transitEstimate: "16–20 days, port-to-port",
      validityWindow: "Valid 7 days from quote date",
    },
    emailDraft: `Subject: Re: RFQ — Ningbo to Oakland, apparel

Hi Tomas,

Quote for the shipment below.

Quoted total: $1,800 USD
Estimated transit: 16–20 days, port-to-port
Quote valid for 7 days from today

Let us know if you'd like to proceed.

Best,
QuoteFlow AI — on behalf of your ops team`,
  },
];

export const RATES: RateRow[] = [
  {
    id: "r1",
    route: "Shenzhen → Los Angeles",
    mode: "Ocean",
    container: "LCL",
    baseRate: 640,
    validUntil: "Sep 30, 2026",
    carrier: "Pacific Star Line",
    additionalCharges: "Origin + destination handling apply",
  },
  {
    id: "r2",
    route: "Shenzhen → Long Beach",
    mode: "Ocean",
    container: "40' HC",
    baseRate: 2200,
    validUntil: "Sep 30, 2026",
    carrier: "Pacific Star Line",
    additionalCharges: "Chassis fee may apply at destination",
  },
  {
    id: "r3",
    route: "Shanghai → Long Beach",
    mode: "Ocean",
    container: "40' Standard",
    baseRate: 2650,
    validUntil: "Sep 15, 2026",
    carrier: "Meridian Ocean Freight",
    additionalCharges: "Peak season surcharge may apply Aug–Oct",
  },
  {
    id: "r4",
    route: "Ningbo → Oakland",
    mode: "Ocean",
    container: "LCL",
    baseRate: 980,
    validUntil: "Sep 20, 2026",
    carrier: "Meridian Ocean Freight",
    additionalCharges: "—",
  },
  {
    id: "r5",
    route: "Chicago → Dallas",
    mode: "Trucking",
    container: "53' Dry Van",
    baseRate: 2150,
    validUntil: "Oct 1, 2026",
    carrier: "Ironline Freight",
    additionalCharges: "Fuel surcharge billed separately (~19.5%)",
  },
  {
    id: "r6",
    route: "Memphis → Atlanta",
    mode: "Trucking",
    container: "53' Reefer",
    baseRate: 1180,
    validUntil: "Sep 25, 2026",
    carrier: "Coldline Carriers",
    additionalCharges: "Reefer surcharge applies below 40°F",
  },
  {
    id: "r7",
    route: "Los Angeles → Phoenix",
    mode: "Trucking",
    container: "53' Dry Van",
    baseRate: 890,
    validUntil: "Sep 30, 2026",
    carrier: "Ironline Freight",
    additionalCharges: "—",
  },
  {
    id: "r8",
    route: "Rotterdam → New York",
    mode: "Ocean",
    container: "20' Standard",
    baseRate: 1450,
    validUntil: "Oct 10, 2026",
    carrier: "Atlantic Crossing Lines",
    additionalCharges: "Congestion surcharge in effect",
  },
];

export const CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "ABC Imports",
    contact: "Priya Nair",
    email: "procurement@abcimports.com",
    lanes: "Shenzhen → Los Angeles",
    rfqsThisMonth: 6,
    status: "Active",
  },
  {
    id: "c2",
    name: "Dallas Manufacturing",
    contact: "Marcus Reyes",
    email: "logistics@dallasmfg.com",
    lanes: "Chicago → Dallas",
    rfqsThisMonth: 9,
    status: "Active",
  },
  {
    id: "c3",
    name: "Pacific Trading Co.",
    contact: "Devon Marsh",
    email: "ops@pacifictradingco.com",
    lanes: "Shenzhen → Long Beach",
    rfqsThisMonth: 2,
    status: "Prospect",
  },
  {
    id: "c4",
    name: "Global Retail",
    contact: "Lena Ortiz",
    email: "sourcing@globalretail.com",
    lanes: "Shanghai → Long Beach",
    rfqsThisMonth: 11,
    status: "Active",
  },
  {
    id: "c5",
    name: "Midwest Foods",
    contact: "Angela Cho",
    email: "shipping@midwestfoods.com",
    lanes: "Memphis → Atlanta",
    rfqsThisMonth: 5,
    status: "Active",
  },
  {
    id: "c6",
    name: "Sunrise Apparel",
    contact: "Tomas Reyes",
    email: "imports@sunriseapparel.com",
    lanes: "Ningbo → Oakland",
    rfqsThisMonth: 3,
    status: "Prospect",
  },
];

export const DASHBOARD_STATS = {
  // Today
  rfqsToday: 18,
  pendingToday: 5,
  quotesPreparedToday: 11,
  avgResponseMinutes: 18,
  responseTimeReduction: 65,
  // All-time analytics
  rfqsProcessed: 128,
  quotesPreparedTotal: 96,
  avgProcessingMinutes: 7,
  avgManualMinutes: 28,
  timeSavedHours: 44,
  pendingTotal: 7,
};
