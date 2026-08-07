import React from "react";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/Cartcontext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleRemove = (id) => {
    removeFromWishlist(id);
    toast("Removed from wishlist");
  };

  const handleAddToCart = (product) => {
    if (isInCart(product.id)) {
      toast("Already added in cart");
      return;
    }
    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="text-center text-bold text-3xl p-7 underline">
        My Wishlist
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-14">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FiHeart className="w-14 h-14 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Save items you love and they'll show up here.
            </p>
            <a
              href="/"
              className="px-6 py-2 bg-[#141311] text-white text-sm uppercase tracking-wide hover:bg-[#2A2822] transition-colors"
            >
              Continue shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const inCart = isInCart(product.id);
              return (
                <div key={product.id} className="group relative">
                  <button
                    onClick={() => handleRemove(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <FiHeart className="w-4 h-4 text-red-500 fill-current" />
                  </button>

                  <div className="aspect-square overflow-hidden bg-gray-100 rounded-md mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 border text-xs uppercase tracking-wide transition-colors ${
                        inCart
                          ? "border-gray-300 text-gray-400 cursor-default"
                          : "border-[#141311] hover:bg-[#141311] hover:text-white"
                      }`}
                    >
                      <FiShoppingBag className="w-3.5 h-3.5" />
                      {inCart ? "Added to cart" : "Add to cart"}
                    </button>

                    <button
                      onClick={() => handleRemove(product.id)}
                      aria-label="Remove from wishlist"
                      className="w-10 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;