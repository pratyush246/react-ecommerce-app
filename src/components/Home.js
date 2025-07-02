import React from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import home from "../assets/images/home.jpg"; // Adjust the path based on where you place the image

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${home})` }}
    >
      <h1 className="text-7xl font-bold mb-16 text-white">
        Welcome to Our Store!
      </h1>
      <div className="flex space-x-8">
        <Link
          to={"/login"}
          className="flex items-center bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 cursor-pointer"
        >
          <FaSignInAlt className="mr-2" />
          Login
        </Link>
        <Link
          to={"/signup"}
          className="flex items-center bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 cursor-pointer"
        >
          <FaUserPlus className="mr-2" />
          Sign Up
        </Link>
      </div>
      <footer className="mt-16 text-white">
        <p className="text-4xl mb-8 text-white">
          Explore our products and enjoy shopping.
        </p>
      </footer>
    </div>
  );
};

export default Home;
