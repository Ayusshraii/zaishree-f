import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigate("/profile");
  };

  return (
    <>
      <div className="border-1 border-gray-300">
        <Navbar />
      </div>

      <div className="max-w-sm mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-center mb-8">Log In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#4B0F14] text-white text-sm uppercase tracking-wide hover:bg-[#3A0C10] disabled:opacity-60 transition-colors"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#4B0F14] underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;