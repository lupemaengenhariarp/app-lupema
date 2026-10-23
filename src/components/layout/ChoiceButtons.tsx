import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ChoiceButtons() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const isBlog = router.pathname === '/blog';

  const buttons = [
    { label: 'QUERO INVESTIR' },
    { label: 'QUERO MORAR' },
    { label: 'ESTILO DE VIDA' },
    { label: 'QUERO MORAR' },
  ];
  return (
    <div className="container text-white text-center py-[74px]">
      <h1 className="text-3xl font-light tracking-[15px] uppercase text-green">
        Lorem ipsum dolor sit amet
      </h1>
      {isBlog && (
        <p className="max-w-screen-lg mx-auto mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
          consectetur, ante non vulputate pharetra, sem nibh fringilla quam, non
          efficitur risus lorem nec massa. Vestibulum maximus, arcu vel egestas
          dignissim, nulla sem varius felis, id euismod libero nibh in lorem.
        </p>
      )}
      <div className={`flex items-center justify-center flex-wrap md:flex-nowrap gap-2 sm:gap-4 ${isBlog ? 'mt-20' : 'mt-12'}`}>
        {buttons.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
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
