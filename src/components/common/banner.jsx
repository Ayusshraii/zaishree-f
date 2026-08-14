import React, { useEffect, useRef, useState } from "react";
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

  sale: [
    {
      id: 1,
      image: salebanner1,
      link: "/sale",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1600&auto=format&fit=crop",
      link: "/category/silver",
    },
  ],

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

  silver: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1600&auto=format&fit=crop",
      link: "/category/silver",
    },
  ],

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
  height = "h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px]",
}) => {
  const banners = bannerData[type] || [];

  if (banners.length === 0) {
    return null;
  }

  const slides =
    banners.length > 1
      ? [banners[banners.length - 1], ...banners, banners[0]]
      : banners;

  const [currentIndex, setCurrentIndex] = useState(
    banners.length > 1 ? 1 : 0
  );

  const [isTransitioning, setIsTransitioning] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);

  // ===================================================
  // RESPONSIVE: track viewport width reactively
  // (fixes the old one-time `window.innerWidth` check
  // that never updated on resize/rotate)
  // ===================================================

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ===================================================
  // NEXT / PREV
  // ===================================================

  const nextSlide = () => {
    if (banners.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (banners.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // ===================================================
  // HANDLE LOOP
  // ===================================================

  const handleTransitionEnd = () => {
    if (banners.length <= 1) return;

    if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(banners.length);
    }
  };

  // ===================================================
  // AUTOPLAY
  // ===================================================

  useEffect(() => {
    if (!autoPlay || banners.length <= 1 || isDragging) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval, banners.length, isDragging]);

  // ===================================================
  // DRAG / TOUCH HANDLERS
  // (pointer events already cover touch, mouse & pen)
  // ===================================================

  const handlePointerDown = (e) => {
    if (banners.length <= 1) return;

    setIsDragging(true);
    setIsTransitioning(false);

    const startX = e.clientX;
    dragStartRef.current = startX;
    setDragStartX(startX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || banners.length <= 1) return;

    const currentX = e.clientX;
    const difference = currentX - dragStartX;
    setDragOffset(difference);
  };

  const handlePointerUp = () => {
    if (!isDragging || banners.length <= 1) return;

    // Slightly lower threshold on mobile so short swipes register
    const threshold = isMobile ? 40 : 60;

    setIsDragging(false);
    setIsTransitioning(true);

    if (dragOffset < -threshold) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold) {
      setCurrentIndex((prev) => prev - 1);
    }

    setDragOffset(0);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setIsTransitioning(true);
    setDragOffset(0);
  };

  // ===================================================
  // CALCULATE TRANSFORM
  // Mobile slides are full-width with a 10px gap, so the
  // per-slide offset must include that gap — same as desktop.
  // ===================================================

  const desktopTransform = `calc(7% - ${currentIndex * 86}% - ${
    currentIndex * 10
  }px)`;

  const mobileTransform = `calc(-${currentIndex * 100}% - ${
    currentIndex * 10
  }px - ${dragOffset}px)`;

  const activeTransform = isMobile ? mobileTransform : desktopTransform;

  // ===================================================
  // COMPONENT
  // ===================================================

  return (
    <section className="relative w-full overflow-hidden bg-white py-3 md:py-4">
      {/* VIEWPORT */}
      <div className="w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] overflow-hidden">
        {/* SLIDES CONTAINER */}
        <div
          className={`
            flex
            gap-[10px]
            h-full
            touch-pan-y
            ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }
          `}
          style={{
            transform: `translateX(${activeTransform})`,
          }}
          onTransitionEnd={handleTransitionEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerUp}
        >
          {slides.map((banner, index) => (
            <div
              key={`${banner.id}-${index}`}
              className="flex-shrink-0 w-full md:w-[86%]"
            >
              <Link
                to={banner.link || "#"}
                className="block w-full h-full select-none"
                draggable="false"
              >
                <div
                  className={`
                    relative
                    w-full
                    ${height}
                    overflow-hidden
                    rounded-[16px]
                    sm:rounded-[22px]
                    bg-[#FAF7F4]
                    border
                    border-[#E8DDD3]
                    select-none
                  `}
                >
                  <img
                    src={banner.image}
                    alt="Jewellery collection"
                    draggable="false"
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-[1.02]
                      pointer-events-none
                    "
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* LEFT ARROW */}
      {showArrows && banners.length > 1 && (
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous banner"
          className="
            absolute
            left-2
            sm:left-3
            md:left-5
            top-1/2
            -translate-y-1/2
            z-20
            w-8
            h-8
            sm:w-10
            sm:h-10
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
          <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      )}

      {/* RIGHT ARROW */}
      {showArrows && banners.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner"
          className="
            absolute
            right-2
            sm:right-3
            md:right-5
            top-1/2
            -translate-y-1/2
            z-20
            w-8
            h-8
            sm:w-10
            sm:h-10
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
          <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      )}
    </section>
  );
};

export default Banner;