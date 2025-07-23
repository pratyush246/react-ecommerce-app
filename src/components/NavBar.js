import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { CartContext } from "./context/cart-context";
import { UserContext } from "./context/user-context"; // Assuming UserContext is imported for user-related functionality
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { cartCounter } = useContext(CartContext);
  const { currentUser } = useContext(UserContext); // Assuming currentUser is used for user-related functionality

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/products" className="text-white text-lg font-bold">
          <FaHome size={36} className="inline-block mr-2" />
        </Link>
        <div className="flex items-center space-x-6">
          {currentUser && (
            <div className="flex items-center space-x-2 text-white cursor-pointer" onClick={() => navigate("/profile")}>
              <FaUserCircle size={36} />
              <span className="text-2xl font-bold">{currentUser}</span>
            </div>
          )}
          <div className="relative">
            <Link to="/cart" className="text-white hover:text-gray-200">
              <FaShoppingCart size={36} />
            </Link>
            {cartCounter > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCounter}
              </span>
            )}
          </div>
          <Link
            to="/"
            className="text-white hover:text-gray-200 cursor-pointer"
          >
            <FaSignOutAlt size={36} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
