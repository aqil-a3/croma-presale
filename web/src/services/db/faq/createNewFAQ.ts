import { api } from "@/services/axios/server";
import { serverEndpoint } from "@/config/endpoint";
import { FaqClient } from "@/featured/admin/faq/interface";

export async function createNewFAQ(clientData:FaqClient){
    try {
        const {data} = await api.post(`${serverEndpoint}/faq`, clientData);

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}