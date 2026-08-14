import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Switch from "./Switch";

import "swiper/css";
import "swiper/css/navigation";

const routeMap = {
  "/": "silver",
  "/gold": "gold",
  "/demifine": "demifine",
};

const ShopByCategory = () => {
  const location = useLocation();
  const selected = routeMap[location.pathname] || "silver";




const categories = [
  // ==========================================================
  // GOLD
  // ==========================================================
  {
    id: "gold-1",
    name: "Rings",
    metal: "gold",
    special: true,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "gold-2",
    name: "Necklaces",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
  },
  {
    id: "gold-3",
    name: "Bracelets",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
  {
    id: "gold-4",
    name: "Earrings",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: "gold-5",
    name: "Pendants",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "gold-6",
    name: "Chains",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "gold-7",
    name: "Bangles",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "gold-8",
    name: "Bangles",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },{
    id: "gold-9",
    name: "Bangles",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },{
    id: "gold-10",
    name: "Bangles",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },{
    id: "gold-11",
    name: "Bangles",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },{
    id: "gold-12",
    name: "Bangles",
    metal: "gold",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },

  // ==========================================================
  // SILVER
  // ==========================================================
  {
    id: "silver-1",
    name: "Rings",
    metal: "silver",
    special: true,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: "silver-2",
    name: "Necklaces",
    metal: "silver",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
  },
  {
    id: "silver-3",
    name: "Bracelets",
    metal: "silver",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
  },
  {
    id: "silver-4",
    name: "Earrings",
    metal: "silver",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
  {
    id: "silver-5",
    name: "Pendants",
    metal: "silver",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: "silver-6",
    name: "Chains",
    metal: "silver",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
  },
  {
    id: "silver-7",
    name: "Anklets",
    metal: "silver",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },

  // ==========================================================
  // DEMI-FINE
  // ==========================================================
  {
    id: "demifine-1",
    name: "Stacking Rings",
    metal: "demifine",
    special: true,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "demifine-2",
    name: "Layered Necklaces",
    metal: "demifine",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
  },
  {
    id: "demifine-3",
    name: "Huggie Earrings",
    metal: "demifine",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: "demifine-4",
    name: "Charm Bracelets",
    metal: "demifine",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
  {
    id: "demifine-5",
    name: "Anklets",
    metal: "demifine",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
  },
];

  // ============================================================
  // FILTER CATEGORIES
  // ============================================================

  const filteredCategories = categories.filter(
    (category) => category.metal === selected
  );

  // ============================================================
  // JSX
  // ============================================================

  return (
    <section className="w-full bg-[#FAF7F4] py-5">
      <div className="w-full px-4 sm:px-6 lg:px-8">
         <Switch />
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={15}
          breakpoints={{
            320: {
              slidesPerView: 3,
            },

            400: {
              slidesPerView: 3,
            },

            640: {
              slidesPerView: 4,
            },

            768: {
              slidesPerView: 7,
            },

            1024: {
              slidesPerView: 10,
            },

            
          }}
          className="!pb-2 !px-1"
        >
          {filteredCategories.map((category, index) => (
          <SwiperSlide key={`${category.id}`}>
           <Link to={`/category/${category.name}`} 
                className="
                  flex
                  flex-col
                  items-center
                  group
                "
              >
                {/* ==================================================
                    IMAGE
                    ================================================== */}

                <div className="relative">


                  {/* IMAGE BOX */}

                  <div
                    className="
                      w-28
                      h-28

                      sm:w-36
                      sm:h-36

                      md:w-40
                      md:h-40

                      lg:w-44
                      lg:h-44

                      xl:w-30
                      xl:h-30

                      rounded-[28px]
                      sm:rounded-[32px]

                      overflow-hidden

                      bg-[#EFE6D8]

                      ring-1
                      ring-black/5

                      shadow-sm

                      group-hover:shadow-md
                      group-hover:ring-black/10

                      transition
                      duration-300
                    "
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-500
                        ease-out
                      "
                    />
                  </div>
                </div>

                {/* ==================================================
                    CATEGORY NAME
                    ================================================== */}

                <h3
                  className="
                    mt-3
                    text-sm
                    sm:text-base
                    font-medium
                    tracking-wide
                    text-center
                    text-[#333333]
                  "
                >
                  {category.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ShopByCategory;  