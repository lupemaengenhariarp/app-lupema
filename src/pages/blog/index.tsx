import { useEffect, useState } from 'react';
import Image from 'next/image';
import HeroBlog from '../../components/layout/HeroBlog';
import SlideApp from '../../components/layout/Slide';
import ChoiceButtons from '../../components/layout/ChoiceButtons';
import SearchBlog from '../../components/layout/SearchBlog';
import BlogItem from '../../components/layout/BlogItem';
import ShortVideo from '../../components/layout/ShortVideo';
import Link from 'next/link';
import ClientApp from '../../lib/genql';
import { Post } from '../../generated';

const banner = {
  image: '/15c4176de8643e3d7fc2160e2e460061b1e3e272.png',
  label: 'UM NOVO OLHAR SOBRE MORAR BEM.',
  title: 'SEU LUGAR. SEU TEMPO. SEU JEITO DE VIVER.',
  description:
    'Morar também é escolher o que faz parte da sua vida. Do endereço à decoração, descubra tendências, lançamentos e diferentes formas de viver o luxo, com informação e perspectivas sobre o mercado imobiliário.',
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
];

const banners = [
  { id: 1, img: '/destaques.jpg' },
  { id: 2, img: '/destaques.jpg' },
  { id: 3, img: '/destaques.jpg' },
];

const itemsBanner = banners.map((item) => {
  return (
    <div key={item.id} className="relative w-full h-full">
      <Image
        src={item.img}
        alt="Banner"
        width={1920}
        height={1000}
        className="object-contain w-full h-full"
      />
    </div>
  );
});

const moviesItens = movies.map((item) => (
  <ShortVideo
    key={item.videoId}
    thumbnailSrc={item.thumbnail}
    title={item.title}
    videoId={item.videoId}
  />
));

const responsiveMovies = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const INITIAL_POSTS_COUNT = 8;
const LOAD_MORE_COUNT = 4;
const POSTS_PAGE_SIZE = 100;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export default function Blog() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_POSTS_COUNT);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      try {
        const loadedPosts: Post[] = [];
        let cursor: string | undefined;
        let hasNextPage = true;

        while (hasNextPage && !ignore) {
          const result = await ClientApp.query({
            posts: [
              { first: POSTS_PAGE_SIZE, ...(cursor ? { after: cursor } : {}) },
              {
                nodes: {
                  title: true,
                  slug: true,
                  featuredImage: { node: { sourceUrl: true } },
                  excerpt: true,
                  categories: { nodes: { name: true, slug: true } },
                },
                pageInfo: { hasNextPage: true, endCursor: true },
              },
            ],
          });

          const connection = result?.posts;
          if (Array.isArray(connection?.nodes)) {
            loadedPosts.push(...(connection.nodes as Post[]));
          }
          hasNextPage = Boolean(connection?.pageInfo?.hasNextPage);
          cursor = connection?.pageInfo?.endCursor || undefined;
          if (!cursor) hasNextPage = false;
        }

        if (!ignore) setAllPosts(loadedPosts);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredPosts = allPosts.filter((post) => {
    const search = normalizeText(searchTerm.trim());
    const searchableText = normalizeText(
      `${post.title || ''} ${post.excerpt || ''}`
    );
    const matchesSearch = !search || searchableText.includes(search);

    if (!selectedCategory) return matchesSearch;

    const categoryTerms =
      (
        post as Post & {
          categories?: { nodes?: Array<{ name?: string; slug?: string }> };
        }
      ).categories?.nodes || [];
    const target = normalizeText(selectedCategory);
    const matchesCategory = categoryTerms.some(({ name, slug }) => {
      const categoryText = normalizeText(`${name || ''} ${slug || ''}`);
      if (target.includes('investir'))
        return /invest|investment|investimento/.test(categoryText);
      if (target.includes('morar'))
        return /morar|moradia|residenc|imovel/.test(categoryText);
      return /estilo|lifestyle|vida/.test(categoryText);
    });
    return matchesCategory && matchesSearch;
  });

  const postsToShow = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;

  function handleCategorySelect(category: string | null) {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_POSTS_COUNT);
  }

  function handleSearch(term: string) {
    setSearchTerm(term);
    setVisibleCount(INITIAL_POSTS_COUNT);
  }
  return (
    <main className="blog bg-bgi border-b border-white/20 pb-24">
      <HeroBlog {...banner} />
      <SlideApp
        items={itemsBanner}
        largura={{ desktop: 0, mobile: 0 }}
        infinite={true}
        navigation={true}
        dots={false}
        autoPlay={true}
      />
      <ChoiceButtons onSelect={handleCategorySelect} />
      <SearchBlog label="Artigos mais recentes" onSearch={handleSearch} />
      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12 pt-24 pb-20">
          {postsToShow.map((post: Post, index: number) => (
            <BlogItem key={post.slug || index} post={post} />
          ))}
        </div>

        {!isLoading && postsToShow.length === 0 && (
          <p className="text-center text-white pb-12">
            Nenhum artigo encontrado.
          </p>
        )}

        {hasMorePosts && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
            className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto"
          >
            Mostrar mais
          </button>
        )}
      </section>

      <section className="container">
        <div className="text-center pt-24 pb-20 text-white">
          <h1 className="text-3xl font-light tracking-[8px] sm:tracking-[15px] uppercase text-green">
            COMPARTILHE O JEITO LUPEMA DE VIVER
          </h1>
          <p className="max-w-screen-lg mx-auto mt-8">
            Cada projeto tem uma história que vai além das imagens. Dê o play e
            conheça espaços, ideias e conceitos que traduzem o jeito Lupema de
            viver: alto padrão nos detalhes, arquitetura que inspira e conforto
            para aproveitar a vida no seu ritmo.
          </p>
        </div>
        <SlideApp
          items={moviesItens}
          largura={{ desktop: 0, mobile: 0 }}
          infinite={true}
          gap={16}
          navigation={false}
          dots={true}
          autoPlay={true}
          responsive={responsiveMovies}
        />
        <Link
          href="/blog/shorts"
          className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto mt-10"
        >
          Assistir todos os vídeos
        </Link>
      </section>
    </main>
  );
}
