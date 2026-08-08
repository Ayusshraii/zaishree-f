import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Navbar from "../components/common/Navbar";

const plans = [
  {
    id: 1,
    name: "Silver Plan",
    description: "The perfect introduction to curated luxury.",
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
    description: "Elevated privileges for the discerning collector.",
    price: "₹1999",
    duration: "6 Months",
    popular: true,
    benefits: [
      "First look at new collections",
      "Unlimited complimentary cleaning",
      "Priority expedited shipping",
      "10% exclusive discount on all purchases",
      "Birthday voucher",
    ],
  },
  {
    id: 3,
    name: "Diamond Plan",
    description: "The ultimate expression of bespoke luxury.",
    price: "₹3999",
    duration: "12 Months",
    benefits: [
      "All Gold tier benefits",
      "Dedicated personal jewellery concierge",
      "Invitations to exclusive closed-door events",
      "Bespoke design consultation annually",
    ],
  },
  {
    id: 4,
    name: "Wedding Plan",
    description: "Bridal privileges for your once-in-a-lifetime moment.",
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
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="bg-white  ">
      <div className="border-b-1 border-gray-300"> <Navbar /></div>
     
      <div className="max-w-6xl py-5 mx-auto">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900">
            Elevate Your Elegance
          </h1>
          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            Join to unlock a world of exclusive privileges,
            bespoke services, and first access to our most exquisite
            collections.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isHighlighted = isSelected || (selectedPlan === null && plan.popular);

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative cursor-pointer rounded-md p-6 transition-all duration-300 flex flex-col h-full ${
                  isHighlighted
                    ? "bg-[#4B0F14] text-white shadow-lg md:-translate-y-2"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-[#141311] text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-bl-md rounded-tr-md">
                    Most Popular
                  </span>
                )}

                <h2
                  className={`text-lg font-serif mb-2 ${
                    isHighlighted ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name.replace(" Plan", "")}
                </h2>

                <p
                  className={`text-xs mb-5 leading-relaxed ${
                    isHighlighted ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mb-5">
                  <span className="text-2xl font-semibold">
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs ml-1 ${
                      isHighlighted ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    / {plan.duration}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 mb-6">
                  {plan.benefits.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <FaCheck
                        className={`mt-0.5 w-3 h-3 shrink-0 ${
                          isHighlighted ? "text-white" : "text-green-600"
                        }`}
                      />
                      <p
                        className={`text-xs ${
                          isHighlighted ? "text-white/90" : "text-gray-700"
                        }`}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-2.5 text-xs font-semibold uppercase tracking-widest rounded-md transition-colors mt-auto ${
                    isHighlighted
                      ? "bg-white text-[#7A2E42] hover:bg-gray-100"
                      : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  {isSelected ? "Selected" : `Join ${plan.name.replace(" Plan", "")}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Subscription;