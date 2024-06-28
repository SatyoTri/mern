// src/services/cartService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/cart'; // Adjust the URL as needed

const getCart = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}` // Adjust how you manage tokens
        }
    });
    return response.data;
};

const addToCart = async (productId, quantity) => {
    const response = await axios.post(API_URL, { productId, quantity }, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

const updateCartItem = async (productId, quantity) => {
    const response = await axios.put(`${API_URL}/${productId}`, { quantity }, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

const removeCartItem = async (productId) => {
    const response = await axios.delete(`${API_URL}/${productId}`, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export default {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};
