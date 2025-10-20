import { ReferralWithdrawRequestUser } from "@/@types/referrals";
import { api } from "@/services/axios/server";

export async function createNewReferralWithdrawRequest(
  payload: ReferralWithdrawRequestUser
) {
  try {
    await api.post("/referrals/withdraw", payload);
  } catch (error) {
    console.error(`createNewReferralWithdrawRequest Error`, error);
    throw error;
  }
}
