"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { contentService, Content } from "@/services/api";
import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/MovingBorder";

export default function ContentDetail() {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    async function fetchContent() {
      try {
        if (!id) return;

        setIsLoading(true);
        const contents = await contentService.getContents();
        const contentId =
          typeof id === "string" ? id : Array.isArray(id) ? id[0] : null;
        const foundContent = contents.find((c) => String(c.id) === contentId);

        if (foundContent) {
          setContent(foundContent);
        } else {
          // Conteúdo não encontrado
          router.push("/catalog");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">Conteúdo não encontrado</h1>
          <Link
            href="/catalog"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Voltar para o catálogo
          </Link>
        </div>
      </div>
    );
  }

  const getBackgroundImage = (title: string): string => {
    const backgroundMap: Record<string, string> = {
      "The Office": "/images/TheOffice.webp",
      "Breaking Bad": "/images/breakingbad-bg.webp",
      Vikings: "/images/vikings-bg.webp",
      Interestelar: "/images/interstelar-bg.webp",
      "Demon Slayer": "/images/demonslayer-bg.webp",
      "Hunter x Hunter": "/images/hunterxhunter-bg.webp",
      "Black Mirror": "/images/blackmirror-bg.webp",
      "Jujutsu Kaisen": "/images/jujutsukaisen-bg.webp",
      "Nível Secreto": "/images/nivelsecreto-bg.webp",
      "Alice in Borderland": "/images/aliceinborderland-bg.webp",
      Invencível: "/images/invencivel-bg.webp",
      "Love, Death & Robots": "/images/lovedeathrobots-bg.webp",
      "Re:Zero": "/images/rezero-bg.webp",
      Reacher: "/images/reacher-bg.webp",
      "The 100": "/images/the100-bg.webp",
      "The Legend of Vox Machina": "/images/voxmachina-bg.webp",
      "Vis a Vis": "/images/visavis-bg.webp",
    };

    return backgroundMap[title] || content?.thumbnailUrl || "";
  };

  const backgroundImage = getBackgroundImage(content.title);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero section com imagem de fundo em altura total */}
      <div
        className="relative h-[100vh] w-full"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 60%, rgba(17,24,39,1) 95%), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Mantém a imagem fixa durante o scroll
        }}
      >
        <div className="absolute bottom-[15%] left-0 p-8 sm:p-16 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {content.title}
          </h1>
          <div className="flex flex-wrap items-center text-white/80 text-sm md:text-base gap-4 mb-6">
            <span>{content.releaseYear}</span>
            <span>•</span>
            <span>{content.maturityRating}</span>
            <span>•</span>
            <span>{content.genre}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo e detalhes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Coluna da esquerda com thumbnail */}
          <div className="hidden md:block">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={content.thumbnailUrl}
                alt={content.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Coluna central com detalhes */}
          <div className="md:col-span-2 text-white bg-gray-900/80 p-6 backdrop-blur-sm rounded-lg shadow-xl">
            <div className="mb-8">
              <Button
                as="a"
                href={content.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-lg flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors px-8 py-4"
                containerClassName="w-auto h-14"
                borderClassName="bg-[radial-gradient(#818cf8_40%,transparent_60%)]"
              >
                <PlayIcon className="h-5 w-5" />
                Assistir Agora
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
                <p className="text-gray-300 leading-relaxed">
                  {content.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Detalhes</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-gray-400">Direção</dt>
                    <dd className="text-white">{content.director}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Elenco</dt>
                    <dd className="text-white">{content.cast}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Gênero</dt>
                    <dd className="text-white">{content.genre}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Classificação</dt>
                    <dd className="text-white">{content.maturityRating}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
