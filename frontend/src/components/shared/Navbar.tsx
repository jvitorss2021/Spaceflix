"use client";

import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Catálogo", href: "/catalog" },
  { name: "Sobre", href: "/about" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/60 backdrop-blur-sm">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex scale-90 lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-white">SpaceFlix</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menu principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm scale-95 font-semibold leading-6 text-white hover:text-indigo-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center text-white">
                <UserCircleIcon className="h-6 w-6 mr-2" />
                <span className="text-sm scale-90 font-semibold leading-6">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold scale-90 leading-6 text-white hover:text-indigo-400 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm scale-90 font-semibold leading-6 text-white hover:text-indigo-400 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="rounded-lg scale-90 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
              >
                Começar
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 w-full backdrop-blur-md bg-black/40 p-4 sm:max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold text-white">
                    SpaceFlix
                  </span>
                </Link>
                <button
                  type="button"
                  className="rounded-md p-2 text-white hover:bg-white/10 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Fechar menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-2">
                <div className="space-y-1 mb-4">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        href={item.href}
                        className="block rounded-lg px-4 py-2 text-base font-medium text-white hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  {user ? (
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center text-white p-2 rounded-lg bg-white/10">
                        <UserCircleIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full rounded-lg py-2 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                      >
                        Sair
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 mt-2">
                      <Link
                        href="/login"
                        className="block rounded-lg py-2 text-center text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/signup"
                        className="block rounded-lg py-2 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Começar
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
