import TagApp from './Tag';
import { BiBed } from 'react-icons/bi';
import { TbCar } from 'react-icons/tb';
import { TbArrowRightBar } from 'react-icons/tb';
import { GoLocation } from 'react-icons/go';
import { Empreendimento } from '../../generated';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  content: Empreendimento | undefined;
  main: boolean;
}

const BlockEmp = ({ content, main = true }: Props) => {
  if (!content) return null;

  const [larg, setLarg] = useState(0);

  useEffect(() => {
    setLarg(window?.innerWidth > 1536 ? 500 : 480);
  }, []);

  return (
    <Link href={`/empreendimento/${content.slug}`} className="pb-6">
      <div className="relative bg-blue/20 aspect-auto">
        <Image
          src={content.empreendimento?.imagemPrincipal?.sourceUrl || ''}
          width={larg}
          height={670}
          alt="Imagem principal"
        />
        <TagApp name={content.empreendimento} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-green mt-3 uppercase">
          {content.empreendimento?.nomeDoEmpreendimento}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-green mt-2">
          <div className="col-span-2 order-2 sm:order-1">
            {main && (
              <>
                <p className="text-white flex items-center my-1">
                  <TbArrowRightBar size={20} />
                  <span className="ml-3">
                    {content.empreendimento?.empMetragem}
                  </span>
                </p>
                <div className="flex items-center text-white">
                  <GoLocation size={18} />
                  <span className="ml-2 text-sm">
                    {content.empreendimento?.empCidade}
                  </span>
                </div>
              </>
            )}
          </div>
          {main && (
            <div className="order-1 sm:order-2">
              <div className="flex">
                <BiBed size={22} />
                <span className="ml-2">
                  {content.empreendimento?.empDormitorios}
                </span>
                <p className="ml-1">dorms</p>
              </div>
              <div className="flex">
                <TbCar size={22} />
                <span className="ml-2">
                  {content.empreendimento?.empVagasDeGaragem}
                </span>
                <p className="ml-1">vagas</p>
              </div>
            </div>
          )}

          {!main && (
            <span className="italic text-white text-sm">Saiba mais</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlockEmp;
