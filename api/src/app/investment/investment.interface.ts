export type InvestmentPayStatus =
  | 'waiting'
  | 'confirming'
  | 'confirmed'
  | 'sending'
  | 'partially_paid'
  | 'finished'
  | 'failed'
  | 'refunded'
  | 'expired';

export interface AdminInvestmentQuery {
  from: number;
  to: number;
}

export interface InvestmentDb {
  id: string; // UUID
  user_id: string | null;
  order_id: string | null;
  status: InvestmentPayStatus;
  invested_usd: number; // numeric(18,2)
  pay_currency: string | null; // ex: "eth", "usdt", etc.
  pay_amount: number | null; // numeric(38,18)
  receive_currency: string; // default 'CRM'
  crm_amount: number; // numeric(18,6)
  network: string | null; // ex: "eth", "bsc"
  stage: number | null; // presale stage
  phase: number | null; // phase number
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  wallet_address: string; // foreign key ke users.wallet_address
}

export type InvestmentClient = Omit<
  InvestmentDb,
  'id' | 'created_at' | 'updated_at'
>;

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
  payment_status:
    | 'waiting'
    | 'confirming'
    | 'confirmed'
    | 'finished'
    | 'failed'
    | 'expired';
  pay_address: string;
  pay_amount: string;
  pay_currency: string;
  actually_paid: string;
  payin_extra_id?: string | null;
  order_id?: string;
  order_description?: string;
  price_amount: string;
  price_currency: string;
  created_at: string;
  updated_at: string;
  is_fixed_rate: boolean;
  is_fee_paid_by_user: boolean;
  purchase_id?: string;
}

export interface NowPaymentsWebhook {
  actually_paid: number;
  actually_paid_at_fiat: number;
  fee: {
    currency: string;
    depositFee: number;
    serviceFee: number;
    withdrawalFee: number;
  };
  invoice_id: string | null;
  order_description: string;
  order_id: string | null;
  outcome_amount: number;
  outcome_currency: string;
  parent_payment_id: number | null;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  payin_extra_id: string | null;
  payment_extra_ids: string | null;
  payment_id: number;
  payment_status:
    | 'waiting'
    | 'confirming'
    | 'confirmed'
    | 'finished'
    | 'failed'
    | 'expired'
    | string;
  price_amount: number;
  price_currency: string;
  purchase_id: string;
}

export interface GetInvestmentLeaderboardRequest {
  /**
   * Pilihan periode:
   * 'all-time' → semua data
   * 'this-week' → minggu ini
   * 'this-month' → bulan ini
   */
  period: 'all-time' | 'this-week' | 'this-month';

  /**
   * Jumlah maksimum data leaderboard yang dikembalikan.
   * Default di SQL = 20
   */
  limit_count?: number;

  /**
   * Daftar status transaksi yang dihitung.
   * Default di SQL = ['completed', 'paid']
   */
  status_filter?: string[];
}

export interface InvestmentLeaderboardItem {
  /** Alamat wallet investor */
  wallet_address: string;

  /** Username user (bisa null jika belum diset) */
  username: string | null;

  /** Total USD yang diinvestasikan */
  total_invested_usd: number;
}
