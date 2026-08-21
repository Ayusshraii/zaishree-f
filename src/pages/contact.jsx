import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import Navbar from "../components/common/Navbar";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Replace with your actual API endpoint
      // await axios.post("/api/contact", form);
      await new Promise((res) => setTimeout(res, 900));
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#2E2E2E] font-sans">
        <Navbar/>
      {/* Hero image with overlaid title */}
      <section className="relative px-8 py-4 ">
        <div className="relative h-[50vh] min-h-[420px] max-h-[640px] w-full overflow-hidden ">
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1600&auto=format&fit=crop"
            alt="Zaishree jewellery on display"
            className="absolute inset-0 w-full h-full rounded-4xl object-cover"
          />
          <div className="absolute inset-0 " />
          <div className="relative z-10 h-full flex items-center px-20">
            <h1 className="font-serif text-4xl md:text-5xl text-white text-center">
              Contact with Us
            </h1>
          </div>
        </div>
      </section>

      {/* Get in touch / Contact us */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Left: Get in touch + info box */}
        <div>
          <h2 className="text-sm tracking-[0.15em] uppercase font-semibold text-[#2E2E2E] mb-4">
            Get in touch
          </h2>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed mb-10">
            Our team is just a message away. Tell us what you need — whether
            it's sizing guidance, shipping info, or a special gift request —
            and we'll respond with personalized help, typically within 24
            hours. Let's make your Zaishree experience shine!
          </p>

          <div className="bg-[#2E2E2E] text-white rounded-sm p-8 space-y-8">
            <div>
              <p className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-semibold text-[#B76E79] mb-2">
                <FiMapPin size={14} />
                Our address
              </p>
              <p className="text-sm text-white/80">Shakarpur East, Delhi, India</p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-semibold text-[#B76E79] mb-2">
                <FiPhone size={14} />
                Have a question? Call us!
              </p>
              <p className="text-sm text-white/80">Mobile: (+91) XXXXXXXX</p>
              <p className="text-sm text-white/80">Mail: care@zaishree.com</p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-semibold text-[#B76E79] mb-2">
                <FiClock size={14} />
                Opening hours
              </p>
              <p className="text-sm text-white/80">Monday – Friday: 9am – 8pm</p>
              <p className="text-sm text-white/80">Saturday &amp; Sunday: 11am – 5pm</p>
            </div>
          </div>
        </div>

        {/* Right: Contact us + form */}
        <div>
          <h2 className="text-sm tracking-[0.15em] uppercase font-semibold text-[#2E2E2E] mb-4">
            Contact us
          </h2>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed mb-2">
            At Zaishree, your experience matters. Whether you need help with
            an order, have a question about our jewellery, or just want to
            say hello — we're happy to hear from you.
          </p>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed mb-8">
            Reach out to us via email, WhatsApp, or social media. Our
            customer care team is ready to assist with product details,
            return queries, gifting advice, or anything else you need.
          </p>

          {status === "sent" ? (
            <div className="border border-[#E8DDD3] bg-[#FAF7F4] rounded-sm p-10 text-center">
              <p className="font-serif text-xl text-[#2E2E2E] mb-2">Message sent</p>
              <p className="text-sm text-[#2E2E2E]/65 mb-4">
                We'll reply within one business day.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs tracking-wide uppercase text-[#B76E79] border-b border-[#B76E79] pb-0.5 hover:text-[#A85F6B] hover:border-[#A85F6B] transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name (required)"
                  className="w-full border border-[#E8DDD3] rounded-full px-5 py-3 text-sm text-[#2E2E2E] placeholder:text-[#2E2E2E]/45 outline-none focus:border-[#B76E79] transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email (required)"
                  className="w-full border border-[#E8DDD3] rounded-full px-5 py-3 text-sm text-[#2E2E2E] placeholder:text-[#2E2E2E]/45 outline-none focus:border-[#B76E79] transition-colors"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border border-[#E8DDD3] rounded-full px-5 py-3 text-sm text-[#2E2E2E] placeholder:text-[#2E2E2E]/45 outline-none focus:border-[#B76E79] transition-colors"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Your Message"
                className="w-full border border-[#E8DDD3] rounded-2xl px-5 py-4 text-sm text-[#2E2E2E] placeholder:text-[#2E2E2E]/45 outline-none focus:border-[#B76E79] transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex items-center gap-2 bg-[#2E2E2E] text-white px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase hover:bg-[#B76E79] transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-[#E8DDD3] bg-[#FAF7F4]">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <p className="text-sm text-[#2E2E2E]/65 mb-3">
            Have a question about shipping, returns, or care?
          </p>
          <Link
            to="/policy"
            className="text-sm tracking-wide uppercase text-[#B76E79] border-b border-[#B76E79] pb-0.5 hover:text-[#A85F6B] hover:border-[#A85F6B] transition-colors"
          >
            Read our policies
          </Link>
        </div>
      </section>
    </div>
  );
}