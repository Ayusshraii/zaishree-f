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

// ============================================================
// MOCK ORDER HISTORY
// ============================================================

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

// ============================================================
// STATUS STYLES
// ============================================================

const statusStyles = {
  Delivered: "bg-[#FAF7F4] text-[#2E2E2E]",
  Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

// ============================================================
// NAV ITEMS
// ============================================================

const navItems = [
  {
    key: "overview",
    label: "Profile Overview",
    icon: FiUser,
  },
  {
    key: "orders",
    label: "Order History",
    icon: FiPackage,
  },
  {
    key: "wishlist",
    label: "Wishlist",
    icon: FiHeart,
    to: "/wishlist",
  },
  {
    key: "addresses",
    label: "Saved Addresses",
    icon: FiMapPin,
  },
  {
    key: "membership",
    label: "Membership Status",
    icon: FiAward,
  },
];

// ============================================================
// PROFILE
// ============================================================

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [activeTab, setActiveTab] =
    useState("overview");

  // ==========================================================
  // NOT AUTHENTICATED
  // ==========================================================

  if (!isAuthenticated) {
    return (
      <>
        {/* NAVBAR */}

        <div className="border-b border-[#E8DDD3] bg-white">
          <Navbar />
        </div>

        {/* LOGIN MESSAGE */}

        <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F4] flex items-center justify-center mb-5">
            <FiUser className="w-7 h-7 text-[#B76E79]" />
          </div>

          <h2 className="font-serif text-2xl text-[#2E2E2E] mb-2">
            You're not signed in
          </h2>

          <p className="text-sm text-gray-500 mb-7 max-w-sm leading-relaxed">
            Log in or create an account to view your
            profile, track orders, and access Zaishree
            Club membership benefits.
          </p>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="
                px-6
                py-2.5
                border
                border-[#B76E79]
                rounded-full
                text-[#B76E79]
                text-sm
                uppercase
                tracking-wide
                hover:bg-[#B76E79]
                hover:text-white
                transition-colors
              "
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="
                px-6
                py-2.5
                bg-[#B76E79]
                rounded-full
                text-white
                text-sm
                uppercase
                tracking-wide
                hover:bg-[#A85F6B]
                transition-colors
              "
            >
              Sign Up
            </Link>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // ==========================================================
  // USER NAME
  // ==========================================================

  const firstName =
    user.name?.split(" ")[0] || user.name;

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <>
      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <div className="border-b border-[#E8DDD3] bg-white">
        <Navbar />
      </div>

      {/* ======================================================
          MAIN PROFILE
          ====================================================== */}

      <div className="bg-white min-h-screen">
        <div
          className="
            max-w-6xl
            mx-auto
            px-4
            sm:px-6
            py-8
            sm:py-12
            grid
            grid-cols-1
            md:grid-cols-[220px_1fr]
            gap-8
            lg:gap-10
          "
        >
          {/* ==================================================
              SIDEBAR
              ================================================== */}

          <aside className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                activeTab === item.key;

              const content = (
                <span
                  className={`
                    flex
                    items-center
                    gap-3
                    py-3
                    px-3
                    text-sm
                    rounded-md
                    transition-colors
                    ${
                      isActive
                        ? "bg-[#FAF7F4] text-[#B76E79] font-medium"
                        : "text-[#2E2E2E] hover:bg-[#FAF7F4] hover:text-[#B76E79]"
                    }
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />

                  <span>{item.label}</span>
                </span>
              );

              return item.to ? (
                <Link
                  key={item.key}
                  to={item.to}
                  className="block w-full"
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={item.key}
                  onClick={() =>
                    setActiveTab(item.key)
                  }
                  className="block w-full text-left"
                >
                  {content}
                </button>
              );
            })}

            {/* LOGOUT */}

            <button
              onClick={logout}
              className="
                flex
                items-center
                gap-3
                text-sm
                text-gray-500
                hover:text-red-500
                transition-colors
                pt-4
                mt-4
                border-t
                border-[#E8DDD3]
                w-full
                px-3
              "
            >
              <FiLogOut className="w-4 h-4" />

              <span>Log out</span>
            </button>
          </aside>

          {/* ==================================================
              MAIN CONTENT
              ================================================== */}

          <main className="min-w-0">
            {/* HEADER */}

            <div className="mb-8">
              <h1 className="font-serif text-3xl sm:text-4xl text-[#2E2E2E] mb-2">
                Welcome back, {firstName}
              </h1>

              <p className="text-sm text-gray-500">
                Manage your luxury experience and
                access exclusive benefits.
              </p>
            </div>

            {/* =================================================
                TOP CARDS
                ================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              {/* =================================================
                  ZAISHREE CLUB
                  ================================================= */}

              <div
                className="
                  bg-[#FAF7F4]
                  border
                  border-[#E8DDD3]
                  rounded-2xl
                  p-5
                  sm:p-6
                  relative
                  overflow-hidden
                "
              >
                {/* DECORATIVE CIRCLE */}

                <div
                  className="
                    absolute
                    top-0
                    right-0
                    w-32
                    h-32
                    bg-[#D8A7AF]/30
                    rounded-bl-full
                  "
                />

                <div className="relative">
                  {/* CARD HEADER */}

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                        Membership
                      </p>

                      <h3 className="text-sm font-semibold text-[#2E2E2E]">
                        Zaishree Club
                      </h3>
                    </div>

                    <div
                      className="
                        w-9
                        h-9
                        rounded-full
                        bg-[#B76E79]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FiAward className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* TIER */}

                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                    Current Tier
                  </p>

                  <p className="font-serif text-2xl text-[#B76E79] mb-5">
                    Gold Member
                  </p>

                  {/* BENEFITS */}

                  <div className="space-y-2.5 mb-6">
                    {[
                      "Complimentary overnight shipping",
                      "Annual concierge consultation",
                      "Early access to Heritage collections",
                    ].map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-start gap-2"
                      >
                        <span className="text-[#B76E79] text-xs mt-0.5">
                          ✓
                        </span>

                        <p className="text-xs text-gray-600">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* BENEFITS BUTTON */}

                  <button
                    onClick={() =>
                      setActiveTab(
                        "membership"
                      )
                    }
                    className="
                      w-full
                      py-2.5
                      border
                      border-[#B76E79]
                      rounded-full
                      text-[#B76E79]
                      text-xs
                      font-medium
                      uppercase
                      tracking-wide
                      hover:bg-[#B76E79]
                      hover:text-white
                      transition-colors
                    "
                  >
                    View All Benefits
                  </button>
                </div>
              </div>

              {/* =================================================
                  PERSONAL DETAILS
                  ================================================= */}

              <div
                className="
                  bg-white
                  border
                  border-[#E8DDD3]
                  rounded-2xl
                  p-5
                  sm:p-6
                "
              >
                {/* HEADER */}

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-semibold text-[#2E2E2E]">
                    Personal Details
                  </h3>

                  <button className="text-xs text-[#B76E79] hover:text-[#A85F6B] hover:underline">
                    Edit
                  </button>
                </div>

                {/* DETAILS */}

                <div className="space-y-5">
                  {/* NAME */}

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Full Name
                    </p>

                    <p className="text-sm text-[#2E2E2E] capitalize">
                      {user.name}
                    </p>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Email Address
                    </p>

                    <p className="text-sm text-[#2E2E2E] break-all">
                      {user.email}
                    </p>
                  </div>

                  {/* PHONE */}

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Phone Number
                    </p>

                    <p className="text-sm text-[#2E2E2E]">
                      {user.phone || "Not added"}
                    </p>
                  </div>

                  {/* PASSWORD */}

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Password
                    </p>

                    <p className="text-sm text-[#2E2E2E] tracking-widest">
                      ••••••••
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RECENT ORDERS
                ================================================= */}

            <div
              className="
                bg-white
                border
                border-[#E8DDD3]
                rounded-2xl
                p-5
                sm:p-6
              "
            >
              {/* HEADER */}

              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                    Your purchases
                  </p>

                  <h3 className="text-sm font-semibold text-[#2E2E2E]">
                    Recent Orders
                  </h3>
                </div>

                <button
                  onClick={() =>
                    setActiveTab("orders")
                  }
                  className="
                    text-xs
                    text-[#B76E79]
                    hover:text-[#A85F6B]
                    hover:underline
                  "
                >
                  View All
                </button>
              </div>

              {/* EMPTY */}

              {mockOrders.length === 0 ? (
                <div className="text-center py-10 text-sm text-gray-500">
                  You haven't placed any orders yet.
                </div>
              ) : (
                <>
                  {/* DESKTOP TABLE */}

                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className="
                            text-left
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-gray-400
                            border-b
                            border-[#E8DDD3]
                          "
                        >
                          <th className="font-medium py-3 pr-4">
                            Order Number
                          </th>

                          <th className="font-medium py-3 pr-4">
                            Date
                          </th>

                          <th className="font-medium py-3 pr-4">
                            Status
                          </th>

                          <th className="font-medium py-3 text-right">
                            Total
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {mockOrders.map(
                          (order) => (
                            <tr
                              key={order.id}
                              className="
                                border-b
                                border-[#E8DDD3]/60
                                last:border-0
                              "
                            >
                              <td className="py-4 pr-4 text-[#2E2E2E] font-medium">
                                #{order.id}
                              </td>

                              <td className="py-4 pr-4 text-gray-600">
                                {new Date(
                                  order.date
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    year: "numeric",
                                    month:
                                      "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>

                              <td className="py-4 pr-4">
                                <span
                                  className={`
                                    text-xs
                                    px-2.5
                                    py-1
                                    rounded-full
                                    font-medium
                                    ${
                                      statusStyles[
                                        order
                                          .status
                                      ]
                                    }
                                  `}
                                >
                                  {
                                    order.status
                                  }
                                </span>
                              </td>

                              <td className="py-4 text-right text-[#2E2E2E] font-semibold">
                                ₹
                                {order.total.toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE ORDERS */}

                  <div className="sm:hidden space-y-3">
                    {mockOrders.map(
                      (order) => (
                        <div
                          key={order.id}
                          className="
                            border
                            border-[#E8DDD3]
                            rounded-xl
                            p-4
                          "
                        >
                          <div className="flex justify-between items-start gap-3 mb-3">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                Order
                              </p>

                              <p className="text-sm font-semibold text-[#2E2E2E]">
                                #{order.id}
                              </p>
                            </div>

                            <span
                              className={`
                                text-[10px]
                                px-2.5
                                py-1
                                rounded-full
                                font-medium
                                whitespace-nowrap
                                ${
                                  statusStyles[
                                    order.status
                                  ]
                                }
                              `}
                            >
                              {
                                order.status
                              }
                            </span>
                          </div>

                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                Date
                              </p>

                              <p className="text-xs text-gray-600">
                                {new Date(
                                  order.date
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    year: "numeric",
                                    month:
                                      "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                Total
                              </p>

                              <p className="text-sm font-semibold text-[#2E2E2E]">
                                ₹
                                {order.total.toLocaleString(
                                  "en-IN"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ======================================================
          FOOTER
          ====================================================== */}

      <Footer />
    </>
  );
};

export default Profile;