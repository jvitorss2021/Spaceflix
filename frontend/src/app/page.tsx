// src/app/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import RecommendedContent from "@/components/landing/RecommendedContent";

export default function Home() {
  const { user, isLoading } = useAuth();

  const hasSubscription =
    user && user.subscriptionPlan && user.subscriptionPlan !== "free";

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <main>
      <Hero />

      {/* Exibição condicional de Features e Pricing */}
      {hasSubscription ? (
        <RecommendedContent />
      ) : (
        <>
          <Features />
          <Pricing />
        </>
      )}
    </main>
  );
}
