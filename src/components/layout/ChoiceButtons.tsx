import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
  onSelect?: (category: string | null) => void;
}

export default function ChoiceButtons({ onSelect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const isBlog = router.pathname === '/blog';

  const buttons = [
    { label: 'QUERO INVESTIR', value: 'quero-investir' },
    { label: 'QUERO MORAR', value: 'quero-morar' },
    { label: 'ESTILO DE VIDA', value: 'estilo-de-vida' },
  ];
  return (
    <div className="container text-white text-center py-[74px]">
      <h1 className="text-3xl font-light tracking-[15px] uppercase text-green">
        CADA ARTIGO, UMA NOVA PERSPECTIVA
      </h1>
      {isBlog && (
        <p className="max-w-screen-lg mx-auto mt-8">
          Arquitetura, tendências e experiências que conectam o que acontece no
          mercado imobiliário ao que importa na sua vida. Explore os conteúdos e
          encontre inspiração para suas próximas escolhas.
        </p>
      )}
      <div
        className={`flex items-center justify-center flex-wrap md:flex-nowrap gap-2 sm:gap-4 ${
          isBlog ? 'mt-20' : 'mt-12'
        }`}
      >
        {buttons.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              const nextSelected = selected === index ? null : index;
              setSelected(nextSelected);
              onSelect?.(nextSelected === null ? null : item.value);
            }}
            className={`uppercase text-sm md:text-base 2xl:text-2xl py-3 sm:py-6 px-4 xl:px-8 border font-light sm:tracking-[8px] w-[49%] md:w-auto ${
              selected === index
                ? '!border-green text-green'
                : 'border-white/20'
            }  hover:border-green hover:text-green transition-all`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
