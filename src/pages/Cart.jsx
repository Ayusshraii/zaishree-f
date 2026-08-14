import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";

import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

import { LuShieldCheck, LuTruck, LuRotateCcw } from "react-icons/lu";

import { useCart } from "../context/Cartcontext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const [promoCode, setPromoCode] = useState("");

  // ============================================================
  // TOTAL ITEMS
  // ============================================================

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ============================================================
  // TAX
  // ============================================================

  const estimatedTax = cartTotal * 0.085;

  const grandTotal = cartTotal + estimatedTax;

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
          CART PAGE
          ====================================================== */}

      <main className="min-h-screen bg-white px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* ==================================================
              HEADER
              ================================================== */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8DDD3] pb-5 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#B76E79] mb-1">
                Your Selection
              </p>

              <h1 className="font-serif text-2xl sm:text-3xl text-[#2E2E2E]">
                Shopping Bag
                <span className="text-base sm:text-lg font-sans text-gray-400 ml-2">
                  ({totalItems})
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
              EMPTY CART
              ================================================== */}

          {cartItems.length === 0 ? (
            <div className="min-h-[55vh] flex flex-col items-center justify-center text-center">
              <div
                className="
                w-20
                h-20
                rounded-full
                bg-[#FAF7F4]
                flex
                items-center
                justify-center
                mb-5
              "
              >
                <FiShoppingBag className="w-8 h-8 text-[#D8A7AF]" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#2E2E2E] mb-2">
                Your cart is empty
              </h3>

              <p className="text-sm text-gray-500 max-w-sm mb-7">
                Add some pieces you love and they'll appear here.
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
                CART CONTENT
                ================================================== */

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {/* ==================================================
                  CART ITEMS
                  ================================================== */}

              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="
                      flex
                      gap-3
                      sm:gap-5
                      p-3
                      sm:p-4
                      border
                      border-[#E8DDD3]
                      rounded-md
                      bg-white
                    "
                  >
                    {/* ==========================================
                        PRODUCT IMAGE
                        ========================================== */}

                    <div
                      className="
                      w-24
                      h-24
                      sm:w-32
                      sm:h-32
                      overflow-hidden
                      bg-[#FAF7F4]
                      rounded-md
                      shrink-0
                    "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>

                    {/* ==========================================
                        PRODUCT INFORMATION
                        ========================================== */}

                    <div
                      className="
                      flex-1
                      min-w-0
                      flex
                      flex-col
                      justify-between
                    "
                    >
                      <div>
                        <h3
                          className="
                          text-sm
                          sm:text-base
                          font-medium
                          text-[#2E2E2E]
                          truncate
                        "
                        >
                          {item.name}
                        </h3>

                        <p
                          className="
                          text-[10px]
                          sm:text-[11px]
                          uppercase
                          tracking-[0.12em]
                          text-[#B76E79]
                          font-medium
                          mt-1
                        "
                        >
                          Ref: {item.sku || `AUR-${item.id}`}
                        </p>

                        <div
                          className="
                          flex
                          flex-wrap
                          gap-x-3
                          gap-y-1
                          text-[11px]
                          sm:text-xs
                          text-gray-500
                          mt-1.5
                        "
                        >
                          <span>
                            <span className="font-medium uppercase text-[#2E2E2E]">
                              Metal:
                            </span>{" "}
                            {item.metal || "18K Yellow Gold"}
                          </span>

                          {item.size && (
                            <span>
                              <span className="font-medium uppercase text-[#2E2E2E]">
                                Size:
                              </span>{" "}
                              {item.size}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ==========================================
                          QUANTITY
                          ========================================== */}

                      <div
                        className="
                        inline-flex
                        items-center
                        border
                        border-[#E8DDD3]
                        rounded-md
                        w-fit
                        mt-3
                      "
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label={
                            item.quantity === 1
                              ? "Remove from cart"
                              : "Decrease quantity"
                          }
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            text-gray-500
                            hover:text-[#B76E79]
                            hover:bg-[#FAF7F4]
                            transition-colors
                          "
                        >
                          <FiMinus className="w-3.5 h-3.5" />
                        </button>

                        <span
                          className="
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          text-sm
                          font-medium
                          text-[#2E2E2E]
                          border-x
                          border-[#E8DDD3]
                        "
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            text-gray-500
                            hover:text-[#B76E79]
                            hover:bg-[#FAF7F4]
                            transition-colors
                          "
                        >
                          <FiPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* ==========================================
                        PRICE / REMOVE
                        ========================================== */}

                    <div
                      className="
                      flex
                      flex-col
                      items-end
                      justify-between
                      shrink-0
                    "
                    >
                      <p
                        className="
                        text-sm
                        sm:text-base
                        font-semibold
                        text-[#2E2E2E]
                        whitespace-nowrap
                      "
                      >
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="
                          text-[10px]
                          sm:text-[11px]
                          uppercase
                          tracking-[0.1em]
                          text-gray-400
                          hover:text-[#B76E79]
                          transition-colors
                        "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ==================================================
                  ORDER SUMMARY
                  ================================================== */}

              <div
                className="
                border
                border-[#E8DDD3]
                rounded-md
                p-5
                sm:p-6
                h-fit
                bg-white
              "
              >
                <h3
                  className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#2E2E2E]
                  mb-5
                "
                >
                  Order Summary
                </h3>

                {/* ================================================
                    PRICE BREAKDOWN
                    ================================================ */}

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>

                    <span className="text-[#2E2E2E]">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>

                    <span className="text-[#B76E79] font-medium">Free</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Taxes</span>

                    <span className="text-[#2E2E2E]">
                      ₹
                      {estimatedTax.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {/* ================================================
                    TOTAL
                    ================================================ */}

                <div
                  className="
                  flex
                  justify-between
                  items-center
                  text-base
                  font-semibold
                  text-[#2E2E2E]
                  border-t
                  border-[#E8DDD3]
                  mt-5
                  pt-4
                "
                >
                  <span
                    className="
                    text-xs
                    uppercase
                    tracking-[0.16em]
                  "
                  >
                    Total
                  </span>

                  <span className="text-lg">
                    ₹
                    {grandTotal.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* ================================================
                    PROMO CODE
                    ================================================ */}

                <div className="mt-6">
                  <label
                    className="
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-gray-500
                  "
                  >
                    Promo Code
                  </label>

                  <div className="flex mt-1.5">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="
                        flex-1
                        min-w-0
                        border
                        border-[#E8DDD3]
                        rounded-l-md
                        px-3
                        py-2.5
                        text-sm
                        text-[#2E2E2E]
                        outline-none
                        focus:border-[#B76E79]
                        placeholder:text-gray-400
                      "
                    />

                    <button
                      type="button"
                      className="
                        px-4
                        bg-[#FAF7F4]
                        border
                        border-l-0
                        border-[#E8DDD3]
                        text-[#B76E79]
                        text-xs
                        uppercase
                        tracking-wide
                        rounded-r-md
                        hover:bg-[#D8A7AF]
                        hover:text-[#2E2E2E]
                        transition-colors
                      "
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* ================================================
                    CHECKOUT BUTTON
                    ================================================ */}

                <Link
                  to="/checkout"
                  className="w-full mt-6 py-3 bg-[#B76E79] text-white text-xs font-medium uppercase tracking-widest rounded-md hover:bg-[#A85F6B] transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>

                {/* ================================================
                    SERVICE FEATURES
                    ================================================ */}

                <div
                  className="
                  mt-6
                  pt-5
                  border-t
                  border-[#E8DDD3]
                  space-y-3
                  text-[11px]
                  text-gray-500
                "
                >
                  <div className="flex items-center gap-2.5">
                    <LuShieldCheck
                      className="
                      w-4
                      h-4
                      text-[#B76E79]
                      shrink-0
                    "
                    />

                    <span>Secure encrypted checkout</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <LuTruck
                      className="
                      w-4
                      h-4
                      text-[#B76E79]
                      shrink-0
                    "
                    />

                    <span>Complimentary insured shipping</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <LuRotateCcw
                      className="
                      w-4
                      h-4
                      text-[#B76E79]
                      shrink-0
                    "
                    />

                    <span>30-day effortless returns</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
