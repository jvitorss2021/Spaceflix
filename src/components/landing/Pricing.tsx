'use client';

import { CheckIcon } from '@heroicons/react/24/solid';

const tiers = [
  {
    name: 'Básico',
    price: 'R$ 29,90',
    frequency: '/mês',
    description: 'Perfeito para começar sua jornada de streaming.',
    features: [
      'Acesso a filmes e séries populares',
      'HD (720p)',
      '1 tela simultânea',
      'Sem anúncios',
      'Cancele quando quiser',
    ],
    cta: 'Começar Teste Grátis',
    featured: false,
  },
  {
    name: 'Premium',
    price: 'R$ 49,90',
    frequency: '/mês',
    description: 'A melhor experiência de streaming para você e sua família.',
    features: [
      'Todo o conteúdo do plano Básico',
      'Ultra HD (4K) e HDR',
      '4 telas simultâneas',
      'Downloads para assistir offline',
      'Conteúdo exclusivo',
      'Áudio espacial',
    ],
    cta: 'Assinar Agora',
    featured: true,
  },
  {
    name: 'Família',
    price: 'R$ 69,90',
    frequency: '/mês',
    description: 'Ideal para toda a família aproveitar junto.',
    features: [
      'Todo o conteúdo do plano Premium',
      'Ultra HD (4K) e HDR',
      '6 telas simultâneas',
      'Controle parental avançado',
      'Perfis personalizados',
      'Modo Kids',
    ],
    cta: 'Escolher Plano Família',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Planos para todos os perfis
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Escolha o plano perfeito para você e comece a assistir agora mesmo.
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl ${
                tier.featured
                  ? 'bg-indigo-600 text-white shadow-xl'
                  : 'bg-white text-gray-900 border border-gray-200'
              } p-8`}
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <p className={`mt-4 flex items-baseline text-2xl font-bold tracking-tight ${
                  tier.featured ? 'text-white' : 'text-gray-900'
                }`}>
                  {tier.price}
                  <span className="ml-1 text-xl font-medium">{tier.frequency}</span>
                </p>
                <p className={`mt-6 text-base ${
                  tier.featured ? 'text-indigo-100' : 'text-gray-500'
                }`}>
                  {tier.description}
                </p>

                <ul role="list" className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckIcon
                        className={`flex-shrink-0 w-5 h-5 ${
                          tier.featured ? 'text-indigo-300' : 'text-indigo-500'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="ml-3">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-8 block w-full py-3 px-6 rounded-md text-center font-medium ${
                  tier.featured
                    ? 'bg-white text-indigo-600 hover:bg-gray-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 