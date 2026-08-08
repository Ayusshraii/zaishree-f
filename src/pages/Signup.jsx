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
    "w-full border-0 border-b border-gray-300 px-0 py-2 text-sm bg-transparent placeholder:text-gray-400 focus:outline-none focus:border-[#7A2E42] transition-colors";
  const underlineLabel =
    "text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1 block";

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="bg-[#FBF1EE] py-10 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-md overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
          {/* Left — image panel */}
          <div className="relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80"
              alt="The Pearl Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-serif text-xl mb-1">The Pearl Collection</h3>
              <p className="text-sm text-white/85">
                Timeless elegance, reimagined for the modern collector.
              </p>
            </div>
          </div>

          {/* Right — form panel */}
          <div className="p-8 sm:p-10">
            <p className="text-[#7A2E42] font-serif text-lg tracking-widest mb-6">
              ZAISHREE
            </p>

            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Join Zaishree to manage your orders, wishlist, and experience
              personalized luxury.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={underlineLabel}>First Name</label>
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
                  <label className={underlineLabel}>Last Name</label>
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

              <div>
                <label className={underlineLabel}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={underlineInput}
                />
              </div>

              <div>
                <label className={underlineLabel}>Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={underlineInput}
                />
              </div>

              <div>
                <label className={underlineLabel}>Password</label>
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
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Customer type */}
              <div>
                <label className={underlineLabel}>Customer Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomerType("b2c")}
                    className={`flex-1 py-2 rounded-md text-sm border transition-colors ${
                      customerType === "b2c"
                        ? "border-[#7A2E42] bg-[#7A2E42] text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    B2C (Individual)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerType("b2b")}
                    className={`flex-1 py-2 rounded-md text-sm border transition-colors ${
                      customerType === "b2b"
                        ? "border-[#7A2E42] bg-[#7A2E42] text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    B2B (Business)
                  </button>
                </div>
              </div>

              {/* GST — only for B2B */}
              {isB2B && (
                <div>
                  <label className={underlineLabel}>GST Number</label>
                  <input
                    type="text"
                    required={isB2B}
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                    className={`${underlineInput} uppercase`}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Required for business accounts to enable GST-compliant
                    invoicing.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#141311] text-white text-sm font-semibold uppercase tracking-wide rounded-md hover:bg-[#2A2822] disabled:opacity-60 transition-colors"
              >
                {loading ? "Creating account..." : "Register"}
              </button>

              <p className="text-xs text-gray-500 pt-1">
                By registering, you agree to our{" "}
                <Link to="/terms" className="text-[#7A2E42] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#7A2E42] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="pt-3 border-t border-gray-100 text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#7A2E42] font-medium hover:underline">
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