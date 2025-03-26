"use client";

import { BackgroundBeams } from "../ui/Backgroundbeams";
import { SparklesCore } from "../ui/Sparklescore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Hero() {
  const router = useRouter();
  const { user } = useAuth();

  const hasSubscription =
    user && user.subscriptionPlan && user.subscriptionPlan !== "free";

  const handleNavigateToCatalog = () => {
    router.push("/catalog");
  };

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-[100vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      <BackgroundBeams className="absolute inset-0 z-0" />

      <div className="relative z-10 scale-75 flex flex-col items-center justify-center">
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white mb-8">
          SpaceFlix
        </h1>

        {/* Effects Container */}
        <div className="w-full max-w-4xl h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Sparkles Effect */}
          <div
            className="absolute inset-0"
            style={{ height: "160px", width: "100%" }}
          >
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>

          {/* Radial Gradient Mask */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          {/* Saudação personalizada se estiver logado */}
          {user && (
            <p className="text-xl md:text-2xl text-white/80 text-center max-w-2xl mb-2">
              Bem-vindo de volta, {user.name}!{" "}
              {hasSubscription
                ? `Aproveite seu plano ${
                    user?.subscriptionPlan?.charAt(0).toUpperCase() +
                    user?.subscriptionPlan?.slice(1)
                  }!`
                : "Um universo de filmes, séries e documentários para você explorar"}
            </p>
          )}

          <div className="mt-8 flex gap-4">
            {/* Botão principal - texto muda com base no login */}
            <button
              onClick={handleNavigateToCatalog}
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all"
            >
              {user ? "Continuar Assistindo" : "Começar Agora"}
            </button>

            <button
              onClick={handleScrollToFeatures}
              className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
