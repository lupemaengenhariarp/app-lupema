import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import Aos from 'aos';
import ClientApp from '../../lib/genql';
import logoPowered from './assets/img/logo-powered.svg';
import logoVerso from './assets/img/logo-verso.svg';
import logoVersoMobi from './assets/img/logo-verso-mobi.png';
import logoLupema from './assets/img/logo-lupema.svg';
import heroMobiWebp from './assets/img/hero-mobi.webp';
import heroMobiJpeg from './assets/img/hero-mobi.jpeg';
import heroWebp from './assets/img/hero.webp';
import heroJpeg from './assets/img/hero.jpeg';
import housi5Jpeg from './assets/img/HOUSI/5.jpeg';
import housi4Jpeg from './assets/img/HOUSI/4.jpeg';
import housi3Jpeg from './assets/img/HOUSI/3.jpeg';
import housi2Jpeg from './assets/img/HOUSI/2.jpeg';
import housi1Jpeg from './assets/img/HOUSI/1.jpeg';
import houseWebp from './assets/img/house.webp';
import houseJpeg from './assets/img/house.jpeg';
import localizacaoWebp from './assets/img/localizacao.webp';
import localizacaoJpeg from './assets/img/localizacao.jpg';
import iguatemiWebp from './assets/img/iguatemi.webp';
import iguatemiJpeg from './assets/img/iguatemi.jpeg';
import LAZER1jpeg from './assets/img/LAZER/1.jpeg';
import LAZER2jpeg from './assets/img/LAZER/2.jpeg';
import LAZER3jpeg from './assets/img/LAZER/3.jpeg';
import LAZER4jpeg from './assets/img/LAZER/4.jpeg';
import LAZER5jpeg from './assets/img/LAZER/5.jpeg';
import LAZER6jpeg from './assets/img/LAZER/6.jpeg';
import LAZER7jpeg from './assets/img/LAZER/7.jpeg';
import logomaya from './assets/img/logo-maya.svg';
import tour360 from './assets/img/360.svg';
import SlideApp from '../../components/layout/Slide';

