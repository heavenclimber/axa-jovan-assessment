import axios from "axios";
import { BASE_URL } from "@utils/constant";
export const api = axios.create({
  timeout: 325000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: BASE_URL,
});
