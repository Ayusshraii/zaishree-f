import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=80",
    link: "/products",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    link: "/products",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=1600&q=80",
    link: "/products",
  },
];

const Banner = () => {
  return (
    <div className="relative w-full py-6 md:py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true, el: ".banner-pagination" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        centeredSlides
        slidesPerView={1.06}
        spaceBetween={16}
        className="banner-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={banner.link} className="block rounded-xl overflow-hidden">
              <img
                src={banner.image}
                alt=""
                className="w-full h-[400px] md:h-[450px] object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots below the carousel */}
      <div className="banner-pagination flex items-center justify-center gap-2 mt-3" />

      <style>{`
        .banner-swiper { overflow: visible; }
        .banner-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #d1d5db;
          opacity: 1;
        }
        .banner-pagination .swiper-pagination-bullet-active {
          background: #7A2E42;
          width: 20px;
          border-radius: 9999px;
          transition: width 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default Banner;