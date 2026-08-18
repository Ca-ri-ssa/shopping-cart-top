import apiClient from "./apiClient";

const apiService = {
    getAllProduct: () => apiClient.get('/products'),
    getProductById: (id) => apiClient.get(`/product/${id}`)
};

export default apiService;