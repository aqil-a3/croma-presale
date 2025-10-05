import { api } from "@/services/axios/server";

export async function createNewUser(wallet_address: string) {
  try {
    await api.post(`/user/create`, { wallet_address });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