const Verso = () => {
  const carousel1 = [
    <img src={housi5Jpeg.src} alt="Imagem Housi" className="rounded-[35px]" />,
    <img src={housi4Jpeg.src} alt="Imagem Housi" className="rounded-[35px]" />,
    <img src={housi3Jpeg.src} alt="Imagem Housi" className="rounded-[35px]" />,
    <img src={housi2Jpeg.src} alt="Imagem Housi" className="rounded-[35px]" />,
    <img src={housi1Jpeg.src} alt="Imagem Housi" className="rounded-[35px]" />,
  ];

  const carousel2 = [
    <img
      src={LAZER7jpeg.src}
      alt="Imagem do empreendimento"
      className="rounded-[35px]"
    />,
    <img
      src={LAZER6jpeg.src}
      alt="Imagem do empreendimento"
      className="rounded-[35px]"
    />,
    <img
      src={LAZER5jpeg.src}
      alt="Imagem do empreendimento"
      className="rounded-[35px]"
    />,
    <img
      src={LAZER4jpeg.src}
      alt="Imagem do empreendimento"
      className="rounded-[35px]"
    />,
    <img
      src={LAZER3jpeg.src}
      alt="Imagem do empreendimento"
      className="rounded-[35px]"
    />,
    <img
      src={LAZER2jpeg.src}
      alt="Imagem do empreendimento"
      className="rounded-[35px]"
    />,
    <img
      src={LAZER1jpeg.src}
      alt="Imagem do empreendimento"
      className="rounded-[35px]"
    />,
  ];
  const [result, setResult] = useState(false);
  const Error = () => {
    return (
      <div className="mt-7 bg-white rounded-xl text-center p-2">
        <p className="text-red-600 font-semibold text-[14px]">
          Erro ao registrar o formulário tente novamente!
        </p>
      </div>
    );
  };
  useEffect(() => {
    Aos.init({ duration: 400, easing: 'ease', once: false });
    const currentURL = window.location.href;

    if (currentURL.includes('error')) {
      setResult(true);
    }
  }, []);

  return (
    <div>
      <header className="bg-white py-8 rounded-b-2xl relative z-10">
        <div className="container grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center items-center">
          <img
            className="w-[200px] mx-auto hidden sm:block"
            src={logoPowered.src}
            alt="Powered by Housi"
          />
          <img
            className="w-[250px] mx-auto hidden sm:block"
            src={logoVerso.src}
            alt="Logo Verso"
          />
          <img
            className="w-[250px] mx-auto block sm:hidden"
            src={logoVersoMobi.src}
            alt="Logo Verso"
          />
          <div className="flex items-center justify-center">
            <p className="hidden sm:block">Realização:</p>
            <img className="w-32 ml-3" src={logoLupema.src} alt="Logo Lupema" />
          </div>
        </div>
      </header>
      <main>
        <section className="w-full -translate-y-6 relative" id="hero">
          <div className="hero">
            <picture>
              <source
                type="image/webp"
                srcSet={heroMobiWebp.src}
                media="(max-width: 1080px)"
              />
              <source
                type="image/jpeg"
                srcSet={heroMobiJpeg.src}
                media="(max-width: 1080px)"
              />
              <source type="image/webp" srcSet={heroWebp.src} />
              <source type="image/jpeg" srcSet={heroJpeg.src} />
              <img src={heroJpeg.src} alt="Hero Verso" />
            </picture>
          </div>
          <div className="relative xl:absolute top-0 left-0 right-0 z-10 w-full h-full">
            <div className="xl:container flex items-center justify-end h-full hero-wrap bg-pink xl:bg-transparent px-8 xl:px-0 py-[40px] sm:py-[80px] xl:py-0">
              <div className="text-white px-0 sm:px-12 xl:px-0 xl:w-[380px] 2xl:xl:w-[500px]">
                <p className="text-[2rem] sm:text-[2.5rem] 2xl:text-[3rem] font-sans leading-[2.2rem] sm:leading-[3rem] 2xl:leading-[3.2rem]">
                  Lançamento na Região Sul de Rio Preto. Saiba mais sobre o
                  V3RSO JK
                </p>
                <form
                  id="RDV3RSOJK"
                  action="https://www.terracelupema.com.br/inc/prosses.php"
                  method="post"
                  className="mt-6"
                >
                  <label htmlFor="name" className="my-4 block">
                    <span className="text-sm">Nome</span>
                    <input
                      type="text"
                      name="nome"
                      id="name"
                      required
                      className="rounded-lg 2xl:rounded-xl block w-full py-[6px] 2xl:py-[10px]"
                    />
                  </label>
                  <label htmlFor="email" className="my-4 block">
                    <span className="text-sm">E-mail</span>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="rounded-lg 2xl:rounded-xl block w-full py-[6px] 2xl:py-[10px]"
                    />
                  </label>
                  <label htmlFor="tel" className="my-4 block">
                    <span className="text-sm">Telefone</span>
                    <InputMask
                      mask="(99) 99999-9999"
                      maskChar={null}
                      type="tel"
                      name="telefone"
                      id="tel"
                      required
                      className="rounded-lg 2xl:rounded-xl block w-full py-[6px] 2xl:py-[10px]"
                    />
                  </label>
                  <label htmlFor="check" className="flex my-3">
                    <input type="checkbox" name="check" id="check" required />
                    <span className="text-xs leading-2 ml-2">
                      Concordo que os dados aqui preenchidos sejam coletados
                      para uso de marketing.
                    </span>
                  </label>
                  {result ? <Error /> : ''}
                  <button
                    type="submit"
                    className="bg-golden text-gray w-full py-4 mt-2 rounded-lg 2xl:rounded-xl hover:bg-yellow-400"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="container mt-16 xl:mt-[150px] px-0 sm:px-6">
          <div className="text-center" data-aos="fade-up">
            <img
              className="sm:w-4/5 mx-auto"
              src={houseWebp.src}
              alt="House Verso"
            />
            <p className="text-[1.4rem] font-sans text-pink font-semibold mb-5">
              SOBRE O EMPREENDIMENTO
            </p>
            <p className="text-gray-dark text-[1.2rem] font-sans leading-8">
              Prepare-se para um novo e exclusivo conceito de viver bem, onde o
              requinte e sofisticação encontram-se perfeitamente harmonizados.
              No V3RSO JK, cada detalhe foi meticulosamente planejado para
              proporcionar uma experiência de vida incomparável.
            </p>
          </div>
        </section>
        <section className="container mt-16 xl:mt-[100px] px-0 sm:px-6 relative">
          <div className="flex items-center justify-center mb-8 relative">
            <h2 className="hidden">Lazer</h2>
            <div className="flex-grow">
              <img
                className="hidden sm:block w-5/6 mx-auto"
                src={logomaya.src}
                alt="Logo Maya"
              />
            </div>
            <img
              className="hidden sm:block w-[500px] mx-auto"
              src={tour360.src}
              alt="Tour 360"
            />
            <div className="flex-grow">
              <img
                className="w-[90%] sm:hidden mx-auto"
                src={logomaya.src}
                alt="Logo Maya"
              />
            </div>
          </div>
          <SlideApp items={carousel2} />
        </section>
        <section className="container mt-16 xl:mt-[150px] px-0 sm:px-6 relative">
          <div className="text-center mb-8" data-aos="fade-up">
            <h2 className="text-pink text-[2rem] sm:text-[2.5rem] 2xl:text-[3rem] font-semibold">
              LOCALIZAÇÃO
            </h2>
          </div>
          <div className="grid xl:grid-cols-2 gap-8 relative">
            <div data-aos="fade-up">
              <img
                className="rounded-[35px]"
                src={localizacaoWebp.src}
                alt="Localização"
              />
            </div>
            <div
              className="text-gray-dark text-[1.2rem] font-sans leading-8"
              data-aos="fade-up"
            >
              <p>
                Situado na região mais nobre de Rio Preto, o V3RSO JK oferece
                fácil acesso às principais vias da cidade, além de estar próximo
                aos mais variados estabelecimentos comerciais e de lazer, como
                shoppings, restaurantes e parques.
              </p>
              <p className="mt-5">
                Com a praticidade de uma localização privilegiada, você terá
                tudo o que precisa ao seu alcance, garantindo uma rotina mais
                leve e prática.
              </p>
            </div>
          </div>
        </section>
        <section className="container mt-16 xl:mt-[100px] px-0 sm:px-6 relative">
          <div className="text-center mb-8" data-aos="fade-up">
            <h2 className="text-pink text-[2rem] sm:text-[2.5rem] 2xl:text-[3rem] font-semibold">
              IGUATEMI
            </h2>
          </div>
          <div className="grid xl:grid-cols-2 gap-8 relative">
            <div data-aos="fade-up">
              <img
                className="rounded-[35px]"
                src={iguatemiWebp.src}
                alt="Iguatemi"
              />
            </div>
            <div
              className="text-gray-dark text-[1.2rem] font-sans leading-8"
              data-aos="fade-up"
            >
              <p>
                Tenha o Shopping Iguatemi como sua extensão de casa. A poucos
                minutos do V3RSO JK, este centro de compras oferece as melhores
                lojas, uma ampla variedade de restaurantes, serviços
                diferenciados e entretenimento para todas as idades.
              </p>
              <p className="mt-5">
                Aproveite ao máximo essa comodidade e tenha à sua disposição um
                mundo de possibilidades, tornando seu dia a dia mais prático e
                agradável.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Verso;
