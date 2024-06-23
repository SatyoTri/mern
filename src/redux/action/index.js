import axios from 'axios'; // Menggunakan axios untuk melakukan HTTP request
import { getToken } from '../reducer/auth'; // Misalnya, fungsi untuk mendapatkan token dari localStorage atau session

export const getCart = () => async (dispatch) => {
    const token = getToken();

    try {
        const response = await axios.get('http://localhost:5000/cart', {
            headers: {
                'Authorization': `${token}`
            }
        });

        dispatch({
            type: "GET_CART",
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: "GET_CART_FAILURE",
            payload: error.message
        });
    }
};

// For Add Item to Cart
export const addCart = (product) => async (dispatch) => {
    const token = getToken(); // Mendapatkan token dari localStorage atau session storage
    const requestBody = {
    productId: product._id,
    quantity: 1
  };

  console.log('Request Body:', requestBody);
    try {
    const response = await axios.post('http://localhost:5000/cart', requestBody, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `${token}`
      }
    });
     console.log('Response:', response);
        

        dispatch({
            type: "ADDITEM_SUCCESS",
            payload: response.data // Jika perlu, Anda bisa mengirimkan data yang dikembalikan dari server
        });
    } catch (error) {
        dispatch({
            type: "ADDITEM_FAILURE",
            payload: error.message // Mengirim pesan error jika terjadi kegagalan
        });
    }
};

// For Delete Item from Cart (Contoh, asumsikan API sudah ada untuk menghapus)
export const delCart = (productId) => async (dispatch) => {
    const token = getToken(); // Mendapatkan token dari localStorage atau session storage

    try {
        const response = await axios.delete(`http://localhost:5000/cart/${productId}`, {
            headers: {
                'Authorization': `${token}`
            }
        });

        dispatch({
            type: "DELITEM_SUCCESS",
            payload: response.data // Jika perlu, Anda bisa mengirimkan data yang dikembalikan dari server
        });
    } catch (error) {
        dispatch({
            type: "DELITEM_FAILURE",
            payload: error.message // Mengirim pesan error jika terjadi kegagalan
        });
    }
};
export const updateCart = (productId, quantity) => async (dispatch) => {
    const token = getToken();
    const requestBody = { quantity };

    try {
        const response = await axios.put(`http://localhost:5000/cart/${productId}`, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });

        dispatch({
            type: "UPDATEITEM",
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: "UPDATEITEM_FAILURE",
            payload: error.message
        });
    }
};
