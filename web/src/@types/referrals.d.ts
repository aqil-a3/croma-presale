export interface ReferralDb {
  id: number;
  created_at: string;
  updated_at: string;
  wallet_address: string;
  referred_by: string;
  status: "completed" | "pending" | "failed";
}


export interface ReferralRewardsDB {
  id: number;
  created_at: string;
  referrer_id: string;
  referral_id: string;
  investment_id: string;
  bonus_amount: number;
  claimed: boolean;
}