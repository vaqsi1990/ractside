import { GET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
    msg: {},
    status: null,
    id: null
}
 const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};
  
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
}
  
  
  
export default returnErrors 
  