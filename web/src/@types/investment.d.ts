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

export interface InvestmentDb {
  id: string; // UUID
  user_id: string | null;
  order_id: string | null;
  status: InvestmentPayStatus; 
  invested_usd: number; // numeric(18,2)
  pay_currency: string
  pay_amount: number
  receive_currency: string; // default 'CRM'
  crm_amount: number; // numeric(18,6)
  cmc_amount: number; // numeric(18,6)
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
  cmc_owned: number;
}

export interface GetInvestmentLeaderboardRequest {
  /** 
   * Pilihan periode:
   * 'all-time' → semua data
   * 'this-week' → minggu ini
   * 'this-month' → bulan ini
   */
  period: "all-time" | "this-week" | "this-month";

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
