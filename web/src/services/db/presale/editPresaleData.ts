import { PresaleClient } from "@/featured/admin/presale/interface";
import { api } from "@/services/axios/server";

export async function editPresaleData(data: PresaleClient, presaleId: number) {
  try {
    await api.put("/presale", { data, presaleId });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
