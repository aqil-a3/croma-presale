import { UserDb } from "@/@types/auth";
import { serverEndpoint } from "@/config/endpoint";
import { api } from "@/services/axios/server";

export async function getUserByAddress(
  wallet_address?: string
): Promise<UserDb | null> {
  if (!wallet_address) return null;
  try {
    const { data } = await api.get(
      `${serverEndpoint}/user/address/${wallet_address}`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
