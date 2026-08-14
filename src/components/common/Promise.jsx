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
  },
  {
    icon: ShieldCheck,
    title: "100% BIS Hallmarked",
  },
  {
    icon: RefreshCcw,
    title: "Lifetime Buyback",
  },
  {
    icon: Truck,
    title: "Shipping in 24 Hours",
  },
];

const OurPromises = () => {
  return (
    <section className="py-15 px-4 bg-[#FFFFFF]">

      {/* =========================
          HEADING
      ========================== */}

      <h2
        className="
          text-center
          text-2xl
          md:text-3xl
          font-serif
          mb-8
          text-[#2E2E2E]
        "
      >
        Our Promises
      </h2>

      {/* =========================
          PROMISE SLIDER
      ========================== */}

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="max-w-8xl mx-auto !py-5"
      >
        {promises.map(({ icon: Icon, title }, i) => (
          <SwiperSlide key={i}>
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl

                border
                border-[#E8DDD3]

                bg-gradient-to-br
                from-[#FAF7F4]
                via-[#F5E8EA]
                to-[#FAF7F4]

                px-2
                py-16

                flex
                flex-col
                items-center
                justify-center
                gap-4

                shadow-sm
                hover:shadow-lg

                transition-all
                duration-300

                hover:-translate-y-1
              "
            >
              {/* =========================
                  ICON
              ========================== */}

              <div
                className="
                  w-16
                  h-16
                  rounded-full

                  bg-[#FFFFFF]/80
                  backdrop-blur-sm

                  border
                  border-[#E8DDD3]

                  flex
                  items-center
                  justify-center

                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                <Icon
                  className="
                    w-7
                    h-7
                    text-[#B76E79]
                  "
                  strokeWidth={1.5}
                />
              </div>

              {/* =========================
                  TITLE
              ========================== */}

              <p
                className="
                  text-sm
                  font-semibold
                  tracking-wide
                  text-[#2E2E2E]
                  text-center
                "
              >
                {title}
              </p>

              {/* =========================
                  HOVER ACCENT
              ========================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-1/2
                  -translate-x-1/2
                  w-0
                  h-[2px]
                  bg-[#B76E79]
                  group-hover:w-16
                  transition-all
                  duration-300
                "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OurPromises;