import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ShopByCategory = () => {
  const [selected, setSelected] = useState("silver");

  // ============================================================
  // CATEGORIES
  // ============================================================

  const categories = [
    // ==========================================================
    // GOLD
    // ==========================================================

    {
      id: 1,
      name: "Rings",
      metal: "gold",
      special: true,
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
      name: "Pendants",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    },

    {
      id: 6,
      name: "Chains",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    },

    {
      id: 7,
      name: "Bangles",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    },
    {
      id: 7,
      name: "Bangles",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    },
    {
      id: 7,
      name: "Bangles",
      metal: "gold",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    },

    // ==========================================================
    // SILVER
    // ==========================================================

    {
      id: 105,
      name: "Rings",
      metal: "silver",
      special: true,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    },

    {
      id: 106,
      name: "Necklaces",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    },

    {
      id: 107,
      name: "Bracelets",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
    },

    {
      id: 108,
      name: "Earrings",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    },

    {
      id: 109,
      name: "Pendants",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    },

    {
      id: 110,
      name: "Chains",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    },

    {
      id: 111,
      name: "Anklets",
      metal: "silver",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
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
    <section className="w-full py-8 sm:py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* ======================================================
            GOLD / SILVER SWITCH
            ====================================================== */}

        <div className="flex justify-center mb-7 sm:mb-9">
          <div
            className="
              relative
              flex
              items-center
              w-[300px]
              sm:w-[420px]
              h-[38px]
              sm:h-[40px]
              rounded-full
              border
              border-[#B08D2C]
              bg-white
              p-[2px]
              overflow-hidden
            "
          >
            {/* ==================================================
                SLIDING SELECTED BACKGROUND
                ================================================== */}

            <div
              className={`
                absolute
                top-[2px]
                bottom-[2px]
                left-[2px]
                w-[calc(50%-2px)]
                rounded-full
                bg-[#B84C6B]
                transition-transform
                duration-300
                ease-in-out
                ${
                  selected === "gold"
                    ? "translate-x-full"
                    : "translate-x-0"
                }
              `}
            />

            {/* ==================================================
                SILVER
                ================================================== */}

            <button
              type="button"
              onClick={() => setSelected("silver")}
              className={`
                relative
                z-10
                flex
                items-center
                justify-center
                flex-1
                h-full
                rounded-full
                text-sm
                sm:text-[15px]
                font-medium
                transition-colors
                duration-300
                ${
                  selected === "silver"
                    ? "text-white"
                    : "text-[#333333]"
                }
              `}
            >
              Silver Jewellery
            </button>

            {/* ==================================================
                GOLD
                ================================================== */}

            <button
              type="button"
              onClick={() => setSelected("gold")}
              className={`
                relative
                z-10
                flex
                items-center
                justify-center
                flex-1
                h-full
                rounded-full
                text-sm
                sm:text-[15px]
                font-medium
                transition-colors
                duration-300
                ${
                  selected === "gold"
                    ? "text-white"
                    : "text-[#333333]"
                }
              `}
            >
              Gold Jewellery
            </button>
          </div>
        </div>

        {/* ======================================================
            CATEGORY SLIDER
            ====================================================== */}

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={10}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },

            400: {
              slidesPerView: 3,
            },

            640: {
              slidesPerView: 5,
            },

            768: {
              slidesPerView: 6,
            },

            1024: {
              slidesPerView: 8,
            },

            
          }}
          className="!pb-2 !px-1"
        >
          {filteredCategories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                to={`/category/${category.metal}-${category.name.toLowerCase()}`}
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

                  {/* SPECIAL BADGE */}

                  {category.special && (
                    <div
                      className="
                        absolute
                        z-20
                        top-0
                        left-1/2
                        -translate-x-1/2
                        px-4
                        py-1
                        rounded-b-xl
                        bg-[#9B7145]
                        text-white
                        text-xs
                        font-medium
                        shadow-sm
                      "
                    >
                      Special
                    </div>
                  )}

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