import { api } from "@/services/axios/server";
import { serverEndpoint } from "@/config/endpoint";
import { FaqDb } from "@/featured/admin/faq/interface";

export async function editFAQ(clientData: FaqDb) {
  try {
    const { data } = await api.put(`${serverEndpoint}/faq`, clientData);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
