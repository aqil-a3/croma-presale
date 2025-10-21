import { MigrationPresaleDb } from "@/@types/migration";
import { api } from "@/services/axios/server";

export async function createNewMigrationData(data: MigrationPresaleDb) {
  try {
    await api.post("/migration/airdrop", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
