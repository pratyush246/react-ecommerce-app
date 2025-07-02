import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/context/cart-context.js";
import { UserProvider } from "./components/context/user-context.js";

//to get current path abd if its / do not show the navbar

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  </BrowserRouter>
);
