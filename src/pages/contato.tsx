import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import CadastroImobiCorretores from '../components/layout/forms/CadastroImobiCarretores';
import FaleConosco from '../components/layout/forms/FaleConosco';
import Fornecedor from '../components/layout/forms/Fornecedor';
import OferecaSuaArea from '../components/layout/forms/OferecaSuaArea';
import TrabalheConosco from '../components/layout/forms/TrabalheConosco';
import { Page_Informacoesdecontato } from '../generated';
import ClientApp from '../lib/genql';

interface Props {
  data: {
    social: Page_Informacoesdecontato;
  };
}

interface IPageForms {
  [key: string]: string;
}

const ContatoApp: NextPage<Props> = ({ data }) => {
  const [form, setForm] = useState('fale_conosco');
  const [toggle, setToggle] = useState(true);

  const pageForms: IPageForms = {
    '#fale-conosco': 'fale_conosco',
    '#trabalhe-conosco': 'trabalhe_conosco',
    '#seja-nosso-fornecedor': 'fornecedor',
    '#ofereca-sua-area': 'oferecasuaarea',
  };
  useEffect(() => {
    const { hash } = window.location;

    if (!hash) return;

    const result = Object.keys(pageForms).includes(hash);

    if (result) {
      setForm(pageForms[hash]);
    }
  }, []);

  const whats = data.social.coWhatsapp?.replace(/\s/g, '');

  return (
    <section className="container py-[40px] md:py-[80px] mt-[100px] sm:mt-[74px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="">
          <h2
            className="border-green border sm:border-0 px-4 sm:px-0 py-3 sm:py-0 text-2xl sm:text-3xl text-green mb-8 relative"
            onClick={() => setToggle(!toggle)}
          >
            Escolha um assunto:
            <span className="block sm:hidden absolute top-0 right-0 py-4 px-2">
              <IoIosArrowDown />
            </span>
          </h2>
          <div className={`${toggle && 'hidden'} sm:block`}>
            <button
              className={`text-2xl py-4 block hover:text-green ${
                form === 'fale_conosco' && 'text-green'
              }`}
              onClick={() => setForm((prev) => (prev = 'fale_conosco'))}
            >
              Fale conosco
            </button>
            <button
              className={`text-2xl py-4 block hover:text-green ${
                form === 'trabalhe_conosco' && 'text-green'
              }`}
              onClick={() => setForm((prev) => (prev = 'trabalhe_conosco'))}
            >
              Trabalhe conosco
            </button>
            <button
              className={`text-2xl py-4 block hover:text-green ${
                form === 'fornecedor' && 'text-green'
              }`}
              onClick={() => setForm((prev) => (prev = 'fornecedor'))}
            >
              Seja nosso fornecedor
            </button>
            <button
              className={`text-2xl py-4 block hover:text-green ${
                form === 'cadastroImobiCorretores' && 'text-green'
              }`}
              onClick={() =>
                setForm((prev) => (prev = 'cadastroImobiCorretores'))
              }
            >
              Cadastro de imobiliárias e corretores
            </button>
            <button
              className={`text-2xl py-4 block hover:text-green ${
                form === 'oferecasuaarea' && 'text-green'
              }`}
              onClick={() => setForm((prev) => (prev = 'oferecasuaarea'))}
            >
              Ofereça sua área
            </button>
          </div>
        </div>
        <div>
          {form === 'fale_conosco' && <FaleConosco />}
          {form === 'trabalhe_conosco' && <TrabalheConosco />}
          {form === 'fornecedor' && <Fornecedor />}
          {form === 'cadastroImobiCorretores' && <CadastroImobiCorretores />}
          {form === 'oferecasuaarea' && <OferecaSuaArea />}
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="w-[100%] sm:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:mt-0 order-2 sm:order-1">
          <div className="">
            <h3 className="text-green text-xl font-medium">
              Fale com a Lupema
            </h3>
            <a
              href={`tel:+55${data.social.coTelefone}`}
              className="block my-4 text-xl"
            >
              {data.social.coTelefone}
            </a>
            <a href={`tel:+55${whats}`} className="block my-4 text-xl">
              {data.social.coWhatsapp}
            </a>
            <a className="block" href="mailto:lupema@lupemaengenharia.com.br">
              {data.social?.coEmail}
            </a>
          </div>
          <div>
            <h3 className="text-green text-xl font-medium">Como chegar</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: data.social?.coEndereco || '',
              }}
            />
          </div>
        </div>
        <div className="mt-6 order-1 sm:order-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.2480319017227!2d-49.40509698545035!3d-20.82168837202999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bc4d3a008e947b%3A0xdec89eaae4b8e481!2sLupema%20Engenharia%20e%20Com%C3%A9rcio%20Ltda!5e0!3m2!1spt-BR!2sbr!4v1676658308796!5m2!1spt-BR!2sbr"
            width="100%"
            height="350"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContatoApp;

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
    props: { data: { social: page?.informacoesDeContato } },
    revalidate: 30,
  };
};
