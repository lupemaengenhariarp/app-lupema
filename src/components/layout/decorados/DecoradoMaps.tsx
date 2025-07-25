import React from 'react';
import { CentraldeDecorado_Centraldedecorados } from '../../../generated';

interface Content {
    content: (CentraldeDecorado_Centraldedecorados & {
        title?: string | null;
        uri?: string | null;
        centralDeDecorados?: {
            atendimentoSemana?: string | null;
            atendimentoSabado?: string | null;
            atendimentoDomingo?: string | null;
            atendimentoFeriado?: string | null;
            enderecoBairro?: string | null;
            enderecoCidade?: string | null;
            enderecoNumero?: string | null;
            enderecoRua?: string | null;
            telefone?: string | null;
            whatsapp?: string | null;
            imagemPrincipal?: {
                uri?: string | null;
                slug?: string | null;
                filePath?: string | null;
            } | null;
        } | null;
    })[] | undefined;
    link: boolean;
}

const DecoradoMaps = ({ content }: Content) => {
    if (!content || content.length === 0) return null;

    const formatString = (str: string) => {
        return str
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '%20');
    };

    return (
        <div className="bg-black">
            <h2 className="title text-center decoradoTitleMap">
                Venha visitar a nossa central
            </h2>

            <div className='sm:container iframeDecorado'>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {content
                        .filter((item) => item && typeof item === 'object' && 'centralDeDecorados' in item && !!item.centralDeDecorados)
                        .map((item) => {
                            const info = item.centralDeDecorados!;

                            const addressParts = [
                                info.enderecoRua,
                                info.enderecoNumero,
                                info.enderecoBairro,
                                info.enderecoCidade
                            ].filter(Boolean);

                            const address = addressParts.join(', ');
                            const formattedAddress = formatString(address);

                            return (
                                <div key={item.uri} className="w-full bg-gray-200">
                                    <iframe
                                        src={`https://maps.google.com/maps?q=${formattedAddress}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                                        height="100%"
                                        width="100%"
                                        loading="lazy"
                                        allowFullScreen
                                        className="border-0 decoradoIframe"
                                    ></iframe>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default DecoradoMaps;
