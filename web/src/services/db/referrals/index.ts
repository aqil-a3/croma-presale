import { ReferralApiTypes } from "../interface";
import { createNewReferralWithdrawRequest } from "./createNewReferralWithdrawRequest";
import { getAdminReferralWDRequest } from "./getAdminReferralWDRequest";
import { getNewestReferrals } from "./getNewestReferrals";
import { getReferralBuyBonusByAddress } from "./getReferralBuyBonusByAddress";
import { getReferralRewardById } from "./getReferralRewardById";

export const apiReferrals: ReferralApiTypes = {
  getNewestReferrals,
  getReferralRewardById,
  getReferralBuyBonusByAddress,
  createNewReferralWithdrawRequest,
  getAdminReferralWDRequest,
};
