

import axios from 'axios';








const addToCart = async (userId, gameData) => {
  try {
    const { _id, name, price } = gameData; // Extract relevant properties

    const response = await axios.post(`http://localhost:4500/api/v1/cart/${userId}`, {
      gameId: _id,
      name,
      price,
      quantity: 1, 
    });

    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};


export const cartItems = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:4500/api/v1/cart/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}


export const deleteCart = async (userId, gameId) => {
  try {
    const response = await axios.delete(`http://localhost:4500/api/v1/cart/${userId}/${gameId}`)
    return response.data;
  } catch (error) {
    console.error('Cant delete item from cart bitch:', error);
    throw error;
  }
}

export const stripe = async (gameId) => {
  try {
    const response = await axios.post("http://localhost:4500/bank/stripe", {
      gameId: gameId,
    });
    return response.data;
  } catch (error) {
    console.error('Cant Stripe:', error);
    throw error;
  }
};



export default addToCart

