"use client";

import { useEffect, useState } from "react";
import keycloak from "@/lib/keycloak";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: "login-required" }).then((auth) => {
      setIsAuthenticated(auth);
    });
  }, []);

  return {
    isAuthenticated,
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
  };
}
