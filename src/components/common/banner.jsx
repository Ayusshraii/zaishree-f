import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { GiGoldBar, GiDiamondRing, GiPresent } from "react-icons/gi";
import { FiRefreshCw } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const perks = [
  { icon: GiGoldBar, label: "Certified hallmark gold" },
  { icon: FiRefreshCw, label: "Exchange all year round" },
  { icon: GiDiamondRing, label: "Lifetime warranty" },
  { icon: GiPresent, label: "Gifting for every occasion" },
];

const banners = [
  
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1444441/pexels-photo-1444441.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "TRADITION REIMAGINED",
    title: "BANGLES BUILT TO LAST.",
    subtitle: "Classic gold bangles for everyday and celebration alike",
    cta: "SHOP BANGLES",
    link: "/products?category=bracelets",
    perks,
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/3474504/pexels-photo-3474504.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "SAY YES IN GOLD",
    title: "RINGS FOR EVERY PROMISE.",
    subtitle: "From engagement to everyday, a ring for every story",
    cta: "SHOP RINGS",
    link: "/products?category=rings",
    perks,
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/8908597/pexels-photo-8908597.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "LIMITED EDIT",
    title: "STATEMENT PIECES, REFINED.",
    subtitle: "Precious stones set in 18K gold, made to last generations",
    cta: "SHOP PRECIOUS",
    link: "/products?category=precious",
    perks,
  },
    {
    id: 5,
    image:
      "https://images.pexels.com/photos/8908597/pexels-photo-8908597.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "LIMITED EDIT",
    title: "STATEMENT PIECES, REFINED.",
    subtitle: "Precious stones set in 18K gold, made to last generations",
    cta: "SHOP PRECIOUS",
    link: "/products?category=precious",
    perks,
  },
];

const Banner = () => {
  return (
    <div className="relative w-full py-4 md:py-8 overflow-x-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        loop={true}
 
        centeredSlides
        slidesPerView={1.2}
        spaceBetween={16}
        className="banner-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full rounded-xl overflow-hidden">
              {/* image */}
              <Link to={banner.link} className="block">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-[400px] md:h-[450px] object-cover"
                />
              </Link>

              {/* gradient overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#141311]/75 via-[#141311]/30 to-transparent pointer-events-none" />

              {/* "A ZAISHREE PRODUCT" tag, top-left */}
              <span className="absolute top-4 left-5 text-[10px] md:text-xs tracking-[0.15em] text-white/80 font-medium">
                {banner.eyebrow}
              </span>

              {/* main text + CTA */}
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <div className="max-w-md pl-5 md:pl-10 pr-4 text-white">
                  <h2 className="font-serif text-2xl md:text-4xl leading-tight mb-3">
                    {banner.title}
                  </h2>

                  <p className="text-xs md:text-sm text-white/85 mb-5 max-w-xs">
                    {banner.subtitle}
                  </p>

                  <Link
                    to={banner.link}
                    className="pointer-events-auto inline-block bg-white text-[#141311] text-[11px] md:text-xs uppercase tracking-wide font-semibold px-6 py-3 hover:bg-[#C9A66B] hover:text-white transition-colors"
                  >
                    {banner.cta}
                  </Link>
                </div>
              </div>

              {/* bottom info strip inside the card */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-around md:justify-between gap-2 px-3 md:px-8 py-2.5 overflow-x-auto">
                  {banner.perks.map((perk) => {
                    const Icon = perk.icon;
                    return (
                      <div
                        key={perk.label}
                        className="flex items-center gap-1.5 shrink-0"
                      >
                        <Icon className="w-4 h-4 text-[#7A2E42] shrink-0" />
                        <span className="text-[10px] md:text-xs text-[#5a1b1b] font-medium whitespace-nowrap">
                          {perk.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

   
    </div>
  );
};

export default Banner;