export default function About() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
            Sobre a SpaceFlix
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Transformando a maneira como você assiste e se diverte
          </p>
        </div>

        <div className="mt-20">
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-500 text-xs">
              A SpaceFlix nasceu da paixão por entretenimento e tecnologia.
              Nossa missão é proporcionar a melhor experiência de streaming, com
              conteúdo de qualidade e tecnologia de ponta.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-12">
              Nossa História
            </h2>
            <p className="text-gray-500 text-xs">
              Fundada em 2024, a SpaceFlix rapidamente se tornou uma das
              principais plataformas de streaming do Brasil. Com um catálogo
              diversificado e em constante expansão, oferecemos filmes, séries,
              documentários e conteúdo original para todos os gostos.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-12">
              Nossa Missão
            </h2>
            <p className="text-gray-500 text-xs">
              Democratizar o acesso ao entretenimento de qualidade, oferecendo
              uma plataforma intuitiva, conteúdo diversificado e preços
              acessíveis para todos os públicos.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-12">
              Nossos Valores
            </h2>
            <ul className="list-disc list-inside text-gray-500 text-xs">
              <li>Qualidade e inovação em primeiro lugar</li>
              <li>Compromisso com a satisfação do cliente</li>
              <li>Diversidade e inclusão em nosso conteúdo</li>
              <li>Transparência em nossas relações</li>
              <li>Responsabilidade social e ambiental</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-12">
              Tecnologia de Ponta
            </h2>
            <p className="text-gray-500 text-xs">
              Utilizamos as mais modernas tecnologias de streaming e compressão
              de vídeo para garantir a melhor qualidade de imagem e som, com o
              menor consumo de dados possível.
            </p>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-xl text-center font-bold text-gray-900">
                Entre em Contato
              </h2>
              <p className="text-gray-500 text-center mt-4 text-xs">
                Estamos sempre abertos para ouvir suas sugestões e feedbacks.
                Entre em contato conosco através do email:
                contato@spaceflix.com.br
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
