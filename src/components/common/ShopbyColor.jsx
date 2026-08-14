import React from "react";
import { Link } from "react-router-dom";

const colors = [

  {
    name: "Rose Gold",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    color: "#B76E79",
    textColor: "#FFFFFF",
  },

  {
    name: "White Gold",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    color: "#E5E4E2",
    textColor: "#2E2E2E",
  },
  {
    name: "Black",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",
    color: "#222222",
    textColor: "#FFFFFF",
  },
  {
    name: "Diamond White",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    color: "#F5F5F5",
    textColor: "#2E2E2E",
  },
];

const ShopByColor = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-10 bg-white text-[#2E2E2E]">
      <div className="max-w-8xl mx-auto">

        {/* =========================
            HEADING
        ========================== */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B76E79] mb-2 font-medium">
            Find Your Shade
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2E2E2E]">
            Shop By Color
          </h2>

          <p className="text-sm sm:text-base text-[#2E2E2E]/55 mt-3">
            Discover jewellery in shades that match your style.
          </p>
        </div>

        {/* =========================
            COLOR GRID
        ========================== */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            gap-5
            sm:gap-6
            lg:gap-8
            max-w-6xl
            mx-auto
          "
        >
          {colors.map((color) => (
            <Link
              key={color.name}
              to={`/color/${color.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="group"
            >
              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-2xl
                  bg-[#FAF7F4]
                  border
                  border-[#E8DDD3]
                  shadow-sm
                  transition-all
                  duration-500
                  group-hover:shadow-xl
                  group-hover:-translate-y-1
                "
              >
                {/* =========================
                    IMAGE
                ========================== */}
                <img
                  src={color.image}
                  alt={color.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* =========================
                    IMAGE OVERLAY
                ========================== */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    group-hover:bg-black/10
                    transition-all
                    duration-500
                  "
                />

                {/* =========================
                    COLOR BUTTON
                ========================== */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-xl
                      px-3
                      py-2.5
                      sm:py-3
                      text-center
                      border
                      border-white/30
                      bg-black/45
                      backdrop-blur-md
                      transition-all
                      duration-500
                      group-hover:scale-105
                      group-hover:shadow-lg
                    "
                  >
                    {/* Hover color background */}
                    <div
                      className="
                        absolute
                        inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-500
                      "
                      style={{
                        backgroundColor: color.color,
                      }}
                    />

                    {/* Text */}
                    <h3
                      className="
                        relative
                        z-10
                        text-xs
                        sm:text-sm
                        lg:text-base
                        font-medium
                        text-white
                        transition-colors
                        duration-500
                      "
                      style={{
                        color: color.textColor,
                      }}
                    >
                      {color.name}
                    </h3>
                  </div>
                </div>

                {/* =========================
                    COLOR DOT
                ========================== */}
                <div
                  className="
                    absolute
                    top-4
                    right-4
                    w-7
                    h-7
                    sm:w-8
                    sm:h-8
                    rounded-full
                    border-2
                    border-white
                    shadow-lg
                    opacity-0
                    group-hover:opacity-100
                    scale-75
                    group-hover:scale-100
                    transition-all
                    duration-500
                  "
                  style={{
                    backgroundColor: color.color,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByColor;