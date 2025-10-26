export type SettingAdminDbKey =
  | 'referral_average_buy_amount'
  | 'payment_methods'
  | 'fake_top_buyers';

export interface SettingAdminDb<TValue = unknown> {
  id: number;
  created_at: string;
  key: SettingAdminDbKey;
  value: TValue;
  label: string;
}

export type PaymentSettingValue = {
  value: {
    currency: string;
    name: string;
    icon: string;
  }[];
};

export interface NowPaymentsFullCurrency {
  id: number;
  code: string; // Kode ticker, mis. "BTC", "ETH"
  name: string; // Nama lengkap koin, mis. "Bitcoin"
  enable: boolean; // Apakah koin ini aktif
  wallet_regex: string | null; // Regex validasi alamat wallet
  priority: number; // Urutan prioritas tampil
  extra_id_exists: boolean; // Apakah membutuhkan extra ID (mis. memo/tag)
  extra_id_regex: string | null; // Regex untuk extra ID (kalau ada)
  logo_url: string | null; // Path/logo dari koin
  track: boolean; // Apakah transaksi koin ini bisa dilacak
  cg_id: string | null; // CoinGecko ID (mis. "bitcoin", "ethereum")
  is_maxlimit: boolean; // Apakah ada batas maksimum transaksi
  network: string | null; // Jaringan (mis. "eth", "bsc", "trc20", dll.)
  smart_contract: string | null; // Alamat smart contract (kalau token ERC/BEP)
  network_precision: number | null; // Jumlah desimal maksimum pada network
}

export interface NowPaymentsFullCurrenciesResponse {
  currencies: NowPaymentsFullCurrency[];
}
