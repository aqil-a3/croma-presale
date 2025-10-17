export type ReferralTier = "Bronze" | "Silver" | "Gold";
export type UserFrom =
  | "all"
  | "web"
  | "brand-ambassador"
  | "croma-army"
  | "give-away"
  | "croma-visionary"
  | "croma-og"
  | "moderator";

export interface UserReferralStatistic {
  total_referrals: number;
  total_earned: number;
  available_to_claim: number;
  current_tier: ReferralTier;
  commission_rate: number;
}

export interface TopBuyer {
  username: string;
  smartContract: string;
  totalPurchased: number;
}

export interface TopBuyerWithRanks extends TopBuyer {
  rank: number;
}
