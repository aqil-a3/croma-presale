import { api } from "../axios/server";
import { CreatePaymentRequest, CreatePaymentResponse } from "./interface";

export async function createNewPayment(
  requestData: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const { data } = await api.post("/investment/payments", requestData);
    return data;
  } catch (error) {
    throw error;
  }
}
