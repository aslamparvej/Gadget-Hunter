"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    id: "c1",
    email: "customer@demo.com",
    password: "demo123",
    name: "Alex Johnson",
    role: "customer",
    avatar: null,
  },
  {
    id: "s1",
    email: "seller@demo.com",
    password: "demo123",
    name: "Priya Patel",
    role: "seller",
    avatar: null,
    storeName: "Priya's Boutique",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecom_user");
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) throw new Error("Invalid email or password");

    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem("user", JSON.stringify(safe));
    return safe;
  };

  const register = (name, email, password, role, storeName) => {
    const exists = MOCK_USERS.find(u => u.email === email);
    if(exists) throw new Error ("Email already registered");

    const newUser = { id: `u${Date.now()}`, name, email, role, storeName: storeName || null };
    setUser(newUser);

    localStorage.setItem("ecom_user", JSON.stringify(newUser));
    return newUser;
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error("useAuth must be used within AuthProvider");

  return ctx;
}
