import React from "react";
import { Link, useLocation } from "react-router-dom";

const routeMap = {
  "/silver": "silver",
  "/": "gold",
  "/demifine": "demifine",
};

const OPTIONS = ["gold", "silver", "demifine"]; // matches visual order now

const Switch = () => {
  const location = useLocation();
  const selected = routeMap[location.pathname] || "silver";
  const index = OPTIONS.indexOf(selected);

  return (
    <div className="px-6 py-5 hidden md:flex justify-center">
      <div className="relative flex items-center w-[560px] h-[46px] rounded-full border border-[#B08D2C] bg-white p-[2px] overflow-hidden">
        <div
          className="absolute top-[2px] bottom-[2px] rounded-full bg-[#7A2E42] transition-all duration-300 ease-in-out"
          style={{
            width: "calc((100% - 4px) / 3)",
            left: `calc(2px + ${index} * ((100% - 4px) / 3))`,
          }}
        />

        <Link
          to="/"
          className={`relative z-10 flex items-center justify-center flex-1 h-full rounded-full text-[15px] font-medium transition-colors duration-300 ${
            selected === "gold" ? "text-white" : "text-[#333333]"
          }`}
        >
          Gold Jewellery
        </Link>

        <Link
          to="/silver"
          className={`relative z-10 flex items-center justify-center flex-1 h-full rounded-full text-[15px] font-medium transition-colors duration-300 ${
            selected === "silver" ? "text-white" : "text-[#333333]"
          }`}
        >
          Silver Jewellery
        </Link>

        <Link
          to="/demifine"
          className={`relative z-10 flex items-center justify-center flex-1 h-full rounded-full text-[15px] font-medium transition-colors duration-300 ${
            selected === "demifine" ? "text-white" : "text-[#333333]"
          }`}
        >
          Demifine Jewellery
        </Link>
      </div>
    </div>
  );
};

export default Switch;