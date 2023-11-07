// In helper/Cart.jsx
import axios from 'axios';
import { returnErrors } from './Error';
import { ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from '../types';

const addToCart = (userId, productId, quantity) => dispatch => {
    axios.post(`/api/v1/cart/${userId}`, { productId, quantity })
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/v1/cart/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setCartLoading = () => {
    return {
        type: CART_LOADING
    }
}

export default addToCart;