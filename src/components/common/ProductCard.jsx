import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaLock,
} from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useCart } from "../../context/Cartcontext";
import { useWishlist } from "../../context/WishlistContext";
import { useSubscription } from "../../context/SubscriptionContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { hasSubscription } = useSubscription();

  const navigate = useNavigate();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  // Premium products are locked without an active subscription
  const isLocked = product.isPremium && !hasSubscription;

  // ============================================================
  // WISHLIST
  // ============================================================

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

  // ============================================================
  // CART
  // ============================================================

  const handleCartClick = (e) => {
    e.preventDefault();

    if (isLocked) {
      toast.error("Subscribe to unlock this product");
      return;
    }

    if (inCart) {
      removeFromCart(product.id);
      toast("Removed from cart");
      return;
    }

    addToCart(product);
    toast.success("Added to cart");
  };

  // ============================================================
  // LOCKED PRODUCT
  // ============================================================

  const handleLockedClick = (e) => {
    e.preventDefault();
    navigate("/subscription");
  };

  return (
    <div className="group relative text-[#2E2E2E]">

      {/* ==================================================
          WISHLIST BUTTON
          ================================================== */}

      <button
        onClick={handleWishlistClick}
        aria-label={
          inWishlist
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
        className="
          absolute
          top-2
          right-2
          z-20
          w-8
          h-8
          rounded-full
          bg-[#FFFFFF]/95
          flex
          items-center
          justify-center
          shadow-sm
          hover:bg-[#FAF7F4]
          transition-colors
        "
      >
        {inWishlist ? (
          <FaHeart className="w-4 h-4 text-[#B76E79]" />
        ) : (
          <FaRegHeart className="w-4 h-4 text-[#2E2E2E]/65" />
        )}
      </button>

      {/* ==================================================
          PREMIUM BADGE
          ================================================== */}

      {product.isPremium && (
        <span
          className="
            absolute
            top-2
            left-2
            z-20
            bg-[#B76E79]
            text-[#FFFFFF]
            text-[10px]
            uppercase
            tracking-wide
            px-2
            py-1
            rounded-full
          "
        >
          Premium
        </span>
      )}

      {/* ==================================================
          PRODUCT
          ================================================== */}

      <Link
        to={isLocked ? "#" : `/product/${product.id}`}
        onClick={isLocked ? handleLockedClick : undefined}
      >
        {/* PRODUCT IMAGE */}

        <div
          className="
            relative
            aspect-square
            overflow-hidden
            bg-[#FAF7F4]
            rounded-2xl
            mb-3
          "
        >
          <img
            src={product.image}
            alt={product.name}
            className={`
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              ${
                isLocked
                  ? "blur-md scale-105"
                  : "group-hover:scale-105"
              }
            `}
          />

          {/* ==================================================
              LOCK OVERLAY
              ================================================== */}

          {isLocked && (
            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                gap-2
                bg-[#2E2E2E]/35
              "
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#FFFFFF]/95
                  flex
                  items-center
                  justify-center
                "
              >
                <FaLock className="w-4 h-4 text-[#B76E79]" />
              </div>

              <span
                className="
                  text-[#FFFFFF]
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  bg-[#2E2E2E]/60
                  px-3
                  py-1
                  rounded-full
                "
              >
                Subscription Required
              </span>
            </div>
          )}
        </div>

        {/* ==================================================
            PRODUCT NAME
            ================================================== */}

        <h3
          className="
            text-sm
            font-medium
            text-[#2E2E2E]
            mb-1
            truncate
          "
        >
          {product.name}
        </h3>

        {/* ==================================================
            PRICE + RATING
            ================================================== */}

        <div className="flex items-center justify-between mb-3">

          <p
            className={`
              text-sm
              ${
                isLocked
                  ? "text-[#2E2E2E]/40"
                  : "text-[#2E2E2E]/80"
              }
            `}
          >
            {isLocked
              ? "Locked"
              : `₹${product.price.toLocaleString("en-IN")}`}
          </p>

          {product.rating && !isLocked && (
            <div className="flex items-center gap-1 text-xs text-[#2E2E2E]/60">
              <FaStar className="w-3 h-3 text-[#D8A7AF]" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </Link>

      {/* ==================================================
          CART BUTTON
          ================================================== */}

      <button
        onClick={
          isLocked
            ? handleLockedClick
            : handleCartClick
        }
        className={`
          w-full
          flex
          items-center
          justify-center
          gap-2
          py-2
          rounded-xl
          border
          text-xs
          uppercase
          tracking-wide
          transition-all
          duration-200

          ${
            isLocked
              ? `
                border-[#B76E79]
                text-[#B76E79]
                hover:bg-[#B76E79]
                hover:text-[#FFFFFF]
              `
              : inCart
              ? `
                border-[#E8DDD3]
                text-[#2E2E2E]/60
                hover:border-[#B76E79]
                hover:text-[#B76E79]
                hover:bg-[#FAF7F4]
              `
              : `
                border-[#B76E79]
                text-[#B76E79]
                hover:bg-[#B76E79]
                hover:text-[#FFFFFF]
              `
          }
        `}
      >
        {/* LOCKED */}

        {isLocked ? (
          <>
            <FaLock className="w-3 h-3" />
            Unlock with Subscription
          </>
        ) : inCart ? (
          <>
            <RiDeleteBin6Line className="w-3.5 h-3.5" />
            Remove from cart
          </>
        ) : (
          <>
            <FiShoppingBag className="w-3.5 h-3.5" />
            Add to cart
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;