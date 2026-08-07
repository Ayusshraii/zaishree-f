import React from "react";
import { Link, Links } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
const [suggestions, setSuggestions] = useState([]);
const handleSearch = async (e) => {
  const value = e.target.value;

  setKeyword(value);

  if (value.length < 2) {
    setSuggestions([]);
    return;
  }

  const { data } = await axios.get(
    `/api/products/suggestions?keyword=${value}`
  );

  setSuggestions(data);
};
  return (
    <>
      <div className="flex justify-between items-center text-[#] m-4">
        <div className="">
          <Link to="/">
            <img
              className="h-12 w-auto mx-auto "
              src="https://www.zaishree.com/wp-content/uploads/elementor/thumbs/IMG_1966-rpwnjj8b2n46pvnz6u1lot8cwx1a8ouvq1b6gfjlo8.png"
              alt="LOGO"
            />
          </Link>
        </div>
        <div className="hidden md:flex space-x-3 font-serif">
          <Link className="transform hover:scale-110 transition duration-300" to="/Products">
            
              Collections
        
          </Link>
         
          <Link className="transform hover:scale-110 transition duration-300" to="/subscription">
              Subscription
          </Link>
        </div>
        <div className="flex justify-center items-center space-x-3 ">
          <div className="flex justify-center items-center ">
            <input className="outline-none"
  type="text"
  value={keyword}
  onChange={handleSearch}
  placeholder="Search jewellery..."
/>
            <button>
            <CiSearch className=" relative" /></button>
          </div>
          <Link to='/profile'> <CgProfile /></Link>
         
          <Link to='/cart'> <CiShoppingCart /></Link>
          
          <Link to='/wishlist'> <CiHeart  /></Link>
         
        </div>
      </div>
    </>
  );
};

export default Navbar;
