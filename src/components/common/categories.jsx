import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ShopByCategory = () => {
  const [selected, setSelected] = useState("gold");

  // Dummy Categories
  const categories = [
    // Gold
    {
      id: 1,
      name: "Rings",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    },
    {
      id: 2,
      name: "Necklaces",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
    },
    {
      id: 3,
      name: "Bracelets",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    },
    {
      id: 4,
      name: "Earrings",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    },
      {
      id: 5,
      name: "Earrings",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    },

    // Silver
    {
      id: 5,
      name: "Rings",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    },
    {
      id: 6,
      name: "Necklaces",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    },
    {
      id: 7,
      name: "Bracelets",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
    },
    {
      id: 8,
      name: "Earrings",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    },
  ];

  const filteredCategories = categories.filter(
    (category) => category.metal === selected
  );

  return (
    <section className="bg-[#F7F3EA] py-16">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-serif text-center mb-10">
          Shop By Category
        </h2>

        {/* Switch */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex bg-[#dbd8d0] rounded-full p-1 w-64">
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-black transition-transform duration-300 ${
                selected === "silver"
                  ? "translate-x-full"
                  : "translate-x-0"
              }`}
            />

            <button
              onClick={() => setSelected("gold")}
              className={`relative z-10 flex-1 py-2 font-medium ${
                selected === "gold"
                  ? "text-yellow-400"
                  : "text-gray-700"
              }`}
            >
              Gold
            </button>

            <button
              onClick={() => setSelected("silver")}
              className={`relative z-10 flex-1 py-2 font-medium ${
                selected === "silver"
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              Silver
            </button>
          </div>
        </div>

        {/* Categories */}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
             to={`/category/${category.metal}-${category.name.toLowerCase()}`}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-64 w-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;