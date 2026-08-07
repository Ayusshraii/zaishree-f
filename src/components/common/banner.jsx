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
  },
  {
    id: 2,
    title: "Shine Like Never Before",
    subtitle: "Exclusive Diamond Jewellery",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
  },
  {
    id: 3,
    title: "Luxury Redefined",
    subtitle: "Elegant Silver & Gold Designs",
    image:
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=1600&q=80",
  },
];

const Banner = () => {
  return (
        <Swiper 
        modules={[Navigation,Autoplay]}
        navigation
        autoplay={{delay:3000}}
        loop={true}>

      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>

            <Link to='/'></Link>
            
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-[400px] md:h-[600px] object-cover "
          />
        </SwiperSlide>
      ))}
      </Swiper>
  );
};

export default Banner;