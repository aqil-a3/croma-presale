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

  case?: string;
}

export interface CreatePaymentResponse {
  payment_id: number;
  payment_status:
    | "waiting"
    | "confirming"
    | "confirmed"
    | "finished"
    | "failed"
    | "expired";
  pay_address: `0x${string}`;
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
  network: string;
  expiration_estimate_date: string;
}

export interface NOWPaymentsApi {
  createNewPayment: (
    request: CreatePaymentRequest
  ) => Promise<CreatePaymentResponse>;
}
