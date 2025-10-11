import { UserReferralStatistic } from "@/@types/user";
import { serverEndpoint } from "@/config/endpoint";
import axios from "axios";

export async function getUserStatisticByAddress(
  wallet_address?: string
): Promise<UserReferralStatistic | null> {
  if (!wallet_address) return null;
  try {
    const { data } = await axios.get(`${serverEndpoint}/user/address/${wallet_address}/statistic`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
