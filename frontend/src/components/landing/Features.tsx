"use client";

import { BackgroundBeams } from "../ui/Backgroundbeams";
import {
  DevicePhoneMobileIcon,
  FilmIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Assista em Qualquer Lugar",
    description:
      "Acesse seu conteúdo favorito em qualquer dispositivo, a qualquer momento. Compatível com smartphones, tablets, smart TVs e mais.",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Conteúdo Exclusivo",
    description:
      "Desfrute de filmes, séries e documentários exclusivos produzidos especialmente para nossa plataforma.",
    icon: FilmIcon,
  },
  {
    name: "Disponível Globalmente",
    description:
      "Acesse nossa plataforma de qualquer lugar do mundo, com suporte a múltiplos idiomas e legendas.",
    icon: GlobeAltIcon,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-black relative">
      <BackgroundBeams className="absolute inset-0 z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Por que escolher nossa plataforma?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Oferecemos a melhor experiência de streaming com recursos exclusivos
            para você.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
