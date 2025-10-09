import { InvestmentClient } from "@/@types/investment";
import { api } from "@/services/axios/server";

export async function createNewInvestment(payload: InvestmentClient) {
  try {
    await api.post("/investment", payload);
  } catch (error) {
    throw error;
  }
}
