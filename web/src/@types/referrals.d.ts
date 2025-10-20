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

export interface ReferralBuyBonusDb {
  id: number;
  created_at: string;
  buyer_wallet: string;
  referral_code: string;
  order_id: string;
  crm_bonus: number;
}


export type ReferralBuyBonusInsert = Omit<
  ReferralBuyBonusDb,
  'id' | 'created_at'
>;