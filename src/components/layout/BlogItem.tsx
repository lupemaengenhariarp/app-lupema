import Image from 'next/image';
import Link from 'next/link';

export default function BlogItem() {
  return (
    <div className="border border-white/20 p-6 rounded-3xl text-white space-y-4">
      <span className="text-white p-2 bg-green rounded-lg block w-max">
        Quero investir
      </span>
      <Link href="/blog/blog-item" className="block">
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/2c019e0ab88382949e1ef76ee81146e0b4dd490d.png"
            alt="Banner"
            width={1920}
            height={1000}
            className="object-cover w-full h-full rounded-2xl scale-100 hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <h1 className="text-2xl font-bold mt-4">Blog post title</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis nunc
        ac nisi accumsan congue.
      </p>
      <Link
        href="/blog/blog-item"
        className="text-green mt-2 block w-max rounded-3xl border border-green px-6 py-2 hover:bg-green hover:text-white transition-all"
      >
        Ler mais
      </Link>
    </div>
  );
}
