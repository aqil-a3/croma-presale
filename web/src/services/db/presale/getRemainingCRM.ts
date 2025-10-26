import { api } from "@/services/axios/server";

export async function getRemainingCRM(): Promise<number> {
  try {
    const { data } = await api.get("/presale/active/remaining-crm");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
