import Image from 'next/image';
import BlogItem from '../../../components/layout/BlogItem';
import ChoiceButtons from '../../../components/layout/ChoiceButtons';
import HeroBlog from '../../../components/layout/HeroBlog';
import SearchBlob from '../../../components/layout/SearchBlog';

const banner = {
  image: '/766b90fe3962336f9cf19193e9abf231bab007c7.png',
  title: 'QUERO INVESTIR',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, ante non vulputate pharetra, sem nibh fringilla quam, non efficitur risus lorem nec massa. Vestibulum maximus, arcu vel egestas dignissim, nulla sem varius felis, id euismod libero nibh in lorem.',
};

export default function Intencao() {
  return (
    <main className="bg-bgi border-b border-white/20">
      <HeroBlog {...banner} />
      <ChoiceButtons />
      <SearchBlob label="Artigos mais recentes" />

      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12 pt-24 pb-20">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <BlogItem key={index} />
            ))}
        </div>
        <button className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto">
          Mostrar mais
        </button>
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
