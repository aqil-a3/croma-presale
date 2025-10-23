import { NowPaymentsPayment } from "@/@types/investment";
import { api } from "@/services/axios/server";

export async function getPaymentStatus(
  payment_id: string
): Promise<NowPaymentsPayment> {
  try {
    const { data } = await api.get(`/investment/payments/id/${payment_id}`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
