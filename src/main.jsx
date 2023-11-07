import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import stripePromise from "./Stripe";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthContextProvider from "./helper/Login"
import { Provider } from "react-redux";
import store from "./store";
import { Elements } from "@stripe/react-stripe-js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
<Elements stripe={stripePromise}>

 <App />
</Elements>

      </Provider>

    </AuthContextProvider>
   
  </React.StrictMode>
);
