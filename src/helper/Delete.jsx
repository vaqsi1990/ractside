
import axios from 'axios';




const deleteItem = async ( gameId) => {
  try {
    const response = await axios.delete(`http://localhost:4500/api/v1/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Error delete:', error);
    throw error;
  }
};

export default deleteItem 

