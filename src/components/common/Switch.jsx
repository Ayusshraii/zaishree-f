import React from "react";
import { Link, useLocation } from "react-router-dom";

const routeMap = {
  "/silver": "silver",
  "/": "gold",
  "/demifine": "demifine",
};

const OPTIONS = ["gold", "silver", "demifine"];

const Switch = () => {
  const location = useLocation();
  const selected = routeMap[location.pathname] || "silver";
  const index = OPTIONS.indexOf(selected);

  return (
    <div className="px-6 py-8  md:flex justify-center">
      <div
        className="
          relative
          flex
          items-center
          w-[560px]
          h-[46px]
          rounded-full
          border
          border-[#E8DDD3]
          bg-[#FFFFFF]
          p-[2px]
          overflow-hidden
        "
      >
        {/* Active Slider */}
        <div
          className="
            absolute
            top-[2px]
            bottom-[2px]
            rounded-full
            bg-[#B76E79]
            transition-all
            duration-300
            ease-in-out
          "
          style={{
            width: "calc((100% - 4px) / 3)",
            left: `calc(2px + ${index} * ((100% - 4px) / 3))`,
          }}
        />

        {/* Gold */}
        <Link
          to="/"
          className={`
            relative
            z-10
            flex
            items-center
            justify-center
            flex-1
            h-full
            rounded-full
            text-[15px]
            font-medium
            transition-colors
            duration-300
            ${
              selected === "gold"
                ? "text-[#FFFFFF]"
                : "text-[#2E2E2E] hover:text-[#B76E79]"
            }
          `}
        >
          Gold Jewellery
        </Link>

        {/* Silver */}
        <Link
          to="/silver"
          className={`
            relative
            z-10
            flex
            items-center
            justify-center
            flex-1
            h-full
            rounded-full
            text-[15px]
            font-medium
            transition-colors
            duration-300
            ${
              selected === "silver"
                ? "text-[#FFFFFF]"
                : "text-[#2E2E2E] hover:text-[#B76E79]"
            }
          `}
        >
          Silver Jewellery
        </Link>

        {/* Demifine */}
        <Link
          to="/demifine"
          className={`
            relative
            z-10
            flex
            items-center
            justify-center
            flex-1
            h-full
            rounded-full
            text-[15px]
            font-medium
            transition-colors
            duration-300
            ${
              selected === "demifine"
                ? "text-[#FFFFFF]"
                : "text-[#2E2E2E] hover:text-[#B76E79]"
            }
          `}
        >
          Demifine Jewellery
        </Link>
      </div>
    </div>
  );
};

export default Switch;