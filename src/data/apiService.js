import apiClient from "./apiClient.js";

const apiService = {
    getAllProduct: () => apiClient.get('/products'),
    getProductById: (id) => apiClient.get(`/products/${id}`),
    getAllCart: () => apiClient.get('/carts'),
    postNewCart: (cartData) => apiClient.post('/carts', cartData),
    getCartById: (id) => apiClient.get(`/carts/${id}`),
    updateCartById: (id, cartData) => apiClient.put(`/carts/${id}`, cartData),
    deleteCart: (id) => apiClient.delete(`/carts/${id}`),
    signUpUser: (userData) => apiClient.post('/users', userData),
    loginUser: (userData) => apiClient.post('/auth/login', userData),
    getUserById: (id) => apiClient.get(`/users/${id}`),
    getAllUser: () => apiClient.get('/users')
};

export default apiService;