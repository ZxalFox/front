"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") ?? null;
    const userId = localStorage.getItem("userId") ?? null;
    if (token && userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, id: number) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id.toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
