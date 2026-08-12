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

// ============================================================
// NAVBAR
// ============================================================

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
        `/api/products/suggestions?keyword=${encodeURIComponent(
          value
        )}`
      );

      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  };

  const submitSearch = () => {
    if (!keyword.trim()) return;

    navigate(
      `/Products?search=${encodeURIComponent(keyword)}`
    );

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
    document.body.style.overflow = mobileMenuOpen
      ? "hidden"
      : "";

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
          bg-white
          border-t-2
          border-[#5a1b1b]
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
            border-gray-300
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
              border-gray-200
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
                    h-11
                    w-auto
                    object-contain
                    max-w-[150px]
                  "
                  src="https://www.zaishree.com/wp-content/uploads/elementor/thumbs/IMG_1966-rpwnjj8b2n46pvnz6u1lot8cwx1a8ouvq1b6gfjlo8.png"
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
                  h-12
                  border
                  border-gray-300
                  rounded-full
                  px-5
                  gap-3
                  bg-white
                "
              >
                <input
                  className="
                    outline-none
                    text-sm
                    font-medium
                    flex-1
                    min-w-0
                    placeholder:text-gray-400
                    placeholder:font-normal
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
                    text-[#5a1b1b]
                    hover:text-[#7A2E42]
                    shrink-0
                  "
                  aria-label="Search"
                >
                  <CiSearch className="text-xl" />
                </button>
              </div>

              {/* SEARCH SUGGESTIONS */}

              {suggestions.length > 0 && (
                <div
                  className="
                    absolute
                    top-14
                    left-0
                    w-full
                    bg-white
                    shadow-xl
                    rounded-xl
                    z-[100]
                    border
                    border-gray-200
                    overflow-hidden
                  "
                >
                  {suggestions.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/Products?search=${encodeURIComponent(
                        item.name || item
                      )}`}
                      onClick={() =>
                        setSuggestions([])
                      }
                      className="
                        block
                        px-4
                        py-3
                        text-sm
                        hover:bg-gray-100
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
                =======
                ========================================== */}
  <div
              className="
                flex
                items-center
                justify-end
                gap-2
                shrink-0
                text-[#5a1b1b]
              "
            >
<LocationDetector /></div>

            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                shrink-0
              "
            >
              {/* WISHLIST */}

              <Link
                to="/wishlist"
                className="
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  shrink-0
                  text-[#5a1b1b]
                  hover:scale-105
                  transition
                "
                aria-label="Wishlist"
              >
                <CiHeart className="text-2xl" />
              </Link>

              {/* PROFILE */}

              <Link
                to="/profile"
                className="
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  shrink-0
                  text-[#5a1b1b]
                  hover:scale-105
                  transition
                "
                aria-label="Profile"
              >
                <CgProfile className="text-2xl" />
              </Link>

              {/* CART */}

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
                  text-[#5a1b1b]
                  hover:scale-105
                  transition
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
                      bg-[#7A2E42]
                      text-white
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
              border-gray-200
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
                    text-[#5a1b1b]
                    shrink-0
                    whitespace-nowrap
                    hover:opacity-70
                    transition
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
          {/* MOBILE TOP ROW */}

          <div
            className="
              flex
              items-center
              gap-2
              px-4
              sm:px-6
              py-3
              border-b
              border-gray-200
            "
          >
            {/* MENU */}

            <button
              onClick={() =>
                setMobileMenuOpen(true)
              }
              className="
                flex
                items-center
                justify-center
                w-9
                h-9
                shrink-0
                text-[#5a1b1b]
              "
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl" />
            </button>

            {/* LOGO */}

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
                src="https://www.zaishree.com/wp-content/uploads/elementor/thumbs/IMG_1966-rpwnjj8b2n46pvnz6u1lot8cwx1a8ouvq1b6gfjlo8.png"
                alt="ZAISHREE"
              />
            </Link>

            {/* SEARCH */}

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
                text-[#5a1b1b]
              "
              aria-label="Search"
            >
              <CiSearch className="text-2xl" />
            </button>

            {/* CART */}

            <Link
              to="/cart"
              className="
                relative
                flex
                items-center
                justify-center
                w-9
                h-9
                text-[#5a1b1b]
              "
              aria-label="Cart"
            >
              <CiShoppingCart className="text-2xl" />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -top-0.5
                    -right-0.5
                    bg-[#7A2E42]
                    text-white
                    text-[9px]
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

          {/* MOBILE SEARCH */}

          {mobileSearchOpen && (
            <div
              className="
                px-4
                sm:px-6
                pb-3
                pt-2
                border-b
                border-gray-200
                relative
              "
            >
              <div
                className="
                  flex
                  items-center
                  h-10
                  border
                  border-gray-300
                  rounded-full
                  px-3
                  gap-2
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
                  "
                />

                <button
                  type="button"
                  onClick={submitSearch}
                  className="
                    text-[#5a1b1b]
                    hover:text-[#7A2E42]
                    shrink-0
                  "
                  aria-label="Search"
                >
                  <CiSearch className="text-lg" />
                </button>
              </div>

              {suggestions.length > 0 && (
                <div
                  className="
                    absolute
                    top-14
                    left-4
                    right-4
                    bg-white
                    shadow-xl
                    rounded-xl
                    z-[100]
                    border
                    overflow-hidden
                  "
                >
                  {suggestions.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/Products?search=${encodeURIComponent(
                        item.name || item
                      )}`}
                      onClick={() =>
                        setSuggestions([])
                      }
                      className="
                        block
                        px-4
                        py-3
                        text-sm
                        hover:bg-gray-100
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
        {/* OVERLAY */}

        <div
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="
            absolute
            inset-0
            bg-black/40
          "
        />

        {/* MENU */}

        <div
          className={`
            absolute
            top-0
            left-0
            h-full
            w-72
            sm:w-80
            max-w-[85vw]
            bg-white
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
          {/* MENU HEADER */}

          <div
            className="
              flex
              justify-between
              items-center
              mb-8
            "
          >
            <img
              className="
                h-10
                w-auto
                max-w-[140px]
              "
              src="https://www.zaishree.com/wp-content/uploads/elementor/thumbs/IMG_1966-rpwnjj8b2n46pvnz6u1lot8cwx1a8ouvq1b6gfjlo8.png"
              alt="ZAISHREE"
            />

            <button
              onClick={() =>
                setMobileMenuOpen(false)
              }
              aria-label="Close menu"
            >
              <FiX
                className="
                  text-2xl
                  text-[#5a1b1b]
                "
              />
            </button>
          </div>

          {/* CATEGORIES */}

          <div
            className="
              flex
              flex-col
              space-y-4
              font-medium
              text-base
              text-[#5a1b1b]
              mb-8
            "
          >
            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <Link
                  key={cat.label}
                  to={cat.to}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="
                    flex
                    items-center
                    gap-3
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

          {/* EXTRA LINKS */}

          <div
            className="
              border-t
              border-gray-200
              pt-6
              flex
              flex-col
              space-y-4
            "
          >
            {/* PROFILE */}

            <Link
              to="/profile"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                text-sm
                font-medium
                text-gray-700
              "
            >
              <CgProfile className="text-xl" />
              Profile
            </Link>

            {/* WISHLIST */}

            <Link
              to="/wishlist"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                text-sm
                font-medium
                text-gray-700
              "
            >
              <CiHeart className="text-xl" />
              Wishlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;