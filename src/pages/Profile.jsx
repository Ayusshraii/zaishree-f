import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { FiUser, FiPackage, FiLogOut, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

// mock order history — swap for a real API call (e.g. getOrdersByUser) later
const mockOrders = [
  {
    id: "ORD1042",
    date: "2026-07-18",
    status: "Delivered",
    total: 45999,
    items: [
      { name: "Diamond Necklace", qty: 1, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80" },
    ],
  },
  {
    id: "ORD1039",
    date: "2026-06-02",
    status: "Delivered",
    total: 24999,
    items: [
      { name: "Classic Gold Ring", qty: 1, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80" },
    ],
  },
  {
    id: "ORD1021",
    date: "2026-04-27",
    status: "Cancelled",
    total: 8999,
    items: [
      { name: "Pearl Earrings", qty: 1, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80" },
    ],
  },
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <div className="border-1 border-gray-300">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <FiUser className="w-14 h-14 text-gray-300 mb-4" />
          <h2 className="text-lg font-medium text-gray-800 mb-1">
            You're not signed in
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Log in or create an account to view your profile and order history.
          </p>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-[#4B0F14] text-white text-sm uppercase tracking-wide hover:bg-[#3A0C10] transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 border border-[#4B0F14] text-[#4B0F14] text-sm uppercase tracking-wide hover:bg-[#4B0F14] hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#F2ECE3] flex items-center justify-center text-xl font-serif text-[#4B0F14]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-serif text-2xl capitalize">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Log out
          </button>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          <Link
            to="/wishlist"
            className="flex flex-col items-center gap-2 py-6 border border-gray-200 rounded-md hover:border-[#4B0F14] transition-colors"
          >
            <FiHeart className="w-5 h-5 text-[#4B0F14]" />
            <span className="text-sm text-gray-700">Wishlist</span>
          </Link>
          <Link
            to="/cart"
            className="flex flex-col items-center gap-2 py-6 border border-gray-200 rounded-md hover:border-[#4B0F14] transition-colors"
          >
            <FiShoppingBag className="w-5 h-5 text-[#4B0F14]" />
            <span className="text-sm text-gray-700">Cart</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center gap-2 py-6 border border-gray-200 rounded-md hover:border-[#4B0F14] transition-colors"
          >
            <FiPackage className="w-5 h-5 text-[#4B0F14]" />
            <span className="text-sm text-gray-700">Shop More</span>
          </Link>
        </div>

        {/* Orders */}
        <h2 className="font-serif text-xl mb-4">My Orders</h2>

        {mockOrders.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-500">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-md p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  {order.items.map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                  ))}
                  <div className="text-sm text-gray-600">
                    {order.items.map((item) => item.name).join(", ")}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Profile;