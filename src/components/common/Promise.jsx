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
      className="
        relative
        overflow-hidden
        px-3
        sm:px-4
        py-6
        sm:py-7
        md:py-9
        min-h-[190px]
        sm:min-h-[220px]
        md:h-[400px]
      "
      style={{
        background:
          "radial-gradient(circle at 50% 0%, #4A1620 0%, #2E0B0F 60%, #24080C 100%)",
      }}
    >
      {/* =========================
          HEADING
      ========================== */}
      <div className="text-center">
        <p className="text-[9px] xs:text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.35em] text-[#D4AF7A] mb-1.5">
          Our Commitment
        </p>

        <h2 className="text-lg xs:text-xl md:text-3xl font-serif text-[#F5EDE4]">
          The Zaishree Promise
        </h2>
      </div>

      {/* =========================
          GOLD HAIRLINE
      ========================== */}
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6">
        <span className="h-px w-6 xs:w-8 md:w-16 bg-[#D4AF7A]/40" />

        <span className="w-[5px] h-[5px] rotate-45 bg-[#D4AF7A]" />

        <span className="h-px w-6 xs:w-8 md:w-16 bg-[#D4AF7A]/40" />
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
        spaceBetween={8}
        slidesPerView={2.2}
        breakpoints={{
          380: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        className="max-w-6xl mx-auto !py-3 sm:!py-4"
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
                gap-1.5
                sm:gap-2
                md:gap-3
                px-1.5
                sm:px-2
                py-2
                md:py-3
              "
            >
              {/* =========================
                  HALLMARK MEDALLION
              ========================== */}
              <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
                {/* Outer ring */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-[#D4AF7A]/50
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Inner ring */}
                <div
                  className="
                    absolute
                    inset-[4px]
                    sm:inset-[5px]
                    rounded-full
                    border
                    border-[#D4AF7A]/25
                    transition-transform
                    duration-700
                    group-hover:rotate-45
                  "
                />

                {/* Core */}
                <div
                  className="
                    relative
                    w-8
                    h-8
                    xs:w-9
                    xs:h-9
                    sm:w-10
                    sm:h-10
                    md:w-12
                    md:h-12
                    rounded-full
                    bg-[#3D1015]
                    border
                    border-[#D4AF7A]/60
                    flex
                    items-center
                    justify-center
                    transition-shadow
                    duration-300
                    group-hover:shadow-[0_0_16px_rgba(212,175,122,0.35)]
                  "
                >
                  <Icon
                    className="w-3.5 h-3.5 xs:w-4 xs:h-4 md:w-5 md:h-5 text-[#D4AF7A]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* =========================
                  TITLE + DESCRIPTION
              ========================== */}
              <div>
                <p className="text-[11px] xs:text-xs md:text-base font-serif tracking-wide text-[#F5EDE4] mb-0.5 md:mb-1 leading-tight">
                  {title}
                </p>

                <p className="text-[9px] xs:text-[10px] md:text-[12px] leading-snug text-[#F5EDE4]/55 max-w-[120px] xs:max-w-[140px] md:max-w-[160px] mx-auto">
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