import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const ProductSection = ({ section }) => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e) => setIsDesktop(e.matches);

    handleChange(mql); // set on mount
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const gridProducts = section.products.slice(0, 4);

  return (
    <section className="py-10">
      {isDesktop ? (
        <>
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
            slidesPerView={4}
          >
            {section.products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-serif underline underline-offset-4 mb-6">
            {section.title}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {gridProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button className="text-sm font-medium hover:underline">
              View All
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductSection;