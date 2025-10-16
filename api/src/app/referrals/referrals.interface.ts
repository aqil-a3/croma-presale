export type ReferralStatus = 'pending' | 'confirmed' | 'failed';

export interface ReferralDb {
  id: number;
  updated_at: string;
  created_at: string;
  wallet_address: string;
  referred_by: string;
  status: ReferralStatus;
}

export type ReferralInsert = Omit<
  ReferralDb,
  'id' | 'updated_at' | 'created_at'
>;

export interface ReferralRewardsDB {
  id: number;
  created_at: string;
  referrer_id: string;
  referral_id: string;
  investment_id: string;
  bonus_amount: number;
  claimed: boolean;
}

export type ReferralRewardsInsert = Omit<ReferralRewardsDB, 'id' | 'created_at'>;
