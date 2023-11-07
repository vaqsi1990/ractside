import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helper/Login';
import { useNavigate } from 'react-router-dom';
import "./register.css";


export default function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });

    try {
      const res = await axios.post("http://localhost:4500/api/auth/register", userData);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate('/login'); 
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className='register'>
      <div className="lContainer">
        <input type="text" placeholder='username' id='username' onChange={handleChange} className="LInput" />
        <input type="email" placeholder='email' id='email' onChange={handleChange} className="LInput" />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className="LInput" />
        <button disabled={loading} onClick={handleRegister} className="lButton">Register</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}
