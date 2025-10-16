import { ReferralApiTypes } from "../interface";
import { getNewestReferrals } from "./getNewestReferrals";
import { getReferralRewardById } from "./getReferralRewardById";

export const apiReferrals: ReferralApiTypes = {
  getNewestReferrals,
  getReferralRewardById,
};
