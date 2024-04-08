import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const CookieNotice: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean>(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem('cookieAccepted');
    if (isAccepted) {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setAccepted(true);
  };

  if (!accepted) {
    return (
      <div className="bg-white px-8 py-8 fixed bottom-8 left-8 max-w-[330px] drop-shadow-xl z-10 border border-black/15">
        <p className="text-sm">
          De acordo com nossa Política de Privacidade e Cookies
          <Link
            href="/politica-de-privacidade"
            className="italic underline hover:text-green ml-1"
          >
            Mais informações
          </Link>
          , nós utilizamos cookies e tecnologias para a navegação. Ao continuar
          navegando, você concorda com as condições de tratamento de dados
          presentes na Política de Privacidade.
        </p>
        <button
          onClick={handleAccept}
          className="py-2 px-4 bg-green text-black hover:bg-black hover:text-green mt-4"
        >
          Concordo
        </button>
      </div>
    );
  }

  return null;
};

export default CookieNotice;
