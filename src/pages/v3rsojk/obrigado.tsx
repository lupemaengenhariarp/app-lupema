import ClientApp from '../../lib/genql';
import logoVerso from './assets/img/logo-verso-white.svg';

const PgObrigado = () => {
  return (
    <section className="bg-[#000000] h-screen relative">
      <div className="container flex justify-center items-center h-full p-12">
        <div className="text-white text-center">
          <img
            src={logoVerso.src}
            alt="Logo Verso JK - Lupema empreendimentos"
            className="w-[280px] block mx-auto"
          />
          <div className="text-center my-12">
            <h1 className="text-3xl bg-[#e72e64] py-2 px-6 text-[#000000] font-bold w-max mx-auto rounded-md">
              Cadastro realizado com sucesso!
            </h1>
            <p className="mt-4">
              Obrigado por expressar interesse no V3rso JK.
              <br></br>
              Fique de olho em sua caixa de entrada, pois enviaremos informações
              importantes em breve.
            </p>
            <a
              href="/"
              className="py-2 px-4 rounded-md bg-white/20 text-white uppercase block w-max mx-auto my-4"
            >
              Visitar o site
            </a>
          </div>
        </div>
      </div>
      <p className="absolute bottom-10 left-0 right-0 text-center h-5 z-10">
        <small className="text-white/30">
          © 2022 Lupema Engenharia Todos os direitos reservados.
        </small>
      </p>
    </section>
  );
};

export default PgObrigado;

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
