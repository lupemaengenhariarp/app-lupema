import Image from 'next/image';
import HeroBlog from '../../../components/layout/HeroBlog';
import SearchBlob from '../../../components/layout/SearchBlog';
import ShortVideo from '../../../components/layout/ShortVideo';

const banner = {
  image: '/fbdbff35bd69926dd4573ea1ef592f09ade37c9d.png',
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
];

export default function Shorts() {
  return (
    <main className="bg-bgi border-b border-white/20">
      <HeroBlog {...banner} />
      <SearchBlob label="Todos os vídeos" />

      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 2xl:gap-x-10 gap-y-14 pt-24">
          {Array.from({ length: 12 }, (_, index) => {
            const item = movies[index % movies.length];

            return (
              <ShortVideo
                key={index}
                thumbnailSrc={item.thumbnail}
                title={item.title}
                videoId={item.videoId}
                description={item.description}
              />
            );
          })}
        </div>
        <button className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto mt-10  mb-20">
          Assistir todos os vídeos
        </button>

        <div className="container  !mb-28">
          <Image src="/banner-group-2.png" alt="" width={1920} height={1080} className="w-full" />
        </div>
      </section>
    </main>
  );
}
