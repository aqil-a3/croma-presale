import { api } from "@/services/axios/server";
import { PresaleClient } from "../../../featured/admin/presale/interface";
import { serverEndpoint } from "@/config/endpoint";

export async function createNewPresale(clientData:PresaleClient){
    try {
        const {data} = await api.post(`${serverEndpoint}/presale`, clientData);

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}