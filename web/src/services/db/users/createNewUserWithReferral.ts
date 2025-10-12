import { api } from "@/services/axios/server";

export async function createNewUserWithReferral(
  wallet_address: string,
  referral_code: string
) {
  try {
    await api.post(`/user/create/with-referral`, {
      wallet_address,
      referral_code,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
