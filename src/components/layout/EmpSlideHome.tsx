import { useEffect, useState } from 'react';
import { RootQueryToEmpreendimentoConnection } from '../../generated';
import BlockEmp from './BlockEmp';
import SlideApp from './Slide';

interface Props {
  data: RootQueryToEmpreendimentoConnection;
}

const EmpSlideHome = ({ data }: Props) => {
  const items = data.nodes.map((item) => {
    return <BlockEmp content={item} main={true} />;
  });

  const itemsMobile = data.nodes.slice(0, 4).map((item) => {
    return <BlockEmp content={item} main={true} />;
  });

  const responsive = {
    0: { items: 1 },
    568: { items: 2, itemsFit: 'contain' },
    1024: { items: 3, itemsFit: 'contain' },
  };

  const [largura, setLargura] = useState(false);
  useEffect(() => {
    window?.innerWidth < 640 && setLargura(true);
  }, []);

  return (
    <section className="bg-bgi py-[40px] md:py-[80px] emphome">
      <div className="sm:container">
        <h1 className="title">Empreendimentos</h1>
        {largura && (
          <div className="grid grid-cols-1 gap-6 container">
            {itemsMobile}
            <a
              href="/empreendimentos/todos"
              className="py-2 px-6 text-center bg-green text-block uppercase cursor-pointer"
            >
              Ver todos
            </a>
          </div>
        )}
        {largura === false && (
          <div className="my-6">
            <SlideApp
              items={items}
              responsive={responsive}
              largura={{ desktop: 0, mobile: 0 }}
              infinite={true}
              dots={false}
              navigation={false}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default EmpSlideHome;
