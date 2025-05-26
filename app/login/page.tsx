"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div>
      <h1>Faça login para acessar o Diário de Emoções</h1>
      <button onClick={login}>Login com Keycloak</button>
    </div>
  );
}
