import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import {
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiTruck,
} from "react-icons/fi";
import { useCart } from "../context/Cartcontext";

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // 3% GST — change according to your requirement
  const estimatedTax = cartTotal * 0.03;

  const discount = promoApplied ? cartTotal * 0.1 : 0;

  const grandTotal = cartTotal + estimatedTax - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "ZAISHREE10") {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Replace this with your actual order API
    setTimeout(() => {
      setLoading(false);

      navigate("/order-success");
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <div className="border-b border-[#E8DDD3] bg-white">
          <Navbar />
        </div>

        <div className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F4] flex items-center justify-center mx-auto mb-5">
              <FiCreditCard className="w-7 h-7 text-[#B76E79]" />
            </div>

            <h1 className="font-serif text-3xl text-[#2E2E2E] mb-2">
              Your bag is empty
            </h1>

            <p className="text-sm text-gray-500 mb-6">
              Add some beautiful pieces to your bag before proceeding to
              checkout.
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center px-7 py-3 bg-[#B76E79] text-white text-xs uppercase tracking-widest rounded-md hover:bg-[#A85F6B] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="border-b border-[#E8DDD3] bg-white">
        <Navbar />
      </div>

      {/* ================= CHECKOUT ================= */}
      <div className="min-h-screen bg-white">

        {/* ================= TOP BAR ================= */}
        <div className="border-b border-[#E8DDD3] bg-[#FAF7F4]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
            <div className="flex items-center justify-between">

              <Link
                to="/cart"
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-[#B76E79] transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to Bag
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiLock className="w-3.5 h-3.5" />
                Secure Checkout
              </div>

            </div>
          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 lg:py-12">

          {/* Heading */}
          <div className="mb-8">
            <p className="text-[#B76E79] text-[10px] uppercase tracking-[0.3em] mb-2">
              Zaishree
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#2E2E2E]">
              Checkout
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Complete your details to place your order.
            </p>
          </div>

          <form onSubmit={handlePlaceOrder}>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-8 lg:gap-12">

              {/* =====================================================
                  LEFT SIDE
              ====================================================== */}
              <div className="space-y-6">

                {/* ================= CONTACT ================= */}
                <section className="border border-[#E8DDD3] rounded-md p-5 sm:p-7">

                  <div className="flex items-start gap-3 mb-6">

                    <div className="w-9 h-9 rounded-full bg-[#FAF7F4] flex items-center justify-center shrink-0">
                      <span className="text-sm font-serif text-[#B76E79]">
                        01
                      </span>
                    </div>

                    <div>
                      <h2 className="font-serif text-xl text-[#2E2E2E]">
                        Contact Information
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        We'll use these details for order updates.
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className="checkout-label">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className="checkout-input"
                      />
                    </div>

                    <div>
                      <label className="checkout-label">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="checkout-input"
                      />
                    </div>

                    <div>
                      <label className="checkout-label">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="checkout-input"
                      />
                    </div>

                    <div>
                      <label className="checkout-label">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="checkout-input"
                      />
                    </div>

                  </div>
                </section>

                {/* ================= SHIPPING ================= */}
                <section className="border border-[#E8DDD3] rounded-md p-5 sm:p-7">

                  <div className="flex items-start gap-3 mb-6">

                    <div className="w-9 h-9 rounded-full bg-[#FAF7F4] flex items-center justify-center shrink-0">
                      <FiMapPin className="w-4 h-4 text-[#B76E79]" />
                    </div>

                    <div>
                      <h2 className="font-serif text-xl text-[#2E2E2E]">
                        Shipping Address
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Where should we deliver your jewellery?
                      </p>
                    </div>

                  </div>

                  <div className="space-y-5">

                    <div>
                      <label className="checkout-label">
                        Street Address
                      </label>

                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House number and street name"
                        className="checkout-input"
                      />
                    </div>

                    <div>
                      <label className="checkout-label">
                        Apartment, Suite, etc.
                        <span className="font-normal text-gray-400">
                          {" "}
                          (Optional)
                        </span>
                      </label>

                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        placeholder="Apartment, floor, landmark"
                        className="checkout-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                      <div>
                        <label className="checkout-label">
                          City
                        </label>

                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Mumbai"
                          className="checkout-input"
                        />
                      </div>

                      <div>
                        <label className="checkout-label">
                          State
                        </label>

                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Maharashtra"
                          className="checkout-input"
                        />
                      </div>

                      <div>
                        <label className="checkout-label">
                          PIN Code
                        </label>

                        <input
                          type="text"
                          name="pincode"
                          required
                          maxLength={6}
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="400001"
                          className="checkout-input"
                        />
                      </div>

                    </div>

                  </div>
                </section>

                {/* ================= SHIPPING METHOD ================= */}
                <section className="border border-[#E8DDD3] rounded-md p-5 sm:p-7">

                  <div className="flex items-start gap-3 mb-6">

                    <div className="w-9 h-9 rounded-full bg-[#FAF7F4] flex items-center justify-center shrink-0">
                      <FiTruck className="w-4 h-4 text-[#B76E79]" />
                    </div>

                    <div>
                      <h2 className="font-serif text-xl text-[#2E2E2E]">
                        Delivery
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Your order will be carefully packaged and insured.
                      </p>
                    </div>

                  </div>

                  <div className="border border-[#B76E79] bg-[#FAF7F4] rounded-md p-4">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="w-5 h-5 rounded-full border border-[#B76E79] flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#B76E79]" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#2E2E2E]">
                            Insured Standard Delivery
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            5–7 business days
                          </p>
                        </div>

                      </div>

                      <p className="text-sm font-semibold text-[#B76E79]">
                        FREE
                      </p>

                    </div>

                  </div>
                </section>

                {/* ================= PAYMENT ================= */}
                <section className="border border-[#E8DDD3] rounded-md p-5 sm:p-7">

                  <div className="flex items-start gap-3 mb-6">

                    <div className="w-9 h-9 rounded-full bg-[#FAF7F4] flex items-center justify-center shrink-0">
                      <FiCreditCard className="w-4 h-4 text-[#B76E79]" />
                    </div>

                    <div>
                      <h2 className="font-serif text-xl text-[#2E2E2E]">
                        Payment
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        Choose your preferred payment method.
                      </p>
                    </div>

                  </div>

                  <div className="space-y-3">

                    {/* CARD */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`w-full text-left border rounded-md p-4 transition-colors ${
                        paymentMethod === "card"
                          ? "border-[#B76E79] bg-[#FAF7F4]"
                          : "border-[#E8DDD3] hover:border-[#D8A7AF]"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              paymentMethod === "card"
                                ? "border-[#B76E79]"
                                : "border-gray-300"
                            }`}
                          >
                            {paymentMethod === "card" && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#B76E79]" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-[#2E2E2E]">
                              Credit / Debit Card
                            </p>

                            <p className="text-xs text-gray-500 mt-0.5">
                              Visa, Mastercard, RuPay
                            </p>
                          </div>

                        </div>

                        <FiCreditCard className="w-5 h-5 text-gray-400" />

                      </div>

                    </button>

                    {/* UPI */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`w-full text-left border rounded-md p-4 transition-colors ${
                        paymentMethod === "upi"
                          ? "border-[#B76E79] bg-[#FAF7F4]"
                          : "border-[#E8DDD3] hover:border-[#D8A7AF]"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            paymentMethod === "upi"
                              ? "border-[#B76E79]"
                              : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === "upi" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#B76E79]" />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#2E2E2E]">
                            UPI
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            Google Pay, PhonePe, Paytm & more
                          </p>
                        </div>

                      </div>

                    </button>

                    {/* COD */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`w-full text-left border rounded-md p-4 transition-colors ${
                        paymentMethod === "cod"
                          ? "border-[#B76E79] bg-[#FAF7F4]"
                          : "border-[#E8DDD3] hover:border-[#D8A7AF]"
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            paymentMethod === "cod"
                              ? "border-[#B76E79]"
                              : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === "cod" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#B76E79]" />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-[#2E2E2E]">
                            Cash on Delivery
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            Pay when your order arrives
                          </p>
                        </div>

                      </div>

                    </button>

                  </div>

                  {/* Card placeholder */}
                  {paymentMethod === "card" && (
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <div className="sm:col-span-2">
                        <label className="checkout-label">
                          Card Number
                        </label>

                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="checkout-input"
                        />
                      </div>

                      <div>
                        <label className="checkout-label">
                          Expiry Date
                        </label>

                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="checkout-input"
                        />
                      </div>

                      <div>
                        <label className="checkout-label">
                          CVV
                        </label>

                        <input
                          type="password"
                          placeholder="•••"
                          className="checkout-input"
                        />
                      </div>

                    </div>
                  )}

                </section>

              </div>

              {/* =====================================================
                  RIGHT ORDER SUMMARY
              ====================================================== */}
              <div className="lg:sticky lg:top-6 h-fit">

                <div className="border border-[#E8DDD3] rounded-md p-5 sm:p-6">

                  <div className="flex items-center justify-between mb-5">

                    <h2 className="font-serif text-xl text-[#2E2E2E]">
                      Your Order
                    </h2>

                    <span className="text-xs text-gray-500">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>

                  </div>

                  {/* ================= PRODUCTS ================= */}
                  <div className="space-y-4 pb-5 border-b border-[#E8DDD3]">

                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3"
                      >

                        <div className="relative w-20 h-20 shrink-0 bg-[#FAF7F4] rounded-md overflow-hidden">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B76E79] text-white text-[10px] flex items-center justify-center">
                            {item.quantity}
                          </span>

                        </div>

                        <div className="flex-1 min-w-0">

                          <h3 className="text-sm font-medium text-[#2E2E2E] truncate">
                            {item.name}
                          </h3>

                          <p className="text-[10px] uppercase tracking-wider text-[#B76E79] mt-1">
                            {item.sku || `AUR-${item.id}`}
                          </p>

                          {item.metal && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.metal}
                            </p>
                          )}

                        </div>

                        <p className="text-sm font-semibold text-[#2E2E2E] shrink-0">
                          ₹
                          {(item.price * item.quantity).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>
                    ))}

                  </div>

                  {/* ================= PROMO ================= */}
                  <div className="py-5 border-b border-[#E8DDD3]">

                    <label className="checkout-label">
                      Promo Code
                    </label>

                    <div className="flex">

                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 border border-[#E8DDD3] border-r-0 rounded-l-md px-3 py-2.5 text-sm outline-none focus:border-[#B76E79]"
                      />

                      <button
                        type="button"
                        onClick={handlePromo}
                        className="px-4 bg-[#2E2E2E] text-white text-xs uppercase tracking-wider rounded-r-md hover:bg-black transition-colors"
                      >
                        Apply
                      </button>

                    </div>

                    {promoApplied && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-[#B76E79]">
                        <FiCheck className="w-3.5 h-3.5" />
                        ZAISHREE10 applied — 10% off
                      </div>
                    )}

                    {!promoApplied && (
                      <p className="text-[10px] text-gray-400 mt-2">
                        Try ZAISHREE10 for 10% off
                      </p>
                    )}

                  </div>

                  {/* ================= PRICE BREAKUP ================= */}
                  <div className="py-5 space-y-3 text-sm">

                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>

                      <span>
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-[#B76E79]">
                        <span>Discount</span>

                        <span>
                          -₹
                          {discount.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>

                      <span className="text-[#B76E79] font-medium">
                        Free
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>GST</span>

                      <span>
                        ₹
                        {estimatedTax.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                  </div>

                  {/* ================= TOTAL ================= */}
                  <div className="border-t border-[#E8DDD3] pt-4">

                    <div className="flex justify-between items-center">

                      <span className="text-xs uppercase tracking-widest font-semibold text-[#2E2E2E]">
                        Total
                      </span>

                      <span className="font-serif text-2xl text-[#B76E79]">
                        ₹
                        {grandTotal.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>

                    </div>

                    <p className="text-[10px] text-gray-400 text-right mt-1">
                      Inclusive of applicable taxes
                    </p>

                  </div>

                  {/* ================= PLACE ORDER ================= */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-3.5 bg-[#B76E79] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-md hover:bg-[#A85F6B] disabled:opacity-60 transition-colors"
                  >
                    {loading
                      ? "Processing Order..."
                      : "Place Order"}
                  </button>

                  {/* ================= TRUST ================= */}
                  <div className="mt-5 pt-5 border-t border-[#E8DDD3] space-y-3">

                    <div className="flex items-center gap-2.5">
                      <FiLock className="w-4 h-4 text-[#B76E79]" />

                      <p className="text-[11px] text-gray-500">
                        Secure & encrypted checkout
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <FiTruck className="w-4 h-4 text-[#B76E79]" />

                      <p className="text-[11px] text-gray-500">
                        Complimentary insured shipping
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <FiCheck className="w-4 h-4 text-[#B76E79]" />

                      <p className="text-[11px] text-gray-500">
                        30-day effortless returns
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </form>
        </div>
      </div>

      {/* ================= INLINE STYLES ================= */}
      <style>{`
        .checkout-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #2E2E2E;
          margin-bottom: 6px;
        }

        .checkout-input {
          width: 100%;
          border: 1px solid #E8DDD3;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 14px;
          color: #2E2E2E;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .checkout-input::placeholder {
          color: #A9A3A0;
        }

        .checkout-input:focus {
          border-color: #B76E79;
        }
      `}</style>
    </>
  );
};

export default Checkout;