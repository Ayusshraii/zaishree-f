import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const AuthPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  /* ---------------- Login state ---------------- */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    await login({ email: loginEmail, password: loginPassword, rememberMe });
    setLoginLoading(false);
    navigate("/profile");
  };

  /* ---------------- Signup state ---------------- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [customerType, setCustomerType] = useState("b2c");
  const [gstNumber, setGstNumber] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const isB2B = customerType === "b2b";

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    await signup({
      name: `${firstName} ${lastName}`.trim(),
      email: signupEmail,
      phone,
      password: signupPassword,
      customerType,
      gstNumber: isB2B ? gstNumber : null,
    });
    setSignupLoading(false);
    navigate("/profile");
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#4B0F14]";
  const labelClasses =
    "text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block";

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="bg-[#FBF6F0] py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-2 md:divide-x divide-gray-200">
          {/* ---------------- LOGIN ---------------- */}
          <div className="p-8 sm:p-10">
            <h1 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Sign in to access your curated collections and orders.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={labelClasses}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Password</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={`${inputClasses} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#4B0F14]"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#4B0F14] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-[#4B0F14] text-white text-sm font-semibold uppercase tracking-wide rounded-sm hover:bg-[#4B0F14]  disabled:opacity-60 transition-colors"
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[11px] uppercase tracking-wider text-gray-400">
                  Or continue with
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-sm py-2.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  <FcGoogle className="w-4 h-4" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-sm py-2.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  <FaApple className="w-4 h-4" />
                  Apple
                </button>
              </div>
            </form>
          </div>

          {/* ---------------- SIGNUP ---------------- */}
          <div className="p-8 sm:p-10">
            <h1 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Join AURUM to experience seamless shopping and exclusive
              privileges.
            </p>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClasses}>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Password</label>
                <div className="relative">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    required
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className={`${inputClasses} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showSignupPassword ? "Hide password" : "Show password"}
                  >
                    {showSignupPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Customer type */}
              <div>
                <label className={labelClasses}>Customer Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomerType("b2c")}
                    className={`flex-1 py-2 rounded-sm text-sm border transition-colors ${
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
                    className={`flex-1 py-2 rounded-sm text-sm border transition-colors ${
                      customerType === "b2b"
                        ? "border-[#4B0F14] bg-[#4B0F14] text-white"
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
                  <label className={labelClasses}>GST Number</label>
                  <input
                    type="text"
                    required={isB2B}
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                    className={`${inputClasses} uppercase`}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Required for business accounts to enable GST-compliant
                    invoicing.
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-500 pt-1">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-[#4B0F14] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#4B0F14] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={signupLoading}
                className="w-full py-3 bg-gray-200 text-gray-900 text-sm font-semibold rounded-sm uppercase tracking-wide hover:bg-gray-300 disabled:opacity-60 transition-colors"
              >
                {signupLoading ? "Creating account..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;