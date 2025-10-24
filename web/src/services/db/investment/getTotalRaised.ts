import { api } from "@/services/axios/server";

export async function getTotalRaised() {
  try {
    const { data } = await api.get("/investment/total-raised");

    console.log(data)

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
