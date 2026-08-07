import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const bonds = [
  {
    id: 1,
    label: "For Husband",
    slug: "for-husband",
    image:
      "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=400&q=80",
  },
  {
    id: 2,
    label: "For Wife",
    slug: "for-wife",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  },
  {
    id: 3,
    label: "For Mother",
    slug: "for-mother",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  },
  {
    id: 4,
    label: "For Father",
    slug: "for-father",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  },
  {
    id: 5,
    label: "For Children",
    slug: "for-children",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  },
  {
    id: 6,
    label: "For Siblings",
    slug: "for-siblings",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
  },
  {
    id: 7,
    label: "For Friends",
    slug: "for-friends",
    image:
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80",
  },
  {
    id: 8,
    label: "For Yourself",
    slug: "for-yourself",
    image:
      "https://images.unsplash.com/photo-1599459183200-59c7687a0275?w=400&q=80",
  },
];

const ShopByBond = () => {
  return (
    <section className="py-10 max-w-7xl mx-auto px-6 text-[#5a1b1be0]">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif mb-2">Shop by Bond</h2>
        <p className="text-sm text-gray-500">
          Find the perfect piece for someone who means the world to you
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {bonds.map((bond) => (
          <SwiperSlide key={bond.id}>
           <Link
    to={`/bond/${bond.slug}`}
    className="group block"
>
              <div className="aspect-square overflow-hidden rounded-md bg-gray-100 mb-3">
                <img
                  src={bond.image}
                  alt={bond.label}
                  className="w-full h-full object-cover group-hover:scale-105  transition-transform duration-500"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 text-center group-hover:text-[#5a1b1be0] transition-colors">
                {bond.label}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ShopByBond;