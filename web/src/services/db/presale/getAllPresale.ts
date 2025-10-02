import { api } from "@/services/axios/server";

export async function getAllPresale() {
  try {
    const { data } = await api.get("/presale");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
