import React, { useContext, useState } from "react";
import { starRating } from "../utils/starRating"; // Utility function to format star ratings
//Link image so that click on it will take you to the product page
import { Link } from "react-router-dom";
import { CartContext } from "./context/cart-context";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons for incrementing and decrementing cart count
// Import CartContext to manage cart state

const Products = ({ category, products }) => {
  const { setCartCounter, addToCart, removeFromCart } = useContext(CartContext);
  const [buttonCounters, setButtonCounters] = useState({}); // State to track if the button has been clicked
  // Access CartContext to manage cart state
  const productsByCategory = products.filter(
    (product) => product.category === category
  );

  const handleClick = (product) => {
    const { id } = product; // Extract the product ID
    setCartCounter((prevCount) => (prevCount ? prevCount + 1 : 1));
    setButtonCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
    addToCart(product); // Add the product to the cart
    // Increment the count for the specific product
    // Increment cart counter or initialize it to 1 if it was null
  };

  const plusHandler = (product) => {
    const { id } = product; // Extract the product ID
    setCartCounter((prevCount) => (prevCount ? prevCount + 1 : 1));
    setButtonCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
    addToCart(product); // Increment the count for the specific product
  };

  const minusHandler = (id) => {
    if (buttonCounters[id] > 0) {
      setCartCounter((prevCount) => (prevCount ? prevCount - 1 : 0));
      setButtonCounters((prevCounters) => ({
        ...prevCounters,
        [id]: Math.max((prevCounters[id] || 0) - 1, 0), // Decrement the count for the specific product
      }));
      removeFromCart(id); // Remove the product from the cart
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsByCategory.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow flex flex-col justify-between"
            style={{ height: "450px" }}
          >
            <div className="flex-grow">
              <p className="text-md font-semibold text-blue-400">
                {product.title}
              </p>
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full object-contain"
                  style={{ height: "200px" }}
                />
              </Link>
              <p className="text-lg font-bold text-blue-400 mt-2">
                Price: Rs {Math.round(product.price * 90)}
              </p>
              <p className="text-lg font-bold text-yellow-700 mt-1">
                Rating: {starRating(product.rating.rate)} (
                {product.rating.count} reviews)
              </p>
            </div>
            <div className="flex justify-end mt-4">
              {buttonCounters[product.id] > 0 ? (
                <div className="flex items-center bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer">
                  <FaMinus
                    onClick={() => minusHandler(product.id)}
                    className="mr-2"
                  />
                  <span>{buttonCounters[product.id]}</span>
                  <FaPlus
                    onClick={() => plusHandler(product)}
                    className="ml-2"
                  />
                </div>
              ) : (
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer"
                  onClick={() => handleClick(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
