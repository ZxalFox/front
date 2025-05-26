"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProtectedPage() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Você precisa estar autenticado para acessar esta página.</p>;
  }

  return (
    <div>
      <h1>Bem-vindo à página protegida!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
