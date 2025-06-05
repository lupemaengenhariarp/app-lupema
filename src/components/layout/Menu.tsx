import Image from 'next/image';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoMdClose,
} from 'react-icons/io';
import { GoLocation } from 'react-icons/go';
import Link from 'next/link';
import Logo from '../../../public/logo.svg';
import { useMenuMobileContext } from '../../context/menuMobileContext';
import { Page_Informacoesdecontato } from '../../generated';

interface Props {
  data: Page_Informacoesdecontato;
}

interface Links {
  path: string;
  label: string;
}

const MenuApp = ({ data }: Props) => {
  const { state: status, toogleState } = useMenuMobileContext();

  const LinkPath = ({ path, label }: Links) => {
    return (
      <Link href={path} className="hover:text-green">
        {label}
      </Link>
    );
  };

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between sm:justify-start w-full">
        <button
          aria-label="Botão hamburger menu"
          className="pr-0 md:pr-8 order-2 md:order-1 "
          onClick={(e) => toogleState()}
        >
          <IoMdClose size={35} className="hover:rotate-90 transition-all" />
        </button>
        <Image
          src={Logo}
          alt="Logo Lupema Engenharia"
          width={220}
          height={39}
          className="order=1 md:order-2"
        />
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-[40px] sm:mt-[80px] text-center sm:text-left px-0 sm:px-2 xl:px-[100px]">
        <div className="flex flex-col space-y-3 md:space-y-4 text-xl">
          <LinkPath path="/a-lupema" label="A Lupema" />
          <LinkPath path="/empreendimentos/todos" label="Empreendimentos" />
          <LinkPath path="/noticias" label="Notícias" />
          <LinkPath path="/assessoria" label="Imprensa" />
          <Link
            href="http://blog.lupemaengenharia.com.br"
            className="hover:text-green"
          >
            Blog
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col space-y-3 md:space-y-4 text-xl">
            <LinkPath path="/contato#fale-conosco" label="Fale Conosco" />
            {/* <LinkPath path="/contato#trabalhe-conosco" label="Trabalhe Conosco" /> */}
            <LinkPath path="https://lupemaengenharia.vagas.solides.com.br" label="Trabalhe Conosco" />
            <LinkPath path="/contato#seja-nosso-fornecedor" label="Seja nosso fornecedor" />
            <LinkPath path="/contato#ofereca-sua-area" label="Ofereça sua área" />
          </div>
          <div className="flex flex-col mt-16 space-y-3 md:space-y-4 text-xl">
            <a className="text-green" href="/area-do-cliente">
              Área do cliente
            </a>
            <a className="text-green" href="https://api.whatsapp.com/send?phone=551721379137&text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20website%20da%20Lupema%20Engenharia%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es">
              Dúvidas
            </a>
            <a className="text-green" href="https://lancamentos.lupemaengenharia.com.br/ouvidoria">
              SAC
            </a>
          </div>
        </div>
        <div className="pb-6 sm:pb-0">
          <h2 className="text-green">Siga nossas redes sociais</h2>
          <div className="flex items-center justify-center sm:justify-start mt-2 space-x-3">
            <a href={data.linkFacebook}>
              <IoLogoFacebook size={20} className="hover:text-green" />
            </a>
            <a className="px-3" href={data.linkInstagram}>
              <IoLogoInstagram size={20} className="hover:text-green" />
            </a>
            <a href={data.linkYoutube}>
              <IoLogoYoutube size={20} className="hover:text-green" />
            </a>
          </div>
          <h2 className="text-green mt-8">Fale com a Lupema</h2>
          <a href={`tel:+55${data.coTelefone}`} className="block">
            {data.coTelefone}
          </a>
          <a href={`mailto:${data.coEmail}`} className="block">
            {data.coEmail}
          </a>
          <a
            // href="https://goo.gl/maps/JGVmXZHQkEPRbeqp8"
            // href="https://www.google.com/maps/@-20.8344,-49.4070091,3a,75y,296.39h,87.18t/data=!3m6!1e1!3m4!1sJ7nryPnuRo4WMIkSUFvexA!2e0!7i16384!8i8192?coh=205409&entry=ttu"
            href="https://maps.app.goo.gl/awd3SjjKdUmDjeTZ8"
            className="flex items-center justify-center sm:justify-start text-green my-12"
          >
            <GoLocation size={24} />
            {/* <h2 className="ml-3">Como chegar na LStore</h2> */}
            <h2 className="ml-3">Central de decorados LStore</h2>
            {/* <h2 className="ml-3">Stand do Recanto</h2> */}
          </a>
          <h2 className="text-green mb-2">Escritório</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: data.coEndereco || '',
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default MenuApp;
