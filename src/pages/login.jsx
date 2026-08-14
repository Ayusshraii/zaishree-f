import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await login({
      email,
      password,
      rememberMe,
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

      {/* Login Section */}
      <div className="min-h-screen bg-white py-10 px-4 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white border border-[#E8DDD3] overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* ================= LEFT IMAGE ================= */}
          <div className="relative hidden md:block bg-[#FAF7F4]">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80"
              alt="Fine jewellery"
              className="w-full h-full object-cover"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-black/5" />

            {/* Brand text */}
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white text-[10px] uppercase tracking-[0.3em] mb-2">
                Timeless Elegance
              </p>

              <h2 className="font-serif text-3xl text-white">
                Jewellery that tells your story.
              </h2>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="p-8 sm:p-10 flex flex-col justify-center bg-white">

            {/* Logo / Brand */}
            <p className="text-[#B76E79] font-serif text-lg tracking-[0.3em] text-center mb-8">
              ZAISHREE
            </p>

            {/* Heading */}
            <h1 className="font-serif text-3xl text-[#2E2E2E] mb-2">
              Welcome Back
            </h1>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Sign in to access your exclusive collections and curated
              selections.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className={underlineLabel}>
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={underlineInput}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label className={underlineLabel}>
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#B76E79] hover:text-[#A85F6B] hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
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

              {/* Remember Me */}
              <label className="flex items-center gap-2 text-sm text-[#2E2E2E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="accent-[#B76E79]"
                />

                Remember me
              </label>

              {/* Sign In */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#B76E79] text-white text-sm font-semibold uppercase tracking-widest rounded-md hover:bg-[#A85F6B] disabled:opacity-60 transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-[#E8DDD3]" />

                <span className="text-[10px] uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  Or continue with
                </span>

                <div className="flex-1 h-px bg-[#E8DDD3]" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">

                {/* Google */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-[#E8DDD3] rounded-md py-2.5 text-sm text-[#2E2E2E] hover:bg-[#FAF7F4] hover:border-[#D8A7AF] transition-colors"
                >
                  <FcGoogle className="w-4 h-4" />
                  Google
                </button>

                {/* Apple */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-[#E8DDD3] rounded-md py-2.5 text-sm text-[#2E2E2E] hover:bg-[#FAF7F4] hover:border-[#D8A7AF] transition-colors"
                >
                  <FaApple className="w-4 h-4" />
                  Apple
                </button>

              </div>

              {/* Signup */}
              <p className="text-center text-sm text-gray-600 pt-2">
                Don't have an account?{" "}

                <Link
                  to="/signup"
                  className="text-[#B76E79] font-medium hover:text-[#A85F6B] hover:underline transition-colors"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;