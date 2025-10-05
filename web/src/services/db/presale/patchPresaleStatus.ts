import { api } from "@/services/axios/server";

export async function patchPresaleStatus(presaleId: number) {
  try {
    const { data } = await api.patch(`/presale/is_active`, { presaleId });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
