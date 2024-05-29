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
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aos from 'aos';
import InputMask from 'react-input-mask';

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
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Remove non-numeric characters from the phone number
    const phoneNumber = phone.replace(/\D/g, '');
    formData.set('telefone', phoneNumber);

    // Use fetch or axios to send formData to your backend
    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setResult(true);
      });
  };

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
      <header class="bg-white py-8 rounded-b-2xl relative z-10">
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
        <section class="w-full -translate-y-6 relative" id="hero">
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
          <div class="relative xl:absolute top-0 left-0 right-0 z-10 w-full h-full">
            <div class="xl:container flex items-center justify-end h-full hero-wrap bg-pink xl:bg-transparent px-8 xl:px-0 py-[40px] sm:py-[80px] xl:py-0">
              <div class="text-white px-0 sm:px-12 xl:px-0 xl:w-[380px] 2xl:xl:w-[500px]">
                <p class="text-[2rem] sm:text-[2.5rem] 2xl:text-[3rem] font-sans leading-[2.2rem] sm:leading-[3rem] 2xl:leading-[3.2rem]">
                  Lançamento na Região Sul de Rio Preto. Saiba mais sobre o
                  V3RSO JK
                </p>
                <form
                  id="RDV3RSOJK"
                  action="https://www.terracelupema.com.br/inc/prosses.php"
                  method="post"
                  class="mt-6"
                  // onSubmit={handleSubmit}
                >
                  <label for="name" class="my-4 block">
                    <span class="text-sm">Nome</span>
                    <input
                      type="text"
                      name="nome"
                      id="name"
                      required
                      class="rounded-lg 2xl:rounded-xl block w-full py-[6px] 2xl:py-[10px]"
                    />
                  </label>
                  <label for="email" class="my-4 block">
                    <span class="text-sm">E-mail</span>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      class="rounded-lg 2xl:rounded-xl block w-full py-[6px] 2xl:py-[10px]"
                    />
                  </label>
                  <label for="tel" class="my-4 block">
                    <span class="text-sm">Telefone</span>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={phone}
                      onChange={handlePhoneChange}
                    >
                      {(inputProps) => (
                        <input
                          {...inputProps}
                          type="tel"
                          name="telefone"
                          id="tel"
                          required
                          className="rounded-lg 2xl:rounded-xl block w-full py-[6px] 2xl:py-[10px]"
                        ></input>
                      )}
                    </InputMask>
                  </label>
                  <label for="check" class="flex my-3">
                    <input type="checkbox" name="check" id="check" required />
                    <span class="text-xs leading-2 ml-2">
                      Concordo que os dados pessoais fornecidos serão utilizados
                      para o envio de conteúdo informativo e publicitário sobre
                      os produtos, serviços e assuntos gerais do Grupo Lupema,
                      podendo ser compartilhado com intermediadores parceiros
                      para o oferecimento dos produtos Lupema, nos termos da{' '}
                      <a
                        href="https://www.lupemaengenharia.com.br/politica-de-privacidade"
                        target="_blank"
                      >
                        <u>Política de Privacidade</u>
                      </a>{' '}
                      e da Lei Geral de Proteção de Dados.
                    </span>
                  </label>
                  <input type="hidden" name="lp" value="verso" />
                  <input
                    type="submit"
                    value="FALE COM UM CONSULTOR"
                    class="rounded-lg 2xl:rounded-xl block w-full bg-black mt-6 py-2 2xl:py-4 uppercase cursor-pointer"
                  />
                  {result ? <Error /> : ''}
                </form>
              </div>
            </div>
          </div>
        </section>
        <section class="container py-12">
          <h1
            class="text-pink uppercase text-center text-[2rem] sm:text-[2.5rem] font-sans"
            data-aos="fade-up"
          >
            SOBRE O EMPREENDIMENTO
          </h1>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-6">
            <div class="slide" data-aos="fade-right">
              <SlideApp
                items={carousel1}
                largura={{ desktop: 0, mobile: 0 }}
                infinite={true}
                navigation={false}
                dots={true}
                autoPlay={true}
              ></SlideApp>
              <div class="px-6">
                <h2 class="text-xl text-pink block my-2 font-semibold">
                  Housi AppSpace
                </h2>
                <p>
                  Ter, na palma da mão, serviços conectados, conveniências e
                  descontos exclusivos faz toda a diferença.
                </p>
              </div>
            </div>
            <div data-aos="fade-up">
              <picture>
                <source type="image/webp" src={localizacaoWebp.src} />
                <source type="image/jpeg" src={localizacaoJpeg.src} />
                <img
                  src={localizacaoJpeg.src}
                  alt="Imagem localização"
                  className="rounded-[35px]"
                />
              </picture>
              <div class="px-6">
                <h2 class="text-xl text-pink block my-2 font-semibold">
                  Localização
                </h2>
                <p>
                  O lugar perfeito para escrever a sua história. O V3RSO JK está
                  localizado na Região Sul de Rio Preto.
                </p>
              </div>
            </div>
            <div class="slide" data-aos="fade-left">
              <SlideApp
                items={carousel2}
                largura={{ desktop: 0, mobile: 0 }}
                infinite={true}
                navigation={false}
                dots={true}
                autoPlay={true}
              />
              <div class="px-6">
                <h2 class="text-xl text-pink block my-2 font-semibold">
                  Área de lazer
                </h2>
                <p>
                  Ambientes com estrutura moderna e equipada para aproveitar
                  cada momento de lazer do seu jeito.
                </p>
              </div>
            </div>
          </div>
          <a
            href="#hero"
            class="bg-pink  text-center text-white py-4 uppercase mt-6 rounded-xl px-6 sm:px-12 max-w-max block mx-auto"
          >
            Saiba mais sobre o empreendimento
          </a>
        </section>
        <section class="py-12" data-aos="fade-up">
          <div class="xl:h-[480px] 2xl:h-[700px] bg-black relative grid">
            <picture>
              <source type="image/webp" src={houseWebp.src} />
              <source type="image/jpeg" src={houseJpeg.src} />
              <img
                src={houseJpeg.src}
                alt="Ambiente house"
                className="xl:h-[480px] 2xl:h-[700px] order-2 xl:order-1"
              />
            </picture>
            <div class="relative xl:absolute top-0 left-0 w-full h-[480px] 2xl:h-[700px] order-1 xl:order-2">
              <div class="container flex items-center justify-end h-full">
                <div class=" py-6 px-6 text-white w-full xl:w-[400px]">
                  <h1 class="uppercase text-[2rem] sm:text-[2.5rem] font-sans leading-10">
                    EM SINTONIA<br></br> COM O SEU<br></br> RITMO DE VIDA
                  </h1>
                  <p class="mt-4">
                    O V3RSO é um convite para experimentar o avanço que vivemos
                    a cada dia.
                  </p>
                  <p class="my-4">
                    Um empreendimento que recria o tradicional e dá início a
                    novas formas, com mais tecnologia e inovação.
                  </p>
                  <p>
                    É a representação da evolução do hoje, que pode se tornar o
                    grande clássico do amanhã.
                  </p>
                  <a
                    href="#hero"
                    class="bg-pink text-white py-4 uppercase mt-6 rounded-xl px-12 block mx-0 xl:mx-auto text-center"
                  >
                    Receba informações exclusivas sobre o V3RSO JK
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="sm:container py-12">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div class="pl-8" data-aos="fade-right">
              <p class="text-lg">
                Estamos esperando por você no
                <span class="text-pink"> Shopping Iguatemi</span> para mostrar
                todos os detalhes do nosso lançamento. Ponto de referência:{' '}
                <span class="text-pink">em frente a loja iPlace.</span>
              </p>
              <a
                href="#hero"
                class="bg-pink button-aproveite text-white text-center py-4 uppercase mt-8 rounded-xl px-6 max-w-max block mx-auto sm:mx-0"
              >
                APROVEITE AS CONDIÇÕES DE LANÇAMENTO
              </a>
            </div>
            <picture data-aos="fade-left" class="col-span-2">
              <source type="image/webp" src={iguatemiWebp.src} />
              <source type="image/jpeg" src={iguatemiJpeg.src} />
              <img
                src={iguatemiJpeg.src}
                alt="Foto iguatemi"
                className="sm:rounded-[35px]"
              />
            </picture>
          </div>
        </section>
      </main>
      <footer>
        <div class="bg-graylight py-12 px-4">
          <div class="w-full lg:w-[70%] mx-auto lg:flex items-center">
            <img
              src={logoLupema.src}
              alt="Logo Lupema"
              class="w-[180px] mr-6 mb-4 lg:mb-0"
            />
            <small>
              Empreendimento aprovado conforme alvará de construção nº 3634,
              emitido em 29 de novembro de 2021 pela Prefeitura de São José do
              Rio Preto/SP. Incorporação registrada sob o R.4 da matrícula
              195.233, do 1º Registro de Imóveis de São José do Rio Preto/SP.
            </small>
          </div>
        </div>
        <div class="bg-black py-3 text-white/30">
          <div class="container sm:flex text-center items-center justify-center">
            <small>Lupema Engenharia | Todos os direitos reservados</small>
            <div class="flex ml-4 items-center justify-center sm:justify-start">
              <small>Desenvolvido por: </small>
              <a
                href="https://mayacomunicacao.com.br"
                title="Maya Comunicação"
                class="ml-2"
              >
                <img src={logomaya.src} alt="Logo Maya Comunicação" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="http://tour360.lupemaengenharia.com.br/tour-verso"
        target="_blank"
        class="fixed bottom-8 text-center left-8 drop-shadow-[-3px_3px_7px_rgba(0,0,0,0.30)] block bg-black p-4 rounded-xl cursor-pointer"
      >
        <img src={tour360.src} alt="Tour virtual" />
        <span class="uppercase font-bold text-white">Tour Virtual</span>
      </a>
      <Helmet>
        <script defer>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MXDT5DX');`}
        </script>
      </Helmet>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MXDT5DX"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      <script
        type="text/javascript"
        async
        src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/c978fde6-9d5f-4c3e-a5dc-2a629b3aec05-loader.js"
      ></script>
    </div>
  );
};
export default Verso;

export const getStaticProps = async () => {
  const { pageBy } = await ClientApp.query({
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
        social: pageBy?.informacoesDeContato,
      },
    },
    revalidate: 30,
  };
};
