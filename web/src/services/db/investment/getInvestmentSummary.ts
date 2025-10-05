import { InvestmentSummary } from "@/@types/investment";
import { api } from "@/services/axios/server";

export async function getInvestmentSummary(
  wallet_address: string
): Promise<InvestmentSummary> {
  try {
    const { data } = await api.get("/investment/summary", {
      params: {
        wallet_address,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
