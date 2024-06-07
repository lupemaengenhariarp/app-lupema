import { useEffect, useState } from 'react';
import { MdWifiCalling3 } from 'react-icons/md';
import { RiWhatsappFill } from 'react-icons/ri';
import { Page_Informacoesdecontato } from '../../generated';
import Image from 'next/image';

interface Props {
  data: Page_Informacoesdecontato;
}

const WhatsApp = ({ data }: Props) => {
  const number = data.coWhatsapp?.replace(/[^\d]/g, '');

  const [device, setDevice] = useState(false);
  function CheckResize() {
    if (window.innerWidth < 1070) {
      setDevice(true);
    } else {
      setDevice(false);
    }
  }

  useEffect(() => {
    CheckResize();
    window.addEventListener('resize', CheckResize);
    return () => window.removeEventListener('resize', CheckResize);
  }, []);

  return (
    <div className="fixed bottom-6 flex flex-col items-center justify-center right-44 z-50 drop-shadow-md">
      {device && (
        <a href={`tel:${data.coTelefone}`} aria-label="Botão Telefone">
          <Image src={'/whatsapp.png'} alt="whatsapp" width={64} height={64} />
        </a>
      )}

      <a
        href={`https://api.whatsapp.com/send?phone=55${number}`}
        aria-label="Botão WhatsApp"
      >
        <Image
          src={'/whatsapp.png'}
          alt="whatsapp"
          width={64}
          height={64}
          className="bg-white rounded-full"
        />
      </a>
    </div>
  );
};

export default WhatsApp;
