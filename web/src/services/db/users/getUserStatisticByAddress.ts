import { UserReferralStatistic } from "@/@types/user";
import { api } from "@/services/axios/server";

export async function getUserStatisticByAddress(
  wallet_address?: string
): Promise<UserReferralStatistic | null> {
  if (!wallet_address) return null;
  try {
    const { data } = await api.get(`/user/address/${wallet_address}/statistic`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
