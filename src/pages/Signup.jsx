import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [customerType, setCustomerType] = useState("b2c");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const isB2B = customerType === "b2b";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signup({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      password,
      customerType,
      gstNumber: isB2B ? gstNumber : null,
    });

    setLoading(false);
    navigate("/profile");
  };

  const underlineInput =
    "w-full border-0 border-b border-[#E8DDD3] px-0 py-2 text-sm text-[#2E2E2E] bg-transparent placeholder:text-gray-400 focus:outline-none focus:border-[#B76E79] transition-colors";

  const underlineLabel =
    "text-[11px] font-semibold uppercase tracking-wider text-[#2E2E2E] mb-1 block";

  return (
    <>
      {/* Navbar */}
      <div className="border-b border-[#E8DDD3] bg-white">
        <Navbar />
      </div>

      {/* Signup Section */}
      <div className="min-h-screen bg-white py-10 px-4 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white border border-[#E8DDD3] overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* ================= LEFT IMAGE ================= */}
          <div className="relative hidden md:block bg-[#FAF7F4]">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80"
              alt="The Pearl Collection"
              className="w-full h-full object-cover"
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Collection Content */}
            <div className="absolute bottom-7 left-7 right-7 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2">
                Zaishree Collection
              </p>

              <h3 className="font-serif text-2xl mb-1">
                The Pearl Collection
              </h3>

              <p className="text-sm text-white/90 leading-relaxed">
                Timeless elegance, reimagined for the modern collector.
              </p>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-8 sm:p-10 bg-white">

            {/* Brand */}
            <p className="text-[#B76E79] font-serif text-lg tracking-[0.3em] mb-6">
              ZAISHREE
            </p>

            {/* Heading */}
            <h1 className="font-serif text-3xl text-[#2E2E2E] mb-2">
              Create Account
            </h1>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Join Zaishree to manage your orders, wishlist, and experience
              personalized luxury.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ================= NAME ================= */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={underlineLabel}>
                    First Name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={underlineInput}
                  />
                </div>

                <div>
                  <label className={underlineLabel}>
                    Last Name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={underlineInput}
                  />
                </div>
              </div>

              {/* ================= EMAIL ================= */}
              <div>
                <label className={underlineLabel}>
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={underlineInput}
                />
              </div>

              {/* ================= PHONE ================= */}
              <div>
                <label className={underlineLabel}>
                  Phone
                </label>

                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={underlineInput}
                />
              </div>

              {/* ================= PASSWORD ================= */}
              <div>
                <label className={underlineLabel}>
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${underlineInput} pr-8`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B76E79] transition-colors"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* ================= CUSTOMER TYPE ================= */}
              <div>
                <label className={underlineLabel}>
                  Customer Type
                </label>

                <div className="flex gap-3">

                  {/* B2C */}
                  <button
                    type="button"
                    onClick={() => setCustomerType("b2c")}
                    className={`flex-1 py-2.5 rounded-md text-sm border transition-colors ${
                      customerType === "b2c"
                        ? "border-[#B76E79] bg-[#B76E79] text-white"
                        : "border-[#E8DDD3] text-[#2E2E2E] hover:bg-[#FAF7F4] hover:border-[#D8A7AF]"
                    }`}
                  >
                    B2C (Individual)
                  </button>

                  {/* B2B */}
                  <button
                    type="button"
                    onClick={() => setCustomerType("b2b")}
                    className={`flex-1 py-2.5 rounded-md text-sm border transition-colors ${
                      customerType === "b2b"
                        ? "border-[#B76E79] bg-[#B76E79] text-white"
                        : "border-[#E8DDD3] text-[#2E2E2E] hover:bg-[#FAF7F4] hover:border-[#D8A7AF]"
                    }`}
                  >
                    B2B (Business)
                  </button>

                </div>
              </div>

              {/* ================= GST ================= */}
              {isB2B && (
                <div>
                  <label className={underlineLabel}>
                    GST Number
                  </label>

                  <input
                    type="text"
                    required={isB2B}
                    value={gstNumber}
                    onChange={(e) =>
                      setGstNumber(e.target.value.toUpperCase())
                    }
                    placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                    className={`${underlineInput} uppercase`}
                  />

                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    Required for business accounts to enable GST-compliant
                    invoicing.
                  </p>
                </div>
              )}

              {/* ================= REGISTER BUTTON ================= */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#B76E79] text-white text-sm font-semibold uppercase tracking-widest rounded-md hover:bg-[#A85F6B] disabled:opacity-60 transition-colors"
              >
                {loading ? "Creating account..." : "Register"}
              </button>

              {/* ================= TERMS ================= */}
              <p className="text-xs text-gray-500 pt-1 leading-relaxed">
                By registering, you agree to our{" "}
                <Link
                  to="/terms"
                  className="text-[#B76E79] hover:text-[#A85F6B] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-[#B76E79] hover:text-[#A85F6B] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* ================= LOGIN ================= */}
              <div className="pt-4 border-t border-[#E8DDD3] text-sm text-[#2E2E2E]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#B76E79] font-medium hover:text-[#A85F6B] hover:underline transition-colors"
                >
                  Log in here
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;