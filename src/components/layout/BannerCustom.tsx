import Image from 'next/image';
import { RxArrowRight } from 'react-icons/rx';
import { Banner_BannerHome_BhConteudo } from '../../generated';

interface Content {
  content: Banner_BannerHome_BhConteudo | undefined;
  link: boolean;
}

const BannerCustom = ({ content, link }: Content) => {
  if (!content) return null;
  const imgs = (
    <div className="h-[550px] xl:h-screen w-full relative">
      <Image
        className="hidden md:block object-cover"
        src={content?.bhImagemDesktop?.sourceUrl || ''}
        alt="Imagem Banner"
        fill
      />
      <Image
        className="block md:hidden object-cover"
        src={content?.bhImagemMobile?.sourceUrl || ''}
        alt="Imagem Banner"
        fill
      />
      <div className="absolute top-0 left-0 right-0 w-full bg-black/30 h-full"></div>
      <div className="w-full h-full absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center w-full h-full">
          <div className="max-w-[500px] text-white ml-[25px] 2xl:ml-[100px]">
            <h1 className="text-7xl font-semibold leading-[4.8rem] uppercase">
              {content.bhNomeDoEmpreendimento}
            </h1>
            <div className="border border-white py-1 px-1 inline-block text-sm xl:text-lg my-4">
              <span className="px-2 sm:px-4 uppercase">{`${content.bhQuantDormitorios} DORMS.`}</span>
              <span className="border-x border-white px-2 sm:px-4 uppercase">{`${content.bhQuantVagasGaragem} VAGAS`}</span>
              <span className="px-2 sm:px-4">{content.bhMetrosQuadrado}</span>
            </div>
            {link === true && (
              <button
                className="py-3 flex items-center uppercase"
                aria-label="Botão do banner"
              >
                <RxArrowRight size={30} className="mr-2" />
                {content.bhTextoDoBotao}
              </button>
            )}
          </div>
        </div>
        <div className="w-full overflow-hidden absolute -bottom-16 left-0 right-0">
          <div className="textAnimation">
            <div>
              <span>{content.bhNomeDoEmpreendimento}</span>
              <span>{content.bhNomeDoEmpreendimento}</span>
            </div>
            <div>
              <span>{content.bhNomeDoEmpreendimento}</span>
              <span>{content.bhNomeDoEmpreendimento}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {content?.bhLinkBanner && link === true ? (
        <a
          href={content?.bhLinkBanner}
          target={content?.bhNovaAba ? '_blank' : '_self'}
        >
          {imgs}
        </a>
      ) : (
        imgs
      )}
    </div>
  );
};

export default BannerCustom;
