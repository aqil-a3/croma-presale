import { PresaleDb } from "@/featured/admin/presale/interface";
import { api } from "@/services/axios/server";

export async function getActivePresale(): Promise<PresaleDb> {
  try {
    const { data } = await api.get(`/presale/active`);

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
