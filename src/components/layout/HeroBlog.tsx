import Image from 'next/image';
import { useRouter } from 'next/router';

type HeroBlogProps = {
  image: string;
  title: string;
  description: string;
  label?: string;
};

export default function HeroBlog({
  image,
  title,
  description,
  label,
}: HeroBlogProps) {
  const router = useRouter();
  const isBlog = router.pathname === '/blog';
  return (
    <section className="w-full h-[100dvh] overflow-hidden relative">
      <Image
        src={image}
        alt={title}
        fill
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 z-10 w-full h-full bg-[linear-gradient(180deg,rgba(40,41,46,0)_0%,#28292E_90.14%),url('/images/sua-imagem.jpg')]
         bg-no-repeat
         bg-[length:100%_100%,118.384%_117.466%]
         bg-[position:center, -353.168px_-106.591px]"
      >
        <div className="container flex items-center h-full">
          <div className="w-full max-w-[530px] space-y-7">
            {label && (
              <span className="text-green font-bold border border-green p-2 rounded-lg uppercase tracking-[4px] sm:tracking-[10px]">
                {label}
              </span>
            )}
            <h1 className="uppercase text-3xl sm:text-5xl font-light text-white leading-[120%]">
              {title}
            </h1>
            <p className="text-white">{description}</p>
          </div>
        </div>
      </div>
      {isBlog && (
        <button className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 bg-[#d9d9d910] rounded-lg py-3 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="14"
            viewBox="0 0 25 14"
            fill="none"
          >
            <path
              d="M22.9568 -4.98004e-08L25 2.08216L13.8647 13.4231C13.6863 13.6059 13.4741 13.751 13.2404 13.85C13.0067 13.949 12.756 14 12.5029 14C12.2498 14 11.9991 13.949 11.7654 13.85C11.5317 13.751 11.3195 13.6059 11.1411 13.4231L-5.20945e-07 2.08216L2.04318 0.00196353L12.5 10.6463L22.9568 -4.98004e-08Z"
              fill="white"
            />
          </svg>
        </button>
      )}
    </section>
  );
}
