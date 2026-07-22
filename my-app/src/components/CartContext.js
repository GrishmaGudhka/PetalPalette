// src/components/CartContext.js

import React, { createContext, useContext, useEffect, useState } from "react";

// Create Cart Context
export const CartContext = createContext();

// Custom Hook
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider
export const CartProvider = ({ children }) => {

  // Load cart from localStorage
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cart State
  const [cartItems, setCartItems] = useState(storedCart);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Item to Cart
  const addToCart = (bouquet, quantity = 1) => {

    setCartItems((prevCart) => {

      const existingItem = prevCart.find(
        (item) => item.id === bouquet.id
      );

      // Increase quantity if item already exists
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === bouquet.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      // Add new item
      return [
        ...prevCart,
        {
          ...bouquet,
          quantity,
        },
      ];
    });
  };

  // Remove Item
  const removeFromCart = (id) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity - 1),
              }
            : item
        )
    );
  };

  // Remove everything
  const clearCart = () => {
    setCartItems([]);
  };

  // Cart Total Price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total Number of Items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};