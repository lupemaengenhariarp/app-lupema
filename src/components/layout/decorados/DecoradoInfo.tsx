import React from 'react';
import { TbMapPin, TbClock, TbPhone, TbBrandWhatsapp } from 'react-icons/tb';
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

const DecoradoInfo = ({ content }: Content) => {
    if (!content || content.length === 0) return null;

    const sortedCentrais = [...content].sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
    );

    return (
        <div className="bg-black py-16">
            <div className="mx-auto text-white">
                {sortedCentrais.map((item) => {
                    if (!item) return null;
                    const info = item.centralDeDecorados;
                    if (!info) return null;

                    return (
                        <div key={item.uri}>
                            {/* Título */}
                            <div className='sm:container'>
                                <h1 className="title decoradoTitle">
                                    Nossa central
                                </h1>
                                <div className="w-12 h-0.5 bg-green-700 mx-auto mb-6"></div>

                                {/* Itens em linha */}
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    {/* Endereço */}
                                    <div className="flex items-center gap-2">
                                        <TbMapPin size={30} className="text-white" />
                                        <div className="block my-4 text-xl text-left">
                                            <p>{info.enderecoRua} {info.enderecoNumero}</p>
                                            <p>{info.enderecoBairro} - {info.enderecoCidade}</p>
                                        </div>
                                    </div>

                                    {/* Atendimento */}
                                    <div className="flex items-center gap-2">
                                        <TbClock size={30} className="text-white" />
                                        <div className="block my-4 text-xl text-left">
                                            <p><strong>Segunda a sexta:</strong> {info.atendimentoSemana}</p>
                                            <p><strong>Sábados:</strong> {info.atendimentoSabado}</p>
                                            <p><strong>Domingos:</strong> {info.atendimentoDomingo}</p>
                                            <p><strong>Feriados:</strong> {info.atendimentoFeriado}</p>
                                        </div>
                                    </div>

                                    {/* Telefone */}
                                    <div className="flex flex-col gap-2 my-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <TbPhone size={22} className="text-white" />
                                            <span className="text-xl">{info.telefone}</span>
                                        </div>
                                        {info.whatsapp && (
                                            <div className="flex items-center gap-2">
                                                <TbBrandWhatsapp size={22} className="text-white" />
                                                <span className="text-xl">{info.whatsapp}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DecoradoInfo;
