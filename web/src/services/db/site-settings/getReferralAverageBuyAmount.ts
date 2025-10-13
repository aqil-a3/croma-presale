import { api } from "@/services/axios/server";

export async function getReferralAverageBuyAmount() {
  try {
    const { data } = await api.get("/site-setting/referral_average_buy_amount");

    return data.value;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
