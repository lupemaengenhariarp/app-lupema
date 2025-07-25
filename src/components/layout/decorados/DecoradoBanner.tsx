import Image from 'next/image';
import { CentraldeDecorado_Centraldedecorados } from '../../../generated';

interface Content {
    content: (CentraldeDecorado_Centraldedecorados & {
        title?: string | null;
        uri?: string | null;
        centralDeDecorados?: {
            imagemPrincipal?: {
                filePath?: string | null;
                sourceUrl?: string | null;
            } | null;
        } | null;
    }) | undefined;
    link: boolean;
}

const DecoradoBanner = ({ content, link }: Content) => {
    if (!content) return null;

    const imgUrl = content.centralDeDecorados?.imagemPrincipal?.sourceUrl || '';
    const title = content.title || '';

    const imgs = (
        <div className="h-[550px] xl:h-screen w-full relative bg-black">
            <Image
                className="hidden md:block object-cover opacidade05"
                src={imgUrl}
                alt={title}
                fill
            />
            <Image
                className="block md:hidden object-cover opacidade05"
                src={imgUrl}
                alt={title}
                fill
            />
            <div className="absolute top-0 left-0 right-0 w-full bg-black/30 h-full"></div>
            <div className="w-full h-full absolute top-0 left-0 right-0 z-20">
                <div className="flex items-center w-full h-full">
                    <div className="max-w-[500px] text-white ml-[25px] 2xl:ml-[100px]">
                        <h1 className="text-5xl md:text-7xl font-semibold uppercase">
                            {title}
                        </h1>
                    </div>
                </div>
                <div className="w-full overflow-hidden absolute -bottom-16 left-0 right-0">
                    <div className="textAnimation">
                        <div>
                            <span>{title}</span>
                            <span>{title}</span>
                        </div>
                        <div>
                            <span>{title}</span>
                            <span>{title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return link ? (
        <a href={content.uri || '#'}>
            {imgs}
        </a>
    ) : (
        imgs
    );
};

export default DecoradoBanner;
