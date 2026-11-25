import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../generated';

interface Props {
  post: Post;
}

export default function BlogItem({ post }: Props) {
  console.log(post.categories);

  return (
    <div className="border border-white/20 p-6 rounded-3xl text-white space-y-4">
      <span className="text-white p-2 bg-green rounded-lg block w-max">
        {post.categories?.nodes?.[0]?.name}
      </span>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src={post.featuredImage?.node.sourceUrl || ''}
            alt="Banner"
            width={1920}
            height={1000}
            className="object-cover w-full h-full rounded-2xl scale-100 hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: post.excerpt || '',
        }}
      />
      <Link
        href={`/blog/${post.slug}`}
        className="text-green mt-2 block w-max rounded-3xl border border-green px-6 py-2 hover:bg-green hover:text-white transition-all"
      >
        Ler mais
      </Link>
    </div>
  );
}
