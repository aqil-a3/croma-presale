import { ReferralApiTypes } from "../interface";
import { getNewestReferrals } from "./getNewestReferrals";
import { getReferralBuyBonusByAddress } from "./getReferralBuyBonusByAddress";
import { getReferralRewardById } from "./getReferralRewardById";

export const apiReferrals: ReferralApiTypes = {
  getNewestReferrals,
  getReferralRewardById,
  getReferralBuyBonusByAddress,
};
