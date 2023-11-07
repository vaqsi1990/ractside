import { createContext, useEffect, useReducer } from "react";
import React from 'react'

const RegisterReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_START": 
        return {
          user: null,
          loading: true,
          error: null,
        };
      case "REGISTER_SUCCESS":
        return {
          user: action.payload,
          loading: false,
          error: null,
        };
      case "REGISTER_FAILURE":
        return {
          user: null,
          loading: false,
          error: action.payload,
        };
    
      default:
        return state;
    }
  };
export default async function Register() {
    dispatch({ type: "REGISTER_START" });
    try {
       
        const res = await axios.post("http://localhost:4500/api/auth/register", userData);
        
        
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
        
        
        navigate('/login');
      } catch (err) {
       
        dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
      }

}
