'use client';

import { useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-900 opacity-90" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Sua Nova Plataforma de
            <span className="block text-indigo-400">Streaming Favorita</span>
          </h1>
          
          <p className="mt-6 max-w-lg mx-auto text-xl md:text-2xl text-gray-300">
            Assista aos melhores conteúdos em qualquer lugar, a qualquer momento.
            Comece sua jornada hoje mesmo!
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                inline-flex items-center px-6 py-3 rounded-lg text-lg font-medium
                transition-all duration-200 ease-in-out
                ${isHovered 
                  ? 'bg-indigo-600 text-white transform scale-105'
                  : 'bg-white text-black hover:bg-indigo-600 hover:text-white'
                }
              `}
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              Começar Agora
            </button>
            
            <button className="
              inline-flex items-center px-6 py-3 rounded-lg text-lg font-medium
              border-2 border-white text-white hover:bg-white hover:text-black
              transition-all duration-200 ease-in-out
            ">
              Saiba Mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 