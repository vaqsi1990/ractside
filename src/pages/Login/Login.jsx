import React, { useContext } from 'react'
import "./login.css";
import { useState } from 'react';
import { AuthContext } from '../../helper/Login';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [ credentials, setCredentials] = useState({
        username:undefined,
        password:undefined
    })
    const navigate = useNavigate()
    const { loading, error, dispatch} = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("http://localhost:4500/api/auth/login", credentials);
  
        
        if (res.data.isAdmin) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
  
          
          navigate('/');
        } else {
         
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
          navigate('/');
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    };

  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="LInput" />
            <input type="password" placeholder='password' id='password' onChange={handleChange} className="LInput" />
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span> }
            <p>dont have account? <Link to='/register' className='reg'>Register</Link>  </p>
        </div>

    </div>
  )
}
