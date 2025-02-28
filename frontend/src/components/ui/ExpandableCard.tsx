"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ExpandableCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  releaseYear: number;
  genre: string;
  maturityRating: string;
  contentUrl: string;
}

export const ExpandableCard = ({
  title,
  description,
  thumbnailUrl,
  releaseYear,
  genre,
  maturityRating,
  contentUrl,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (contentUrl) {
      window.open(contentUrl, "_blank", "noopener,noreferrer");
    } else {
      console.error("URL do trailer não disponível");
    }

    return false;
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        animate={{
          height: isExpanded ? "400px" : "200px",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="relative w-full"
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <motion.div
            animate={{
              y: isExpanded ? 0 : 0, // Removido o deslocamento inicial
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {/* Título sempre visível */}
            <h3 className="text-white font-bold text-xl mb-2">{title}</h3>

            {/* Informações extras visíveis apenas quando expandido */}
            <motion.div
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="overflow-hidden"
            >
              <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
                <span>{releaseYear}</span>
                <span>•</span>
                <span>{genre}</span>
                <span>•</span>
                <span>{maturityRating}</span>
              </div>

              <p className="text-gray-300 text-sm mb-4">{description}</p>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/90">
                  Assistir
                </button>
                <button
                  onClick={handleTrailerClick}
                  className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30"
                >
                  Trailer
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
