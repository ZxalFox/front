"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Conta criada com sucesso! Agora você pode fazer login.");
      router.push("/");
    } else {
      toast.error("Erro ao criar conta: " + data.errors.join(", "));
    }
  };

  return (
    <div className="bg-pink-800 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold">Cadastro de Usuário</h2>
      <form className="flex flex-col p-10 bg-pink-200 mt-4 ">
        <label htmlFor="name" className="text-pink-800 font-semibold mb-2">
          Nome
        </label>
        <input
          className="border-2 border-pink-800 text-pink-800 rounded-lg mb-4"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email" className="text-pink-800 font-semibold mb-2">
          Email
        </label>
        <input
          className="border-2 border-pink-800 text-pink-800 rounded-lg mb-4"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email" className="text-pink-800 font-semibold mb-2">
          Senha
        </label>
        <input
          id="password"
          className="border-2 border-pink-800 text-pink-800 rounded-lg mb-4"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink-800 mt-4 py-2 rounded-xl hover:cursor-pointer hover:bg-pink-200  hover:text-pink-800 duration-300 transition-all ease-in-out"
          onClick={handleSignup}
        >
          Cadastrar
        </button>

        <Link href="/" className="text-pink-800 mt-4 hover:text-pink-400">
          Já possui uma conta? Faça login
        </Link>
      </form>
    </div>
  );
};

export default Signup;
