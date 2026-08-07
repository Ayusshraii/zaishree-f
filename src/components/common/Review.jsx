import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Absolutely loved the quality. The gold ring is stunning and the packaging felt luxurious.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Ordered a silver bracelet. Delivery was quick and the product was exactly as shown.",
  },
  {
    id: 3,
    name: "Ananya Singh",
    location: "Lucknow",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Beautiful craftsmanship. I have already recommended this store to my friends.",
  },
  {
    id: 4,
    name: "Aman Gupta",
    location: "Jaipur",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    review:
      "The necklace exceeded my expectations. Premium finish and elegant design.",
  },
  {
    id: 5,
    name: "Sneha Kapoor",
    location: "Pune",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "Amazing shopping experience. Customer support was very responsive and helpful.",
  },
];

const Reviews = () => {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-serif text-center mb-3">
          What Our Customers Say
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Trusted by thousands of happy customers.
        </p>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={25}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-2xl  p-6 h-[320px] flex flex-col justify-between">
                <div>
                  <FaQuoteLeft className="text-3xl text-yellow-500 mb-4" />

                  <p className="text-gray-600 leading-7">
                    "{review.review}"
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{review.name}</h3>

                      <p className="text-sm text-gray-500">
                        {review.location}
                      </p>

                      <div className="flex mt-1">
                        {[...Array(review.rating)].map((_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;