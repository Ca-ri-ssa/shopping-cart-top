import axios from "axios";

const BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
    baseURL : BASE_URL,
    timeout : 10000,
    headers: {
        'Content-Type' : 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
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
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return  Promise.reject(error);
    }
);

export default apiClient;