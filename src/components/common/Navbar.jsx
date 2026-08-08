import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { CiShoppingCart, CiHeart, CiSearch, CiLocationOn } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";

// Temporary local mapping — replace with real data or backend lookup later
const PINCODE_CITY_MAP = {
  "400001": "Mumbai",
  "110001": "Delhi",
  "560001": "Bengaluru",
  "600001": "Chennai",
  "700001": "Kolkata",
  "500001": "Hyderabad",
  "411001": "Pune",
  "380001": "Ahmedabad",
  "302001": "Jaipur",
  "226001": "Lucknow",
};

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [showLocationBox, setShowLocationBox] = useState(false);
  const [locationError, setLocationError] = useState("");
  const locationRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/products/suggestions?keyword=${value}`
      );
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    setPincode(value);
    setLocationError("");

    if (value.length === 6) {
      const cityName = PINCODE_CITY_MAP[value];

      if (cityName) {
        setCity(cityName);
        localStorage.setItem("userPincode", value);
        localStorage.setItem("userCity", cityName);
        setShowLocationBox(false);
      } else {
        setCity("");
        setLocationError("Pincode not found");
      }
    } else {
      setCity("");
    }
  };

  // Load saved location on mount
  useEffect(() => {
    const savedCity = localStorage.getItem("userCity");
    const savedPincode = localStorage.getItem("userPincode");
    if (savedCity) setCity(savedCity);
    if (savedPincode) setPincode(savedPincode);
  }, []);

  // Close location dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Shop All", to: "/Products" },
    { label: "Collections", to: "/Products" },
    { label: "Subscription", to: "/subscription" },
  ];

  return (
    <>
      <div className="flex justify-between items-center text-[#5a1b1be0] m-2 relative">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-1"
          aria-label="Open menu"
        >
          <FiMenu className="text-2xl" />
        </button>

        {/* Logo */}
        <div>
          <Link to="/">
            <img
              className="h-11 md:h-14 w-auto mx-auto"
              src="https://www.zaishree.com/wp-content/uploads/elementor/thumbs/IMG_1966-rpwnjj8b2n46pvnz6u1lot8cwx1a8ouvq1b6gfjlo8.png"
              alt="LOGO"
            />
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-4 text-xl font-serif">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              className="transform hover:scale-110 transition duration-300"
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side icons */}
        <div className="flex justify-center items-center space-x-2 md:space-x-3">
          {/* Location Tab — desktop only */}
          <div className="relative hidden md:block" ref={locationRef}>
            <button
              onClick={() => setShowLocationBox(!showLocationBox)}
              className="flex items-center gap-1 text-sm border-2 p-2.5 rounded-2xl hover:scale-105 transition"
            >
              <CiLocationOn className="text-xl" />
              <span className="max-w-[100px] truncate">
                {city ? city : "Select Location"}
              </span>
            </button>

            {showLocationBox && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-xl p-3 w-64 z-50 border">
                <p className="text-sm font-semibold mb-2">Enter Pincode</p>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={handlePincodeChange}
                  placeholder="e.g. 400001"
                  className="border rounded-lg px-2 py-1 w-full outline-none text-sm"
                />
                {locationError && (
                  <p className="text-red-500 text-xs mt-1">{locationError}</p>
                )}
                {city && (
                  <p className="text-green-600 text-xs mt-2">
                    Delivering to: <b>{city}</b>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Search — desktop: full bar, mobile: icon that expands */}
          <div className="hidden md:block relative">
            <div className="flex justify-center items-center border-2 rounded-2xl p-2">
              <input
                className="outline-none"
                type="text"
                value={keyword}
                onChange={handleSearch}
                placeholder="Search jewellery..."
              />
              <button>
                <CiSearch className="relative text-xl" />
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-xl w-full z-50 border">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name || item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileSearchOpen((s) => !s)}
            className="md:hidden p-1"
            aria-label="Toggle search"
          >
            <CiSearch className="text-2xl" />
          </button>

          <Link to="/profile" className="hidden md:block">
            <CgProfile className="text-xl transform hover:scale-110 transition duration-300" />
          </Link>

          <Link to="/cart" className="hidden md:block">
            <CiShoppingCart className="text-xl transform hover:scale-110 transition duration-300" />
          </Link>

          <Link to="/wishlist" className="hidden md:block">
            <CiHeart className="text-xl transform hover:scale-110 transition duration-300" />
          </Link>
        </div>
      </div>

      {/* Mobile search bar — expands below navbar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-3 pb-3 relative">
          <div className="flex items-center border-2 rounded-2xl p-2">
            <input
              autoFocus
              className="outline-none flex-1"
              type="text"
              value={keyword}
              onChange={handleSearch}
              placeholder="Search jewellery..."
            />
            <CiSearch className="text-xl shrink-0" />
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-14 left-3 right-3 bg-white shadow-lg rounded-xl z-50 border">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {item.name || item}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/40"
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow-xl p-6 flex flex-col transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <img
              className="h-10 w-auto"
              src="https://www.zaishree.com/wp-content/uploads/elementor/thumbs/IMG_1966-rpwnjj8b2n46pvnz6u1lot8cwx1a8ouvq1b6gfjlo8.png"
              alt="LOGO"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX className="text-2xl text-[#5a1b1be0]" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col space-y-4 font-serif text-lg text-[#5a1b1be0] mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 flex flex-col space-y-5">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <CgProfile className="text-xl" />
              Profile
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <CiShoppingCart className="text-xl" />
              Cart
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <CiHeart className="text-xl" />
              Wishlist
            </Link>

            {/* Location — inline in drawer */}
            <div className="relative" ref={locationRef}>
              <button
                onClick={() => setShowLocationBox(!showLocationBox)}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <CiLocationOn className="text-xl" />
                {city ? city : "Select Location"}
              </button>

              {showLocationBox && (
                <div className="mt-3 bg-gray-50 rounded-xl p-3 border">
                  <p className="text-sm font-semibold mb-2">Enter Pincode</p>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={handlePincodeChange}
                    placeholder="e.g. 400001"
                    className="border rounded-lg px-2 py-1 w-full outline-none text-sm bg-white"
                  />
                  {locationError && (
                    <p className="text-red-500 text-xs mt-1">
                      {locationError}
                    </p>
                  )}
                  {city && (
                    <p className="text-green-600 text-xs mt-2">
                      Delivering to: <b>{city}</b>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;