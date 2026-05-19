import { NextPage } from 'next';
import { Page, Page_Informacoesdecontato } from '../generated';
import ClientApp from '../lib/genql';

interface Props {
  data: {
    page: Page;
    social: Page_Informacoesdecontato;
  };
}

const PoliticaDeQualidade: NextPage<Props> = ({ data }) => {
  console.log(data.page);

  return (
    <>
      <section className="container py-[40px] md:py-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="py-8">
            <h1 className="border-0 text-2xl sm:text-3xl text-green mb-8 relative">
              {data.page?.title}
            </h1>
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: data.page?.content || '',
                }}
                className="content-wp"
              />
            }
          </div>
          <div className="w-full">
            <img
              src={data.page?.featuredImage?.node.sourceUrl || ''}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="container mb-20">
        <h2 className="text-2xl xl:text-4xl tracking-[8px] xl:tracking-[15px] text-green text-center uppercase font-normal">
          Certificações e Práticas de Excelência
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
          {data.page?.conteudoPoliticaDeQualidade?.certificacaoPq?.map(
            (item, index) => (
              <div
                key={index}
                className="border border-black p-6 sm:p-10 2xl:p-16"
              >
                <img
                  src={item?.imagemCertPq?.sourceUrl || ''}
                  width="110"
                  height="110"
                  className="mx-auto"
                />
                <h3 className="text-center mt-4 text-green text-xl">
                  {item?.tituloCertPq}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.descricaoCertPq || '',
                  }}
                  className="content-cert text-center"
                />
              </div>
            )
          )}
        </div>
        <div className="grid  grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mt-5">
          {data.page?.conteudoPoliticaDeQualidade?.praticaItensPq?.map(
            (item, index) => (
              <div key={index} className="border border-black p-16">
                <img
                  src={item?.imagemCertPq?.sourceUrl || ''}
                  width="180"
                  height="180"
                  className="mx-auto"
                />
                <h3 className="text-center mt-4 text-green text-xl">
                  {item?.tituloCertPq}
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.descricaoCertPq || '',
                  }}
                  className="content-cert text-center"
                />
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default PoliticaDeQualidade;

export const getStaticProps = async () => {
  const { page, pageBy } = await ClientApp.query({
    page: [
      {
        id: '1282',
        idType: 'DATABASE_ID',
      },
      {
        title: true,
        content: true,
        featuredImage: {
          node: {
            sourceUrl: true,
          },
        },
        conteudoPoliticaDeQualidade: {
          certificacaoPq: {
            imagemCertPq: {
              sourceUrl: true,
            },
            tituloCertPq: true,
            descricaoCertPq: true,
          },
          praticaItensPq: {
            imagemCertPq: {
              sourceUrl: true,
            },
            tituloCertPq: true,
            descricaoCertPq: true,
          },
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
      revalidate: 30,
    },
  };
};
