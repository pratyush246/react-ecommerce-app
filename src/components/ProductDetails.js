import React, { useState, useEffect, useContext, use } from "react";
import { useParams } from "react-router-dom";
import { starRating } from "../utils/starRating";
// Utility function to format star ratings
import { CartContext } from "./context/cart-context";
//import - + icons to show the number of items in the cart from react-icons
import { FaPlus, FaMinus } from "react-icons/fa";

//clicking on back button should take you to the previous page
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { setCartCounter, addToCart, removeFromCart } = useContext(CartContext);
  const [buttonClickedCounter, setButtonClickedCounter] = useState(0);
  const [otherButton, setOtherButton] = useState(false); // State to track if the button has been clicked
  // State to track if the button has been clicked
  // Import CartContext to manage cart state

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  useEffect(() => {
    if (buttonClickedCounter > 0) {
      setOtherButton(true);
      return;
      // Increment cart counter or initialize it to 1 if it was null
    }
    setOtherButton(false);
  }, [buttonClickedCounter]);

  const clickHandler = () => {
    setCartCounter((prevCount) => (prevCount ? prevCount + 1 : 1));
    setButtonClickedCounter((prevCount) => prevCount + 1);
    addToCart(product);
  };

  const plusHandler = () => {
    setCartCounter((prevCount) => (prevCount ? prevCount + 1 : 1));
    setButtonClickedCounter((prevCount) => prevCount + 1);
    addToCart(product);
  };

  const minusHandler = () => {
    if (buttonClickedCounter > 0) {
      setCartCounter((prevCount) => (prevCount ? prevCount - 1 : 0));
      setButtonClickedCounter((prevCount) => prevCount - 1);
      removeFromCart(product.id);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-lg font-bold mb-4 text-blue-400">
          {product.title}
        </h1>
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-sm mx-auto object-contain"
          style={{ height: "350px" }}
        />
        <p className="text-2xl font-bold text-blue-400 mt-4">
          Price: Rs {Math.round(product.price * 90)}
        </p>
        <p className="text-xl text-blue-700 mt-2">{product.description}</p>
        <p className="text-2xl font-bold text-yellow-500 mt-2">
          Rating: {starRating(product.rating.rate)} ({product.rating.count}{" "}
          reviews)
        </p>
      </div>
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        {otherButton ? (
          <div className="flex items-center bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer">
            <FaMinus onClick={minusHandler} className="mr-2" />
            <span>{buttonClickedCounter}</span>
            <FaPlus onClick={plusHandler} className="ml-2" />
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer"
            onClick={clickHandler}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
