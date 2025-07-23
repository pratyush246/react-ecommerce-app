import React, { useState, useContext } from "react";
import { CartContext } from "./context/cart-context";
import { useNavigate } from "react-router-dom";

const paymentOptions = [
  {
    key: "card",
    label: "Credit/Debit Card",
    description: "Pay securely using your card.",
  },
  {
    key: "upi",
    label: "UPI",
    description: "Pay using UPI apps like Google Pay, PhonePe, etc.",
  },
  {
    key: "cod",
    label: "Cash on Delivery",
    description: "Pay with cash when your order is delivered.",
  },
];

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const { totalPrice ,setCartProducts ,setTotalPrice, setCartCounter } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle payment submission logic
    alert(`Payment method: ${selectedMethod}\nThank you for your order! Your order will be delivered in 6-7 days.`);
    setCartProducts([]);
    setTotalPrice(null);
    setCartCounter(null);
    navigate("/products");
  };

  // Add a function to check if any details are filled
  const isAnyDetailFilled = () => {
    if (selectedMethod === "card") {
      return (
        cardDetails.name || cardDetails.number || cardDetails.expiry || cardDetails.cvv
      );
    }
    if (selectedMethod === "upi") {
      return upiId;
    }
    return false;
  };

  const handleBackToCart = () => {
    if (isAnyDetailFilled()) {
      if (
        window.confirm(
          "Your payment details will be lost. Are you sure you want to go back to the cart?"
        )
      ) {
        navigate("/cart");
      }
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white bg-opacity-90 rounded shadow-lg mt-10 max-w-lg">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Payment Options</h1>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.key}
            className={`flex items-center p-5 rounded-lg shadow cursor-pointer border-2 transition-all duration-200 ${
              selectedMethod === option.key
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
            onClick={() => setSelectedMethod(option.key)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedMethod === option.key}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.key}
              checked={selectedMethod === option.key}
              onChange={() => setSelectedMethod(option.key)}
              className="mr-4 accent-blue-500"
            />
            <div>
              <div className="font-semibold text-lg">{option.label}</div>
              <div className="text-gray-600 text-sm">{option.description}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {selectedMethod === "card" && (
          <div className="space-y-4">
            <label className="block font-semibold">Card Details:</label>
            <input
              type="text"
              name="name"
              placeholder="Name on Card"
              value={cardDetails.name}
              onChange={handleCardChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={handleCardChange}
              className="w-full p-2 border rounded"
              maxLength={16}
              required
            />
            <div className="flex space-x-2">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardChange}
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                className="w-1/2 p-2 border rounded"
                maxLength={4}
                required
              />
            </div>
          </div>
        )}

        {selectedMethod === "upi" && (
          <div className="space-y-4">
            <label className="block font-semibold">Enter UPI ID:</label>
            <input
              type="text"
              name="upiId"
              placeholder="example@upi"
              value={upiId}
              onChange={handleUpiChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        {selectedMethod === "cod" && (
          <div className="space-y-4">
            <p className="font-semibold">You have selected Cash on Delivery.</p>
          </div>
        )}

        {selectedMethod && (
          <div className="flex flex-col">
            <div className="flex justify-center">
              <div className="bg-blue-100 text-blue-800 text-lg font-bold rounded-lg px-6 py-3 mb-4 flex items-center shadow">
                <span role="img" aria-label="money" className="mr-2">💰</span>
                Total Price: Rs {Math.round(totalPrice * 90)}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 font-bold cursor-pointer"
            >
              Pay Now
            </button>
            <button
              type="button"
              onClick={handleBackToCart}
              className="w-full mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold text-gray-700 cursor-pointer"
            >
              ← Back to Cart
            </button>
          </div>
        )}
      </form>
      {
        !selectedMethod &&(
          <button
          type="button"
          onClick={handleBackToCart}
          className="w-full mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold text-gray-700 cursor-pointer"
        >
          ← Back to Cart
        </button>
        )
      }
    </div>
  );
};

export default Payment; 