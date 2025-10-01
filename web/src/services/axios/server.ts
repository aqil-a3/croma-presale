import { serverEndpoint } from "@/config/endpoint"
import axios from "axios"

export const api = axios.create({
    baseURL:`${serverEndpoint}`
})
