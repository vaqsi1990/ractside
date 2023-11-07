import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from '../types';

const initialState = {
    orders: [],
    loading: false
}

const order= function(state=initialState, action){
    switch(action.type){
        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload,
                loading: false
            }

        case CHECKOUT:
            return{
                ...state,
                orders: [action.payload, ...state.orders]
            }

        case ORDERS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}

export default order