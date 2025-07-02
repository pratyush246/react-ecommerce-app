import React, { useContext } from "react";
import cartImage from "../assets/images/cart.jpg"; // Adjust the path based on where you place the image
import { CartContext } from "./context/cart-context"; // Adjust the path as necessary
import { FaPlus, FaMinus } from "react-icons/fa";
import Address from "./Address"; // Import the Address component

const Cart = () => {
  const { cartProducts, setCartCounter, addToCart, removeFromCart } =
    useContext(CartContext);

  const incrementQuantity = (product) => {
    setCartCounter((prevCount) => prevCount + 1);
    addToCart(product);
  };

  const decrementQuantity = (product) => {
    setCartCounter((prevCount) => prevCount - 1);
    removeFromCart(product.id);
  };

  const calculateTotal = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  if (cartProducts.length > 0) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${cartImage})` }}
      >
        <div className="container mx-auto p-8 bg-white bg-opacity-90 rounded shadow-lg">
          <h1 className="text-4xl font-bold text-blue-700 mb-8">Your Cart</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="text-sm text-gray-600">
                    Price: Rs {Math.round(product.price * 90)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: Rs{" "}
                    {Math.round(product.price * 90 * product.quantity)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrementQuantity(product)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-bold">{product.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(product)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Total: Rs {Math.round(calculateTotal() * 90)}
            </h2>
            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
        <Address />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cartImage})` }}
    >
      <h1 className="text-5xl font-bold text-white mb-8">Your Cart</h1>
      <p className="text-xl text-white">
        Your cart is currently empty. Start shopping now!
      </p>
    </div>
  );
};

export default Cart;
