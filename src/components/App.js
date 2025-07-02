import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProductCategory from "./ProductCategory";
import ProductDetails from "./ProductDetails";
import Home from "./Home";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Cart from "./Cart";
import Payment from "./Payment";

const App = () => {
  const location = useLocation();
  // Check if the current path is the home page
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";
  return (
    <div className="bg-gray-100 min-h-screen">
      {!isHomePage && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductCategory />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default App;
