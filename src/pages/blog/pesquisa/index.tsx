import Image from 'next/image';
import BlogItem from '../../../components/layout/BlogItem';

export default function Pesquisa() {
  return (
    <main className="bg-bgi border-b border-white/20 pt-20">
      <section className="container">
        <div className="h-full min-h-[450px] py-32 text-center">
          <h1 className="text-3xl sm:text-5xl text-white">
            Resultados da Pesquisa por: Horizon
          </h1>
          <div className="h-20 border border-white/20 w-full max-w-5xl mx-auto flex items-center mt-28">
            <div className="border-r border-white/20 w-28 h-full">
              <button className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                >
                  <path
                    d="M31.5 31.5L24.2617 24.2617M24.2617 24.2617C25.4999 23.0236 26.482 21.5537 27.1521 19.936C27.8222 18.3183 28.167 16.5845 28.167 14.8335C28.167 13.0825 27.8222 11.3487 27.1521 9.731C26.482 8.11331 25.4999 6.64343 24.2617 5.4053C23.0236 4.16717 21.5537 3.18503 19.936 2.51495C18.3183 1.84488 16.5845 1.5 14.8335 1.5C13.0825 1.5 11.3487 1.84488 9.731 2.51495C8.11331 3.18503 6.64343 4.16717 5.4053 5.4053C2.90478 7.90582 1.5 11.2973 1.5 14.8335C1.5 18.3698 2.90478 21.7612 5.4053 24.2617C7.90582 26.7623 11.2973 28.167 14.8335 28.167C18.3698 28.167 21.7612 26.7623 24.2617 24.2617Z"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="white"
                  />
                </svg>
              </button>
            </div>
            <div className="p-9">
              <span className="text-white">O que voê procura!</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="border border-white/20 h-20 flex items-center justify-between">
          <div className="border-r border-white/20 w-12 sm:w-28 h-full" />
          <div className="w-max px-4 h-full flex items-center justify-center gap-6">
            <span className="text-white">Resultados de A-Z</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
            >
              <path
                d="M5.65703 7.071L2.66411e-05 1.414L1.41403 -4.94551e-07L6.36403 4.95L11.314 -6.18079e-08L12.728 1.414L7.07103 7.071C6.8835 7.25847 6.62919 7.36379 6.36403 7.36379C6.09886 7.36379 5.84455 7.25847 5.65703 7.071Z"
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="white"
              />
            </svg>
          </div>
          <div className="border-l border-white/20 flex-1 h-full hidden md:block" />
          <div className="border-l border-white/20 w-max px-4 h-full flex items-center justify-center">
            <span className="text-white">118 resultados</span>
          </div>
          <div className="border-l border-white/20 w-12 sm:w-28 h-full" />
        </div>

        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12 py-20">
            {Array(16)
              .fill(0)
              .map((_, index) => (
                <BlogItem key={index} />
              ))}
          </div>
          <button className="py-2 px-4 bg-green text-white text-xl font-medium block rounded-2xl w-max mx-auto">
            Mostrar mais
          </button>
        </div>
      </section>

      <section className="container !my-28">
        <Image
          src="/banner-group-2.png"
          alt=""
          width={1920}
          height={1080}
          className="w-full"
        />
      </section>
    </main>
  );
}
