"use client";

import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { contentService, Content } from "@/services/api";
import { ExpandableCard } from "@/components/ui/ExpandableCard";
import { Button } from "@/components/ui/MovingBorder";

export default function Catalog() {
  const [contents, setContents] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContents = useCallback(
    async (query: string = "", type: string | null = null) => {
      try {
        setIsLoading(true);
        let data = query
          ? await contentService.searchContents(query)
          : await contentService.getContents();

        // Filtrar por tipo se um tipo estiver selecionado
        if (type) {
          data = data.filter((content) => content.type === type);
        }

        // Ordenar em ordem alfabética
        const sortedData = [...data].sort((a, b) =>
          a.title.localeCompare(b.title, "pt-BR")
        );

        setContents(sortedData);
        setError("");
      } catch (error) {
        setError(
          query
            ? "Erro ao buscar conteúdo. Tente novamente."
            : "Erro ao carregar o catálogo. Tente novamente."
        );
        console.error("Error fetching contents:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchContents(searchQuery, selectedType);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedType, fetchContents]);

  const handleTypeFilter = (type: string) => {
    setSelectedType(selectedType === type ? null : type);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-8">Catálogo</h1>

          {/* Busca */}
          <div className="w-full max-w-lg mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar filmes, séries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Filtros de tipo com o Button do Aceternity UI */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {selectedType === "movie" ? (
              <Button
                borderRadius="1.25rem"
                className="h-10 !text-base px-6 bg-gray-900/80"
                containerClassName="w-auto h-10"
                borderClassName="bg-[radial-gradient(#818cf8_40%,transparent_60%)]"
                duration={2000}
                onClick={() => handleTypeFilter("movie")}
              >
                Filmes
              </Button>
            ) : (
              <button
                className="h-10 px-6 rounded-full text-sm font-medium bg-gray-800/80 text-white hover:bg-gray-700/80 transition-colors"
                onClick={() => handleTypeFilter("movie")}
              >
                Filmes
              </button>
            )}

            {selectedType === "series" ? (
              <Button
                borderRadius="1.25rem"
                className="h-10 !text-base px-6 bg-gray-900/80"
                containerClassName="w-auto h-10"
                borderClassName="bg-[radial-gradient(#818cf8_40%,transparent_60%)]"
                duration={2000}
                onClick={() => handleTypeFilter("series")}
              >
                Séries
              </Button>
            ) : (
              <button
                className="h-10 px-6 rounded-full text-sm font-medium bg-gray-800/80 text-white hover:bg-gray-700/80 transition-colors"
                onClick={() => handleTypeFilter("series")}
              >
                Séries
              </button>
            )}

            {selectedType === "anime" ? (
              <Button
                borderRadius="1.25rem"
                className="h-10 !text-base px-6 bg-gray-900/80"
                containerClassName="w-auto h-10"
                borderClassName="bg-[radial-gradient(#818cf8_40%,transparent_60%)]"
                duration={2000}
                onClick={() => handleTypeFilter("anime")}
              >
                Animes
              </Button>
            ) : (
              <button
                className="h-10 px-6 rounded-full text-sm font-medium bg-gray-800/80 text-white hover:bg-gray-700/80 transition-colors"
                onClick={() => handleTypeFilter("anime")}
              >
                Animes
              </button>
            )}

            {selectedType && (
              <button
                className="h-10 px-6 rounded-full text-sm font-medium bg-red-950 text-white hover:bg-red-900 transition-colors"
                onClick={() => setSelectedType(null)}
              >
                Limpar Filtro
              </button>
            )}
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
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl mb-2">Nenhum conteúdo encontrado.</p>
            {selectedType && (
              <p className="text-sm">
                Tente remover o filtro ou usar outra palavra-chave.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {contents.map((content) => (
              <ExpandableCard
                key={content.id}
                id={String(content.id)}
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

        {/* Contador de resultados */}
        {!isLoading && contents.length > 0 && (
          <div className="text-center mt-8 text-gray-400 text-sm">
            {contents.length}{" "}
            {contents.length === 1
              ? "resultado encontrado"
              : "resultados encontrados"}
            {selectedType && (
              <span>
                {" "}
                para{" "}
                {selectedType === "movie"
                  ? "Filmes"
                  : selectedType === "series"
                  ? "Séries"
                  : "Animes"}
              </span>
            )}
            {searchQuery && <span> com {searchQuery}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
