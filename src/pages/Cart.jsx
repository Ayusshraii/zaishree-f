import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { LuShieldCheck, LuTruck, LuRotateCcw } from "react-icons/lu";
import { useCart } from "../context/Cartcontext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedTax = cartTotal * 0.085; // adjust rate as needed
  const grandTotal = cartTotal + estimatedTax;

  return (
    <>
      <div className="border-1 border-gray-300 ">
        <Navbar />
      </div>

      <div className="  px-6 py-10 h-screen bg-[#FBF4EC]">
        {/* Header row */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-900">
            Your Shopping Bag ({totalItems})
          </h1>
          <a
            href="/"
            className="text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
          >
            Continue Shopping
          </a>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FiShoppingBag className="w-14 h-14 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Add some pieces you love and they'll show up here.
            </p>
            <a
              href="/"
              className="px-6 py-2 bg-[#4B0F14] rounded-xl text-white text-sm uppercase tracking-wide hover:bg-[#2A2822] transition-colors"
            >
              Continue shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden bg-gray-100 rounded-md shrink-0">
                    
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-wider text-rose-700/80 font-medium mt-0.5">
                        Ref: {item.sku || `AUR-${item.id}`}
                      </p>
                      <p className="text-xs text-gray-600 mt-1.5 space-x-3">
                        <span>
                          <span className="font-semibold uppercase">Metal:</span>{" "}
                          {item.metal || "18K Yellow Gold"}
                        </span>
                        {item.size && (
                          <span>
                            <span className="font-semibold uppercase">Size:</span>{" "}
                            {item.size}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="inline-flex items-center border border-gray-300 rounded-md w-fit mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={
                          item.quantity === 1
                            ? "Remove from cart"
                            : "Decrease quantity"
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      >
                        <FiMinus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between shrink-0">
                    <p className="text-base font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] uppercase tracking-wide text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="border border-gray-200 rounded-md p-6 h-fit">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-rose-700 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Taxes</span>
                  <span>₹{estimatedTax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-semibold text-gray-900 border-t border-gray-200 mt-5 pt-4">
                <span className="text-xs uppercase tracking-widest self-center">Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              </div>

              {/* Promo code */}
              <div className="mt-6">
                <label className="text-[10px] uppercase tracking-widest text-gray-500">
                  Promo Code
                </label>
                <div className="flex mt-1.5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm outline-none"
                  />
                  <button className="px-4 bg-[#141311] text-white text-xs uppercase tracking-wide rounded-r-md hover:bg-[#2A2822] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-[#4B0F14] text-white text-xs font-medium uppercase tracking-widest rounded-md hover:bg-[#63233A] transition-colors">
                Proceed to Checkout
              </button>

              <div className="mt-6 pt-5 border-t border-gray-200 space-y-2.5 text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <LuShieldCheck className="w-4 h-4 text-gray-400" />
                  <span>Secure encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuTruck className="w-4 h-4 text-gray-400" />
                  <span>Complimentary insured shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <LuRotateCcw className="w-4 h-4 text-gray-400" />
                  <span>30-day effortless returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;