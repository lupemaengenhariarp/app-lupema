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
  return (
    <section>
      <div className="flex flex-col lg:flex-row flex-wrap">
        <div className='w-full sm:w-[640px] md:w-[460px] lg:w-[614px] xl:w-[768px] 2xl:w-[956px] ml-auto mr-auto xl:mr-0 py-[40px] md:py-[80px] mt-[100px] sm:mt-[74px] pl-4 xl:pl-[20px] 2xl:pl-0 pr-4 sm:pr-0 xl:pr-16 justify-end'>
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
        <div className="w-full lg:w-[40%] max-h-96 h-auto lg:max-h-[100dvh] sticky top-0">
          <img
            src={data.page?.featuredImage?.node.sourceUrl || ''}
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </section>
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
