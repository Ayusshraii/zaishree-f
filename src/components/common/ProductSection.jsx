import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const ProductSection = ({ section }) => {
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-serif">{section.title}</h2>
        <button className="text-sm font-medium hover:underline">
          View All →
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {section.products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSection;