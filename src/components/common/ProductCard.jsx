import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault(); // stop the parent <Link> from navigating
    if (inWishlist) {
      toggleWishlist(product);
      toast("Removed from wishlist");
    } else {
      toggleWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (inCart) {
      toast("Already added in cart");
      return;
    }
    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <div className="group relative">
      <button
        onClick={handleWishlistClick}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        {inWishlist ? (
          <FaHeart className="w-4 h-4 text-red-500" />
        ) : (
          <FaRegHeart className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <Link to={`/product/${product.id}`}>
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

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-700">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {product.rating && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaStar className="w-3 h-3 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className={`w-full flex items-center justify-center gap-2 py-2 border text-xs uppercase tracking-wide transition-colors ${
          inCart
            ? "border-gray-300 text-gray-400 cursor-default"
            : "border-[#141311] hover:bg-[#141311] hover:text-white"
        }`}
      >
        <FiShoppingBag className="w-3.5 h-3.5" />
        {inCart ? "Added to cart" : "Add to cart"}
      </button>
    </div>
  );
};

export default ProductCard;