import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import {
  FiUser,
  FiPackage,
  FiLogOut,
  FiHeart,
  FiMapPin,
  FiAward,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

// mock order history — swap for a real API call (e.g. getOrdersByUser) later
const mockOrders = [
  {
    id: "AR-09923",
    date: "2026-06-12",
    status: "Delivered",
    total: 12450,
  },
  {
    id: "AR-09855",
    date: "2026-05-04",
    status: "Delivered",
    total: 3200,
  },
];

const statusStyles = {
  Delivered: "bg-gray-100 text-gray-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

const navItems = [
  { key: "overview", label: "Profile Overview", icon: FiUser },
  { key: "orders", label: "Order History", icon: FiPackage },
  { key: "wishlist", label: "Wishlist", icon: FiHeart, to: "/wishlist" },
  { key: "addresses", label: "Saved Addresses", icon: FiMapPin },
  { key: "membership", label: "Membership Status", icon: FiAward },
];

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

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
            Log in or create an account to view your profile, track orders,
            and access Zaishree Club membership benefits.
          </p>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2.5 border border-[#4B0F14] rounded-2xl text-[#4B0F14] text-sm uppercase tracking-wide hover:bg-[#4B0F14] hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-[#4B0F14] rounded-2xl text-white text-sm uppercase tracking-wide hover:bg-[#3A0C10] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const firstName = user.name?.split(" ")[0] || user.name;

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="bg-[#FBF6F0] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;

              const content = (
                <span
                  className={`flex items-center gap-2 py-2 text-sm border-b-2 transition-colors ${
                    isActive
                      ? "text-[#7A2E42] border-[#7A2E42] font-medium"
                      : "text-gray-700 border-transparent hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </span>
              );

              return item.to ? (
                <Link key={item.key} to={item.to} className="block w-fit">
                  {content}
                </Link>
              ) : (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className="block w-fit text-left"
                >
                  {content}
                </button>
              );
            })}

            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors pt-4 mt-4 border-t border-gray-200 w-full"
            >
              <FiLogOut className="w-4 h-4" />
              Log out
            </button>
          </aside>

          {/* Main content */}
          <main>
            <h1 className="font-serif text-3xl text-gray-900 mb-1">
              Welcome back, {firstName}
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Manage your luxury experience and access exclusive benefits.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* AURUM Club card */}
              <div className="bg-white border border-gray-200 rounded-md p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7E8EC] rounded-bl-full" />
                <div className="relative">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Zaishree Club
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-[#7A2E42] flex items-center justify-center">
                      <FiAward className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                    Current Tier
                  </p>
                  <p className="font-serif text-2xl text-[#7A2E42] mb-4">
                    Gold Member
                  </p>

                  <div className="space-y-2 mb-6">
                    {[
                      "Complimentary overnight shipping",
                      "Annual concierge consultation",
                      "Early access to Heritage collections",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2">
                        <span className="text-green-600 text-xs mt-0.5">✓</span>
                        <p className="text-xs text-gray-600">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab("membership")}
                    className="w-full py-2.5 border border-gray-300 rounded-md text-xs font-medium uppercase tracking-wide hover:border-gray-500 transition-colors"
                  >
                    View All Benefits
                  </button>
                </div>
              </div>

              {/* Personal Details card */}
              <div className="bg-white border border-gray-200 rounded-md p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Personal Details
                  </h3>
                  <button className="text-xs text-[#7A2E42] hover:underline">
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">
                      Full Name
                    </p>
                    <p className="text-sm text-gray-900 capitalize">
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">
                      Email Address
                    </p>
                    <p className="text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">
                      Phone Number
                    </p>
                    <p className="text-sm text-gray-900">
                      {user.phone || "Not added"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">
                      Password
                    </p>
                    <p className="text-sm text-gray-900">••••••••</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-gray-200 rounded-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-[#7A2E42] hover:underline"
                >
                  View All
                </button>
              </div>

              {mockOrders.length === 0 ? (
                <div className="text-center py-10 text-sm text-gray-500">
                  You haven't placed any orders yet.
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                      <th className="font-medium py-2 pr-4">Order Number</th>
                      <th className="font-medium py-2 pr-4">Date</th>
                      <th className="font-medium py-2 pr-4">Status</th>
                      <th className="font-medium py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 pr-4 text-gray-900 font-medium">
                          #{order.id}
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          {new Date(order.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right text-gray-900 font-semibold">
                          ₹{order.total.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;