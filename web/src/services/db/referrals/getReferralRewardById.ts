import { ReferralRewardsDB } from "@/@types/referrals";
import { api } from "@/services/axios/server";

export async function getReferralRewardById(
  referrer_id: string
): Promise<ReferralRewardsDB[]> {
  try {
    const { data } = await api.get(`/referrals/${referrer_id}/rewards`);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
