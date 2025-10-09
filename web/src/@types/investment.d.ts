type InvestmentStatus = "waiting" | "success" | "failed" | "expired" | string;

export interface InvestmentDb {
  id: string; // UUID
  user_id: string | null;
  order_id: string | null;
  status: InvestmentStatus; 
  invested_usd: number; // numeric(18,2)
  pay_currency: string
  pay_amount: number
  receive_currency: string; // default 'CRM'
  crm_amount: number; // numeric(18,6)
  network: string; // ex: "eth", "bsc"
  stage: number; // presale stage
  phase: number; // phase number
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  wallet_address: string; // foreign key ke users.wallet_address
}

export type InvestmentClient = Omit<InvestmentDb, "id" | "user_id" | "created_at" | "updated_at">

export interface InvestmentSummary {
  invested_usd: number;
  crm_owned: number;
}
