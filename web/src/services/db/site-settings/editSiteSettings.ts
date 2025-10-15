/* eslint-disable @typescript-eslint/no-explicit-any */
import { SettingAdminDbKey } from "@/@types/setting-admin";
import { api } from "@/services/axios/server";

export async function editSiteSettings(key: SettingAdminDbKey, value: any) {
  try {
    await api.put(`/site-setting/edit/${key}`, { value });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
