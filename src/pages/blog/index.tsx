import Image from 'next/image';
import HeroBlog from '../../components/layout/HeroBlog';
import SlideApp from '../../components/layout/Slide';
import ChoiceButtons from '../../components/layout/ChoiceButtons';
import SearchBlob from '../../components/layout/SearchBlog';
import BlogItem from '../../components/layout/BlogItem';
import ShortVideo from '../../components/layout/ShortVideo';
import Link from 'next/link';

const banner = {
  image: '/15c4176de8643e3d7fc2160e2e460061b1e3e272.png',
  label: 'Melhor do que ver, é sentir.',
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra, sem nibh fringilla quam, non efficitur risus lorem nec massa. Vestibulum maximus, arcu vel egestas dignissim, nulla sem varius felis, id euismod libero nibh in lorem.',
};

const movies = [
  {
    id: 1,
    videoId: 'I4iNyDE_p1g',
    thumbnail: '/video-1.png',
    title: 'Video post title.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra.',
  },
  {
    id: 2,
    videoId: 'I4iNyDE_p1g',
    thumbnail: '/video-2.png',
    title: 'Video post title.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra.',
  },
  {
    id: 3,
    videoId: 'I4iNyDE_p1g',
    thumbnail: '/video-3.png',
    title: 'Video post title.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra.',
  },
  {
    id: 4,
    videoId: 'I4iNyDE_p1g',
    thumbnail: '/video-4.png',
    title: 'Video post title.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra.',
  },
  {
    id: 5,
    videoId: 'I4iNyDE_p1g',
    thumbnail: '/video-2.png',
    title: 'Video post title.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra.',
  },
];

const banners = [
  { id: 1, img: '/destaques.jpg' },
  { id: 2, img: '/destaques.jpg' },
  { id: 3, img: '/destaques.jpg' },
];

const blogItens = 8;

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

const moviesItens = movies.map((item, index) => (
  <ShortVideo
    key={index}
    thumbnailSrc={item.thumbnail}
    title={item.title}
    videoId={item.videoId}
    description={item.description}
  />
));

const responsiveMovies = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

export default function Blog() {
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
      <ChoiceButtons />
      <SearchBlob label="Artigos mais recentes" />
      <section className="container">
        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12 pt-24 pb-20">
          {Array(blogItens)
            .fill(0)
            .map((_, index) => (
              <BlogItem key={index} />
            ))}
        </div>
        <button className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto">
          Mostrar mais
        </button>
      </section>

      <section className="container">
        <div className="text-center pt-24 pb-20 text-white">
          <h1 className="text-3xl font-light tracking-[8px] sm:tracking-[15px] uppercase text-green">
            Compartilhe o jeito Lupema de viver
          </h1>
          <p className="max-w-screen-lg mx-auto mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            consectetur, ante non vulputate pharetra, sem nibh fringilla quam,
            non efficitur risus lorem nec massa. Vestibulum maximus, arcu vel
            egestas dignissim, nulla sem varius felis, id euismod libero nibh in
            lorem.
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
        <Link href="/blog/shorts" className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto mt-10">
          Assistir todos os vídeos
        </Link>
      </section>
    </main>
  );
}
