import { serverEndpoint } from "@/config/endpoint";
import { PresaleDb } from "@/featured/admin/presale/interface";
import axios from "axios";

export async function getActivePresale(): Promise<PresaleDb> {
  try {
    const { data } = await axios.get(`${serverEndpoint}/presale/active`);

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
