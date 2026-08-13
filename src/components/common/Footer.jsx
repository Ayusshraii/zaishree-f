import React, { useState } from "react";
import {
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import { GiGems } from "react-icons/gi";

const helpLinks = [
  "Track your order",
  "Shipping & delivery",
  "Returns & exchanges",
  "Ring size guide",
  "Care instructions",
  "FAQs",
];

const companyLinks = [
  "Our story",
  "Craftsmanship",
  "Sustainability",
  "Careers",
  "Press",
];

const trustBadges = [
  { icon: GiGems, label: "Certified conflict-free stones" },
  { icon: FiShield, label: "Lifetime warranty" },
  { icon: FiTruck, label: "Free insured shipping" },
  { icon: FiRefreshCw, label: "30-day returns" },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xs tracking-[0.2em] uppercase text-[#C9A66B] font-medium mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-[#D8D3C8]/80 hover:text-[#F7F3EA] transition-colors duration-200"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#4B0F14]  text-[#F7F3EA] font-sans">
      {/* Trust strip */}
      <div className="border-b border-[#2A2822] ">
        <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 justify-center sm:justify-start text-center sm:text-left"
            >
              <Icon className="w-5 h-5 text-[#C9A66B] shrink-0" />
              <span className="text-xs text-[#D8D3C8]/80 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 lg:gap-8">
          {/* Brand + newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-serif text-2xl tracking-wide mb-3">
              Zaishree
            </h2>
            <p className="text-sm text-[#D8D3C8]/70 leading-relaxed mb-6 max-w-xs">
              Fine jewellery, hand-finished in small batches. Each piece is
              catalogued and certified before it reaches you.
            </p>

            <form onSubmit={handleSubmit} className="max-w-xs">
              <label
                htmlFor="footer-email"
                className="text-xs tracking-[0.2em] uppercase text-[#C9A66B] font-medium block mb-2"
              >
                Join the list
              </label>
              <div className="flex border-b border-[#4A473D] focus-within:border-[#C9A66B] transition-colors">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-transparent flex-1 py-2 text-sm text-[#F7F3EA] placeholder-[#6B6858] outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="text-xs tracking-wide uppercase text-[#C9A66B] hover:text-[#F7F3EA] transition-colors px-2 shrink-0"
                >
                  Sign up
                </button>
              </div>
              {submitted && (
                <p className="text-xs text-[#C9A66B] mt-2">
                  You're on the list. Welcome.
                </p>
              )}
            </form>
          </div>

          <FooterColumn title="Help" links={helpLinks} />
          <FooterColumn title="Company" links={companyLinks} />

          {/* Contact + social */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-[#C9A66B] font-medium mb-4">
              Visit or write
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-[#D8D3C8]/80">
                <FiMapPin className="w-4 h-4 text-[#C9A66B] mt-0.5 shrink-0" />
                <span>14 Rue de la Paix, Paris</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#D8D3C8]/80">
                <FiMail className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span>hello@gamil.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#D8D3C8]/80">
                <FiPhone className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span>+91 45010-0192</span>
              </li>
            </ul>

            <div className="flex gap-3">
              {[FiInstagram, FiFacebook, FiYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#3A3730] flex items-center justify-center hover:border-[#C9A66B] hover:text-[#C9A66B] transition-colors duration-200"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Signature divider */}
      <div className="flex items-center justify-center gap-4 px-6 pb-8">
        <span className="h-px w-16 sm:w-32 bg-[#3A3730]" />
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          className="text-[#C9A66B] shrink-0"
          fill="none"
        >
          <path
            d="M7 0.5L13.5 5L7 13.5L0.5 5L7 0.5Z"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path d="M0.5 5H13.5" stroke="currentColor" strokeWidth="0.6" />
          <path d="M4 5L7 0.5L10 5L7 13.5L4 5Z" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        <span className="h-px w-16 sm:w-32 bg-[#3A3730]" />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2A2822]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6858]">
            © {new Date().getFullYear()} Zaishree. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-xs text-[#6B6858] hover:text-[#D8D3C8] transition-colors">
              Privacy policy
            </a>
            <a href="#" className="text-xs text-[#6B6858] hover:text-[#D8D3C8] transition-colors">
              Terms of service
            </a>
            <a href="#" className="text-xs text-[#6B6858] hover:text-[#D8D3C8] transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}