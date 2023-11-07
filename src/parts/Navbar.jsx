import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../helper/Login'


export default function Navbar() {
  const { user, logout} = useContext(AuthContext)




const handleLogout = () => {
  
  logout();
};
  return (
<nav className="fixed-top navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">

        <Link to='/'  className="navbar-brand text-white">Navbar</Link>
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" mx-5 gap-4 collapse navbar-collapse text-white justify-content-end" id="navbarNav">
        <ul className="navbar-nav ms-auto text-white d-flex align-items-center">
  <li className="nav-item text-white">
    <Link to="/" className="mx-3 nav-link active text-white" aria-current="page">Home</Link>
  </li>
  {user && user.isAdmin && (
              <li className="nav-item text-white">
                <Link to="/add" className="mx-3 nav-link active text-white" aria-current="page">Add</Link>
              </li>
            )}
  {user ? (
    <ul className="navbar-nav ms-auto text-white d-flex align-items-center">

    <li className="nav-item mx-3"> 
   <Link to="/cart" className="mx-3 nav-link active text-white" aria-current="page">Cart </Link>
    </li>
    <li className="nav-item d-flex text-center justify-content-center mt-3">
    Welcome: <p >{user.details.username}</p>
    </li>
    <li className="nav-item mx-3" >
      <button onClick={handleLogout} className='nav-link text-white'>log out</button>
    </li>
    </ul>
  ) : (
    <div className="d-flex">
     
      <li className="nav-item">
        <Link to="/login" className="nav-link text-white">Login</Link>
      </li>
    </div>
  )}
</ul>
</div>
      </div>
    </nav>
  )
}
