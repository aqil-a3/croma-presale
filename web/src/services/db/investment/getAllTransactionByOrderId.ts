import { InvestmentDb } from "@/@types/investment";
import { api } from "@/services/axios/server";

export async function getAllTransactionByOrderId(
  order_id: string
): Promise<InvestmentDb[]> {
  try {
    const { data } = await api.get(`/investment/order/${order_id}`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
