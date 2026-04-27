import { NextPage } from 'next';
import ClientApp from '../lib/genql';
import { Page, Page_Informacoesdecontato } from '../generated';
import Image from 'next/image';
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import SlideApp from '../components/layout/Slide';
import FormAgendeUmaVisita from '../components/layout/forms/FormAgendeUmaVisita';

interface Props {
  data: {
    page: Page;
    social: Page_Informacoesdecontato;
  };
}

const LStore: NextPage<Props> = ({ data }) => {
  const content = data?.page?.conteudoLStore;
  const [displayedImages, setDisplayedImages] = useState(0);

  Fancybox.bind('[data-fancybox]', {});

  function handleLoadMore() {
    setDisplayedImages(displayedImages + 8);
  }
  const scrollToForm = () => {
    const element = document.getElementById('form-indique');

    if (!element) return;

    const offset = 70;
    const position =
      element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  const imgensSala = content?.imagensSalaLstore?.map((item) => {
    return (
      <div className="w-full h-[300px] sm:h-[480px] lg:h-[680px]">
        <Image
          src={item?.sourceUrl || ''}
          fill
          alt="Imagem sala de imersão Lupema"
          className="w-full h-full object-cover"
        />
      </div>
    );
  });

  return (
    <main className="bg-white">
      <div className="min-h-[550px] h-screen w-full relative bg-black">
        <Image
          className="block object-cover"
          src={data.page.featuredImage?.node.sourceUrl || ''}
          alt="Imagem Banner"
          fill
        />
        <div className="absolute top-0 left-0 right-0 w-full bg-[#000000]/90 sm:bg-[#000000]/80 h-full"></div>
        <div className="w-full h-full absolute top-0 left-0 right-0 z-20">
          <div className="flex items-center w-full h-full z-10 relative">
            <div className="max-w-[516px] text-white ml-[25px] 2xl:ml-[100px] flex flex-col gap-8 sm:gap-10">
              <h1 className="text-3xl sm:text-4xl font-light leading-[130%] uppercase tracking-[7px] pr-0 sm:pr-12">
                {content?.tituloBannerLstore}
              </h1>
              <p className="text-sm sm:text-base">
                {content?.descicaoBannerLstore}
              </p>

              <button
                onClick={scrollToForm}
                className="text-xs uppercase border border-white py-3 px-8 w-max cursor-pointer"
              >
                agende uma visita
              </button>
              <strong className="text-sm sm:text-base tracking-[5px] sm:tracking-[10px] uppercase mt-4 sm:mt-6">
                {content?.fraseBannerLstore}
              </strong>
            </div>
          </div>
          <div className="w-full overflow-hidden absolute -bottom-28 left-0 right-0 z-0">
            <div className="textAnimation opacity-50">
              <div>
                <span>L.Store</span>
                <span>L.Store</span>
              </div>
              <div>
                <span>L.Store</span>
                <span>L.Store</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className=" py-10 sm:py-16 bg-black">
        <div className="container grid grid-cols-1 sm:grid-cols-2 items-center gap-10 lg:gap-24 mt-12">
          <div className="w-full h-[300px] sm:h-[400px] lg:h-[540px] relative">
            <Image
              className="w-full h-full object-cover object-center"
              src={content?.imagemSobreLstore?.sourceUrl || ''}
              alt="Imagem"
              fill
            />
          </div>
          <div className="space-y-6">
            <h1
              dangerouslySetInnerHTML={{
                __html: content?.descricaoSobreLstore || '',
              }}
              className="text-2xl lg:text-3xl font-light leading-[40px] lg:leading-[66px] tracking-[5px] uppercase text-green"
            />
            <div
              dangerouslySetInnerHTML={{
                __html: content?.textoAuxiliarSobreLstore || '',
              }}
              className="sm:text-lg leading-loose text-white"
            />
          </div>
        </div>

        <div className="py-10 sm:py-16">
          <h1 className="title tracking-[2px]">{content?.tituloPassoLstore}</h1>
          <p className="text-white text-center text-sm sm:text-base mt-2">
            {content?.descricaoPassoLstore}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-8 lg:gap-[112px] my-16 w-full lg:w-10/12 mx-auto">
            <div className="text-white flex flex-col items-center gap-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="87"
                height="80"
                viewBox="0 0 87 80"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M76.9522 80H10.0609C7.79163 80 6.00113 78.1634 6.00113 75.9085V53.2288C6.00113 52.5229 6.56517 51.9608 7.22759 51.9608H79.7855C80.448 51.9608 81.012 52.5229 81.012 53.2288V75.9085C81.012 78.1699 79.2149 80 76.9522 80ZM8.49996 54.4444V75.902C8.49996 76.7974 9.20829 77.4575 10.0609 77.4575H76.9522C77.8048 77.4575 78.5132 76.7974 78.5132 75.902V54.4444H8.49996Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M78.6968 47.3399H42.6179C41.9095 47.3399 41.3455 46.7778 41.3455 46.0719V37.4575C41.3455 33.8366 44.2706 30.915 47.9107 30.915H56.2204C56.8829 30.915 57.4469 31.4771 57.4469 32.1373V34.915C57.4469 36.7059 58.9095 38.1176 60.6606 38.1176C62.4118 38.1176 63.8219 36.7059 63.8219 34.915V32.1373C63.8219 31.4771 64.3859 30.915 65.0942 30.915H73.3581C76.9916 30.915 79.9692 33.8301 79.9692 37.4575V46.0719C79.9692 46.7778 79.4051 47.3399 78.6968 47.3399ZM43.8443 44.8431H77.4179V37.4575C77.4179 35.2484 75.6208 33.4118 73.3581 33.4118H66.3207V34.915C66.3207 38.0654 63.7694 40.6078 60.6541 40.6078C57.5387 40.6078 54.9415 38.0654 54.9415 34.915V33.4118H47.9041C45.6873 33.4118 43.8443 35.2484 43.8443 37.4575V44.8431Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M60.6606 40.6144C57.4994 40.6144 54.9481 38.0719 54.9481 34.9673V28.8954C54.9481 28.4706 55.1842 28.098 55.5121 27.8627C55.8925 27.6275 56.3647 27.5817 56.7386 27.7712C59.1915 28.9935 62.0773 28.9935 64.5302 27.7712C64.9565 27.5817 65.3828 27.6275 65.7567 27.8627C66.1305 28.098 66.3732 28.4771 66.3732 28.8954V34.9673C66.3732 38.0719 63.776 40.6144 60.6606 40.6144ZM57.4469 30.732V34.9216C57.4469 36.7124 58.8636 38.1242 60.6606 38.1242C62.4577 38.1242 63.8219 36.7124 63.8219 34.9216V30.732C61.7887 31.3464 59.526 31.3464 57.4469 30.732Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M60.6606 31.2026C54.2856 31.2026 49.1371 26.0261 49.1371 19.719V13.9281C49.1371 13.6013 49.2814 13.268 49.5175 13.0327C49.7536 12.7974 50.0816 12.6536 50.4161 12.6536C50.5079 12.6536 58.5356 12.6078 61.6051 7.66667C61.7953 7.33987 62.1232 7.10458 62.5495 7.05229C62.9299 7.00654 63.3037 7.14379 63.5858 7.43137C63.5858 7.47712 66.5634 10.5359 71.4233 12.7974C71.8496 12.9869 72.1316 13.4118 72.1316 13.9281V19.719C72.1316 26.0719 66.9831 31.2026 60.6541 31.2026H60.6606ZM51.6884 15.1111V19.7255C51.6884 24.6667 55.7023 28.6667 60.6606 28.6667C65.6189 28.6667 69.6328 24.6667 69.6328 19.7255V14.7386C66.4191 13.1373 64.1104 11.3529 62.8315 10.2222C59.6178 14.0327 54.1413 14.9281 51.6884 15.1176V15.1111Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M60.6606 40.6144C57.4994 40.6144 54.9481 38.0719 54.9481 34.9673V33.4118H47.9107C47.4384 33.4118 46.9662 33.1307 46.776 32.7059C45.2151 29.3203 44.4149 25.4575 44.4149 21.5033C44.4149 9.64706 51.6884 0 60.6606 0C69.6328 0 76.8604 9.64706 76.8604 21.5033C76.8604 25.4575 76.0602 29.3137 74.5452 32.7059C74.3091 33.1307 73.8828 33.4575 73.3646 33.4118H66.3732V34.9673C66.3732 38.0719 63.776 40.6144 60.6606 40.6144ZM56.1745 30.9216C56.8829 30.9216 57.4469 31.4837 57.4469 32.1895V34.9673C57.4469 36.7059 58.8636 38.1176 60.6606 38.1176C62.4577 38.1176 63.8219 36.7059 63.8219 34.9673V32.1895C63.8219 31.4837 64.3859 30.9216 65.0942 30.9216H72.5579C73.7385 28.0523 74.355 24.8497 74.355 21.5098C74.355 11.0131 68.2161 2.49673 60.6606 2.49673C53.1051 2.49673 46.9203 11.0588 46.9203 21.5098C46.9203 24.8039 47.5827 28.0523 48.7633 30.9216H56.1745Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M49.7471 47.3399C49.0387 47.3399 48.4747 46.7778 48.4747 46.0719V41.1765C48.4747 40.5163 49.0387 39.9543 49.7471 39.9543C50.4554 39.9543 51.0195 40.5163 51.0195 41.1765V46.0719C51.0195 46.7778 50.4554 47.3399 49.7471 47.3399Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M71.5217 47.3399C70.8593 47.3399 70.2952 46.7778 70.2952 46.0719V41.1765C70.2952 40.5163 70.8593 39.9543 71.5217 39.9543C72.23 39.9543 72.794 40.5163 72.794 41.1765V46.0719C72.794 46.7778 72.23 47.3399 71.5217 47.3399Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M8.30976 47.3399C7.60143 47.3399 7.03739 46.7778 7.03739 46.0719V43.6275C7.03739 41.5556 8.73607 39.8627 10.8152 39.8627H22.0566C24.0898 39.8627 25.7885 41.5556 25.7885 43.6275V46.0719C25.7885 46.7778 25.2244 47.3399 24.5161 47.3399H8.30976ZM9.58869 44.8431H23.2831V43.6209C23.2831 42.915 22.719 42.3529 22.0566 42.3529H10.8152C10.1068 42.3529 9.58869 42.915 9.58869 43.6209V44.8431Z"
                  fill="#729F2D"
                />
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M82.1925 54.4444H4.81402C2.1709 54.4444 0 52.281 0 49.6471C0 47.0131 2.1709 44.8497 4.81402 44.8497H82.186C84.8291 44.8497 87 47.0131 87 49.6471C87 52.281 84.8291 54.4444 82.186 54.4444H82.1925ZM4.81402 47.3399C3.54165 47.3399 2.49883 48.3726 2.49883 49.6471C2.49883 50.9216 3.53509 51.9543 4.81402 51.9543H82.186C83.4584 51.9543 84.5012 50.9216 84.5012 49.6471C84.5012 48.3726 83.4649 47.3399 82.186 47.3399H4.81402Z"
                  fill="#729F2D"
                />
              </svg>
              <h2 className="text-green text-2xl font-medium text-center">
                {content?.tituloPasso1Lstore}
              </h2>
              <p>{content?.descricaoPasso1Lstore}</p>
            </div>
            <div className="text-white flex flex-col items-center gap-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="80"
                viewBox="0 0 72 80"
                fill="none"
              >
                <path
                  d="M56 80H2.66667C1.2 80 0 78.7588 0 77.2418C0 75.7248 1.2 74.4836 2.66667 74.4836H56C57.4667 74.4836 58.6667 75.7248 58.6667 77.2418C58.6667 78.7588 57.4667 80 56 80Z"
                  fill="#729F2D"
                />
                <path
                  d="M29.3333 71.7254C14.64 71.7254 2.66667 59.5894 2.66667 44.6952V27.5944C2.66667 26.0774 3.86667 24.8363 5.33333 24.8363H53.3333C54.8 24.8363 56 26.0774 56 27.5944V44.6952C56 59.5894 44.0267 71.7254 29.3333 71.7254ZM8 30.3526V44.6952C8 56.5554 17.5733 66.2091 29.3333 66.2091C41.0933 66.2091 50.6667 56.5554 50.6667 44.6952V30.3526H8Z"
                  fill="#729F2D"
                />
                <path
                  d="M61.3333 57.9345C55.36 57.9345 50.6667 53.0801 50.6667 46.9018V38.6272C50.6667 32.5316 55.44 27.5944 61.3333 27.5944C67.2267 27.5944 72 32.5316 72 38.6272V46.9018C72 53.0801 67.3067 57.9345 61.3333 57.9345ZM61.3333 33.1108C58.4 33.1108 56 35.5932 56 38.6272V46.9018C56 50.0461 58.2933 52.4181 61.3333 52.4181C64.3733 52.4181 66.6667 50.0461 66.6667 46.9018V38.6272C66.6667 35.5932 64.2667 33.1108 61.3333 33.1108Z"
                  fill="#729F2D"
                />
                <path
                  d="M29.3333 22.0781C28.48 22.0781 27.6267 21.6368 27.12 20.8369C23.3333 14.9619 23.3333 7.10111 27.12 1.22617C27.9467 -0.0425911 29.6 -0.373574 30.8267 0.453883C32.0533 1.30892 32.3733 3.019 31.5733 4.28776C28.96 8.31472 28.96 13.7483 31.5733 17.7753C32.4 19.0441 32.0533 20.7541 30.8267 21.6092C30.3733 21.9126 29.8667 22.0781 29.36 22.0781H29.3333Z"
                  fill="#729F2D"
                />
                <path
                  d="M18.6667 22.0781C17.8133 22.0781 16.96 21.6368 16.4533 20.8369C12.6667 14.9619 12.6667 7.10111 16.4533 1.22617C17.28 -0.0425911 18.9333 -0.373574 20.16 0.453883C21.3867 1.30892 21.7067 3.019 20.9067 4.28776C18.2933 8.31472 18.2933 13.7483 20.9067 17.7753C21.7333 19.0441 21.3867 20.7541 20.16 21.6092C19.7067 21.9126 19.2 22.0781 18.6933 22.0781H18.6667Z"
                  fill="#729F2D"
                />
                <path
                  d="M40 22.0781C39.1467 22.0781 38.2933 21.6368 37.7867 20.8369C34 14.9619 34 7.10111 37.7867 1.22617C38.6133 -0.0425911 40.2667 -0.373574 41.4933 0.453883C42.72 1.30892 43.04 3.019 42.24 4.28776C39.6267 8.31472 39.6267 13.7483 42.24 17.7753C43.0667 19.0441 42.72 20.7541 41.4933 21.6092C41.04 21.9126 40.5333 22.0781 40.0267 22.0781H40Z"
                  fill="#729F2D"
                />
              </svg>
              <h2 className="text-green text-2xl font-medium text-center">
                {content?.tituloPasso2Lstore}
              </h2>
              <p>{content?.descricaoPasso2Lstore}</p>
            </div>
            <div className="text-white flex flex-col items-center gap-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="63"
                viewBox="0 0 107 80"
                fill="none"
                className="mt-6"
              >
                <path
                  d="M95.8855 24.4889V17.7778C95.8855 9.37778 89.2185 0 80.2771 0H26.7623C17.8209 0 11.1539 9.37778 11.1539 17.7778V24.4889C4.39765 25.1111 -0.552466 31.0667 0.0495752 37.8C0.339447 41.0444 1.92259 44.0222 4.44224 46.0889V60C4.44224 64.4222 7.07338 68.4 11.1316 70.1778V75.5556C11.1316 78 13.1384 80 15.5911 80H20.0507C22.5035 80 24.5103 78 24.5103 75.5556V71.1111H82.4846V75.5556C82.4846 78 84.4914 80 86.9441 80H91.4037C93.8564 80 95.8633 78 95.8633 75.5556V70.1778C99.9215 68.4222 102.553 64.4222 102.553 60V46.0889C107.77 41.7778 108.506 34.0889 104.18 28.8889C102.107 26.3778 99.0964 24.8 95.8633 24.5111L95.8855 24.4889ZM26.7623 4.44444H80.2771C86.4536 4.44444 91.426 11.7333 91.426 17.7778V24.9111C86.1637 26.4 82.5069 31.2 82.5069 36.6667V44.1333C72.1384 42.9111 61.7253 42.2667 51.2899 42.2222C42.3485 42.1556 33.3848 42.7778 24.5326 44.0444V36.6667C24.5326 31.2 20.8757 26.4222 15.6134 24.9111V17.7778C15.6134 11.7333 20.5859 4.44444 26.7623 4.44444ZM20.073 75.5556H15.6134V71.1111H20.073V75.5556ZM91.426 75.5556H86.9664V71.1111H91.426V75.5556ZM99.0964 43.1333C98.4721 43.5556 98.1153 44.2444 98.1153 44.9778V60C98.1153 63.6889 95.1274 66.6667 91.426 66.6667H15.6134C11.912 66.6667 8.9241 63.6889 8.9241 60V44.9778C8.9241 44.2444 8.54504 43.5556 7.943 43.1333C4.35305 40.7556 3.39425 35.9111 5.78011 32.3556C8.16598 28.7778 13.0269 27.8222 16.5945 30.2C18.7574 31.6444 20.073 34.0667 20.073 36.6667V46.6667C20.073 47.3333 20.3629 47.9556 20.898 48.3778C21.4109 48.8 22.1021 48.9778 22.7487 48.8444C32.1807 47.2889 41.7465 46.5556 51.3122 46.6667C62.3942 46.7111 73.4539 47.4444 84.4468 48.8667C85.6731 49.0444 86.788 48.2 86.9664 46.9778C86.9664 46.8667 86.9887 46.7778 86.9887 46.6667V36.6667C86.9887 32.3778 90.4895 28.8889 94.7929 28.8889C99.0964 28.8889 102.597 32.3778 102.597 36.6667C102.597 39.2667 101.304 41.6889 99.1187 43.1333H99.0964Z"
                  fill="#729F2D"
                />
              </svg>
              <h2 className="text-green text-2xl font-medium text-center">
                {content?.tituloPasso3Lstore}
              </h2>
              <p>{content?.descricaoPasso3Lstore}</p>
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="uppercase border border-green py-3 px-8 w-max block mx-auto text-green hover:bg-green hover:text-white transition-all cursor-pointer"
          >
            agende uma visita
          </button>
        </div>
      </section>

      <section className="py-10 sm:py-16 container">
        <h1 className="title tracking-[2px]">{content?.tituloGaleriaLstore}</h1>
        <p className="text-black text-center text-sm sm:text-base mt-2">
          {content?.descricaoGaleriaLstore}
        </p>
        <div className="gallery grid gap-4 grid-cols-2 sm:grid-cols-3 mt-16">
          {content?.imagensGaleriaLstore
            ?.slice(0, displayedImages + 9)
            .map((imgs, index) => (
              <a
                key={index}
                href={imgs?.sourceUrl}
                data-fancybox="gallery"
                className="group relative h-[110px] sm:h-[160px] lg:h-[280px] 2xl:lg:h-[320px] w-full"
              >
                <Image
                  src={imgs?.sourceUrl || ''}
                  alt="Galeria de imagens"
                  fill
                  sizes="50vw, (min-width: 1200px) 25vw"
                  className="object-cover"
                />
                <div className="bg-black/75 absolute top-0 left-0 right-0 z-10 w-full h-full flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <p>
                    <BsPlusLg
                      size={30}
                      className="text-green rotate-0 group-hover:rotate-90 transition mx-auto"
                    />
                    <span className="text-white">{imgs?.title || ''}</span>
                  </p>
                </div>
              </a>
            ))}
        </div>
      </section>

      <section className="py-10 sm:py-16 container sala-imersao">
        <h1 className="title tracking-[2px]">{content?.tituloSalaLstore}</h1>
        <p className="text-black text-center text-sm sm:text-base mt-2 mb-16">
          {content?.descricaoSalaLstore}
        </p>
        <SlideApp
          items={imgensSala || []}
          responsive={1}
          largura={{ desktop: 0, mobile: 0 }}
          infinite={true}
          dots={false}
          navigation={true}
        />
        <button
          onClick={scrollToForm}
          className="uppercase border border-green py-3 px-8 w-max block mx-auto text-green hover:bg-green hover:text-white transition-all cursor-pointer mt-12"
        >
          Conheça a sala imersiva
        </button>
      </section>

      <section className="py-10 sm:py-16 container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center min-h-[350px]">
          <div className="relative h-[350px] sm:h-full overflow-hidden">
            <Image
              src={content?.imagem1?.sourceUrl || ''}
              alt="Imagem Lupema"
              fill
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="p-10 sm:p-4 lg:p-10 text-center space-y-4">
            <h1 className="text-4xl sm:text-3xl lg:text-4xl font-light tracking-[4px] text-green uppercase leading-[50px] sm:leading-[30px] lg:leading-[50px]">
              {content?.tituloUltimoLstore}
            </h1>
            <p className="text-sm sm:text-base">
              {content?.descricaoUltimoLstore}
            </p>
          </div>
          <div className="relative h-[350px] sm:h-full overflow-hidden">
            <Image
              src={content?.imagem2?.sourceUrl || ''}
              alt="Imagem Lupema"
              fill
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 container">
        <h1 className="title tracking-[2px]">
          Seu próximo endereço começa aqui.
        </h1>
        <div className="w-full lg:w-3/4 mx-auto mt-8">
          <FormAgendeUmaVisita />
        </div>
      </section>
    </main>
  );
};

export default LStore;

export const getStaticProps = async () => {
  const { page, pageBy } = await ClientApp.query({
    page: [
      {
        id: '1339',
        idType: 'DATABASE_ID',
      },
      {
        title: true,
        featuredImage: {
          node: {
            sourceUrl: true,
          },
        },
        conteudoLStore: {
          tituloBannerLstore: true,
          descicaoBannerLstore: true,
          fraseBannerLstore: true,
          imagemSobreLstore: {
            sourceUrl: true,
          },
          descricaoSobreLstore: true,
          textoAuxiliarSobreLstore: true,
          tituloPassoLstore: true,
          descricaoPassoLstore: true,
          tituloPasso1Lstore: true,
          descricaoPasso1Lstore: true,
          tituloPasso2Lstore: true,
          descricaoPasso2Lstore: true,
          tituloPasso3Lstore: true,
          descricaoPasso3Lstore: true,
          tituloGaleriaLstore: true,
          descricaoGaleriaLstore: true,
          imagensGaleriaLstore: {
            sourceUrl: true,
          },
          tituloSalaLstore: true,
          descricaoSalaLstore: true,
          imagensSalaLstore: {
            sourceUrl: true,
          },
          imagem1: {
            sourceUrl: true,
          },
          imagem2: {
            sourceUrl: true,
          },
          tituloUltimoLstore: true,
          descricaoUltimoLstore: true,
        },
      },
    ],
    pageBy: [
      {
        pageId: 201,
      },
      {
        informacoesDeContato: {
          coTelefone: true,
          coWhatsapp: true,
          coEmail: true,
          coEndereco: true,
          linkFacebook: true,
          linkInstagram: true,
          linkYoutube: true,
        },
      },
    ],
  });

  return {
    props: {
      data: {
        page: page,
        social: pageBy?.informacoesDeContato,
      },
    },
    revalidate: 30,
  };
};
