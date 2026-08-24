import axios from "axios";
import { BASE_URL } from "./config.js";

const apiClient = axios.create({
    baseURL : BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type' : 'application/json'
    }
});

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;