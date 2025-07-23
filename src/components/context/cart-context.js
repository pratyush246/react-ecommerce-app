import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //add logic for cart products
  const [cartCounter, setCartCounter] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);


  useEffect(() => {
    const total = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartProducts]);

  const addToCart = (product) => {
    setCartProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return prevProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartProducts((prevProducts) =>
      //check if the product exists in the cart if exist reduce the quantity by 1
      prevProducts
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartCounter,
        setCartCounter,
        setCartProducts,
        setTotalPrice,
        addToCart,
        totalPrice,
        removeFromCart,
        cartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
