import { useState } from 'react';
import Image from 'next/image';
import HeroBlog from '../../../components/layout/HeroBlog';
import SearchBlob from '../../../components/layout/SearchBlog';
import ShortVideo from '../../../components/layout/ShortVideo';
import ClientApp from '../../../lib/genql';
import {
  Page,
  Page_Informacoesdecontato,
  RootQueryToGqlShortConnection,
} from '../../../generated';

interface Props {
  data: {
    page: Page;
    shorts: RootQueryToGqlShortConnection;
    social: Page_Informacoesdecontato;
  };
}

export default function Shorts({ data }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const normalizeText = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('pt-BR');

  const filteredShorts = data.shorts.nodes.filter((short) =>
    normalizeText(short.acf_shorts?.tituloDoShort || '').includes(
      normalizeText(searchTerm.trim())
    )
  );

  function getYouTubeVideoId(value: string): string {
    if (!value) return '';

    const input = value.trim();

    // Se já for somente o ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }

    try {
      const url = new URL(
        input.startsWith('http') ? input : `https://${input}`
      );

      // youtube.com/shorts/ID
      // youtube.com/watch?v=ID
      // youtube.com/embed/ID
      // youtube.com/live/ID
      if (
        url.hostname === 'youtube.com' ||
        url.hostname === 'www.youtube.com' ||
        url.hostname === 'm.youtube.com'
      ) {
        const match = url.pathname.match(
          /^\/(?:shorts|embed|live)\/([a-zA-Z0-9_-]{11})/
        );

        if (match) return match[1];

        const videoId = url.searchParams.get('v');

        if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          return videoId;
        }
      }

      // youtu.be/ID
      if (url.hostname === 'youtu.be') {
        const videoId = url.pathname.split('/')[1];

        if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          return videoId;
        }
      }
    } catch {
      return '';
    }

    return '';
  }

  function getYouTubeThumbnail(link: string, image: string): string {
    const input = link?.trim() || '';

    if (!input) return image || '';

    // Se for uma URL HTTP/HTTPS
    try {
      const url = new URL(input);

      if (['http:', 'https:'].includes(url.protocol)) {
        return input;
      }
    } catch {
      // Continua para verificar outros formatos
    }

    // Se for um ID de vídeo do YouTube
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return `https://i.ytimg.com/vi/${input}/hqdefault.jpg`;
    }

    // Se for um caminho relativo
    if (input.startsWith('/')) {
      return input;
    }

    // Fallback para imagem física do ACF
    return image || '';
  }

  return (
    <main className="bg-bgi border-b border-white/20">
      <HeroBlog
        image={data?.page?.conteudoShorts?.shortsImagemDeFundo?.sourceUrl || ''}
        label=""
        title={data?.page?.conteudoShorts?.shortsTitulo}
        description={data?.page?.conteudoShorts?.shortsDescricao}
      />
      <SearchBlob onSearch={setSearchTerm} label="Todos os vídeos" />

      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 2xl:gap-x-10 gap-y-14 pt-24">
          {filteredShorts.map((short, index) => {
            return (
              <ShortVideo
                key={index}
                thumbnailSrc={getYouTubeThumbnail(
                  short.acf_shorts?.linkDaImagemShort || '',
                  short.acf_shorts?.imagemDoShort?.sourceUrl || ''
                )}
                title={short.acf_shorts?.tituloDoShort}
                videoId={getYouTubeVideoId(
                  short.acf_shorts?.linkIdVideoYoutube || ''
                )}
              />
            );
          })}
        </div>

        {filteredShorts.length === 0 && (
          <p className="text-center text-white pt-12">
            Nenhum vídeo encontrado.
          </p>
        )}

        <div className="container !my-28">
          <Image
            src={data?.page?.conteudoShorts?.banner?.sourceUrl || ''}
            alt=""
            width={1920}
            height={1080}
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
}

export const getStaticProps = async () => {
  const { page, pageBy, gqlShorts } = await ClientApp.query({
    page: [
      {
        id: '1490',
        idType: 'DATABASE_ID',
      },
      {
        conteudoShorts: {
          shortsImagemDeFundo: {
            sourceUrl: true,
          },
          shortsTitulo: true,
          shortsDescricao: true,
          banner: {
            sourceUrl: true,
          },
        },
      },
    ],
    pageBy: [
      {
        pageId: 201,
      },
      {
        informacoesDeContato: {
          coTelefone: true,
          coWhatsapp: true,
          coEmail: true,
          coEndereco: true,
          linkFacebook: true,
          linkInstagram: true,
          linkYoutube: true,
        },
      },
    ],
    gqlShorts: [
      { first: 18 },
      {
        nodes: {
          acf_shorts: {
            imagemDoShort: {
              sourceUrl: true,
            },
            linkDaImagemShort: true,
            linkIdVideoYoutube: true,
            tituloDoShort: true,
          },
          slug: true,
        },
      },
    ],
  });

  return {
    props: {
      data: {
        page: page,
        shorts: gqlShorts,
        social: pageBy?.informacoesDeContato,
      },
    },
    revalidate: 30,
  };
};
