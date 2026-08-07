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
    title: "Timeless Gold Collection",
    subtitle: "Crafted for Every Occasion",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=80",
    link: "/products",
  },
  {
    id: 2,
    title: "Shine Like Never Before",
    subtitle: "Exclusive Diamond Jewellery",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
    link: "/products",
  },
  {
    id: 3,
    title: "Luxury Redefined",
    subtitle: "Elegant Silver & Gold Designs",
    image:
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=1600&q=80",
    link: "/products",
  },
];

const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <Link to={banner.link} className="relative block">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-[400px] md:h-[600px] object-cover"
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white font-serif text-3xl md:text-5xl mb-3 drop-shadow-md">
                {banner.title}
              </h2>
              <p className="text-white/90 text-sm md:text-lg tracking-wide mb-6 drop-shadow-md">
                {banner.subtitle}
              </p>
              <span className="px-6 py-2.5 bg-[#4B0F14] text-white rounded-2xl text-xs md:text-sm uppercase tracking-widest hover:bg-[#141311] hover:text-white transition-colors">
                Shop Now
              </span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;