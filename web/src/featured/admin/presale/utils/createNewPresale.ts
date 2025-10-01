import { api } from "@/services/axios/server";
import { PresaleClient } from "../interface";
import { serverEndpoint } from "@/config/endpoint";

export async function createNewPresale(clientData:PresaleClient){
    try {
        const {data} = await api.post(`${serverEndpoint}/presale`, clientData);

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}