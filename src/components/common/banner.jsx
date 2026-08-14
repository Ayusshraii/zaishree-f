import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// =====================================================
// LOCAL IMAGE IMPORTS
// =====================================================

import homebanner1 from "../../assets/WhatsApp Image 2026-08-13 at 11.19.26 PM.jpeg";

import salebanner1 from "../../assets/WhatsApp Image 2026-08-13 at 11.19.27 PM.jpeg";

// =====================================================
// MOCKUP BANNER DATA
// =====================================================

const bannerData = {
  // ===================================================
  // HOME BANNERS
  // ===================================================

  home: [
    {
      id: 1,
      image: homebanner1,
      link: "/category/gold",
    },

    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop",
      link: "/category/diamond",
    },

    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop",
      link: "/new-arrivals",
    },
  ],

  // ===================================================
  // SALE BANNERS
  // ===================================================

  sale: [
    {
      id: 1,
      image: salebanner1,
      link: "/sale",
    },

   
  ],

  // ===================================================
  // GOLD BANNERS
  // ===================================================

  gold: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1600&auto=format&fit=crop",
      link: "/category/gold",
    },

    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1627293509201-cd0c3f9b5e4d?q=80&w=1600&auto=format&fit=crop",
      link: "/category/gold/rings",
    },
  ],

  // ===================================================
  // SILVER BANNERS
  // ===================================================

  silver: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1600&auto=format&fit=crop",
      link: "/category/silver",
    },
  ],

  // ===================================================
  // WEDDING BANNERS
  // ===================================================

  wedding: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop",
      link: "/category/wedding",
    },

    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
      link: "/category/wedding/bridal",
    },
  ],
};

// =====================================================
// REUSABLE BANNER COMPONENT
// =====================================================

const Banner = ({
  type = "home",
  autoPlay = true,
  interval = 4000,
  showArrows = true,

  // Mobile: 300px
  // Desktop: 400px
  height = "h-[300px] md:h-[400px]",
}) => {
  // ===================================================
  // GET BANNERS
  // ===================================================

  const banners = bannerData[type] || [];

  // ===================================================
  // NO BANNERS
  // ===================================================

  if (banners.length === 0) {
    return null;
  }

  // ===================================================
  // CREATE CLONED SLIDES FOR INFINITE LOOP
  //
  // Original:
  //
  // [1, 2, 3]
  //
  // Becomes:
  //
  // [3, 1, 2, 3, 1]
  // ===================================================

  const slides =
    banners.length > 1
      ? [
          banners[banners.length - 1],
          ...banners,
          banners[0],
        ]
      : banners;

  // ===================================================
  // CURRENT SLIDE
  // ===================================================

  const [currentIndex, setCurrentIndex] = useState(
    banners.length > 1 ? 1 : 0
  );

  // ===================================================
  // TRANSITION STATE
  // ===================================================

  const [isTransitioning, setIsTransitioning] =
    useState(true);

  // ===================================================
  // NEXT SLIDE
  // ===================================================

  const nextSlide = () => {
    if (banners.length <= 1) return;

    setIsTransitioning(true);

    setCurrentIndex((prev) => prev + 1);
  };

  // ===================================================
  // PREVIOUS SLIDE
  // ===================================================

  const prevSlide = () => {
    if (banners.length <= 1) return;

    setIsTransitioning(true);

    setCurrentIndex((prev) => prev - 1);
  };

  // ===================================================
  // HANDLE INFINITE LOOP
  // ===================================================

  const handleTransitionEnd = () => {
    if (banners.length <= 1) return;

    // -----------------------------------------------
    // Reached cloned first slide
    // -----------------------------------------------

    if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }

    // -----------------------------------------------
    // Reached cloned last slide
    // -----------------------------------------------

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(banners.length);
    }
  };

  // ===================================================
  // AUTOPLAY
  // ===================================================

  useEffect(() => {
    if (!autoPlay || banners.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [
    currentIndex,
    autoPlay,
    interval,
    banners.length,
  ]);

  // ===================================================
  // COMPONENT
  // ===================================================

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        py-4
      "
    >
      {/* =================================================
          VIEWPORT
          ================================================= */}

      <div
        className="
          w-full
          h-[300px]
          md:h-[400px]
          overflow-hidden
        "
      >
        {/* ===============================================
            SLIDES CONTAINER
            =============================================== */}

        <div
          className={`
            flex
            gap-[10px]
            h-full

            ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }
          `}
          style={{
            transform: `
              translateX(
                calc(
                  7% -
                  ${currentIndex * 86}% -
                  ${currentIndex * 10}px
                )
              )
            `,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {/* =============================================
              SLIDES
              ============================================= */}

          {slides.map((banner, index) => (
            <div
              key={`${banner.id}-${index}`}
              className="
                flex-shrink-0
                w-[86%]
              "
            >
              {/* =========================================
                  CLICKABLE BANNER
                  ========================================= */}

              <Link
                to={banner.link || "#"}
                className="
                  block
                  w-full
                  h-full
                "
              >
                {/* =======================================
                    IMAGE CARD
                    ======================================= */}

                <div
                  className={`
                    relative
                    w-full
                    ${height}

                    overflow-hidden

                    rounded-[22px]

                    bg-[#FAF7F4]

                    border
                    border-[#E8DDD3]
                  `}
                >
                  <img
                    src={banner.image}
                    alt="Jewellery collection"
                    className="
                      w-full
                      h-full

                      object-cover

                      transition-transform
                      duration-700

                      hover:scale-[1.02]
                    "
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================
          LEFT ARROW
          ================================================= */}

      {showArrows && banners.length > 1 && (
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous banner"
          className="
            absolute

            left-3
            md:left-5

            top-1/2
            -translate-y-1/2

            z-20

            w-10
            h-10

            md:w-12
            md:h-12

            rounded-full

            bg-[#B76E79]

            text-white

            flex
            items-center
            justify-center

            border
            border-[#D8A7AF]

            shadow-md

            hover:bg-[#A85F6B]

            transition-all
            duration-300

            hover:scale-105
          "
        >
          <FiChevronLeft
            className="
              w-5
              h-5
              md:w-6
              md:h-6
            "
          />
        </button>
      )}

      {/* =================================================
          RIGHT ARROW
          ================================================= */}

      {showArrows && banners.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner"
          className="
            absolute

            right-3
            md:right-5

            top-1/2
            -translate-y-1/2

            z-20

            w-10
            h-10

            md:w-12
            md:h-12

            rounded-full

            bg-[#B76E79]

            text-white

            flex
            items-center
            justify-center

            border
            border-[#D8A7AF]

            shadow-md

            hover:bg-[#A85F6B]

            transition-all
            duration-300

            hover:scale-105
          "
        >
          <FiChevronRight
            className="
              w-5
              h-5
              md:w-6
              md:h-6
            "
          />
        </button>
      )}
    </section>
  );
};

export default Banner;