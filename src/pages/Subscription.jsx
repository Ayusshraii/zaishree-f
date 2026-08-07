import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const plans = [
  {
    id: 1,
    name: "Silver Plan",
    price: "₹999",
    duration: "3 Months",
    benefits: [
      "5% Discount",
      "Free Shipping",
      "Priority Support",
      "Early Access",
    ],
  },
  {
    id: 2,
    name: "Gold Plan",
    price: "₹1999",
    duration: "6 Months",
    benefits: [
      "10% Discount",
      "Free Shipping",
      "Birthday Voucher",
      "Priority Support",
      "Exclusive Collection",
    ],
  },
  {
    id: 3,
    name: "Diamond Plan",
    price: "₹3999",
    duration: "12 Months",
    benefits: [
      "15% Discount",
      "Unlimited Shipping",
      "VIP Support",
      "Free Cleaning",
      "Anniversary Gift",
    ],
  },
  {
    id: 4,
    name: "Wedding Plan",
    price: "₹5999",
    duration: "12 Months",
    benefits: [
      "20% Discount",
      "Exclusive Bridal Collection",
      "VIP Support",
      "Free Jewellery Cleaning",
    ],
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(2);

  return (
    <section className="bg-white py-5 px-5">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif">
            Subscription Plans
          </h1>

          <p className="text-gray-500 ">
            Choose the membership that suits you best.
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan.id}>
              <div
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer rounded-3xl border-2 bg-white p-8 transition duration-300 shadow-md hover:shadow-xl ${
                  selectedPlan === plan.id
                    ? "bg-red-500 "
                    : "border-gray-200"
                }`}
              >
                {selectedPlan === plan.id && (
                  <div className="mb-4">
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Selected
                    </span>
                  </div>
                )}

                <h2 className="text-3xl font-bold">
                  {plan.name}
                </h2>

                <h3 className="text-4xl font-bold mt-5">
                  {plan.price}
                </h3>

                <p className="text-gray-500 mt-2">
                  {plan.duration}
                </p>

                <hr className="my-7" />

                <div className="space-y-4">
                  {plan.benefits.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <FaCheck className="text-green-500 mt-1" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <button
                  className={`mt-10 w-full py-3 rounded-xl font-semibold transition ${
                    selectedPlan === plan.id
                      ? "bg-red-500 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {selectedPlan === plan.id
                    ? "Current Plan"
                    : "Subscribe Now"}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Subscription;