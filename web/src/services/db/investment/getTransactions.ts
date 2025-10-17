import { InvestmentDb } from "@/@types/investment";
import { api } from "@/services/axios/server";

export interface AdminInvestmentQuery {
  from: number;
  to: number;
}

export async function getAllTransactions(
  config: AdminInvestmentQuery
): Promise<InvestmentDb[]> {
  try {
    const { data } = await api.get("/investment/all", {
      params: config,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
