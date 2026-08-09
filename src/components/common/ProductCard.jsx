import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar, FaHeart, FaRegHeart, FaLock } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/Cartcontext";
import { useWishlist } from "../../context/WishlistContext";
import { useSubscription } from "../../context/SubscriptionContext";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { hasSubscription } = useSubscription(); // boolean: does the user have an active subscription
  const navigate = useNavigate();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  // Product is locked if it's marked premium and user has no subscription
  const isLocked = product.isPremium && !hasSubscription;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (isLocked) {
      toast.error("Subscribe to unlock this product");
      return;
    }
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
    if (isLocked) {
      toast.error("Subscribe to unlock this product");
      return;
    }
    if (inCart) {
      toast("Already added in cart");
      return;
    }
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleLockedClick = (e) => {
    e.preventDefault();
    navigate("/subscription"); // route to your subscription/plans page
  };

  return (
    <div className="group relative text-[#5a1b1be0]">
      {/* Wishlist button (disabled/hidden purpose when locked) */}
      <button
        onClick={handleWishlistClick}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
      >
        {inWishlist ? (
          <FaHeart className="w-4 h-4 text-red-500" />
        ) : (
          <FaRegHeart className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Premium badge */}
      {product.isPremium && (
        <span className="absolute top-2 left-2 z-20 bg-[#141311] text-white text-[10px] uppercase tracking-wide px-2 py-1 rounded-full">
          Premium
        </span>
      )}

      <Link
        to={isLocked ? "#" : `/product/${product.id}`}
        onClick={isLocked ? handleLockedClick : undefined}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-md mb-3">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isLocked ? "blur-md scale-105" : "group-hover:scale-105"
            }`}
          />

          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <FaLock className="w-4 h-4 text-[#141311]" />
              </div>
              <span className="text-white text-xs font-medium uppercase tracking-wide bg-black/50 px-3 py-1 rounded-full">
                Subscription Required
              </span>
            </div>
          )}
        </div>

        <h3
          className={`text-sm font-medium mb-1 truncate ${
            isLocked ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <p className={`text-sm ${isLocked ? "text-gray-400" : "text-gray-700"}`}>
            {isLocked ? "Locked" : `₹${product.price.toLocaleString("en-IN")}`}
          </p>

          {product.rating && !isLocked && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaStar className="w-3 h-3 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={isLocked ? handleLockedClick : handleAddToCart}
        className={`w-full flex items-center justify-center gap-2 py-2 border text-xs uppercase tracking-wide transition-colors ${
          isLocked
            ? "border-[#141311] text-[#141311] hover:bg-[#141311] hover:text-white"
            : inCart
            ? "border-gray-300 text-gray-400 cursor-default"
            : "border-[#141311] hover:bg-[#141311] hover:text-white"
        }`}
      >
        {isLocked ? (
          <>
            <FaLock className="w-3 h-3" />
            Unlock with Subscription
          </>
        ) : (
          <>
            <FiShoppingBag className="w-3.5 h-3.5" />
            {inCart ? "Added to cart" : "Add to cart"}
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;