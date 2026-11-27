import { useState } from 'react';
import Image from 'next/image';
import HeroBlog from '../../components/layout/HeroBlog';
import SlideApp from '../../components/layout/Slide';
import ChoiceButtons from '../../components/layout/ChoiceButtons';
import SearchBlog from '../../components/layout/SearchBlog';
import BlogItem from '../../components/layout/BlogItem';
import ShortVideo from '../../components/layout/ShortVideo';
import Link from 'next/link';
import ClientApp from '../../lib/genql';
import { Page_Informacoesdecontato, Post } from '../../generated';
import { GetStaticProps } from 'next';
import { getYouTubeThumbnail, getYouTubeVideoId } from '../../utils/youtube';

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
const SHORTS_PAGE_SIZE = 18;

interface ShortVideoData {
  videoId: string;
  thumbnailSrc: string;
  title?: string;
}

type SocialLinks = Pick<
  Page_Informacoesdecontato,
  | 'coTelefone'
  | 'coWhatsapp'
  | 'coEmail'
  | 'linkFacebook'
  | 'linkInstagram'
  | 'linkYoutube'
>;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

interface Props {
  initialPosts: Post[];
  shortVideos: ShortVideoData[];
  data: {
    social: SocialLinks | null;
  };
  conteuDoBlog: {
    blogImagemDeFundoHero?: { sourceUrl?: string } | null;
    blogImagemParaOsBanners?: (
      | {
          blogImagemDesktopBanner?: { sourceUrl?: string } | null;
          blogImagemMobileBanner?: { sourceUrl?: string } | null;
        }
      | undefined
    )[];
    blogLabelHero?: string;
    blogTituloHero?: string;
    blogDescricaoHero?: string;
    blogTituloBloco3?: string;
    blogDescricaoBlog3?: string;
  } | null;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // 1. Busca os campos ACF da página Blog
  const blogResult = await ClientApp.query({
    page: [
      {
        id: '1495',
        idType: 'DATABASE_ID',
      },
      {
        conteuDoBlog: {
          blogImagemDeFundoHero: {
            sourceUrl: true,
          },
          blogLabelHero: true,
          blogTituloHero: true,
          blogDescricaoHero: true,
          blogImagemParaOsBanners: {
            blogImagemDesktopBanner: {
              sourceUrl: true,
            },
            blogImagemMobileBanner: {
              sourceUrl: true,
            },
          },
          blogTituloBloco3: true,
          blogDescricaoBlog3: true,
          blogTituloShorts: true,
          blogDescricaoShorts: true,
        },
      },
    ],
  });

  const { pageBy } = await ClientApp.query({
    pageBy: [
      { pageId: 201 },
      {
        informacoesDeContato: {
          coTelefone: true,
          coWhatsapp: true,
          coEmail: true,
          linkFacebook: true,
          linkInstagram: true,
          linkYoutube: true,
        },
      },
    ],
  });

  const { gqlShorts } = await ClientApp.query({
    gqlShorts: [
      { first: SHORTS_PAGE_SIZE },
      {
        nodes: {
          acf_shorts: {
            imagemDoShort: { sourceUrl: true },
            linkDaImagemShort: true,
            linkIdVideoYoutube: true,
            tituloDoShort: true,
          },
          slug: true,
        },
      },
    ],
  });

  const shortVideos: ShortVideoData[] = (gqlShorts?.nodes ?? []).map((short) => ({
    videoId: getYouTubeVideoId(short.acf_shorts?.linkIdVideoYoutube || ''),
    thumbnailSrc: getYouTubeThumbnail(
      short.acf_shorts?.linkDaImagemShort || '',
      short.acf_shorts?.imagemDoShort?.sourceUrl || ''
    ),
    title: short.acf_shorts?.tituloDoShort || undefined,
  }));

  const blogContent = blogResult?.page?.conteuDoBlog ?? null;

  // 2. Busca todas as matérias
  const loadedPosts: Post[] = [];
  let cursor: string | undefined;
  let hasNextPage = true;

  while (hasNextPage) {
    const result = await ClientApp.query({
      posts: [
        {
          first: POSTS_PAGE_SIZE,
          ...(cursor ? { after: cursor } : {}),
        },
        {
          nodes: {
            title: true,
            slug: true,
            featuredImage: {
              node: { sourceUrl: true },
            },
            excerpt: true,
            categories: {
              nodes: {
                name: true,
                slug: true,
              },
            },
          },
          pageInfo: {
            hasNextPage: true,
            endCursor: true,
          },
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

  // 3. Entrega tudo para o componente
  return {
    props: {
      initialPosts: loadedPosts,
      conteuDoBlog: blogContent,
      data: {
        social: pageBy?.informacoesDeContato ?? null,
      },
      shortVideos,
    },
    revalidate: 300,
  };
};

export default function Blog({ initialPosts, conteuDoBlog, shortVideos }: Props) {
  const [allPosts] = useState<Post[]>(initialPosts);
  const [visibleCount, setVisibleCount] = useState(INITIAL_POSTS_COUNT);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
  const itemsBanner = (conteuDoBlog?.blogImagemParaOsBanners ?? [])
    .map((item, index) => {
      const desktopImage = item?.blogImagemDesktopBanner?.sourceUrl;
      const mobileImage = item?.blogImagemMobileBanner?.sourceUrl;
      const image = desktopImage || mobileImage;

      if (!image) return null;

      return (
        <div key={`${image}-${index}`} className="relative w-full h-full">
          <picture>
            {mobileImage && (
              <source media="(max-width: 767px)" srcSet={mobileImage} />
            )}
            <Image
              src={image}
              alt={`Banner ${index + 1}`}
              width={1920}
              height={1000}
              className="object-contain w-full h-full"
            />
          </picture>
        </div>
      );
    })
    .filter(Boolean);
  const dynamicMoviesItens = shortVideos.map((item, index) => (
    <ShortVideo
      key={`${item.videoId}-${index}`}
      thumbnailSrc={item.thumbnailSrc}
      title={item.title}
      videoId={item.videoId}
    />
  ));

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
      <HeroBlog
        image={conteuDoBlog?.blogImagemDeFundoHero?.sourceUrl}
        label={conteuDoBlog?.blogLabelHero}
        title={conteuDoBlog?.blogTituloHero}
        description={conteuDoBlog?.blogDescricaoHero}
      />
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

        {postsToShow.length === 0 && (
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
            {conteuDoBlog?.blogTituloBloco3 || ''}
          </h1>
          <p className="max-w-screen-lg mx-auto mt-8">
            {conteuDoBlog?.blogDescricaoBlog3 || ''}
          </p>
        </div>
        <SlideApp
          items={dynamicMoviesItens}
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
