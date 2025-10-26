export interface SettingAdminDb<TValue = unknown> {
  id: number;
  created_at: string;
  key: SettingAdminDbKey;
  value: TValue;
  label: string;
}

export type SettingAdminDbKey =
  | "referral_average_buy_amount"
  | "payment_methods"
  | "fake_top_buyers";

export type NumberSettingValue = number;

export type PaymentSettingValue = {
  value: {
    currency: string;
    name: string;
    icon: string;
  }[];
};
