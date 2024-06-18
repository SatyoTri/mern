import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getProducts = async () => {
  return axios.get(`${API_URL}/products`);
};

export const createProduct = async (product) => {
  return axios.post(`${API_URL}/products`, product, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateProduct = async (id, product) => {
  return axios.put(`${API_URL}/products/${id}`, product, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProduct = async (id) => {
  return axios.delete(`${API_URL}/products/${id}`);
};

export const getProductById = async (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

export const getCategories = async () => {
  return axios.get(`${API_URL}/products/categories`);
};
