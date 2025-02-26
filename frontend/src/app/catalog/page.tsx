"use client";

import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { contentService, Content } from "@/services/api";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

export default function Catalog() {
  const [contents, setContents] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContents = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await contentService.getContents();
      setContents(data);
      setError("");
    } catch (error) {
      setError("Erro ao carregar o catálogo. Tente novamente.");
      console.error("Error loading contents:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchContents = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await contentService.searchContents(searchQuery);
      setContents(data);
      setError("");
    } catch (error) {
      setError("Erro ao buscar conteúdo. Tente novamente.");
      console.error("Error searching contents:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    loadContents();
  }, [loadContents]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchContents();
      } else {
        loadContents();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchContents, loadContents]);

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-8">Catálogo</h1>
          <div className="w-full max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar filmes, séries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : contents.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Nenhum conteúdo encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {contents.map((content) => (
              <ExpandableCard
                key={content.id}
                title={content.title}
                description={content.description}
                thumbnailUrl={content.thumbnailUrl}
                releaseYear={content.releaseYear}
                genre={content.genre}
                maturityRating={content.maturityRating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
