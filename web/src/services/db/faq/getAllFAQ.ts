import { api } from "@/services/axios/server";

export async function getAllFAQ() {
  try {
    const { data } = await api.get("/faq");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
