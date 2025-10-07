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


export interface CreatePaymentRequest {
  /** The fiat equivalent price (NOT actual fiat payment). Example: 10 */
  price_amount: number;

  /** The fiat currency for price_amount. Example: "usd", "eur" */
  price_currency: string;

  /** The crypto to be paid. Example: "usdttrc20", "btc" */
  pay_currency: string;

  /** (Optional) Exact crypto amount to pay. If omitted, NOWPayments auto-converts */
  pay_amount?: number;

  /** (Optional) Webhook URL to receive payment status updates */
  ipn_callback_url?: string;

  /** (Optional) Your internal order ID */
  order_id?: string;

  /** (Optional) Order description shown in dashboard */
  order_description?: string;

  /** (Optional) Custom wallet to receive funds (override default payout address) */
  payout_address?: string;

  /** (Optional) Currency of your payout address (required if payout_address used) */
  payout_currency?: string;

  /** (Optional) Extra memo/tag for payout_address if needed */
  payout_extra_id?: string;

  /** (Optional) Freeze exchange rate for 20 minutes */
  is_fixed_rate?: boolean;

  /** (Optional) Make user pay the transaction fee */
  is_fee_paid_by_user?: boolean;
}

export interface CreatePaymentResponse {
  payment_id: number;
  payment_status: 'waiting' | 'confirming' | 'confirmed' | 'finished' | 'failed' | 'expired';
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  actually_paid: string;
  payin_extra_id?: string | null;
  order_id?: string;
  order_description?: string;
  price_amount: number;
  price_currency: string;
  created_at: string;
  updated_at: string;
  is_fixed_rate: boolean;
  is_fee_paid_by_user: boolean;
  purchase_id?: string;
  network:string;
  expiration_estimate_date: string;
}
