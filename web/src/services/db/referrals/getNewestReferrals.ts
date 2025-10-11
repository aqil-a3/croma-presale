import { ReferralDb } from "@/@types/referrals";
import { api } from "@/services/axios/server";

export async function getNewestReferrals(): Promise<ReferralDb[]> {
  try {
    const { data } = await api.get("/referrals/newest");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
