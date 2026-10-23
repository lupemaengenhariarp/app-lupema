export default function SearchBlob({label}: {label: string}) {
  return (
    <div className="border border-white/20 h-20 flex items-center justify-between">
      <div className="border-r border-white/20 w-16 xl:w-28 h-full hidden xl:block" />
      <div className="border-r border-white/20 px-4 sm:px-9 h-full flex items-center justify-center w-36 sm:w-max">
        <span className="text-white sm:text-2xl">{label}</span>
      </div>
      <div className="flex-1 sm:flex-auto xl:flex-1 h-full hidden sm:block" />
      <div className="border-l border-white/20 w-28 h-full">
        <button className="w-full h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
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
      <div className="border-l border-white/20 flex-1 xl:flex-none md:min-w-max xl:min-w-0 h-full px-4 sm:px-9 flex items-center">
        <span className="text-white sm:text-2xl">O que você procura!</span>
      </div>
      <div className="border-l border-white/20 w-16 xl:w-28 h-full hidden xl:block" />
    </div>
  );
}
