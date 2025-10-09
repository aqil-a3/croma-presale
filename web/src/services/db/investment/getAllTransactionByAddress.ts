import { InvestmentDb } from "@/@types/investment";
import { api } from "@/services/axios/server";

export async function getAllTransactionByAddress(wallet_address: string):Promise<InvestmentDb[]> {
  try {
    const { data } = await api.get(
      `/investment/user/${wallet_address}/get-transaction/all`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
