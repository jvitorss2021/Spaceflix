"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/api";
import { BackgroundBeams } from "@/components/ui/Backgroundbeams";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.login({
        email,
        password,
      });

      console.log("Login successful:", response);

      // Aqui é importante: deve salvar o usuário no contexto
      setUser(response);

      // Redirecionar para o catálogo
      window.location.href = "/catalog";
    } catch (error) {
      console.error("Login error:", error);
      setError("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <BackgroundBeams className="absolute inset-0 z-0" />
      <div className="sm:mx-auto sm:w-full scale-75 sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Entre na sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Ou{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            crie uma conta gratuita
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full scale-90 sm:max-w-md relative z-10">
        <div className="bg-gray-700 bg-opacity-10 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div
              className="mb-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-200"
                >
                  Lembrar de mim
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
