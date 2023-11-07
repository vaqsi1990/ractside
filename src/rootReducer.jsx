import { combineReducers } from 'redux';
import Error from "./helper/Error"
import Cart from "./helper/Cart"
import Order from "./helper/Order"
export default combineReducers({
    
    error: Error,
    
    cart: Cart,
    order: Order
})