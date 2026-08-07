import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // mock login — swap for a real API call once your backend has auth endpoints
  const login = async (email, password) => {
    // pretend network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const name = email.split("@")[0];
    setUser({ name, email });
    toast.success("Logged in successfully");
  };

  // mock signup — swap for a real API call once your backend has auth endpoints.
  // accepts a full details object since B2B accounts need extra fields.
  const signup = async ({ name, email, phone, password, customerType, gstNumber }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser({ name, email, phone, customerType, gstNumber });
    toast.success("Account created");
  };

  const logout = () => {
    setUser(null);
    toast("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};