"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      login(data.token, data.user_id);
      toast.success("Login bem-sucedido!");
      router.push("/in/diary");
    } else {
      toast.error("Credenciais inválidas!");
    }
  };

  return (
    <div className="bg-pink-800 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold">Login</h2>
      <div>
        <form className="flex flex-col p-10 bg-pink-200 mt-4 min-h-[300px]">
          <label htmlFor="email" className="text-pink-800 font-semibold mb-2">
            E-mail
          </label>
          <input
            id="email"
            className="border-2 border-pink-800 text-pink-800 rounded-lg mb-4"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="password"
            className="text-pink-800 font-semibold mb-2"
          >
            Senha
          </label>
          <input
            className="border-2 border-pink-800 text-pink-800 rounded-lg"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-800 mt-6 py-2 rounded-xl hover:cursor-pointer hover:bg-pink-200  hover:text-pink-800 duration-300 transition-all ease-in-out"
            onClick={handleLogin}
          >
            Entrar
          </button>
        </form>
        <Link href="/signup" className="text-pink-800 mt-4 hover:text-pink-400">
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default Login;
