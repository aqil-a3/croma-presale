export type SettingAdminDbKey = "referral_average_buy_amount";

export interface SettingAdminDb<TValue = unknown> {
  id: number;
  created_at: string;
  key: SettingAdminDbKey;
  value: TValue;
  label: string;
}
