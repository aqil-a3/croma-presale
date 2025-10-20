import { ReferralBuyBonusDb } from "@/@types/referrals";
import { api } from "@/services/axios/server";

export async function getReferralBuyBonusByAddress(wallet_address: string):Promise<ReferralBuyBonusDb[]> {
  try {
    const { data } = await api.get(
      `/investment/user/${wallet_address}/get-transaction/reward-buy-bonus`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
