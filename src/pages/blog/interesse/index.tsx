import Image from 'next/image';
import { useEffect, useState } from 'react';
import BlogItem from '../../../components/layout/BlogItem';
import ChoiceButtons from '../../../components/layout/ChoiceButtons';
import HeroBlog from '../../../components/layout/HeroBlog';
import SearchBlog from '../../../components/layout/SearchBlog';
import ClientApp from '../../../lib/genql';
import { Post } from '../../../generated';

const INITIAL_POSTS_COUNT = 8;
const LOAD_MORE_COUNT = 4;
const POSTS_PAGE_SIZE = 100;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

const banner = {
  image: '/766b90fe3962336f9cf19193e9abf231bab007c7.png',
  title: 'QUERO INVESTIR',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra, sem nibh fringilla quam, non efficitur risus lorem nec massa. Vestibulum maximus, arcu vel egestas dignissim, nulla sem varius felis, id euismod libero nibh in lorem.',
};

export default function Intencao() {
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
    <main className="bg-bgi border-b border-white/20">
      <HeroBlog {...banner} />
      <ChoiceButtons onSelect={handleCategorySelect} />
      <SearchBlog label="Artigos mais recentes" onSearch={handleSearch} />

      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12 pt-24 pb-20">
          {postsToShow.map((post, index) => (
            <BlogItem key={post.slug || index} post={post} />
          ))}
        </div>

        {!isLoading && postsToShow.length === 0 && (
          <p className="text-center text-white pb-12">Nenhum artigo encontrado.</p>
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
      <div className="container !my-28">
        <Image
          src="/banner-group-2.png"
          alt=""
          width={1920}
          height={1080}
          className="w-full"
        />
      </div>
    </main>
  );
}
