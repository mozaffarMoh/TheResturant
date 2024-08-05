import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://theplatform.merwas.app/api/",
});