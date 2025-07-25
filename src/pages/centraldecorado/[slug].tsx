import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import {
    CentraldeDecorado_Centraldedecorados, MediaItem,
    MediaItemRequest,
} from '../../generated';
import ClientApp from '../../lib/genql';
import { TbArrowRightBar, TbCar } from 'react-icons/tb';
import { BiBed, BiShareAlt } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useRouter } from 'next/router';
import DecoradoBanner from '../../components/layout/decorados/DecoradoBanner';
import DecoradoMenu from '../../components/layout/decorados/DecoradoMenu';
import DecoradoInfo from '../../components/layout/decorados/DecoradoInfo';
import DecoradoMaps from '../../components/layout/decorados/DecoradoMaps';

interface Props {
    data: {
        central: CentraldeDecorado_Centraldedecorados;
        centrais: {
            title?: string | null;
            uri?: string | null;
        }[];
        social?: {
            coTelefone?: string | null;
            coWhatsapp?: string | null;
            coEmail?: string | null;
            coEndereco?: string | null;
            linkFacebook?: string | null;
            linkInstagram?: string | null;
            linkYoutube?: string | null;
        } | null;
    };
}


interface mediaItem {
    sourceUrl: MediaItemRequest;
}

const CentralDecoradoApp: NextPage<Props> = ({ data }) => {
    const [value, setValue] = useState('');
    const [valueStage, setValueStage] = useState('');
    const [modalShare, setModalShare] = useState('');
    Fancybox.bind('[data-fancybox]', {
    });

    let combinedArray = [];

    return (
        <>
            <DecoradoBanner content={data.central} link={true} />
            <DecoradoMenu content={data.centrais} />
            <DecoradoInfo content={[data.central]} link={true} />
            <DecoradoMaps content={[data.central]} link={true} />
        </>
    );
};

export default CentralDecoradoApp;

export const getStaticPaths: GetStaticPaths = async () => {
    const routs = await ClientApp.query({
        centraldeDecorados: {
            nodes: {
                slug: true,
            },
        },
    });

    const paths =
        routs?.centraldeDecorados?.nodes.map((path) => {
            return {
                params: {
                    slug: path.slug as string,
                },
            };
        }) || [];

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    const result = await ClientApp.query({
        centraldeDecorado: [
            { id: slug, idType: 'SLUG' },
            {
                title: true,
                slug: true,
                uri: true,
                centralDeDecorados: {
                    atendimentoSemana: true,
                    atendimentoSabado: true,
                    atendimentoDomingo: true,
                    atendimentoFeriado: true,
                    enderecoBairro: true,
                    enderecoCidade: true,
                    enderecoNumero: true,
                    enderecoRua: true,
                    telefone: true,
                    whatsapp: true,
                    imagemPrincipal: {
                        sourceUrl: true,
                        filePath: true,
                    },
                },
            },
        ],
        centraldeDecorados: {
            nodes: {
                title: true,
                uri: true,
            },
        },
        page: [
            { id: '201', idType: 'DATABASE_ID' },
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
                central: result.centraldeDecorado,
                centrais: result.centraldeDecorados?.nodes || [],
                social: result.page?.informacoesDeContato || null,
            },
        },
        revalidate: 30,
    };
};


