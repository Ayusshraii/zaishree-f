import React from "react";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";

import {
  FiHeart,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/Cartcontext";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const {
    addToCart,
    isInCart,
  } = useCart();

  // ============================================================
  // REMOVE FROM WISHLIST
  // ============================================================

  const handleRemove = (id) => {
    removeFromWishlist(id);
    toast("Removed from wishlist");
  };

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = (product) => {
    if (isInCart(product.id)) {
      toast("Already added in cart");
      return;
    }

    addToCart(product);
    toast.success("Added to cart");
  };

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <div className="border-b border-[#E8DDD3] bg-white">
        <Navbar />
      </div>

      {/* ======================================================
          WISHLIST PAGE
          ====================================================== */}

      <main className="min-h-screen bg-white px-4 sm:px-6 py-8 sm:py-12">

        <div className="max-w-7xl mx-auto">

          {/* ==================================================
              HEADER
              ================================================== */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8DDD3] pb-5 mb-8">

            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#B76E79] mb-1">
                Your Collection
              </p>

              <h1 className="font-serif text-2xl sm:text-3xl text-[#2E2E2E]">
                Wishlist
                <span className="text-base sm:text-lg font-sans text-gray-400 ml-2">
                  ({wishlistItems.length})
                </span>
              </h1>
            </div>

            <a
              href="/"
              className="
                self-start
                sm:self-auto
                text-xs
                uppercase
                tracking-[0.15em]
                text-[#2E2E2E]
                border-b
                border-[#B76E79]
                pb-1
                hover:text-[#B76E79]
                transition-colors
              "
            >
              Continue Shopping
            </a>
          </div>

          {/* ==================================================
              EMPTY WISHLIST
              ================================================== */}

          {wishlistItems.length === 0 ? (
            <div className="min-h-[55vh] flex flex-col items-center justify-center text-center">

              <div className="w-20 h-20 rounded-full bg-[#FAF7F4] flex items-center justify-center mb-5">
                <FiHeart className="w-8 h-8 text-[#D8A7AF]" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#2E2E2E] mb-2">
                Your wishlist is empty
              </h3>

              <p className="text-sm text-gray-500 max-w-sm mb-7">
                Save pieces you love and they'll appear here
                for you to revisit whenever you like.
              </p>

              <a
                href="/"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-7
                  py-3
                  rounded-md
                  bg-[#B76E79]
                  text-white
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  hover:bg-[#A85F6B]
                  transition-colors
                "
              >
                Continue Shopping
              </a>
            </div>
          ) : (

            /* ==================================================
                PRODUCTS
                ================================================== */

            <div className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              gap-x-4
              sm:gap-x-6
              gap-y-8
            ">

              {wishlistItems.map((product) => {

                const inCart = isInCart(product.id);

                return (
                  <article
                    key={product.id}
                    className="
                      group
                      relative
                      bg-white
                    "
                  >

                    {/* ==========================================
                        PRODUCT IMAGE
                        ========================================== */}

                    <div className="
                      relative
                      aspect-square
                      overflow-hidden
                      bg-[#FAF7F4]
                      rounded-md
                      mb-4
                    ">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />

                      {/* REMOVE HEART */}

                      <button
                        onClick={() =>
                          handleRemove(product.id)
                        }
                        aria-label="Remove from wishlist"
                        className="
                          absolute
                          top-3
                          right-3
                          z-10
                          w-9
                          h-9
                          rounded-full
                          bg-white/95
                          flex
                          items-center
                          justify-center
                          shadow-sm
                          hover:bg-[#FAF7F4]
                          transition-colors
                        "
                      >
                        <FiHeart
                          className="
                            w-4
                            h-4
                            text-[#B76E79]
                            fill-current
                          "
                        />
                      </button>

                    </div>

                    {/* ==========================================
                        PRODUCT INFORMATION
                        ========================================== */}

                    <div className="px-0.5">

                      <h3 className="
                        text-sm
                        font-medium
                        text-[#2E2E2E]
                        mb-1
                        truncate
                      ">
                        {product.name}
                      </h3>

                      {/* SKU / METAL */}

                      {(product.sku || product.metal) && (
                        <div className="mb-2">

                          {product.sku && (
                            <p className="
                              text-[10px]
                              uppercase
                              tracking-[0.12em]
                              text-[#B76E79]
                              font-medium
                            ">
                              Ref: {product.sku}
                            </p>
                          )}

                          {product.metal && (
                            <p className="
                              text-[11px]
                              text-gray-500
                              mt-0.5
                            ">
                              <span className="font-medium">
                                Metal:
                              </span>{" "}
                              {product.metal}
                            </p>
                          )}

                        </div>
                      )}

                      {/* PRICE */}

                      <p className="
                        text-sm
                        font-semibold
                        text-[#2E2E2E]
                        mb-3
                      ">
                        ₹
                        {Number(
                          product.price || 0
                        ).toLocaleString("en-IN")}
                      </p>

                      {/* ========================================
                          ACTIONS
                          ======================================== */}

                      <div className="flex gap-2">

                        {/* ADD TO CART */}

                        <button
                          onClick={() =>
                            handleAddToCart(product)
                          }
                          disabled={inCart}
                          className={`
                            flex-1
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            py-2.5
                            rounded-md
                            text-[10px]
                            sm:text-xs
                            uppercase
                            tracking-[0.08em]
                            transition-colors
                            ${
                              inCart
                                ? "border border-[#E8DDD3] bg-[#FAF7F4] text-gray-400 cursor-default"
                                : "bg-[#B76E79] text-white hover:bg-[#A85F6B]"
                            }
                          `}
                        >

                          <FiShoppingBag className="w-3.5 h-3.5" />

                          <span>
                            {inCart
                              ? "Added"
                              : "Add to Cart"}
                          </span>

                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleRemove(product.id)
                          }
                          aria-label="Remove from wishlist"
                          className="
                            w-10
                            flex
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-[#E8DDD3]
                            text-[#B76E79]
                            hover:bg-[#FAF7F4]
                            hover:border-[#D8A7AF]
                            transition-colors
                          "
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default Wishlist;