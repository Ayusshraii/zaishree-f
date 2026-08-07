import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { CiShoppingCart, CiHeart, CiSearch, CiLocationOn } from "react-icons/ci";

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

  return (
    <>
      <div className="flex justify-between items-center  text-[#5a1b1be0] m-2">
        <div className="">
          <Link to="/">
            <img
              className="h-14 w-auto mx-auto "
              src="https://www.zaishree.com/wp-content/uploads/elementor/thumbs/IMG_1966-rpwnjj8b2n46pvnz6u1lot8cwx1a8ouvq1b6gfjlo8.png"
              alt="LOGO"
            />
          </Link>
        </div>

        <div className="hidden md:flex space-x-4 text-xl font-serif">
          <Link
            className="transform hover:scale-110 transition duration-300"
            to="/Products"
          >
            Shop All
          </Link>
          <Link
            className="transform hover:scale-110 transition duration-300"
            to="/Products"
          >
            Collections
          </Link>
          <Link
            className="transform hover:scale-110 transition duration-300"
            to="/subscription"
          >
            Subscription
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-3">
          {/* Location Tab */}
          <div className="relative" ref={locationRef}>
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

          {/* Search */}
          <div className="relative flex justify-center items-center border-2 rounded-2xl p-2">
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

          <Link to="/profile">
            <CgProfile className="text-xl transform hover:scale-110 transition duration-300" />
          </Link>

          <Link to="/cart">
            <CiShoppingCart className="text-xl transform hover:scale-110 transition duration-300" />
          </Link>

          <Link to="/wishlist">
            <CiHeart className="text-xl transform hover:scale-110 transition duration-300" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;