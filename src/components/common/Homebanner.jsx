import React from "react";
import Banner from "../components/Banner";

const homeHeroBanners = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1444441/pexels-photo-1444441.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "TRADITION REIMAGINED",
    title: "BANGLES BUILT TO LAST.",
    subtitle:
      "Classic gold bangles for everyday and celebration alike",
    cta: "SHOP BANGLES",
    link: "/products?category=bracelets",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/3474504/pexels-photo-3474504.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "SAY YES IN GOLD",
    title: "RINGS FOR EVERY PROMISE.",
    subtitle:
      "From engagement to everyday, a ring for every story",
    cta: "SHOP RINGS",
    link: "/products?category=rings",
  },
];

const homeSaleBanners = [
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/8908597/pexels-photo-8908597.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "LIMITED TIME SALE",
    title: "UP TO 30% OFF.",
    subtitle:
      "Discover timeless jewellery at special prices. Shop your favourites before they're gone.",
    cta: "SHOP SALE",
    link: "/products?sale=true",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "ZAISHREE SPECIAL",
    title: "BEAUTY AT A SPECIAL PRICE.",
    subtitle:
      "Explore exclusive offers on gold, silver and diamond jewellery.",
    cta: "EXPLORE OFFERS",
    link: "/products?sale=true",
  },
];

const Home = () => {
  return (
    <div>

      {/* =========================
          FIRST BANNER
      ========================== */}
      <Banner banners={homeHeroBanners} />


      {/* =========================
          OTHER HOME SECTIONS
      ========================== */}

      <section className="py-16">
        <h2 className="text-3xl text-center font-serif">
          Shop By Category
        </h2>
      </section>


      {/* =========================
          SECOND BANNER - SALE
      ========================== */}

      <Banner banners={homeSaleBanners} />


      {/* =========================
          MORE HOME SECTIONS
      ========================== */}

      <section className="py-16">
        <h2 className="text-3xl text-center font-serif">
          New Arrivals
        </h2>
      </section>

    </div>
  );
};

export default Home;