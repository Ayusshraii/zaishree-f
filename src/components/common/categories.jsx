import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { LayoutGrid, ChevronUp } from "lucide-react";
import Switch from "./Switch";

import "swiper/css";
import "swiper/css/navigation";

// ============================================================
// CATEGORIES
// ============================================================

const categories = [
  {
    id: "rings",
    name: "Rings",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
  },
  {
    id: "bracelets",
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: "pendants",
    name: "Pendants",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "chains",
    name: "Chains",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
  },
  {
    id: "bangles",
    name: "Bangles",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "anklets",
    name: "Anklets",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
  {
    id: "stacking-rings",
    name: "Stacking Rings",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  },
  {
    id: "layered-necklaces",
    name: "Layered Necklaces",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
  },
  {
    id: "huggie-earrings",
    name: "Huggie Earrings",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
  },
  {
    id: "charm-bracelets",
    name: "Charm Bracelets",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
  },
];

// ============================================================
// SINGLE CATEGORY TILE (shared by mobile grid + desktop swiper)
// ============================================================

const CategoryTile = ({ category }) => (
  <Link
    to={`/category/${category.name}`}
    className="
      flex
      flex-col
      items-center
      group
      w-full
    "
  >
    {/* IMAGE BOX */}
    <div
      className="
        w-full
        aspect-square

        sm:w-36
        sm:h-36
        sm:aspect-auto

        md:w-40
        md:h-40

        lg:w-44
        lg:h-44

        xl:w-30
        xl:h-30

        rounded-[20px]
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

    {/* CATEGORY NAME */}
    <h3
      className="
        mt-2
        sm:mt-3
        text-[11px]
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
);

const ShopByCategory = () => {
  // mobile "view all" toggle
  const [showAll, setShowAll] = useState(false);

  // ============================================================
  // MOBILE VISIBILITY (2 rows of 4 when collapsed)
  // ============================================================

  const MOBILE_LIMIT = 8;
  const hasOverflow = categories.length > MOBILE_LIMIT;

  const mobileCategories =
    hasOverflow && !showAll ? categories.slice(0, MOBILE_LIMIT - 1) : categories;

  // ============================================================
  // JSX
  // ============================================================

  return (
    <section className="w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <Switch />

        {/* ==================================================
            MOBILE: 4 COLUMN GRID
            ================================================== */}

        <div className="sm:hidden">
          {/* HEADING */}
          <h2 className="text-lg font-serif text-[#2E2E2E] mb-3">
            Shop by Category
          </h2>

          {/* 4 COLUMN GRID */}
          <div className="grid grid-cols-4 gap-x-2.5 gap-y-4">
            {mobileCategories.map((category) => (
              <CategoryTile key={category.id} category={category} />
            ))}

            {/* VIEW ALL / SHOW LESS TILE - takes the 8th slot */}
            {hasOverflow && (
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                aria-expanded={showAll}
                className="flex flex-col items-center group w-full"
              >
                <div
                  className="
                    w-full
                    aspect-square
                    rounded-[20px]
                    bg-[#FAF7F4]
                    ring-1
                    ring-[#E8DDD3]
                    shadow-sm
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    text-[#B76E79]
                    group-hover:bg-[#EFE6D8]
                    group-hover:ring-[#B76E79]/40
                    group-hover:shadow-md
                    transition
                    duration-300
                  "
                >
                  {showAll ? (
                    <ChevronUp className="w-5 h-5" strokeWidth={1.75} />
                  ) : (
                    <>
                      <LayoutGrid className="w-5 h-5" strokeWidth={1.75} />
                      <span className="text-[11px] font-semibold leading-none">
                        +{categories.length - (MOBILE_LIMIT - 1)}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="mt-2 text-[11px] font-medium tracking-wide text-center text-[#333333]">
                  {showAll ? "Show Less" : "View All"}
                </h3>
              </button>
            )}
          </div>
        </div>

        {/* ==================================================
            TABLET / DESKTOP: SWIPER
            ================================================== */}

        <div className="hidden sm:block">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            observer
            observeParents
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={15}
            breakpoints={{
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
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoryTile category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;  