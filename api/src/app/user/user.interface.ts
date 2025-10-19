export type ReferralTier = 'Bronze' | 'Silver' | 'Gold';

export interface UserDb {
  id: string;
  created_at: string;
  wallet_address: string;
  username: string | null;
  email: string | null;
  referred_by: string | null;
  referral_code:string;
}

export interface UserReferralStatistic {
  total_referrals: number;
  total_earned: number;
  available_to_claim: number;
  current_tier: ReferralTier;
  commission_rate: number;
}

export type UserFrom =
  | 'all'
  | 'web'
  | 'brand-ambassador'
  | 'croma-army'
  | 'give-away'
  | 'croma-visionary'
  | 'croma-og'
  | 'moderator';
