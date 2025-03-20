"use client";

import { useState, useEffect } from "react";
import { contentService, Content } from "@/services/api";
import { ExpandableCard } from "@/components/ui/ExpandableCard";
import { Button } from "@/components/ui/MovingBorder";
import { useRouter } from "next/navigation";

export default function RecommendedContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchRecommendedContent() {
      try {
        const allContents = await contentService.getContents();
        const randomContents = [...allContents]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        setContents(randomContents);
      } catch (error) {
        console.error("Erro ao carregar conteúdo recomendado:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendedContent();
  }, []);

  return (
    <div className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Recomendados para você
          </h2>
          <Button
            as="button"
            onClick={() => router.push("/catalog")}
            className="!text-sm px-4 py-2 bg-gray-900 hover:bg-gray-800"
            containerClassName="w-auto h-10"
            borderClassName="bg-[radial-gradient(#818cf8_40%,transparent_60%)]"
          >
            Ver catálogo completo
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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
      </div>
    </div>
  );
}
