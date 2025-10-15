import { FullMigrationData } from "@/@types/migration";
import { UserFrom } from "@/@types/user";
import { api } from "@/services/axios/server";

export async function getMigrationDataByAddress(
  address: string,
  source: UserFrom
): Promise<FullMigrationData | null> {
  try {
    const { data } = await api.get(
      `/migration/address/${address}?source=${source}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
