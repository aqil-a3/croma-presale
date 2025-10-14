import { serverEndpoint } from "@/config/endpoint";
import axios from "axios";

export const api = axios.create({
  baseURL: `${serverEndpoint}`,
  headers: {
    "x-shared-key": process.env.CROMA_PRESALE_SHARED_SECRET_KEY,
  },
});
