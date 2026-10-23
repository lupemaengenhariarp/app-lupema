import { useState } from 'react';
import Image from 'next/image';
import { BiPlay } from 'react-icons/bi';

export type ShortVideoProps = {
  videoId: string;
  thumbnailSrc: string;
  title?: string;
  description?: string;
};

export default function ShortVideo({
  videoId,
  thumbnailSrc,
  title,
  description,
}: ShortVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full h-full bg-black rounded-2xl overflow-hidden shadow-lg px-2">
      <div className="h-full aspect-[9/16] overflow-hidden group rounded-2xl">
        {!isPlaying ? (
          // Estado de Capa (Thumbnail + Botão de Play)
          <div
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full cursor-pointer flex items-center justify-center rounded-2xl"
          >
            {/* Imagem de Capa */}
            <Image
              src={thumbnailSrc}
              alt={title || 'YouTube Short Thumbnail'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
              sizes="(max-width: 768px) 100vw, 315px"
            />

            {/* Ícone de Play */}
            <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66"
                height="66"
                viewBox="0 0 66 66"
                fill="none"
              >
                <path
                  data-figma-bg-blur-radius="24.9"
                  d="M65.2915 32.7708C65.2915 50.7315 50.7315 65.2915 32.7708 65.2915C14.81 65.2915 0.25 50.7315 0.25 32.7708C0.25 14.81 14.81 0.25 32.7708 0.25C50.7315 0.25 65.2915 14.81 65.2915 32.7708Z"
                  fill="#D9D9D9"
                  fill-opacity="0.2"
                  stroke-width="0.5"
                  stroke="white"
                />
                <path
                  d="M48.2415 29.7104C50.9346 31.2448 50.9346 35.1269 48.2415 36.6613L28.7953 47.7409C26.1287 49.2602 22.8151 47.3344 22.8151 44.2654L22.8151 22.1063C22.8151 19.0373 26.1287 17.1115 28.7953 18.6309L48.2415 29.7104Z"
                  fill="white"
                />
                <defs>
                  <clipPath
                    id="bgblur_0_9_8_clip_path"
                    transform="translate(24.9 24.9)"
                  >
                    <circle cx="32.7708" cy="32.7708" r="32.5208" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Título opcional sobre a capa */}
            <div className="absolute bottom-0 inset-x-0 p-6 pb-10 bg-gradient-to-t from-black/80 to-transparent line-clamp-2 z-10 space-y-6 pt-24">
              {title && (
                <h4 className="text-white text-xl sm:text-2xl xl:text-3xl font-medium">
                  {title}
                </h4>
              )}
              {description && <h4 className="text-white">{description}</h4>}
              <button className="bg-green text-white py-2 px-4 rounded-3xl">
                Assitir agora
              </button>
            </div>
          </div>
        ) : (
          // Estado de Reprodução (Carrega o iframe do YouTube)
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`}
            title={title || 'YouTube Short Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
