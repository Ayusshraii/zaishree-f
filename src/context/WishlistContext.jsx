import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const addToWishlist = (product) => {
    setWishlistItems((prev) =>
      isInWishlist(product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product) => {
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};