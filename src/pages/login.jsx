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
    await login({ email, password, rememberMe });
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
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80"
              alt="Fine jewellery"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — form panel */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <p className="text-[#7A2E42] font-serif text-lg tracking-widest text-center mb-8">
              ZAISHREE
            </p>

            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Sign in to access your exclusive collections and curated
              selections.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={underlineLabel}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={underlineInput}
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label className={underlineLabel}>Password</label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#7A2E42] hover:underline"
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

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#7A2E42]"
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#7A2E42] text-white text-sm font-semibold uppercase tracking-widest rounded-md hover:bg-[#63233A] disabled:opacity-60 transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  Or continue with
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  <FcGoogle className="w-4 h-4" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm hover:bg-gray-50 transition-colors"
                >
                  <FaApple className="w-4 h-4" />
                  Apple
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 pt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#7A2E42] font-medium hover:underline">
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