import React from "react";
import Navbar from "../components/common/Navbar";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/Cartcontext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="text-center text-bold text-3xl p-7 underline">
        My Cart
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-14">
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
              className="px-6 py-2 bg-[#141311] text-white text-sm uppercase tracking-wide hover:bg-[#2A2822] transition-colors"
            >
              Continue shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart items */}
            <div className="lg:col-span-2 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-5"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden bg-gray-100 rounded-md shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      ₹{item.price.toLocaleString("en-IN")} each
                    </p>

                    {/* Quantity control */}
                    <div className="inline-flex items-center border border-gray-300 rounded-full">
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
                      <span className="w-8 text-center text-sm font-medium">
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

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove from cart"
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="bg-[#F7F3EA] rounded-md p-6 h-fit">
              <h3 className="font-serif text-xl mb-4">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 border-t border-gray-300 pt-4 mb-6">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <button className="w-full py-3 bg-[#141311] text-white text-sm uppercase tracking-wide hover:bg-[#2A2822] transition-colors">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;