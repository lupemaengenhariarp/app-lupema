import { GetStaticProps } from 'next';
import Link from 'next/link';
import ClientApp from '../lib/genql';

export default function Custom404() {
  return (
    <section className="bg-bgi bg-repeat border-b-2 border-white/20">
      <div className="container h-[800px] flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center py-36 relative">
          <div className="w-full xl:w-[850px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <svg
              viewBox="0 0 828 362"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M149.5 99C136.5 116 122.667 134.5 108 154.5C93.3333 174.5 81 195 71 216H149.5V99ZM222.5 8.00002V216H259.5V277H222.5V354.5H149.5V277H9.53674e-07V222.5C7.33333 207.833 16.5 191.333 27.5 173C38.5 154.333 50.6667 135.333 64 116C77.6667 96.3334 92 77.1667 107 58.5C122 39.8334 137 23 152 8.00002H222.5ZM541.18 180.5C541.18 238.833 530.013 283.667 507.68 315C485.68 346 455.18 361.5 416.18 361.5C377.18 361.5 346.513 346 324.18 315C302.18 283.667 291.18 238.833 291.18 180.5C291.18 151.5 294.013 125.833 299.68 103.5C305.68 81.1667 314.18 62.3334 325.18 47C336.18 31.6667 349.346 20 364.68 12C380.013 4 397.18 5.72205e-06 416.18 5.72205e-06C455.18 5.72205e-06 485.68 15.6667 507.68 47C530.013 78 541.18 122.5 541.18 180.5ZM465.18 180.5C465.18 163.167 464.346 147.5 462.68 133.5C461.013 119.167 458.346 106.833 454.68 96.5C451.013 86.1667 446.013 78.1667 439.68 72.5C433.346 66.8334 425.513 64 416.18 64C406.846 64 399.013 66.8334 392.68 72.5C386.68 78.1667 381.68 86.1667 377.68 96.5C374.013 106.833 371.346 119.167 369.68 133.5C368.013 147.5 367.18 163.167 367.18 180.5C367.18 197.833 368.013 213.667 369.68 228C371.346 242.333 374.013 254.667 377.68 265C381.68 275.333 386.68 283.333 392.68 289C399.013 294.667 406.846 297.5 416.18 297.5C425.513 297.5 433.346 294.667 439.68 289C446.013 283.333 451.013 275.333 454.68 265C458.346 254.667 461.013 242.333 462.68 228C464.346 213.667 465.18 197.833 465.18 180.5ZM717.859 99C704.859 116 691.026 134.5 676.359 154.5C661.693 174.5 649.359 195 639.359 216H717.859V99ZM790.859 8.00002V216H827.859V277H790.859V354.5H717.859V277H568.359V222.5C575.693 207.833 584.859 191.333 595.859 173C606.859 154.333 619.026 135.333 632.359 116C646.026 96.3334 660.359 77.1667 675.359 58.5C690.359 39.8334 705.359 23 720.359 8.00002H790.859Z"
                fill="#3B3D48"
              />
            </svg>
          </div>
          <div className="z-10 mt-36">
            <h1 className="text-5xl sm:text-7xl font-bold text-white">Page note found</h1>
            <p className="text-white text-center">Ops! Este conteúdo não foi encontrado.</p>

            <div className="mt-36 text-center inline-block w-full">
              <Link
                href="/"
                className="py-2 px-8 bg-green text-white rounded-2xl text-2xl text-center"
              >
                Voltar para home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { page } = await ClientApp.query({
    page: [
      {
        id: '201',
        idType: 'DATABASE_ID',
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
        social: page?.informacoesDeContato,
      },
    },
  };
};
