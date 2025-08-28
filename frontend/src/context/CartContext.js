import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const add_to_cart = (item, size = null) => {
    const key = size ? `${item.id}-${size}` : item.id.toString();
    setCart((prev) => {
      const updated_cart = { ...prev, [key]: (prev[key] || 0) + 1 };
      return updated_cart;
    });
    setCartItemsCount((prev) => prev + 1);
  };

  const remove_from_cart = (item, size = null) => {
    const key = size ? `${item.id}-${size}` : item.id.toString();
    setCart((prev) => {
      if (!prev[key]) return prev;
      const updated_cart = { ...prev, [key]: prev[key] - 1 };
      if (updated_cart[key] <= 0) delete updated_cart[key];
      return updated_cart;
    });
    setCartItemsCount((prev) => Math.max(prev - 1, 0));
  };

  const get_cart_quantity = (item, size = null) => {
    const key = size ? `${item.id}-${size}` : item.id.toString();
    return cart[key] || 0;
  };

  const clear_cart = () => {
    setCart({});
    setCartItemsCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemsCount,
        add_to_cart,
        remove_from_cart,
        get_cart_quantity,
        clear_cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
