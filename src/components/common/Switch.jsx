import React, { useState } from "react";

const Switch = () => {
  const [selected, setSelected] = useState("gold");

  return (
    <div className="bg-[#F7F3EA]  px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl text-[#141311] text-center mb-8">
          Shop by Material
        </h2>

        {/* Switch */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex bg-[#dbd8d0] rounded-full p-1 w-64">
            {/* Sliding Pill */}
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#141311] transition-transform duration-300 ease-in-out ${
                selected === "silver"
                  ? "translate-x-full"
                  : "translate-x-0"
              }`}
            />

            {/* Gold Button */}
            <button
              onClick={() => setSelected("gold")}
              className={`relative z-10 flex-1 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                selected === "gold"
                  ? "text-[#C9A66B]"
                  : "text-[#6B6858]"
              }`}
            >
              Gold
            </button>

            {/* Silver Button */}
            <button
              onClick={() => setSelected("silver")}
              className={`relative z-10 flex-1 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                selected === "silver"
                  ? "text-white"
                  : "text-[#6B6858]"
              }`}
            >
              Silver
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          {selected === "gold" ? (
            <h3 className="text-2xl font-semibold text-yellow-700">
              Gold Jewellery Collection
            </h3>
          ) : (
            <h3 className="text-2xl font-semibold text-gray-600">
              Silver Jewellery Collection
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Switch;