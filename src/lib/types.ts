export type ShipMode = "Ocean" | "Trucking" | "Air";

export type RfqStatus = "new" | "processing" | "quoted" | "sent";

export interface ExtractedField {
  key: string;
  label: string;
  value: string;
  status: "detected" | "ambiguous";
  note?: string;
}

export interface QuoteLineItem {
  label: string;
  amount: number;
}

export interface Quote {
  lineItems: QuoteLineItem[];
  total: number;
  transitEstimate: string;
  validityWindow: string;
}

export interface Rfq {
  id: string;
  rfqNumber: string;
  customer: string;
  origin: string;
  destination: string;
  mode: ShipMode;
  equipment: string;
  receivedLabel: string;
  receivedMinutesAgo: number;
  status: RfqStatus;
  emailSubject: string;
  emailFrom: string;
  emailBody: string;
  extraction: ExtractedField[];
  quote: Quote;
  hasMissingInfo: boolean;
  missingInfoResolved?: boolean;
  emailDraft: string;
  demoLabel?: string;
}

export interface RateRow {
  id: string;
  route: string;
  mode: ShipMode;
  container: string;
  baseRate: number;
  validUntil: string;
  carrier: string;
  additionalCharges: string;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  lanes: string;
  rfqsThisMonth: number;
  status: "Active" | "Prospect";
}
