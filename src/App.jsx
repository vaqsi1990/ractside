import React, { useContext } from 'react'
import { BrowserRouter,   Navigate,   Route, Routes } from "react-router-dom";
import Home from "./ui/Home"
import SingleGame from './pages/SingleGame';
import Root from './Root';
import GlobalStyles from './styles/GlobalStyles';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthContext } from './helper/Login';
import {loadStripe} from '@stripe/stripe-js';
import Add from './pages/Add';
import Cart from './pages/Cart';
import Bank from './pages/Bank';
import Checkout from './pages/Checkout';
export default function App() {


  const stripePromise = loadStripe("pk_test_51O7CntKeyWyHBFOeFMiYqkcgdDl7fdQAxnbCeklrVbiyNoIXc0ZJEhqsOMvveY1SOgsTScCOO2DsqZVdqDPpzjIk00XsaOb1Tc");
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div >

  <GlobalStyles />
  <BrowserRouter>
       <Routes>
       <Route path='/' element={ <Root/> }>

       
        <Route path='/add' element={
           <ProtectedRoute>

             <Add />
           </ProtectedRoute>
        }
        />
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/single/:id" element={<SingleGame />} />
        <Route path="/register" element={<Register />} />
        <Route path='/cart' element={<Cart  />} />
        <Route path='/bank' element={<Bank />} />
       </Route>
      </Routes>
    </BrowserRouter>
   
    </div>
  )
}
