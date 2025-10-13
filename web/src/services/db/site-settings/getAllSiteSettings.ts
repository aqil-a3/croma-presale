import { SettingAdminDb } from "@/@types/setting-admin";
import { api } from "@/services/axios/server";

export async function getAllSiteSettings(): Promise<SettingAdminDb[]> {
  try {
    const {data} = await api.get("/site-setting");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
