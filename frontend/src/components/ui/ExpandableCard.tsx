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
}

export const ExpandableCard = ({
  title,
  description,
  thumbnailUrl,
  releaseYear,
  genre,
  maturityRating,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
              y: isExpanded ? 0 : 60,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
              <span>{releaseYear}</span>
              <span>•</span>
              <span>{genre}</span>
              <span>•</span>
              <span>{maturityRating}</span>
            </div>

            <motion.p
              className="text-gray-300 text-sm"
              animate={{
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex gap-2 mt-4"
              animate={{
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/90">
                Assistir
              </button>
              <button className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30">
                Trailer
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
