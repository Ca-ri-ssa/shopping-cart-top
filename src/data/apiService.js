import apiClient from "./apiClient.js";

const apiService = {
    getAllProduct: () => apiClient.get('/products')
};

export default apiService;