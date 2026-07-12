"use client";

import { createContext, useEffect, useState } from "react";
import * as authService from "@/services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (err) {
        setUser(null);
        setError(err.message);
        // Clear invalid token
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(
            process.env.NEXT_PUBLIC_TOKEN_KEY || "assetflow_token"
          );
        }
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    setError(null);
    try {
      const loggedInUser = await authService.login(credentials);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Ignore logout errors
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(
          process.env.NEXT_PUBLIC_TOKEN_KEY || "assetflow_token"
        );
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}