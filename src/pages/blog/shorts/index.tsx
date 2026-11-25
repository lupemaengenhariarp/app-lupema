import { useEffect, useState } from 'react';
import Image from 'next/image';
import HeroBlog from '../../../components/layout/HeroBlog';
import SearchBlob from '../../../components/layout/SearchBlog';
import ShortVideo from '../../../components/layout/ShortVideo';

const banner = {
  image: '/fbdbff35bd69926dd4573ea1ef592f09ade37c9d.png',
  title: 'SHORTS LUPEMA',
  description:
    'Conheça os empreendimentos e as histórias da Lupema em vídeos curtos.',
};

const movies = [
  {
    videoId: '_UCyPlDKDXQ',
    thumbnail: 'https://i.ytimg.com/vi/_UCyPlDKDXQ/frame0.jpg',
    title: 'Obras iniciadas — Sinni 551',
  },
  {
    videoId: 'KbL-ufOt11w',
    thumbnail: 'https://i.ytimg.com/vi/KbL-ufOt11w/frame0.jpg',
    title: 'V3RSO JK — Tá duvidando?',
  },
  {
    videoId: 'JJ3BGGnUWaE',
    thumbnail: 'https://i.ytimg.com/vi/JJ3BGGnUWaE/frame0.jpg',
    title: 'V3RSO JK',
  },
  {
    videoId: 'I4iNyDE_p1g',
    thumbnail: 'https://i.ytimg.com/vi/I4iNyDE_p1g/frame0.jpg',
    title: 'Vem aí o Horizon',
  },
  {
    videoId: 'Kf66wo_xWmM',
    thumbnail: 'https://i.ytimg.com/vi/Kf66wo_xWmM/frame0.jpg',
    title: 'Lupema 30 anos',
  },
  {
    videoId: 'nMCVuZcnzk4',
    thumbnail: 'https://i.ytimg.com/vi/nMCVuZcnzk4/frame0.jpg',
    title: 'Lupema 30 anos',
  },
  {
    videoId: 'ycnV6yWJJxw',
    thumbnail: 'https://i.ytimg.com/vi/ycnV6yWJJxw/frame0.jpg',
    title: 'Lupema 30 anos',
  },
];

interface Movie {
  videoId: string;
  thumbnail: string;
  title: string;
}

export default function Shorts() {
  const [visibleCount, setVisibleCount] = useState(4);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/youtube');

        if (!response.ok) {
          throw new Error('Erro ao buscar vídeos');
        }

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className="bg-bgi border-b border-white/20">
      <HeroBlog {...banner} />
      <SearchBlob label="Todos os vídeos" />

      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 2xl:gap-x-10 gap-y-14 pt-24">
          {movies.slice(0, visibleCount).map((item) => {
            return (
              <ShortVideo
                key={item.videoId}
                thumbnailSrc={item.thumbnail}
                title={item.title}
                videoId={item.videoId}
              />
            );
          })}
        </div>
        {visibleCount < movies.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 4)}
            className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto mt-10  mb-20"
          >
          Ver mais vídeos
          </button>
        )}

        <div className="container  !mb-28">
          <Image
            src="/banner-group-2.png"
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
