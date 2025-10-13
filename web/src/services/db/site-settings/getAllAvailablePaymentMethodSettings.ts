import { api } from "@/services/axios/server";

export async function getAllAvailablePaymentMethodSettings() {
  try {
    const { data } = await api.get("/site-setting/available-currencies");

    return data.currencies;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
