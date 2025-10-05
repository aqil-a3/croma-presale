/* eslint-disable @typescript-eslint/no-explicit-any */

export type InvestmentStatus =
  | "waiting"
  | "confirmed"
  | "finished"
  | "failed"
  | "expired"
  | "refunded";

export type InvestmentSource = "nowpayments" | "onchain" | "manual";

export interface Investment {
  id: string; // uuid
  user_id: string; // uuid

  order_id: string | null;
  tx_hash: string | null;
  source: InvestmentSource;
  status: InvestmentStatus;

  invested_usd: string; // numeric -> string
  pay_currency: string | null;
  pay_amount: string | null; // numeric -> string
  receive_currency: string; // default 'CRM'
  crm_amount: string; // numeric -> string

  network: string | null;
  network_precision: number | null;
  stage: number | null;
  phase: number | null;
  batch_label: string | null;

  metadata: Record<string, any> | null;

  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/** Payload untuk INSERT (kolom auto dihilangkan/opsional) */
export interface InvestmentInsert {
  user_id: string;

  order_id?: string | null;
  tx_hash?: string | null;
  source?: InvestmentSource;
  status?: InvestmentStatus;

  invested_usd: string; // kirim sebagai string agar aman (mis. "514.00")
  pay_currency?: string | null;
  pay_amount?: string | null; // "0.0012"
  receive_currency?: string; // default 'CRM'
  crm_amount: string; // "32.000000"

  network?: string | null;
  network_precision?: number | null;
  stage?: number | null;
  phase?: number | null;
  batch_label?: string | null;

  metadata?: Record<string, any> | null;
}

/** Payload untuk UPDATE (semua opsional) */
export interface InvestmentUpdate {
  order_id?: string | null;
  tx_hash?: string | null;
  source?: InvestmentSource;
  status?: InvestmentStatus;

  invested_usd?: string;
  pay_currency?: string | null;
  pay_amount?: string | null;
  receive_currency?: string;
  crm_amount?: string;

  network?: string | null;
  network_precision?: number | null;
  stage?: number | null;
  phase?: number | null;
  batch_label?: string | null;

  metadata?: Record<string, any> | null;
  updated_at?: string;
}

export interface InvestmentSummary {
  invested_usd: number;
  crm_owned: number;
}
