"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/services/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao analisar usuário do cookie:", error);
        Cookies.remove("user");
      }
    }
    setIsLoading(false);
  }, []);

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
    } else {
      Cookies.remove("user");
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser: handleSetUser, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
