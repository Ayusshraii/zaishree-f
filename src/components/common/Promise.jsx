import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  Sparkles,
  ShieldCheck,
  RefreshCcw,
  Truck,
} from "lucide-react";

import "swiper/css";

const promises = [
  {
    icon: Sparkles,
    title: "Lifetime Polishing",
    desc: "Complimentary care, for as long as you own it",
  },
  {
    icon: ShieldCheck,
    title: "100% BIS Hallmarked",
    desc: "Certified purity on every single piece",
  },
  {
    icon: RefreshCcw,
    title: "Lifetime Buyback",
    desc: "Trade in anytime, at today's value",
  },
  {
    icon: Truck,
    title: "Shipping in 24 Hours",
    desc: "Insured dispatch, straight to your door",
  },
];

const OurPromises = () => {
  return (
    <section
      className="relative py-10 md:py-20 px-4 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, #4A1620 0%, #2E0B0F 60%, #24080C 100%)",
      }}
    >
      {/* =========================
          HEADING
      ========================== */}

      <div className="text-center mb-3">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF7A] mb-3">
          Our Commitment
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#F5EDE4]">
          The Zaishree Promise
        </h2>
      </div>

      {/* gold hairline with diamond mark */}
      <div className="flex items-center justify-center gap-3 mb-10 md:mb-12">
        <span className="h-px w-10 md:w-16 bg-[#D4AF7A]/40" />
        <span className="w-[6px] h-[6px] rotate-45 bg-[#D4AF7A]" />
        <span className="h-px w-10 md:w-16 bg-[#D4AF7A]/40" />
      </div>

      {/* =========================
          PROMISE SLIDER
      ========================== */}

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={900}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="max-w-8xl mx-auto "
      >
        {promises.map(({ icon: Icon, title, desc }, i) => (
          <SwiperSlide key={i}>
            <div
              className="
                group
                relative
                flex
                flex-col
                items-center
                text-center
                gap-4
                px-4
                py-8
              "
            >
              {/* =========================
                  HALLMARK MEDALLION
              ========================== */}

              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* outer ring */}
                <div
                  className="
                    absolute inset-0 rounded-full
                    border border-[#D4AF7A]/50
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />
                {/* inner ring, slightly rotated */}
                <div
                  className="
                    absolute inset-[6px] rounded-full
                    border border-[#D4AF7A]/25
                    transition-transform duration-700
                    group-hover:rotate-45
                  "
                />
                {/* core */}
                <div
                  className="
                    relative w-12 h-12 rounded-full
                    bg-[#3D1015]
                    border border-[#D4AF7A]/60
                    flex items-center justify-center
                    transition-shadow duration-300
                    group-hover:shadow-[0_0_16px_rgba(212,175,122,0.35)]
                  "
                >
                  <Icon
                    className="w-5 h-5 text-[#D4AF7A]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* =========================
                  TITLE + DESCRIPTION
              ========================== */}

              <div>
                <p className="text-sm md:text-base font-serif tracking-wide text-[#F5EDE4] mb-1.5">
                  {title}
                </p>
                <p className="text-[12px] leading-snug text-[#F5EDE4]/55 max-w-[160px] mx-auto">
                  {desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OurPromises;