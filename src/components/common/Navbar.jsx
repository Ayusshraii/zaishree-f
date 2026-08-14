import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { CgProfile } from "react-icons/cg";

import {
  CiShoppingCart,
  CiHeart,
  CiSearch,
} from "react-icons/ci";

import { FiMenu, FiX } from "react-icons/fi";

import {
  GiJewelCrown,
  GiGoldBar,
  GiDiamondRing,
  GiWatch,
  GiGems,
  GiPearlNecklace,
  GiPresent,
  GiCutDiamond,
} from "react-icons/gi";

import LocationDetector from "./Location";

const categories = [
  {
    label: "All Jewellery",
    icon: GiJewelCrown,
    to: "/Products",
  },
  {
    label: "Gold",
    icon: GiGoldBar,
    to: "/Products?category=gold",
  },
  {
    label: "Diamond",
    icon: GiDiamondRing,
    to: "/Products?category=diamond",
  },
  {
    label: "Daily Wear",
    icon: GiWatch,
    to: "/Products?category=daily-wear",
  },
  {
    label: "Gemstone",
    icon: GiGems,
    to: "/Products?category=gemstone",
  },
  {
    label: "Wedding",
    icon: GiPearlNecklace,
    to: "/Products?category=wedding",
  },
  {
    label: "Precious",
    icon: GiCutDiamond,
    to: "/Products?category=precious",
  },
  {
    label: "Gifting",
    icon: GiPresent,
    to: "/Products?category=gifting",
  },
  {
    label: "Subscription",
    icon: GiJewelCrown,
    to: "/subscription",
  },
];

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();

  // ==========================================================
  // SEARCH
  // ==========================================================

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ==========================================================
  // MOBILE
  // ==========================================================

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = async (e) => {
    const value = e.target.value;

    setKeyword(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/products/suggestions?keyword=${encodeURIComponent(value)}`
      );

      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  };

  const submitSearch = () => {
    if (!keyword.trim()) return;

    navigate(`/Products?search=${encodeURIComponent(keyword)}`);

    setSuggestions([]);
    setMobileSearchOpen(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  // ==========================================================
  // BODY SCROLL
  // ==========================================================

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ==========================================================
  // JSX
  // ==========================================================

  return (
    <>
      {/* ======================================================
          HEADER
          ====================================================== */}

      <header
        className="
          w-full
          bg-[#FFFFFF]
          border-b
          border-[#E8DDD3]
        "
      >
        {/* ====================================================
            DESKTOP CONTAINER
            ==================================================== */}

        <div
          className="
            hidden
            lg:block
            w-[calc(100%-220px)]
            mx-auto
            border-[#E8DDD3]
          "
        >
          {/* ==================================================
              ROW 1
              ================================================== */}

          <div
            className="
              flex
              items-center
              min-h-[92px]
              px-6
              gap-6
              border-b
              border-[#E8DDD3]
            "
          >
            {/* =================================================
                LOGO
                ================================================= */}

            <div
              className="
                flex
                items-center
                shrink-0
                w-[180px]
              "
            >
              <Link
                to="/"
                className="
                  flex
                  items-center
                  justify-center
                "
              >
                <img
                  className="
                    h-22
                    w-auto
                    object-contain
                    max-w-[150px]
                  "
                  src="/src/assets/WhatsApp Image 2026-08-12 at 10.35.58 PM.jpeg"
                  alt="ZAISHREE"
                />
              </Link>
            </div>

            {/* =================================================
                SEARCH
                ================================================= */}

            <div
              className="
                relative
                flex-1
                min-w-0
              "
            >
              <div
                className="
                  flex
                  items-center
                  h-10
                  border
                  border-[#E8DDD3]
                  rounded-full
                  px-5
                  gap-3
                  bg-[#FFFFFF]
                  focus-within:border-[#B76E79]
                  transition-colors
                "
              >
                <input
                  className="
                    outline-none
                    text-sm
                    font-medium
                    flex-1
                    min-w-0
                    text-[#2E2E2E]
                    placeholder:text-[#2E2E2E]/40
                    placeholder:font-normal
                    bg-transparent
                  "
                  type="text"
                  value={keyword}
                  onChange={handleSearch}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search for gold necklace"
                />

                <button
                  type="button"
                  onClick={submitSearch}
                  className="
                    text-[#B76E79]
                    hover:text-[#A85F6B]
                    shrink-0
                    transition-colors
                  "
                  aria-label="Search"
                >
                  <CiSearch className="text-xl" />
                </button>
              </div>

              {/* =================================================
                  SEARCH SUGGESTIONS
                  ================================================= */}

              {suggestions.length > 0 && (
                <div
                  className="
                    absolute
                    top-14
                    left-0
                    w-full
                    bg-[#FFFFFF]
                    shadow-xl
                    rounded-xl
                    z-[100]
                    border
                    border-[#E8DDD3]
                    overflow-hidden
                  "
                >
                  {suggestions.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/Products?search=${encodeURIComponent(
                        item.name || item
                      )}`}
                      onClick={() => setSuggestions([])}
                      className="
                        block
                        px-4
                        py-3
                        text-sm
                        text-[#2E2E2E]
                        hover:bg-[#FAF7F4]
                        hover:text-[#B76E79]
                        transition-colors
                      "
                    >
                      {item.name || item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* =================================================
                RIGHT SIDE
                WISHLIST
                PROFILE
                CART
                ================================================= */}

            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                shrink-0
                text-[#2E2E2E]
              "
            >
              <LocationDetector />
            </div>

            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                shrink-0
              "
            >
              {/* =================================================
                  WISHLIST
                  ================================================= */}

              <Link
                to="/wishlist"
                className="
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  shrink-0
                  text-[#2E2E2E]
                  hover:text-[#B76E79]
                  hover:bg-[#FAF7F4]
                  rounded-full
                  hover:scale-105
                  transition-all
                "
                aria-label="Wishlist"
              >
                <CiHeart className="text-2xl" />
              </Link>

              {/* =================================================
                  PROFILE
                  ================================================= */}

              <Link
                to="/profile"
                className="
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  shrink-0
                  text-[#2E2E2E]
                  hover:text-[#B76E79]
                  hover:bg-[#FAF7F4]
                  rounded-full
                  hover:scale-105
                  transition-all
                "
                aria-label="Profile"
              >
                <CgProfile className="text-2xl" />
              </Link>

              {/* =================================================
                  CART
                  ================================================= */}

              <Link
                to="/cart"
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  shrink-0
                  text-[#2E2E2E]
                  hover:text-[#B76E79]
                  hover:bg-[#FAF7F4]
                  rounded-full
                  hover:scale-105
                  transition-all
                "
                aria-label="Cart"
              >
                <CiShoppingCart className="text-2xl" />

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      bg-[#B76E79]
                      hover:bg-[#A85F6B]
                      text-[#FFFFFF]
                      text-[10px]
                      font-semibold
                      rounded-full
                      w-4
                      h-4
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* ==================================================
              ROW 2 — CATEGORIES
              ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-x-6
              px-7
              py-4
              min-h-[66px]
              overflow-hidden
              border-b
              border-[#E8DDD3]
            "
          >
            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <Link
                  key={cat.label}
                  to={cat.to}
                  className="
                    flex
                    items-center
                    gap-2
                    text-[#2E2E2E]
                    shrink-0
                    whitespace-nowrap
                    hover:text-[#B76E79]
                    transition-colors
                  "
                >
                  <Icon className="text-lg shrink-0" />

                  <span className="text-sm font-medium">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            MOBILE / TABLET HEADER
            ==================================================== */}

        <div
          className="
            lg:hidden
            w-full
          "
        >
          {/* ==================================================
              MOBILE TOP ROW
              ================================================== */}

          <div
            className="
              flex
              items-center
              gap-2
              pt-4
              px-4
              sm:px-6
              py-3
              border-b
              border-[#E8DDD3]
            "
          >
            {/* =================================================
                MENU
                ================================================= */}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="
                flex
                items-center
                justify-center
                w-9
                h-9
                shrink-0
                text-[#2E2E2E]
                hover:text-[#B76E79]
                transition-colors
              "
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl" />
            </button>

            {/* =================================================
                LOGO
                ================================================= */}

            <Link
              to="/"
              className="
                flex
                items-center
                shrink-0
              "
            >
              <img
                className="
                  h-9
                  w-auto
                  max-w-[130px]
                  object-contain
                "
                src="/src/assets/WhatsApp Image 2026-08-12 at 10.35.58 PM.jpeg"
                alt="ZAISHREE"
              />
            </Link>

            {/* =================================================
                SEARCH
                ================================================= */}

            <button
              onClick={() =>
                setMobileSearchOpen((s) => !s)
              }
              className="
                ml-auto
                flex
                items-center
                justify-center
                w-9
                h-9
                text-[#2E2E2E]
                hover:text-[#B76E79]
                transition-colors
              "
              aria-label="Search"
            >
              <CiSearch className="text-2xl" />
            </button>

            {/* =================================================
                CART
                ================================================= */}

        
          </div>

          {/* ==================================================
              MOBILE SEARCH
              ================================================== */}

          {mobileSearchOpen && (
            <div
              className="
                px-4
                sm:px-6
                pb-3
                pt-2
                border-b
                border-[#E8DDD3]
                relative
                bg-[#FFFFFF]
              "
            >
              <div
                className="
                  flex
                  items-center
                  h-10
                  border
                  border-[#E8DDD3]
                  rounded-full
                  px-3
                  gap-2
                  focus-within:border-[#B76E79]
                  transition-colors
                "
              >
                <input
                  autoFocus
                  type="text"
                  value={keyword}
                  onChange={handleSearch}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search for gold necklace"
                  className="
                    outline-none
                    flex-1
                    text-sm
                    text-[#2E2E2E]
                    placeholder:text-[#2E2E2E]/40
                    bg-transparent
                  "
                />

                <button
                  type="button"
                  onClick={submitSearch}
                  className="
                    text-[#B76E79]
                    hover:text-[#A85F6B]
                    shrink-0
                    transition-colors
                  "
                  aria-label="Search"
                >
                  <CiSearch className="text-lg" />
                </button>
              </div>

              {/* MOBILE SUGGESTIONS */}

              {suggestions.length > 0 && (
                <div
                  className="
                    absolute
                    top-14
                    left-4
                    right-4
                    bg-[#FFFFFF]
                    shadow-xl
                    rounded-xl
                    z-[100]
                    border
                    border-[#E8DDD3]
                    overflow-hidden
                  "
                >
                  {suggestions.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/Products?search=${encodeURIComponent(
                        item.name || item
                      )}`}
                      onClick={() => setSuggestions([])}
                      className="
                        block
                        px-4
                        py-3
                        text-sm
                        text-[#2E2E2E]
                        hover:bg-[#FAF7F4]
                        hover:text-[#B76E79]
                        transition-colors
                      "
                    >
                      {item.name || item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ========================================================
          MOBILE SIDE MENU
          ======================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[200]
          lg:hidden
          transition-opacity
          duration-300
          ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        {/* =================================================
            OVERLAY
            ================================================= */}

        <div
          onClick={() => setMobileMenuOpen(false)}
          className="
            absolute
            inset-0
            bg-[#2E2E2E]/40
          "
        />

        {/* =================================================
            MENU
            ================================================= */}

        <div
          className={`
            absolute
            top-0
            left-0
            h-full
            w-72
            sm:w-80
            max-w-[85vw]
            bg-[#FFFFFF]
            shadow-xl
            p-6
            flex
            flex-col
            overflow-y-auto
            transition-transform
            duration-300
            ${
              mobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          {/* =================================================
              MENU HEADER
              ================================================= */}

          <div
            className="
              flex
              justify-between
              items-center
              pb-4
              border-b-2
              border-[#E8DDD3]
              mb-8
            "
          >
            <img
              className="
                h-8
                w-auto
                max-w-[140px]
              "
              src="/src/assets/WhatsApp Image 2026-08-12 at 10.35.58 PM.jpeg"
              alt="ZAISHREE"
            />

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="
                text-[#2E2E2E]
                hover:text-[#B76E79]
                transition-colors
              "
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* =================================================
              CATEGORIES
              ================================================= */}

          <div
            className="
              flex
              flex-col
              space-y-4
              font-medium
              text-base
              text-[#2E2E2E]
              mb-8
            "
          >
            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <Link
                  key={cat.label}
                  to={cat.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    hover:text-[#B76E79]
                    transition-colors
                  "
                >
                  <Icon
                    className="
                      text-lg
                      shrink-0
                    "
                  />

                  <span className="truncate">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* =================================================
              EXTRA LINKS
              ================================================= */}

        </div>
      </div>
    </>
  );
};

export default Navbar;