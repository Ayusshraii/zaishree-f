import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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
      name,
      email,
      phone,
      password,
      customerType,
      // only send GST if it's actually a B2B account
      gstNumber: isB2B ? gstNumber : null,
    });
    setLoading(false);
    navigate("/profile");
  };

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="max-w-sm mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-center mb-8">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">
              Full name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#4B0F14]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#4B0F14]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">
              Phone
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#4B0F14]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#4B0F14]"
            />
          </div>

          {/* Customer type — toggles GST field below */}
          <div>
            <label className="text-xs uppercase tracking-wide text-gray-500 mb-2 block">
              Customer Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCustomerType("b2c")}
                className={`flex-1 py-2 rounded-md text-sm border transition-colors ${
                  customerType === "b2c"
                    ? "border-[#4B0F14] bg-[#4B0F14] text-white"
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
                    ? "border-[#4B0F14] bg-[#4B0F14] text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                B2B (Business)
              </button>
            </div>
          </div>

          {/* GST number — only shown, and only required, for B2B accounts */}
          {isB2B && (
            <div>
              <label className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">
                GST Number
              </label>
              <input
                type="text"
                required={isB2B}
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm uppercase focus:outline-none focus:border-[#4B0F14]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Required for business accounts to enable GST-compliant invoicing.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#4B0F14] text-white text-sm uppercase tracking-wide hover:bg-[#3A0C10] disabled:opacity-60 transition-colors"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4B0F14] underline">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;