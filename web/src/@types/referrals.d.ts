export interface ReferralDb {
  id: number;
  created_at: string;
  updated_at: string;
  wallet_addres: string;
  referred_by: string;
  status: "completed" | "pending" | "failed";
}
