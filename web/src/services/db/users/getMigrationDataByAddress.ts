import { FullMigrationData } from "@/@types/migration";
import { api } from "@/services/axios/server";

export async function getMigrationDataByAddress(
  address: string
): Promise<FullMigrationData | null> {
  try {
    const { data } = await api.get(`/migration/address/${address}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
