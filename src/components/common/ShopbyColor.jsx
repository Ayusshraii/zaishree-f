import React from "react";
import { Link } from "react-router-dom";

const colors = [
  {
    name: "Gold",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rose Gold",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Silver",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "White Gold",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Black",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Diamond White",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
  },
];

const ShopByColor = () => {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 text-[#5a1b1be0]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#5a1b1be0] mb-2">
            Find Your Shade
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#5a1b1be0]">
            Shop By Color
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            Discover jewellery in shades that match your style.
          </p>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5">
          {colors.map((color) => (
            <Link
              key={color.name}
              to={`/color/${color.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                
                <img
                  src={color.image}
                  alt={color.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                {/* Name */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[#5a1b1be0] backdrop-blur-sm rounded-xl px-3 py-2 text-center">
                    <h3 className="text-sm sm:text-base font-medium text-white">
                      {color.name}
                    </h3>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByColor;