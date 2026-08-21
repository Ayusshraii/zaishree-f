import React from "react";
import { Link } from "react-router-dom";
import { GiGems, GiDrop, GiLotus } from "react-icons/gi";
import { FiArrowRight, FiInstagram, FiFacebook } from "react-icons/fi";
import Navbar from "../components/common/Navbar";

const VALUES = [
  {
    icon: GiGems,
    title: "Affordable luxury",
    text: "A high-end finish without the high-end price — everyday jewellery that still feels special to wear.",
  },
  {
    icon: GiDrop,
    title: "Tarnish-free promise",
    text: "18k gold-plated stainless steel and BIS-certified 92.5 silver, built to keep their shine wear after wear.",
  },
  {
    icon: GiLotus,
    title: "Skin-friendly & light",
    text: "Hypoallergenic, lightweight designs — no green marks, no irritation, no reason to take it off.",
  },
];

const PRODUCTS = [
  "Hoop earrings",
  "Adjustable rings",
  "Chain pendants",
  "Stackable bangles & bracelets",
  "Elegant silver & gold-plated studs",
];

const CITIES = ["Delhi", "Mumbai", "Bangalore", "Pune", "Ahmedabad", "Kolkata", "Jaipur"];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#2E2E2E] font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative py-5 px-8">
        <div className="relative h-[50vh] min-h-[420px] max-h-[640px] w-full overflow-hidden rounded-4xl">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1600&auto=format&fit=crop"
            alt="Zaishree tarnish-free gold-plated and silver jewellery"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2E2E2E]/35" />

          <div className="relative z-10 h-full flex flex-col justify-end max-w-6xl mx-auto px-6 pb-14 md:pb-20">
            <p className="text-xs tracking-[0.2em] uppercase text-[#F3D9DD] font-medium mb-4">
              Our story
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-white max-w-2xl">
              Shine with grace, every day.
            </h1>
            <p className="mt-5 text-sm text-white/80 max-w-lg leading-relaxed">
              Zaishree was born from a simple idea: jewellery should feel
              luxurious, look elegant, and still be affordable for everyday
              women.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-5 text-[#2E2E2E]/75 leading-relaxed ">
          <p>
            Started in 2024 from a small setup in East Delhi, Zaishree was
            founded by close friends Nitin and Preeti, who shared a love for
            design and a dream to make affordable, long-lasting jewellery
            for real, everyday women.
          </p>
          <p>
            They noticed most jewellery was either overpriced or faded too
            quickly — so they set out to make something better: affordable,
            tarnish-free jewellery in 18k gold-plated stainless steel and
            BIS-certified 92.5 silver, made for everyday wear.
          </p>
          <p>
            Today, Zaishree stands for everyday luxury — jewellery you can
            wear with pride, comfort, and a little sparkle of joy.
          </p>
        </div>

        {/* Name meaning */}
        <div className="mt-14 border-l-2 border-[#B76E79] pl-6 ">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-3">
            Why we named it Zaishree
          </p>
          <p className="font-serif text-2xl text-[#2E2E2E] mb-3">
            Shine, with grace.
          </p>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
            "Zai" stands for shine, radiance, and light. "Shree" means grace,
            respect, and beauty. Together, it's a name that celebrates every
            woman who carries confidence and elegance in her own way —
            gracefully balancing strength, beauty, tradition, and modern
            life.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="border-t border-[#E8DDD3] bg-[#FAF7F4]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-3">
            Meet our founders
          </p>
          <h2 className="font-serif text-3xl text-[#2E2E2E] mb-6 max-w-lg">
            Nitin & Preeti
          </h2>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed  mb-6">
            Nitin and Preeti brought Zaishree to life with one strong belief
            — that every woman deserves beautiful, high-quality jewellery
            without overpaying for it. Combining their love for design and a
            passion for quality, they set out to make jewellery that's
            stylish, skin-friendly, and tarnish-free, so it can be worn every
            day without any worries.
          </p>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed max-w-2xl">
            Every piece is crafted with lightweight comfort, hypoallergenic
            materials, tarnish-resistant coatings, and styles that move
            easily between Indian and modern outfits.
          </p>
        </div>
      </section>

      {/* Craftsmanship / Values */}
      <section id="craftsmanship" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-3">
            What we won't compromise on
          </p>
          <h2 className="font-serif text-3xl text-[#2E2E2E] mb-10 max-w-lg">
            Our core values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon className="w-6 h-6 text-[#B76E79] mb-4" />
                <h3 className="font-serif text-lg text-[#2E2E2E] mb-2">{title}</h3>
                <p className="text-sm text-[#2E2E2E]/65 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we make */}
      <section className="border-t border-[#E8DDD3] bg-[#FAF7F4]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-3">
            What we make
          </p>
          <h2 className="font-serif text-3xl text-[#2E2E2E] mb-4 max-w-lg">
            Designed for daily wear and gifting
          </h2>
          <p className="text-sm text-[#2E2E2E]/65 leading-relaxed mb-8 max-w-lg">
            Perfect for casual days, festivals, work, or special moments —
            every piece is tarnish-free, hypoallergenic, and made for
            everyday comfort.
          </p>
          <div className="flex flex-wrap gap-3">
            {PRODUCTS.map((item) => (
              <span
                key={item}
                className="text-xs tracking-wide uppercase text-[#2E2E2E] bg-white border border-[#E8DDD3] rounded-full px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Growth story / Sustainability anchor */}
      <section id="sustainability" className="flex flex-col items-center mx-auto px-6 py-16 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-3">
          Our growth story
        </p>
        <h2 className="font-serif text-3xl text-[#2E2E2E] mb-4 max-w-lg">
          From East Delhi to India-wide
        </h2>
        <p className="text-sm text-[#2E2E2E]/65 leading-relaxed mb-10 max-w-xl">
          What started as a small idea in East Delhi has grown into a
          fast-growing Indian jewellery brand, shipping to women across the
          country. Our first gold-plated hoop earring collection sold out
          within 14 days of launch — and the journey has only grown
          stronger since.
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          {CITIES.map((city) => (
            <span
              key={city}
              className="text-xs tracking-wide uppercase text-[#B76E79] border border-[#B76E79]/40 rounded-full px-4 py-2"
            >
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="border-t border-[#E8DDD3] bg-[#2E2E2E] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-4">
            Our promise
          </p>
          <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-2">
            Jewellery that lasts. Designs that feel premium but stay
            affordable.
          </p>
          <p className="text-sm text-white/70 mt-4">
            Fast delivery, real-time WhatsApp support, and packaging that
            makes every order feel like a gift.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#FAF7F4]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-sm text-[#2E2E2E]/65 mb-2">
            You don't need an occasion to shine.
          </p>
          <p className="font-serif text-xl text-[#2E2E2E] mb-6">
            Come be a part of our story.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-[#B76E79] border-b border-[#B76E79] pb-0.5 hover:text-[#A85F6B] hover:border-[#A85F6B] transition-colors"
            >
              Get in touch
              <FiArrowRight size={14} />
            </Link>
            <a
              href="https://instagram.com/zaishre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B76E79] hover:text-[#A85F6B] transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="https://facebook.com/zaishreejewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B76E79] hover:text-[#A85F6B] transition-colors"
              aria-label="Facebook"
            >
              <FiFacebook size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}