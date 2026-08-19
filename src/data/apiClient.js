import axios from "axios";
import { BASE_URL, USER_ID_KEY } from "./config";

const apiClient = axios.create({
    baseURL : BASE_URL,
    timeout : 10000,
    headers: {
        'Content-Type' : 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const userId = localStorage.getItem(USER_ID_KEY);

        if (userId) {
            config.headers.set('X-User-Id', userId);
        }

        console.log(`[Request Outgoing] ${config.method?.toUpperCase()} -> ${config.url}`);
        return config;
    },
    (error) => {
        console.error('[Request Error]', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(USER_ID_KEY);
        }
        return  Promise.reject(error);
    }
);

export default apiClient;