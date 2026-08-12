import React from "react";
import { Link, useLocation } from "react-router-dom";

const routeMap = {
  "/": "silver",
  "/gold": "gold",
  "/demifine": "demifine",
};

const Switch = () => {
  const location = useLocation();
  const selected = routeMap[location.pathname] || "silver";

  return (
    <div className="px-6 py-14">
      <div className="flex justify-center mb-7 sm:mb-9">
        <div className="relative flex items-center w-[300px] sm:w-[420px] h-[38px] sm:h-[40px] rounded-full border border-[#B08D2C] bg-white p-[2px] overflow-hidden">
          <div
            className={`
              absolute top-[2px] bottom-[2px] left-[2px]
              w-[calc(33.333%-2px)] rounded-full bg-[#7A2E42]
              transition-transform duration-300 ease-in-out
              ${
                selected === "silver"
                  ? "translate-x-0"
                  : selected === "gold"
                  ? "translate-x-full"
                  : "translate-x-[200%]"
              }
            `}
          />

          <Link
            to="/"
            className={`relative z-10 flex items-center justify-center flex-1 h-full rounded-full text-sm sm:text-[15px] font-medium transition-colors duration-300 ${
              selected === "silver" ? "text-white" : "text-[#333333]"
            }`}
          >
            Silver
          </Link>

          <Link
            to="/gold"
            className={`relative z-10 flex items-center justify-center flex-1 h-full rounded-full text-sm sm:text-[15px] font-medium transition-colors duration-300 ${
              selected === "gold" ? "text-white" : "text-[#333333]"
            }`}
          >
            Gold
          </Link>

          <Link
            to="/demifine"
            className={`relative z-10 flex items-center justify-center flex-1 h-full rounded-full text-sm sm:text-[15px] font-medium transition-colors duration-300 ${
              selected === "demifine" ? "text-white" : "text-[#333333]"
            }`}
          >
            Demifine
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Switch;