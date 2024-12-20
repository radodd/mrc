"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextProps {
  cartItems: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems((prev) => prev + 1);
  };

  const removeFromCart = () => {
    setCartItems((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative values
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
